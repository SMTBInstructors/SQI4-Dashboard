import React, { useState, useId } from 'react';
import { X, Copy, Check, Printer, RotateCcw, Target, Sparkles, ChevronRight } from 'lucide-react';

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

const DEFAULT_MOTIVATORS: MotivatorRating[] = [
  { id: 'training', name: 'TRAINING', category: 'tangible', score: 3 },
  { id: 'education', name: 'EDUCATION', category: 'tangible', score: 4 },
  { id: 'adventure', name: 'ADVENTURE', category: 'tangible', score: 3 },
  { id: 'money', name: 'MONEY', category: 'tangible', score: 4 },
  { id: 'service_country', name: 'SERVICE to COUNTRY', category: 'intangible', score: 4 },
  { id: 'service_others', name: 'SERVICE to OTHERS', category: 'intangible', score: 3 },
  { id: 'other', name: 'OTHER (Career Stability)', category: 'intangible', score: 2 },
];

export const ValueMaximizerModal: React.FC<ValueMaximizerModalProps> = ({ isOpen, onClose, onNotify }) => {
  const [activeTab, setActiveTab] = useState<'INTERACTIVE' | 'WORKSHEET'>('INTERACTIVE');
  const [candidateName, setCandidateName] = useState('');
  const [communicationStyle, setCommunicationStyle] = useState('Influence / Relational');
  const [otherLabel, setOtherLabel] = useState('Career Stability');
  
  const [ratings, setRatings] = useState<MotivatorRating[]>(DEFAULT_MOTIVATORS);
  
  const [worksheetRows, setWorksheetRows] = useState<WorksheetRow[]>([
    {
      motivator: 'EDUCATION',
      values: 'Desires a bachelor’s degree without crippling student debt.',
      features: '100% State Tuition Assistance (STA) + Federal Tuition Assistance ($4,500/yr) + GI Bill SR Ch. 1606.',
      benefit: 'Graduates debt-free, saving $40,000+ while earning a college degree and gaining military leadership experience.'
    },
    {
      motivator: 'MONEY & INCENTIVES',
      values: 'Immediate financial security and extra monthly cashflow.',
      features: '$20,000 Critical Skill Enlistment Bonus + Drill Pay (~$250/weekend) + Low-cost Tricare Reserve Select ($53/mo).',
      benefit: 'Provides immediate financial boost and guaranteed part-time income with premier healthcare while keeping civilian job.'
    },
    {
      motivator: 'SERVICE TO COUNTRY',
      values: 'Strong civic duty, family military tradition, and pride in community.',
      features: 'Dual State/Federal Mission: Response to state domestic emergencies & national defense deployment.',
      benefit: 'Serves neighbors in hometown crises while defending the nation, fulfilling lifelong aspiration to wear the uniform.'
    }
  ]);

  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

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

  const handleAutoPopulateTop3 = () => {
    const sorted = [...ratings].sort((a, b) => b.score - a.score);
    const top3 = sorted.slice(0, 3);
    setWorksheetRows((prev) => [
      {
        motivator: top3[0]?.name || 'TRAINING',
        values: prev[0]?.values || 'High personal interest and dedication.',
        features: prev[0]?.features || 'State & Federal ARNG programs.',
        benefit: prev[0]?.benefit || 'Direct tangible value to Soldier.'
      },
      {
        motivator: top3[1]?.name || 'EDUCATION',
        values: prev[1]?.values || 'Long term career and life goals.',
        features: prev[1]?.features || 'State TA / Chapter 1606 GI Bill.',
        benefit: prev[1]?.benefit || 'Accredited advancement with zero debt.'
      },
      {
        motivator: top3[2]?.name || 'ADVENTURE',
        values: prev[2]?.values || 'Challenge, teamwork, and personal pride.',
        features: prev[2]?.features || 'Specialized MOS training & physical excellence.',
        benefit: prev[2]?.benefit || 'Lifelong memories and peer brotherhood.'
      }
    ]);
    if (onNotify) onNotify("Top 3 Motivators auto-populated into Worksheet");
  };

  const handleReset = () => {
    setRatings(DEFAULT_MOTIVATORS);
    setCandidateName('');
    setOtherLabel('Career Stability');
    if (onNotify) onNotify("Value Maximizer reset to default values");
  };

  const handleCopySummary = () => {
    const text = `VALUE MAXIMIZER TOOL (CM4R MODULE 3)
Candidate Name: ${candidateName || 'N/A'}
Preferred Communication Style: ${communicationStyle || 'N/A'}

PART 1: MOTIVATOR RATINGS (Scale 1 to 5):
${ratings.map((r) => `- ${r.name} (${r.category.toUpperCase()}): ${r.score}/5`).join('\n')}

PART 2: FEATURES & BENEFITS ALIGNMENT:
${worksheetRows.map((r, i) => `
[${i + 1}] MOTIVATOR: ${r.motivator}
    Values (Why they want it): ${r.values}
    Guard Features (Incentives): ${r.features}
    Benefit (So What?): ${r.benefit}
`).join('')}

Copyright © 2024 Advantage Performance Group · SMTB CM4R`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    if (onNotify) onNotify("Worksheet summary copied to clipboard");
    setTimeout(() => setCopied(false), 2200);
  };

  // ── RADAR GRAPH GEOMETRY ──
  // 7 axes arranged uniformly around 360 degrees
  const totalAxes = ratings.length;
  const radius = 120;
  const center = 150;

  // Calculate coordinates for an axis at given index and score (1 to 5)
  const getCoordinates = (index: number, score: number) => {
    // start at top (-90 degrees)
    const angle = (Math.PI * 2 / totalAxes) * index - Math.PI / 2;
    const r = (score / 5) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  // Build polygon points for current scores
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
              <span className="font-barlow text-[11px] text-[#C09553] uppercase tracking-wider font-semibold">
                SMTB · Authentic Communication Doctrine
              </span>
            </div>
            <h2 className="font-oswald text-2xl sm:text-3xl font-light text-[#DEDCD1] uppercase tracking-wide">
              Value Maximizer Tool
            </h2>
            <p className="text-xs font-barlow text-[#8C9180]">
              Copyright © 2024 Advantage Performance Group · Permission to reproduce granted solely to the Army National Guard
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

        {/* Prospect Details Bar */}
        <div className="bg-[#1B2016]/60 border-b border-[#DEDCD1]/10 px-6 py-3 shrink-0 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-barlow">
          <div>
            <label className="text-[10px] uppercase font-bold text-[#8C9180] tracking-wider block mb-1">
              Prospect / Soldier Name:
            </label>
            <input
              type="text"
              placeholder="e.g., Luke Tyler (Applicant)"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              className="w-full bg-[#12150F] border border-[#DEDCD1]/20 px-3 py-1.5 text-xs text-[#DEDCD1] placeholder-[#8C9180]/60 focus:outline-none focus:border-[#B3A47B]"
            />
          </div>
          <div>
            <label className="text-[10px] uppercase font-bold text-[#8C9180] tracking-wider block mb-1">
              Preferred Communication Style:
            </label>
            <select
              value={communicationStyle}
              onChange={(e) => setCommunicationStyle(e.target.value)}
              className="w-full bg-[#12150F] border border-[#DEDCD1]/20 px-3 py-1.5 text-xs text-[#DEDCD1] focus:outline-none focus:border-[#B3A47B] cursor-pointer"
            >
              <option value="Dominance / Results-Oriented">Dominance (Direct, Results-Oriented, Fast-Paced)</option>
              <option value="Influence / Relational">Influence (Social, Enthusiastic, Relational)</option>
              <option value="Steadiness / Security">Steadiness (Patient, Reliable, Service-Oriented)</option>
              <option value="Conscientiousness / Detail">Conscientiousness (Analytical, Methodical, Fact-Based)</option>
            </select>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 pt-3 pb-2 bg-[#12150F] border-b border-[#DEDCD1]/10 flex items-center justify-between gap-3 shrink-0">
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
              onClick={() => setActiveTab('WORKSHEET')}
              className={`px-3 py-1 text-xs font-barlow uppercase tracking-wider font-semibold border transition-colors cursor-pointer ${
                activeTab === 'WORKSHEET'
                  ? 'bg-[#C09553] text-[#12150F] border-[#C09553]'
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
            <span>Reset</span>
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
                    Plot the importance of each motivator from 1 (not very important) to 5 (very important). The radar polygon visualizes this person’s greatest motivators.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  {/* SVG Spider / Radar Chart (5 cols) */}
                  <div className="lg:col-span-6 flex flex-col items-center justify-center p-3 bg-[#12150F] border border-[#DEDCD1]/10">
                    
                    {/* Tangible vs Intangible Indicator Labels */}
                    <div className="w-full flex items-center justify-between text-[11px] font-barlow font-bold px-4 py-1 uppercase tracking-widest text-[#8C9180] border-b border-[#DEDCD1]/10 mb-2">
                      <span className="text-[#8C9180]">← Intangible</span>
                      <span className="text-[#B3A47B]">Tangible →</span>
                    </div>

                    <svg viewBox="0 0 300 300" className="w-64 h-64 sm:w-72 sm:h-72">
                      {/* Background Concentric Rings (1 to 5) */}
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

                      {/* Value Polygon Fill */}
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

                      {/* Center Hub */}
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
                          placeholder="e.g. Family Military Tradition, Medical Benefits"
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
                      Place the top three motivators in the table. Brainstorm 1–3 Guard features and determine the benefits ("So What?").
                    </p>
                  </div>

                  <button
                    onClick={handleAutoPopulateTop3}
                    className="px-3 py-1.5 bg-[#B3A47B] hover:bg-[#C09553] text-[#12150F] font-barlow font-bold text-xs uppercase tracking-wider inline-flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer"
                  >
                    <Sparkles size={13} />
                    <span>Auto-Populate Top 3</span>
                  </button>
                </div>

                {/* 3-Row Worksheet Cards */}
                <div className="space-y-4">
                  {worksheetRows.map((row, index) => (
                    <div key={index} className="bg-[#12150F] border border-[#DEDCD1]/15 p-4 space-y-3">
                      <div className="flex items-center gap-2 pb-2 border-b border-[#DEDCD1]/10">
                        <span className="w-6 h-6 bg-[#C09553] text-[#12150F] font-oswald font-bold text-sm flex items-center justify-center shrink-0">
                          {index + 1}
                        </span>
                        <span className="font-oswald text-base text-[#DEDCD1] uppercase tracking-wider">
                          Priority Motivator #{index + 1}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-barlow">
                        
                        {/* Col 1: Motivator */}
                        <div className="space-y-1">
                          <label className="text-[10px] font-oswald uppercase text-[#B3A47B] block font-semibold">
                            Motivator (What do they want?)
                          </label>
                          <input
                            type="text"
                            value={row.motivator}
                            onChange={(e) => handleRowChange(index, 'motivator', e.target.value)}
                            placeholder="e.g. EDUCATION"
                            className="w-full bg-[#1B2016] border border-[#DEDCD1]/20 p-2 text-xs text-[#DEDCD1] focus:outline-none focus:border-[#B3A47B]"
                          />
                        </div>

                        {/* Col 2: Values */}
                        <div className="space-y-1">
                          <label className="text-[10px] font-oswald uppercase text-[#C09553] block font-semibold">
                            Values (Why do they want it?)
                          </label>
                          <textarea
                            rows={3}
                            value={row.values}
                            onChange={(e) => handleRowChange(index, 'values', e.target.value)}
                            placeholder="Why is this important to them?"
                            className="w-full bg-[#1B2016] border border-[#DEDCD1]/20 p-2 text-xs text-[#DEDCD1] focus:outline-none focus:border-[#B3A47B] resize-none"
                          />
                        </div>

                        {/* Col 3: Features */}
                        <div className="space-y-1">
                          <label className="text-[10px] font-oswald uppercase text-[#B3A47B] block font-semibold">
                            Features (What Guard features meet this?)
                          </label>
                          <textarea
                            rows={3}
                            value={row.features}
                            onChange={(e) => handleRowChange(index, 'features', e.target.value)}
                            placeholder="e.g. 100% State Tuition Assistance + FTA"
                            className="w-full bg-[#1B2016] border border-[#DEDCD1]/20 p-2 text-xs text-[#DEDCD1] focus:outline-none focus:border-[#B3A47B] resize-none"
                          />
                        </div>

                        {/* Col 4: Benefit (SO WHAT?) */}
                        <div className="space-y-1">
                          <label className="text-[10px] font-oswald uppercase text-[#C09553] block font-semibold">
                            Benefit (So What? Personal Impact)
                          </label>
                          <textarea
                            rows={3}
                            value={row.benefit}
                            onChange={(e) => handleRowChange(index, 'benefit', e.target.value)}
                            placeholder="How does this transform their life?"
                            className="w-full bg-[#1B2016] border border-[#DEDCD1]/20 p-2 text-xs text-[#DEDCD1] focus:outline-none focus:border-[#B3A47B] resize-none"
                          />
                        </div>

                      </div>
                    </div>
                  ))}
                </div>

              </div>

            </div>
          ) : (
            /* OFFICIAL SMTB DOCUMENT FACSIMILE (2-PAGE WORKSHEET VIEW) */
            <div className="bg-[#1B2016] border border-[#DEDCD1]/20 p-6 sm:p-10 space-y-10 max-w-3xl mx-auto shadow-inner">
              
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

                <div className="grid grid-cols-2 gap-4 text-xs font-serif border-b border-[#DEDCD1]/15 pb-4">
                  <div>
                    <span className="text-[#8C9180]">Name: </span>
                    <span className="text-[#DEDCD1] font-bold border-b border-dotted border-[#DEDCD1]/40 pb-0.5 inline-block min-w-[140px]">
                      {candidateName || '___________________________'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#8C9180]">Preferred Communication Style: </span>
                    <span className="text-[#DEDCD1] font-bold border-b border-dotted border-[#DEDCD1]/40 pb-0.5 inline-block min-w-[140px]">
                      {communicationStyle || '___________________________'}
                    </span>
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
                          strokeWidth="1"
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
                          strokeWidth="1"
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
                  Copyright © 2024 Advantage Performance Group | All Rights Reserved
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
                  Instructions: Place each of the top three motivators in the table. For each motivator, fill out the rest of the table. Brainstorm 1-3 Guard features that would help meet the need, and determine the benefits to the individual.
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
                  Copyright © 2024 Advantage Performance Group | Permission granted to ARNG
                </div>
              </div>

            </div>
          )}
        </div>

        {/* Modal Bottom Action Footer */}
        <div className="bg-[#1B2016] border-t border-[#DEDCD1]/15 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <div className="text-[11px] font-barlow text-[#8C9180]">
            <span className="text-[#C09553] font-semibold">CM4R Methodology:</span> Connects Guard tangible & intangible features to prospect psychological motivators.
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
