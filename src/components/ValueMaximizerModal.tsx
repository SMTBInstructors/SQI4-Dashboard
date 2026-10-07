import React, { useState } from 'react';
import { X, Copy, Check, RotateCcw, Sparkles, Award, RotateCw, RefreshCw, Layers } from 'lucide-react';

interface ValueMaximizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNotify?: (msg: string) => void;
}

interface MotivatorRating {
  id: string;
  name: string;
  category: 'tangible' | 'intangible';
  score: number; // 1 to 5
}

interface WorksheetRow {
  motivator: string;
  values: string;
  features: string;
  benefit: string;
}

export interface MotivatorTemplate {
  key: string;
  name: string;
  category: 'tangible' | 'intangible';
  values: string;
  features: string;
  benefit: string;
}

export const MOTIVATOR_TEMPLATES: Record<string, MotivatorTemplate> = {
  education: {
    key: 'education',
    name: 'EDUCATION',
    category: 'tangible',
    values: 'Desires a collegiate degree or advanced certification without accumulating crippling student loan debt.',
    features: '100% State Tuition Assistance (STA) + Federal Tuition Assistance (FTA $4,500/yr) + Montgomery GI Bill - SR (Ch. 1606, $466/mo + $350 Kicker) + Student Loan Repayment Program (SLRP up to $50,000 lifetime cap under ARNG-HRZ Policy #27-01).',
    benefit: 'Graduates completely debt-free, saving $40,000–$80,000+ while earning an accredited college degree and gaining military leadership credentials.'
  },
  money: {
    key: 'money',
    name: 'MONEY & INCENTIVES',
    category: 'tangible',
    values: 'Needs immediate financial security, savings acceleration, and reliable secondary monthly cashflow.',
    features: 'Up to $25,000 Non-Prior Service Enlistment Bonus (NPSEB Tier 1, REQUEST Code NP25K6YR) + $2,500 Off-Peak Bonus (ARNG-HRZ Policy #27-01) + Drill Pay (~$250–$350/weekend) + Low-cost TRICARE Reserve Select ($53/mo) + 5% BRS TSP match.',
    benefit: 'Provides an immediate financial boost (up to $27,500 total bonus tranches) and steady part-time income with premier healthcare while keeping civilian employment.'
  },
  training: {
    key: 'training',
    name: 'TRAINING',
    category: 'tangible',
    values: 'Desires practical hands-on technical skills, certified job qualifications, and disciplined professional development.',
    features: 'Advanced Individual Training (AIT) MOS qualification + Army Credentialing Assistance (COOL up to $4,000/yr) for civilian licenses (CDL, PMP, EMT, CompTIA, Cyber) + Leadership development schools.',
    benefit: 'Acquires high-demand civilian career credentials with zero debt, building marketability, resume power, and professional confidence while earning military pay.'
  },
  adventure: {
    key: 'adventure',
    name: 'ADVENTURE',
    category: 'tangible',
    values: 'Seeks excitement, physical and mental challenges, escaping monotony, and pushing beyond personal comfort zones.',
    features: 'Airborne, Air Assault, and Mountain Warfare schools; specialized tactical field exercises; operating military vehicles and high-tech weaponry; emergency disaster response deployments.',
    benefit: 'Experiences thrilling, once-in-a-lifetime challenges and personal grit that civilian life cannot offer, testing personal limits while maintaining civilian freedom.'
  },
  service_country: {
    key: 'service_country',
    name: 'SERVICE to COUNTRY',
    category: 'intangible',
    values: 'Deep patriotism, honoring family military tradition, and making a tangible contribution to the nation’s defense.',
    features: 'Dual State and Federal Mission: Sworn constitutional oath to protect the United States and state homeland during national security mobilizations and crisis response.',
    benefit: 'Protects the homeland and defends American freedom, fulfilling lifelong aspiration to serve the country with pride, duty, and distinction.'
  },
  service_others: {
    key: 'service_others',
    name: 'SERVICE to OTHERS',
    category: 'intangible',
    values: 'Driven by compassion and community commitment; wants to be on the front lines rescuing and supporting neighbors during hometown crises.',
    features: 'State Active Duty (SAD) & Title 32 Defense Support of Civil Authorities (DSCA); disaster relief, flood evacuations, hurricane response, blizzard rescue, and humanitarian emergency missions under the Governor.',
    benefit: 'Directly saves lives and rebuilds hometown communities in times of natural disasters, serving as a trusted guardian and visible leader for local neighbors.'
  },
  other: {
    key: 'other',
    name: 'OTHER (Career Stability)',
    category: 'intangible',
    values: 'Wants long-term career security, high-level professional networking, veteran preference for civil service, and retirement stability.',
    features: 'Federal & State Veteran Hiring Preference (5 or 10 points) + Security Clearance sponsorship (Secret / Top Secret) + 20-Year military retirement pension under Blended Retirement System (BRS).',
    benefit: 'Gains preferred hiring for law enforcement and government agencies, access to classified careers, and guaranteed financial security for the future.'
  }
};

const DEFAULT_MOTIVATORS: MotivatorRating[] = [
  { id: 'training', name: 'TRAINING', category: 'tangible', score: 3 },
  { id: 'education', name: 'EDUCATION', category: 'tangible', score: 5 },
  { id: 'adventure', name: 'ADVENTURE', category: 'tangible', score: 3 },
  { id: 'money', name: 'MONEY & INCENTIVES', category: 'tangible', score: 4 },
  { id: 'service_country', name: 'SERVICE to COUNTRY', category: 'intangible', score: 4 },
  { id: 'service_others', name: 'SERVICE to OTHERS', category: 'intangible', score: 3 },
  { id: 'other', name: 'OTHER (Career Stability)', category: 'intangible', score: 2 },
];

const SRIP_27_01_FEATURES = [
  {
    category: "Enlistment Incentives (ARNG-HRZ 27-01)",
    items: [
      {
        label: "NPSEB Tier 1 ($25,000)",
        text: "Non-Prior Service Enlistment Bonus (NPSEB) Tier 1: $25,000 (REQUEST Code NP25K6YR, 6-yr commitment, 50% initial / 50% anniversary tranches IAW ARNG-HRZ Policy #27-01 Encl 16).",
        amount: "$25,000"
      },
      {
        label: "NPSEB Tiers 2–4 ($12.5K / $8.33K / $6.25K)",
        text: "NPSEB Tier 2 ($12,500), Tier 3 ($8,330), or Tier 4 ($6,250) based on State Vacancy OML fill rate (ARNG-HRZ Policy #27-01 Encl 16).",
        amount: "$6.25K–$12.5K"
      },
      {
        label: "Off-Peak Bonus ($2,500)",
        text: "Off-Peak (OP) Bonus: $2,500 lump sum for RECSTA 1 Oct–10 May (REQUEST Code OFFPK2.5K). Can combine with Tier 2–4 NPSEB up to $25K total.",
        amount: "$2,500"
      },
      {
        label: "Prior Service Bonus ($5,000–$20,000)",
        text: "Prior Service Enlistment Bonus (PSEB): $20,000 for 6-yr DMOSQ (PS20K6YP), $5,000 for 3-yr DMOSQ (PS5K3YP), or $7,500 for Non-DMOSQ (PS7.5K6YP) under ARNG-HRZ Policy #27-01.",
        amount: "$5K–$20K"
      },
      {
        label: "Enlisted Affiliation Bonus ($10,000–$20,000)",
        text: "Enlisted Affiliation Bonus (EAB): $10,000 (3-yr EAB10K3YQ) or up to $20,000 max. Lump sum 180 days from start date (ARNG-HRZ Policy #27-01 Encl 4).",
        amount: "$10K–$20K"
      }
    ]
  },
  {
    category: "Education & Loan Repayment (ARNG-HRZ 27-01)",
    items: [
      {
        label: "SLRP ($50,000 Max Cap)",
        text: "Student Loan Repayment Program (SLRP): Lifetime max cap $50,000 (15% or $1,000/yr whichever is greater, plus interest, up to $8,333.33/yr annual cap) for pre-existing Title 10 USC 16301 federal loans listed on NSLDS (ARNG-HRZ Policy #27-01 Encl 16 para 13).",
        amount: "$50,000"
      },
      {
        label: "State Tuition Assistance (STA)",
        text: "100% State Tuition Assistance (STA) covering state college/university tuition costs directly.",
        amount: "100% Tuition"
      },
      {
        label: "Federal Tuition Assistance (FTA)",
        text: "Federal Tuition Assistance (FTA) up to $4,500/fiscal year ($250 per semester hour) for undergraduate/graduate coursework.",
        amount: "$4,500/yr"
      },
      {
        label: "MGIB-SR (Chapter 1606) + $350 Kicker",
        text: "Montgomery GI Bill - Selected Reserve (MGIB-SR / Ch 1606) monthly stipend plus $350/month ARNG Kicker (can combine with NPSEB and SLRP).",
        amount: "~$466/mo + $350"
      }
    ]
  },
  {
    category: "Healthcare, Pay & Tangible Benefits",
    items: [
      {
        label: "TRICARE Reserve Select",
        text: "TRICARE Reserve Select: Comprehensive health coverage (~$53/month for Soldier, ~$275/month for family), saving thousands annually compared to commercial healthcare.",
        amount: "Low Premium"
      },
      {
        label: "Weekend Drill Pay & Annual Training",
        text: "Drill Pay: 4 drill periods per weekend (~$250–$350/weekend for junior enlisted) + 15 days Annual Training pay (~$1,200–$1,800), paid on the 1st and 15th.",
        amount: "Guaranteed Pay"
      },
      {
        label: "Blended Retirement System (BRS)",
        text: "Blended Retirement System (BRS): 1% automatic DoD TSP contribution + up to 4% matching (total 5% matching) + 20-year pension calculation.",
        amount: "5% Matching"
      },
      {
        label: "MOS Skills & Civilian Credentialing (CA)",
        text: "Army Credentialing Assistance (CA / COOL): Up to $4,000/yr for civilian licenses (CDL, PMP, CompTIA, EMT, Aviation) transferable to civilian careers.",
        amount: "Up to $4K/yr"
      }
    ]
  }
];

export const ValueMaximizerModal: React.FC<ValueMaximizerModalProps> = ({ isOpen, onClose, onNotify }) => {
  const [activeTab, setActiveTab] = useState<'INTERACTIVE' | 'SRIP_MATRIX' | 'WORKSHEET'>('INTERACTIVE');
  // Candidate Communication Style: Analyst, Realist, Negotiator, or Generator
  const [communicationStyle, setCommunicationStyle] = useState<'Analyst' | 'Realist' | 'Negotiator' | 'Generator'>('Realist');
  const [otherLabel, setOtherLabel] = useState('Career Stability');
  const [selectedRowIndex, setSelectedRowIndex] = useState<number>(0);
  
  const [ratings, setRatings] = useState<MotivatorRating[]>(DEFAULT_MOTIVATORS);
  
  // Default rows initialized with dynamic matching templates
  const [worksheetRows, setWorksheetRows] = useState<WorksheetRow[]>([
    {
      motivator: MOTIVATOR_TEMPLATES.education.name,
      values: MOTIVATOR_TEMPLATES.education.values,
      features: MOTIVATOR_TEMPLATES.education.features,
      benefit: MOTIVATOR_TEMPLATES.education.benefit
    },
    {
      motivator: MOTIVATOR_TEMPLATES.money.name,
      values: MOTIVATOR_TEMPLATES.money.values,
      features: MOTIVATOR_TEMPLATES.money.features,
      benefit: MOTIVATOR_TEMPLATES.money.benefit
    },
    {
      motivator: MOTIVATOR_TEMPLATES.service_country.name,
      values: MOTIVATOR_TEMPLATES.service_country.values,
      features: MOTIVATOR_TEMPLATES.service_country.features,
      benefit: MOTIVATOR_TEMPLATES.service_country.benefit
    }
  ]);

  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Helper to find template by motivator key or label
  const getTemplate = (nameOrKey: string): MotivatorTemplate => {
    const norm = nameOrKey.toLowerCase();
    if (norm.includes('train')) return MOTIVATOR_TEMPLATES.training;
    if (norm.includes('edu')) return MOTIVATOR_TEMPLATES.education;
    if (norm.includes('adven')) return MOTIVATOR_TEMPLATES.adventure;
    if (norm.includes('money') || norm.includes('incent')) return MOTIVATOR_TEMPLATES.money;
    if (norm.includes('country') || norm.includes('nation')) return MOTIVATOR_TEMPLATES.service_country;
    if (norm.includes('other') && norm.includes('service')) return MOTIVATOR_TEMPLATES.service_others;
    return MOTIVATOR_TEMPLATES.other;
  };

  const handleScoreChange = (id: string, newScore: number) => {
    setRatings((prev) =>
      prev.map((r) => (r.id === id ? { ...r, score: newScore } : r))
    );
  };

  const handleOtherLabelChange = (text: string) => {
    setOtherLabel(text);
    setRatings((prev) =>
      prev.map((r) => (r.id === 'other' ? { ...r, name: `OTHER: ${text || 'Custom'}` } : r))
    );
  };

  const handleRowChange = (index: number, field: keyof WorksheetRow, value: string) => {
    setWorksheetRows((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  // Called when recruiter selects a motivator from the dropdown: dynamically updates VALUES, FEATURES, and BENEFIT
  const handleMotivatorSelect = (rowIndex: number, motivatorKey: string) => {
    const tpl = MOTIVATOR_TEMPLATES[motivatorKey] || MOTIVATOR_TEMPLATES.other;
    setWorksheetRows((prev) => {
      const copy = [...prev];
      copy[rowIndex] = {
        motivator: tpl.name,
        values: tpl.values,
        features: tpl.features,
        benefit: tpl.benefit
      };
      return copy;
    });
    setSelectedRowIndex(rowIndex);
    if (onNotify) {
      onNotify(`Priority #${rowIndex + 1} updated: ${tpl.name} details loaded`);
    }
  };

  // Re-applies the default template to the row if user customized text and wants to revert
  const handleResetRowTemplate = (rowIndex: number) => {
    const currentMotivator = worksheetRows[rowIndex]?.motivator || 'EDUCATION';
    const tpl = getTemplate(currentMotivator);
    setWorksheetRows((prev) => {
      const copy = [...prev];
      copy[rowIndex] = {
        motivator: tpl.name,
        values: tpl.values,
        features: tpl.features,
        benefit: tpl.benefit
      };
      return copy;
    });
    if (onNotify) {
      onNotify(`Reset Priority #${rowIndex + 1} to default ${tpl.name} details`);
    }
  };

  const handleInsertFeature = (featureText: string) => {
    setWorksheetRows((prev) => {
      const copy = [...prev];
      const currentFeatures = copy[selectedRowIndex]?.features || '';
      const separator = currentFeatures.trim().length > 0 ? ' + ' : '';
      copy[selectedRowIndex] = {
        ...copy[selectedRowIndex],
        features: `${currentFeatures}${separator}${featureText}`
      };
      return copy;
    });
    if (onNotify) {
      onNotify(`Added feature to Priority Motivator #${selectedRowIndex + 1}`);
    }
  };

  // Auto-populates Top 3 based on highest scores and dynamically updates VALUES, FEATURES, and BENEFIT for each
  const handleAutoPopulateTop3 = () => {
    const sorted = [...ratings].sort((a, b) => b.score - a.score);
    const top3 = sorted.slice(0, 3);
    
    const newRows: WorksheetRow[] = top3.map((r) => {
      const tpl = getTemplate(r.id || r.name);
      return {
        motivator: r.id === 'other' && otherLabel ? `OTHER (${otherLabel})` : tpl.name,
        values: tpl.values,
        features: tpl.features,
        benefit: tpl.benefit
      };
    });

    setWorksheetRows(newRows);
    if (onNotify) onNotify("Top 3 Motivators populated with matching Values, Features, and Benefits!");
  };

  const handleReset = () => {
    setRatings(DEFAULT_MOTIVATORS);
    setOtherLabel('Career Stability');
    setCommunicationStyle('Realist');
    setWorksheetRows([
      {
        motivator: MOTIVATOR_TEMPLATES.education.name,
        values: MOTIVATOR_TEMPLATES.education.values,
        features: MOTIVATOR_TEMPLATES.education.features,
        benefit: MOTIVATOR_TEMPLATES.education.benefit
      },
      {
        motivator: MOTIVATOR_TEMPLATES.money.name,
        values: MOTIVATOR_TEMPLATES.money.values,
        features: MOTIVATOR_TEMPLATES.money.features,
        benefit: MOTIVATOR_TEMPLATES.money.benefit
      },
      {
        motivator: MOTIVATOR_TEMPLATES.service_country.name,
        values: MOTIVATOR_TEMPLATES.service_country.values,
        features: MOTIVATOR_TEMPLATES.service_country.features,
        benefit: MOTIVATOR_TEMPLATES.service_country.benefit
      }
    ]);
    if (onNotify) onNotify("Value Maximizer reset to default values");
  };

  const handleCopySummary = () => {
    const text = `VALUE MAXIMIZER TOOL (CM4R MODULE 3)
Candidate Communication Style: ${communicationStyle}
Applicable Policy: ARNG Selected Reserve Incentive Program (SRIP) Policy (ARNG-HRZ Policy #27-01)

PART 1: MOTIVATOR RATINGS (Scale 1 to 5):
${ratings.map((r) => `- ${r.name} (${r.category.toUpperCase()}): ${r.score}/5`).join('\n')}

PART 2: FEATURES & BENEFITS ALIGNMENT (ARNG-HRZ POLICY #27-01):
${worksheetRows.map((r, i) => `
[${i + 1}] MOTIVATOR: ${r.motivator}
    Values (Why they want it): ${r.values}
    Guard Features (Incentives): ${r.features}
    Benefit (So What? Personal Impact): ${r.benefit}
`).join('')}

Army National Guard · Strength Maintenance Training Battalion (SMTB)`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    if (onNotify) onNotify("Worksheet summary copied to clipboard");
    setTimeout(() => setCopied(false), 2200);
  };

  // ── RADAR GRAPH GEOMETRY ──
  const totalAxes = ratings.length;
  const radius = 120;
  const center = 150;

  const getCoordinates = (index: number, score: number) => {
    const angle = (Math.PI * 2 / totalAxes) * index - Math.PI / 2;
    const r = (score / 5) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  const polygonPoints = ratings
    .map((r, i) => {
      const { x, y } = getCoordinates(i, r.score);
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-[#12150F] border border-[#B3A47B] max-w-4xl w-full my-auto shadow-2xl relative flex flex-col max-h-[94vh] overflow-hidden">
        
        {/* Document Header Bar */}
        <div className="bg-[#1B2016] border-b border-[#DEDCD1]/15 px-6 py-4 flex items-start justify-between gap-4 shrink-0">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-[#B3A47B] text-[#12150F] font-barlow font-bold text-[10px] tracking-[0.2em] uppercase px-2 py-0.5">
                CM4R Module 3
              </span>
              <span className="bg-[#12150F] border border-[#C09553]/50 text-[#C09553] font-barlow font-bold text-[10px] tracking-wider uppercase px-2 py-0.5">
                SRIP Policy #27-01
              </span>
              <span className="font-barlow text-[11px] text-[#8C9180] uppercase tracking-wider font-semibold">
                SMTB · Authentic Communication Doctrine
              </span>
            </div>
            <h2 className="font-oswald text-2xl sm:text-3xl font-light text-[#DEDCD1] uppercase tracking-wide">
              Value Maximizer Tool
            </h2>
            <p className="text-xs font-barlow text-[#8C9180]">
              Connects candidate psychological motivators to ARNG features & incentives under ARNG-HRZ Policy #27-01 (Effective 1 Oct 2026)
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleCopySummary}
              className="p-2 border border-[#B3A47B]/50 hover:bg-[#B3A47B]/10 text-[#B3A47B] text-xs font-barlow uppercase flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Copy Worksheet Summary"
            >
              {copied ? <Check size={14} className="text-[#C09553]" /> : <Copy size={14} />}
              <span className="hidden sm:inline">{copied ? "Copied" : "Copy Summary"}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-[#8C9180] hover:text-[#DEDCD1] hover:bg-[#DEDCD1]/10 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Candidate Communication Style Selector Bar (Analyst, Realist, Negotiator, Generator) */}
        <div className="bg-[#1B2016]/70 border-b border-[#DEDCD1]/10 px-6 py-3 shrink-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-barlow">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-[11px] uppercase font-bold text-[#C09553] tracking-wider shrink-0">
              Candidate Communication Style:
            </span>
            <div className="flex items-center gap-1.5">
              {(['Analyst', 'Realist', 'Negotiator', 'Generator'] as const).map((style) => (
                <button
                  key={style}
                  type="button"
                  onClick={() => setCommunicationStyle(style)}
                  className={`px-3 py-1 text-xs font-barlow font-bold uppercase tracking-wider border transition-colors cursor-pointer ${
                    communicationStyle === style
                      ? 'bg-[#C09553] text-[#12150F] border-[#C09553]'
                      : 'bg-[#12150F] text-[#8C9180] border-[#DEDCD1]/20 hover:text-[#DEDCD1] hover:border-[#DEDCD1]/40'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          <div className="text-[11px] font-barlow text-[#8C9180]">
            <span className="text-[#B3A47B] font-semibold">Active Style Profile:</span>{' '}
            {communicationStyle === 'Analyst' && 'Data, accuracy, systematic and deliberate examination'}
            {communicationStyle === 'Realist' && 'Action-oriented, practical, direct, and bottom-line focused'}
            {communicationStyle === 'Negotiator' && 'Relational, consensus-driven, supportive, and collaborative'}
            {communicationStyle === 'Generator' && 'Visionary, big-picture, innovative, and enthusiastic'}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 pt-3 pb-2 bg-[#12150F] border-b border-[#DEDCD1]/10 flex items-center justify-between gap-3 shrink-0 flex-wrap">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('INTERACTIVE')}
              className={`px-3 py-1 text-xs font-barlow uppercase tracking-wider font-semibold border transition-colors cursor-pointer ${
                activeTab === 'INTERACTIVE'
                  ? 'bg-[#B3A47B] text-[#12150F] border-[#B3A47B]'
                  : 'text-[#8C9180] border-[#DEDCD1]/15 hover:text-[#DEDCD1]'
              }`}
            >
              Interactive Radar & Worksheet
            </button>
            <button
              onClick={() => setActiveTab('SRIP_MATRIX')}
              className={`px-3 py-1 text-xs font-barlow uppercase tracking-wider font-semibold border transition-colors cursor-pointer ${
                activeTab === 'SRIP_MATRIX'
                  ? 'bg-[#C09553] text-[#12150F] border-[#C09553]'
                  : 'text-[#8C9180] border-[#DEDCD1]/15 hover:text-[#DEDCD1]'
              }`}
            >
              SRIP Policy #27-01 Incentives Matrix
            </button>
            <button
              onClick={() => setActiveTab('WORKSHEET')}
              className={`px-3 py-1 text-xs font-barlow uppercase tracking-wider font-semibold border transition-colors cursor-pointer ${
                activeTab === 'WORKSHEET'
                  ? 'bg-[#8C9180] text-[#12150F] border-[#8C9180]'
                  : 'text-[#8C9180] border-[#DEDCD1]/15 hover:text-[#DEDCD1]'
              }`}
            >
              Official Document Facsimile
            </button>
          </div>

          <button
            onClick={handleReset}
            className="text-xs font-barlow text-[#8C9180] hover:text-[#DEDCD1] inline-flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw size={12} />
            <span>Reset Default Values</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-8 flex-1">
          {activeTab === 'INTERACTIVE' ? (
            <div className="space-y-8">
              
              {/* PART 1: VISUALIZE MOTIVATORS AND VALUES */}
              <div className="bg-[#1B2016]/80 border border-[#DEDCD1]/15 p-5 sm:p-6 space-y-6">
                <div className="border-b border-[#DEDCD1]/15 pb-3">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h3 className="font-oswald text-xl text-[#DEDCD1] uppercase tracking-wide">
                      PART 1: VISUALIZE MOTIVATORS AND VALUES
                    </h3>
                    <span className="text-xs font-barlow text-[#C09553] font-semibold">
                      Scale: 1 (Low) to 5 (High)
                    </span>
                  </div>
                  <p className="text-xs font-barlow text-[#8C9180] mt-1">
                    Plot the importance of each motivator from 1 (not very important) to 5 (very important). The radar polygon visualizes this candidate’s greatest motivators.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  {/* SVG Spider / Radar Chart (6 cols) */}
                  <div className="lg:col-span-6 flex flex-col items-center justify-center p-3 bg-[#12150F] border border-[#DEDCD1]/10">
                    <div className="w-full flex items-center justify-between text-[11px] font-barlow font-bold px-4 py-1 uppercase tracking-widest text-[#8C9180] border-b border-[#DEDCD1]/10 mb-2">
                      <span className="text-[#8C9180]">← Intangible</span>
                      <span className="text-[#B3A47B]">Tangible →</span>
                    </div>

                    <svg viewBox="0 0 300 300" className="w-64 h-64 sm:w-72 sm:h-72">
                      {/* Concentric Rings */}
                      {[1, 2, 3, 4, 5].map((level) => {
                        const levelPoints = Array.from({ length: totalAxes }).map((_, i) => {
                          const { x, y } = getCoordinates(i, level);
                          return `${x},${y}`;
                        }).join(' ');
                        return (
                          <polygon
                            key={level}
                            points={levelPoints}
                            fill="none"
                            stroke="#DEDCD1"
                            strokeOpacity={level === 5 ? 0.35 : 0.15}
                            strokeWidth="1"
                          />
                        );
                      })}

                      {/* Axis Lines */}
                      {ratings.map((_, i) => {
                        const { x, y } = getCoordinates(i, 5);
                        return (
                          <line
                            key={i}
                            x1={center}
                            y1={center}
                            x2={x}
                            y2={y}
                            stroke="#DEDCD1"
                            strokeOpacity="0.2"
                            strokeWidth="1"
                          />
                        );
                      })}

                      {/* Polygon */}
                      <polygon
                        points={polygonPoints}
                        fill="#C09553"
                        fillOpacity="0.25"
                        stroke="#C09553"
                        strokeWidth="2.5"
                      />

                      {/* Vertex Dots */}
                      {ratings.map((r, i) => {
                        const { x, y } = getCoordinates(i, r.score);
                        return (
                          <circle
                            key={i}
                            cx={x}
                            cy={y}
                            r="4.5"
                            fill="#B3A47B"
                            stroke="#12150F"
                            strokeWidth="1.5"
                          />
                        );
                      })}

                      <circle cx={center} cy={center} r="3" fill="#DEDCD1" />

                      {/* Axis Labels */}
                      {ratings.map((r, i) => {
                        const { x, y } = getCoordinates(i, 5.7);
                        const isTop = i === 0;
                        const isRight = i === 1 || i === 2;
                        const isBottom = i === 3 || i === 4;
                        const anchor = isTop ? 'middle' : isRight ? 'start' : isBottom ? 'middle' : 'end';
                        return (
                          <text
                            key={i}
                            x={x}
                            y={y + 3}
                            textAnchor={anchor}
                            className="fill-[#DEDCD1] text-[9px] font-barlow font-bold uppercase"
                          >
                            {r.name.length > 18 ? r.name.substring(0, 16) + '..' : r.name}
                          </text>
                        );
                      })}
                    </svg>

                    <div className="text-[10px] font-barlow text-[#8C9180] text-center mt-2 italic">
                      Live visualization of candidate motivational geometry
                    </div>
                  </div>

                  {/* Sliders & Ratings Control Panel (6 cols) */}
                  <div className="lg:col-span-6 space-y-3">
                    <div className="flex items-center justify-between pb-1 border-b border-[#DEDCD1]/10">
                      <span className="text-[11px] font-oswald text-[#B3A47B] uppercase tracking-wider">
                        Motivator Dimensions
                      </span>
                      <span className="text-[11px] font-barlow text-[#8C9180]">
                        Score 1 (Low) to 5 (High)
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      {ratings.map((item) => (
                        <div key={item.id} className="bg-[#12150F] p-2.5 border border-[#DEDCD1]/10 space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-oswald text-[#DEDCD1] uppercase tracking-wide flex items-center gap-1.5">
                              <span>{item.name}</span>
                              <span className="text-[9px] font-barlow uppercase text-[#8C9180] border border-[#DEDCD1]/20 px-1">
                                {item.category}
                              </span>
                            </span>
                            <span className="font-oswald text-[#C09553] font-bold">
                              {item.score} / 5
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            {[1, 2, 3, 4, 5].map((lvl) => (
                              <button
                                key={lvl}
                                type="button"
                                onClick={() => handleScoreChange(item.id, lvl)}
                                className={`flex-1 py-1 text-xs font-barlow font-bold border transition-colors cursor-pointer ${
                                  item.score === lvl
                                    ? 'bg-[#C09553] text-[#12150F] border-[#C09553]'
                                    : item.score > lvl
                                    ? 'bg-[#1B2016] text-[#B3A47B] border-[#B3A47B]/30'
                                    : 'bg-[#1B2016]/40 text-[#8C9180] border-[#DEDCD1]/10 hover:border-[#DEDCD1]/30'
                                }`}
                              >
                                {lvl}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}

                      {/* Custom "Other" Motivator Label Input */}
                      <div className="pt-1">
                        <label className="text-[10px] uppercase font-bold text-[#8C9180] tracking-wider block mb-1">
                          Custom "Other" Motivator Name:
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Career Stability, Medical Benefits, Family Heritage"
                          value={otherLabel}
                          onChange={(e) => handleOtherLabelChange(e.target.value)}
                          className="w-full bg-[#12150F] border border-[#DEDCD1]/20 px-3 py-1 text-xs text-[#DEDCD1] placeholder-[#8C9180] focus:outline-none focus:border-[#B3A47B]"
                        />
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* PART 2: CONNECT FEATURES AND BENEFITS TO MOTIVATORS AND VALUES */}
              <div className="bg-[#1B2016]/80 border border-[#DEDCD1]/15 p-5 sm:p-6 space-y-6">
                <div className="border-b border-[#DEDCD1]/15 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="font-oswald text-xl text-[#DEDCD1] uppercase tracking-wide">
                      PART 2: CONNECT FEATURES AND BENEFITS TO MOTIVATORS AND VALUES
                    </h3>
                    <p className="text-xs font-barlow text-[#8C9180] mt-1">
                      Selecting or changing a Motivator automatically updates the corresponding Values, Features, and Benefits. You can also customize any text or click quick features below.
                    </p>
                  </div>

                  <button
                    onClick={handleAutoPopulateTop3}
                    className="px-3 py-1.5 bg-[#B3A47B] hover:bg-[#C09553] text-[#12150F] font-barlow font-bold text-xs uppercase tracking-wider inline-flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer shadow-md"
                  >
                    <Sparkles size={13} />
                    <span>Auto-Populate Top 3 from Graph</span>
                  </button>
                </div>

                {/* 3-Row Worksheet Cards */}
                <div className="space-y-4">
                  {worksheetRows.map((row, index) => {
                    const currentTplKey = Object.keys(MOTIVATOR_TEMPLATES).find(
                      (k) => MOTIVATOR_TEMPLATES[k].name === row.motivator
                    ) || 'education';

                    return (
                      <div 
                        key={index} 
                        onClick={() => setSelectedRowIndex(index)}
                        className={`border p-4 space-y-3 transition-colors cursor-pointer ${
                          selectedRowIndex === index 
                            ? 'bg-[#151911] border-[#C09553]' 
                            : 'bg-[#12150F] border-[#DEDCD1]/15 hover:border-[#DEDCD1]/30'
                        }`}
                      >
                        <div className="flex items-center justify-between pb-2 border-b border-[#DEDCD1]/10 flex-wrap gap-2">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 bg-[#C09553] text-[#12150F] font-oswald font-bold text-sm flex items-center justify-center shrink-0">
                              {index + 1}
                            </span>
                            <span className="font-oswald text-base text-[#DEDCD1] uppercase tracking-wider">
                              Priority Motivator #{index + 1}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleResetRowTemplate(index);
                              }}
                              className="text-[10px] font-barlow uppercase font-semibold text-[#8C9180] hover:text-[#C09553] inline-flex items-center gap-1 px-2 py-0.5 border border-[#DEDCD1]/15 bg-[#12150F] transition-colors cursor-pointer"
                              title="Reset this row's values, features, and benefits to default template"
                            >
                              <RotateCw size={11} />
                              <span>Reload Template</span>
                            </button>

                            {selectedRowIndex === index && (
                              <span className="text-[10px] font-barlow font-bold uppercase text-[#C09553] px-2 py-0.5 bg-[#C09553]/10 border border-[#C09553]/30">
                                Active Target Row
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-barlow">
                          
                          {/* Col 1: Motivator Selector */}
                          <div className="space-y-1">
                            <label className="text-[10px] font-oswald uppercase text-[#B3A47B] block font-semibold">
                              Motivator (What do they want?)
                            </label>
                            <select
                              value={currentTplKey}
                              onChange={(e) => handleMotivatorSelect(index, e.target.value)}
                              className="w-full bg-[#1B2016] border border-[#DEDCD1]/20 p-2 text-xs font-bold text-[#DEDCD1] focus:outline-none focus:border-[#B3A47B] cursor-pointer"
                            >
                              <option value="education">EDUCATION</option>
                              <option value="money">MONEY & INCENTIVES</option>
                              <option value="training">TRAINING</option>
                              <option value="adventure">ADVENTURE</option>
                              <option value="service_country">SERVICE to COUNTRY</option>
                              <option value="service_others">SERVICE to OTHERS</option>
                              <option value="other">OTHER (Career Stability)</option>
                            </select>
                            <input
                              type="text"
                              value={row.motivator}
                              onChange={(e) => handleRowChange(index, 'motivator', e.target.value)}
                              placeholder="Custom Motivator Label"
                              className="w-full bg-[#12150F] border border-[#DEDCD1]/15 px-2 py-1 text-[11px] text-[#8C9180] focus:outline-none focus:border-[#B3A47B]"
                              title="You can edit the display label here"
                            />
                          </div>

                          {/* Col 2: Values (Dynamically populated) */}
                          <div className="space-y-1">
                            <label className="text-[10px] font-oswald uppercase text-[#C09553] block font-semibold">
                              Values (Why do they want it?)
                            </label>
                            <textarea
                              rows={4}
                              value={row.values}
                              onChange={(e) => handleRowChange(index, 'values', e.target.value)}
                              placeholder="Why is this important to them?"
                              className="w-full bg-[#1B2016] border border-[#DEDCD1]/20 p-2 text-xs text-[#DEDCD1] focus:outline-none focus:border-[#B3A47B] resize-none"
                            />
                          </div>

                          {/* Col 3: Features (Dynamically populated) */}
                          <div className="space-y-1">
                            <label className="text-[10px] font-oswald uppercase text-[#B3A47B] block font-semibold">
                              Features (What Guard features meet this?)
                            </label>
                            <textarea
                              rows={4}
                              value={row.features}
                              onChange={(e) => handleRowChange(index, 'features', e.target.value)}
                              placeholder="Guard features from ARNG-HRZ Policy #27-01..."
                              className="w-full bg-[#1B2016] border border-[#DEDCD1]/20 p-2 text-xs text-[#DEDCD1] focus:outline-none focus:border-[#B3A47B] resize-none"
                            />
                          </div>

                          {/* Col 4: Benefit (SO WHAT?) (Dynamically populated) */}
                          <div className="space-y-1">
                            <label className="text-[10px] font-oswald uppercase text-[#C09553] block font-semibold">
                              Benefit (So What? Personal Impact)
                            </label>
                            <textarea
                              rows={4}
                              value={row.benefit}
                              onChange={(e) => handleRowChange(index, 'benefit', e.target.value)}
                              placeholder="How does this transform their life?"
                              className="w-full bg-[#1B2016] border border-[#DEDCD1]/20 p-2 text-xs text-[#DEDCD1] focus:outline-none focus:border-[#B3A47B] resize-none"
                            />
                          </div>

                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Quick-Insert Guard Features & Incentives Drawer */}
                <div className="bg-[#12150F] border border-[#DEDCD1]/20 p-4 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-[#DEDCD1]/10 flex-wrap gap-2">
                    <span className="font-oswald text-xs uppercase tracking-wider text-[#C09553] flex items-center gap-1.5">
                      <Award size={14} />
                      <span>Quick-Insert SRIP Policy #27-01 Features (Targeting Priority #{selectedRowIndex + 1})</span>
                    </span>
                    <span className="text-[10px] font-barlow text-[#8C9180]">
                      Click any item to append directly to the active row's Guard Features
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {SRIP_27_01_FEATURES.map((cat, cIdx) => (
                      <div key={cIdx} className="bg-[#1B2016] border border-[#DEDCD1]/10 p-2.5 space-y-2">
                        <span className="text-[10px] font-oswald uppercase text-[#B3A47B] block font-semibold tracking-wider">
                          {cat.category}
                        </span>
                        <div className="space-y-1.5">
                          {cat.items.map((it, iIdx) => (
                            <button
                              key={iIdx}
                              type="button"
                              onClick={() => handleInsertFeature(it.text)}
                              className="w-full text-left p-1.5 bg-[#12150F] hover:bg-[#C09553]/15 border border-[#DEDCD1]/10 hover:border-[#C09553]/50 transition-colors cursor-pointer group flex items-start justify-between gap-1"
                              title={`Insert "${it.label}" into Row #${selectedRowIndex + 1}`}
                            >
                              <div className="text-[11px] font-barlow text-[#DEDCD1] group-hover:text-[#C09553] leading-snug">
                                {it.label}
                              </div>
                              <span className="text-[9px] font-mono text-[#8C9180] shrink-0 font-bold px-1 bg-[#1B2016]">
                                {it.amount}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          ) : activeTab === 'SRIP_MATRIX' ? (
            /* SRIP POLICY #27-01 INCENTIVES MATRIX SUMMARY VIEW */
            <div className="bg-[#1B2016] border border-[#DEDCD1]/20 p-5 sm:p-8 space-y-6 max-w-4xl mx-auto shadow-inner">
              <div className="border-b border-[#DEDCD1]/20 pb-4 space-y-1 text-center">
                <span className="text-[10px] font-mono tracking-widest text-[#8C9180] block">
                  NATIONAL GUARD BUREAU · ARNG-HRZ POLICY #27-01 · EFFECTIVE 1 OCTOBER 2026
                </span>
                <h3 className="font-oswald text-2xl uppercase tracking-wider text-[#DEDCD1]">
                  ARNG SELECTED RESERVE INCENTIVE PROGRAM (SRIP) MATRIX
                </h3>
                <p className="text-xs font-barlow text-[#C09553]">
                  Enclosure 4 & Enclosure 16: Maximum Allowable Amounts & Program Parameters
                </p>
              </div>

              {/* Master Table of Allowable Incentives */}
              <div className="border border-[#DEDCD1]/20 overflow-x-auto">
                <table className="w-full text-left text-xs font-barlow border-collapse">
                  <thead>
                    <tr className="bg-[#C09553] text-[#12150F] font-oswald uppercase tracking-wider text-[11px]">
                      <th className="p-2.5 border-r border-[#12150F]/20">Incentive Type</th>
                      <th className="p-2.5 border-r border-[#12150F]/20">Maximum Amount</th>
                      <th className="p-2.5 border-r border-[#12150F]/20">Commitment</th>
                      <th className="p-2.5 border-r border-[#12150F]/20">Payment Structure</th>
                      <th className="p-2.5">Key Eligibility (ARNG-HRZ 27-01)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#DEDCD1]/10 bg-[#12150F] text-[#DEDCD1]">
                    <tr>
                      <td className="p-2.5 font-bold text-[#C09553]">Non-Prior Service Enlistment Bonus (NPSEB)</td>
                      <td className="p-2.5 font-mono font-bold">$25,000.00</td>
                      <td className="p-2.5">6-Year</td>
                      <td className="p-2.5">50% initial upon MOSQ / 50% anniversary tranches</td>
                      <td className="p-2.5 text-[11px] text-[#8C9180]">
                        Tier 1: $25K (NP25K6YR); Tier 2: $12.5K; Tier 3: $8.33K; Tier 4: $6.25K. Tier 1 Ed, ASVAB I-IIIB, Skill Lvl 1 (E1–E4).
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-[#C09553]">Off-Peak Bonus (OP)</td>
                      <td className="p-2.5 font-mono font-bold">$2,500.00</td>
                      <td className="p-2.5">3-Year</td>
                      <td className="p-2.5">Lump sum upon MOS award</td>
                      <td className="p-2.5 text-[11px] text-[#8C9180]">
                        RECSTA 1 Oct–10 May. Can combine with Tier 2–4 NPSEB up to $25K total. (OFFPK2.5K).
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-[#B3A47B]">Prior Service Enlistment Bonus (PSEB)</td>
                      <td className="p-2.5 font-mono font-bold">$20,000.00</td>
                      <td className="p-2.5">3-Yr / 6-Yr</td>
                      <td className="p-2.5">50% initial / 50% equal anniversary installments</td>
                      <td className="p-2.5 text-[11px] text-[#8C9180]">
                        DMOSQ 6-yr: $20K (PS20K6YP); DMOSQ 3-yr: $5K (PS5K3YP); Non-DMOSQ 6-yr: $7.5K (PS7.5K6YP). Pay Grade E-3 to E-7, &lt;16 yrs TIS.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-[#B3A47B]">Enlisted Affiliation Bonus (EAB)</td>
                      <td className="p-2.5 font-mono font-bold">$20,000.00</td>
                      <td className="p-2.5">3-Year</td>
                      <td className="p-2.5">Lump sum 180 days from contract start</td>
                      <td className="p-2.5 text-[11px] text-[#8C9180]">
                        EAB DMOSQ 3-yr: $10,000 (EAB10K3YQ) or up to $20K max. Transitioning from AC/IRR within 180 days of ETS.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-[#B3A47B]">Reenlistment / Extension Bonus (REB)</td>
                      <td className="p-2.5 font-mono font-bold">$20,000.00</td>
                      <td className="p-2.5">3-Year</td>
                      <td className="p-2.5">Lump sum within 30 days of contract start</td>
                      <td className="p-2.5 text-[11px] text-[#8C9180]">
                        DMOSQ: $10,000. Pay grade E-4 to E-7. &lt;13 yrs 1 mo (Legacy) or 5 to 6 yrs 1 mo (BRS).
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-[#DEDCD1]">MOS Conversion Bonus (MOSCB)</td>
                      <td className="p-2.5 font-mono font-bold">$10,000.00</td>
                      <td className="p-2.5">3-Year</td>
                      <td className="p-2.5">Lump sum upon MOS qualification</td>
                      <td className="p-2.5 text-[11px] text-[#8C9180]">
                        E-6 and below, &lt;12 yrs TIS. MOS must be &lt;90% filled at state level. Qualify within 24 months.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-[#C09553]">Student Loan Repayment Program (SLRP)</td>
                      <td className="p-2.5 font-mono font-bold">$50,000.00</td>
                      <td className="p-2.5">6-Year</td>
                      <td className="p-2.5">15% or $1,000/yr (greater) + interest, cap $8,333.33/yr</td>
                      <td className="p-2.5 text-[11px] text-[#8C9180]">
                        Pre-existing Title 10 USC 16301 federal loans on NSLDS. Direct to lender. GIMS pre-approval required.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-[#DEDCD1]">Chaplain Loan Repayment Program (CLRP)</td>
                      <td className="p-2.5 font-mono font-bold">$80,000.00</td>
                      <td className="p-2.5">3-Yr Contracts</td>
                      <td className="p-2.5">1/3 of $20K contracted amount/yr + interest</td>
                      <td className="p-2.5 text-[11px] text-[#8C9180]">
                        Issued in four separate 3-year contracts ($20K each) totaling $80,000 lifetime cap.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-[#DEDCD1]">79T AGR Reenlistment / Extension Bonus</td>
                      <td className="p-2.5 font-mono font-bold">$12,000.00</td>
                      <td className="p-2.5">3-Year</td>
                      <td className="p-2.5">Installments ($1.5K initial, $1.5K 1st yr, $1.5K 3rd yr for 3-yr)</td>
                      <td className="p-2.5 text-[11px] text-[#8C9180]">
                        Active 79T Production Recruiter assigned to RRB with active 4-digit RSID. &lt;13 yrs AFS. One-time career bonus.
                      </td>
                    </tr>
                    <tr className="bg-red-950/20 text-red-300">
                      <td className="p-2.5 font-bold">Officer / Warrant Officer Incentives (OAB, WOAB, OAFB, WOAFB, ORB, WORB)</td>
                      <td className="p-2.5 font-mono font-bold uppercase text-red-400">SUSPENDED</td>
                      <td className="p-2.5">—</td>
                      <td className="p-2.5">—</td>
                      <td className="p-2.5 text-[11px]">
                        Officer and Warrant Officer accession, affiliation, and retention bonuses are officially SUSPENDED under Policy #27-01.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-[#12150F] p-4 border border-[#DEDCD1]/10 text-xs font-barlow space-y-2">
                <span className="font-oswald text-[#C09553] uppercase block font-semibold">
                  Policy Notes & Integration Rules (ARNG-HRZ #27-01):
                </span>
                <ul className="list-disc list-inside space-y-1 text-[#8C9180]">
                  <li><strong className="text-[#DEDCD1]">Incentive Combinations:</strong> NPSEB may combine with Off-Peak ($2.5K) up to $25,000 total, and with the MGIB-SR Kicker. SLRP may also combine with MGIB-SR Kicker.</li>
                  <li><strong className="text-[#DEDCD1]">GIMS Pre-Approval:</strong> All LRP contracts require an approved GIMS pre-approval memo dated within 90 days of issuance.</li>
                  <li><strong className="text-[#DEDCD1]">Digital Signature Mandate:</strong> Only CAC or electronic signature pad signatures are authorized on bonus addendums (Encl 3 para 1e).</li>
                </ul>
              </div>
            </div>
          ) : (
            /* OFFICIAL SMTB DOCUMENT FACSIMILE (2-PAGE WORKSHEET VIEW) */
            <div className="bg-[#1B2016] border border-[#DEDCD1]/20 p-6 sm:p-10 space-y-10 max-w-3xl mx-auto shadow-inner font-serif">
              
              {/* Page 1 Facsimile */}
              <div className="space-y-6 border-b border-[#DEDCD1]/20 pb-10">
                <div className="flex items-center justify-between border-b border-[#DEDCD1]/15 pb-4">
                  <div className="space-y-0.5">
                    <h3 className="font-oswald text-2xl uppercase tracking-widest text-[#DEDCD1]">
                      VALUE MAXIMIZER TOOL
                    </h3>
                    <span className="text-[10px] font-barlow uppercase text-[#C09553] tracking-widest block font-bold">
                      Army National Guard · Strength Maintenance Training Battalion (SMTB)
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#8C9180]">PAGE 1 OF 2</span>
                </div>

                <div className="text-xs border-b border-[#DEDCD1]/15 pb-4 flex items-center justify-between">
                  <div>
                    <span className="text-[#8C9180]">Candidate Communication Style: </span>
                    <span className="text-[#DEDCD1] font-bold border-b border-dotted border-[#DEDCD1]/40 pb-0.5 inline-block min-w-[200px]">
                      {communicationStyle}
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-[#C09553]">
                    ARNG-HRZ Policy #27-01
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-oswald text-base text-[#B3A47B] uppercase tracking-wide">
                    PART 1: VISUALIZE MOTIVATORS AND VALUES
                  </h4>
                  <p className="text-xs text-[#8C9180] leading-relaxed">
                    This tool provides a way for you to visualize the importance of a Prospect or Soldier’s various motivators and values.
                  </p>
                  <p className="text-xs text-[#8C9180] italic leading-relaxed">
                    Instructions: Plot the importance of each motivator from 1 (not very important) to 5 (very important) on the graph. Connect dots to help you visualize and understand this person’s greatest motivators.
                  </p>
                </div>

                {/* Facsimile Radar Chart Display */}
                <div className="flex flex-col items-center justify-center p-4 bg-[#12150F] border border-[#DEDCD1]/10">
                  <svg viewBox="0 0 300 300" className="w-64 h-64 sm:w-72 sm:h-72">
                    {[1, 2, 3, 4, 5].map((level) => {
                      const levelPoints = Array.from({ length: totalAxes }).map((_, i) => {
                        const { x, y } = getCoordinates(i, level);
                        return `${x},${y}`;
                      }).join(' ');
                      return (
                        <polygon
                          key={level}
                          points={levelPoints}
                          fill="none"
                          stroke="#DEDCD1"
                          strokeOpacity={level === 5 ? 0.4 : 0.15}
                        />
                      );
                    })}

                    {ratings.map((_, i) => {
                      const { x, y } = getCoordinates(i, 5);
                      return (
                        <line
                          key={i}
                          x1={center}
                          y1={center}
                          x2={x}
                          y2={y}
                          stroke="#DEDCD1"
                          strokeOpacity="0.25"
                        />
                      );
                    })}

                    <polygon
                      points={polygonPoints}
                      fill="#C09553"
                      fillOpacity="0.3"
                      stroke="#C09553"
                      strokeWidth="2.5"
                    />

                    {ratings.map((r, i) => {
                      const { x, y } = getCoordinates(i, r.score);
                      return <circle key={i} cx={x} cy={y} r="4.5" fill="#B3A47B" />;
                    })}

                    {ratings.map((r, i) => {
                      const { x, y } = getCoordinates(i, 5.7);
                      return (
                        <text
                          key={i}
                          x={x}
                          y={y + 3}
                          textAnchor="middle"
                          className="fill-[#DEDCD1] text-[9px] font-mono font-bold uppercase"
                        >
                          {r.name} ({r.score})
                        </text>
                      );
                    })}
                  </svg>
                  <div className="flex justify-between w-full text-[10px] font-mono text-[#8C9180] pt-2 px-6">
                    <span>INTANGIBLE</span>
                    <span>TANGIBLE</span>
                  </div>
                </div>

                <div className="text-[10px] font-mono text-[#8C9180] text-right">
                  Copyright © Advantage Performance Group · SMTB CM4R Module 3
                </div>
              </div>

              {/* Page 2 Facsimile */}
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#DEDCD1]/15 pb-4">
                  <h4 className="font-oswald text-lg text-[#B3A47B] uppercase tracking-wide">
                    PART 2: CONNECT FEATURES AND BENEFITS TO MOTIVATORS AND VALUES
                  </h4>
                  <span className="text-[10px] font-mono text-[#8C9180]">PAGE 2 OF 2</span>
                </div>

                <p className="text-xs text-[#8C9180] italic leading-relaxed">
                  Instructions: Place each of the top three motivators in the table. For each motivator, fill out the rest of the table. Brainstorm 1-3 Guard features from ARNG-HRZ Policy #27-01 that would help meet the need, and determine the benefits to the individual.
                </p>

                <div className="border border-[#DEDCD1]/20">
                  <div className="grid grid-cols-4 bg-[#C09553] text-[#12150F] text-[11px] font-barlow font-bold uppercase p-2.5 gap-2 border-b border-[#DEDCD1]/20">
                    <div>MOTIVATOR<br /><span className="font-normal text-[9px] lowercase">What do they want?</span></div>
                    <div>VALUES<br /><span className="font-normal text-[9px] lowercase">Why do they want it?</span></div>
                    <div>FEATURES<br /><span className="font-normal text-[9px] lowercase">What Guard features meet this?</span></div>
                    <div>BENEFIT (SO WHAT?)<br /><span className="font-normal text-[9px] lowercase">How does it benefit them?</span></div>
                  </div>

                  {worksheetRows.map((row, idx) => (
                    <div key={idx} className="grid grid-cols-4 p-3 gap-2 border-b border-[#DEDCD1]/10 text-xs font-serif text-[#DEDCD1] bg-[#12150F]">
                      <div className="font-bold text-[#C09553]">
                        {idx + 1}. {row.motivator}
                      </div>
                      <div className="text-[#DEDCD1]/90">
                        {row.values}
                      </div>
                      <div className="text-[#DEDCD1]/90">
                        {row.features}
                      </div>
                      <div className="text-[#DEDCD1]/90">
                        {row.benefit}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-[10px] font-mono text-[#8C9180] text-right pt-2">
                  ARNG Selected Reserve Incentive Program (SRIP) Policy #27-01 Aligned
                </div>
              </div>

            </div>
          )}
        </div>

        {/* Modal Bottom Action Footer */}
        <div className="bg-[#1B2016] border-t border-[#DEDCD1]/15 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <div className="text-[11px] font-barlow text-[#8C9180]">
            <span className="text-[#C09553] font-semibold">CM4R Methodology:</span> Connects Guard tangible & intangible features to prospect psychological motivators under ARNG-HRZ Policy #27-01.
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopySummary}
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider border border-[#B3A47B]/60 text-[#B3A47B] hover:bg-[#B3A47B]/10 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check size={14} className="text-[#C09553]" /> : <Copy size={14} />}
              <span>{copied ? "Copied" : "Copy Summary"}</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-[#B3A47B] hover:bg-[#C09553] text-[#12150F] transition-colors cursor-pointer"
            >
              Close Value Maximizer
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
