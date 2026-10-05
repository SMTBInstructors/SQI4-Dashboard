import React, { useState } from 'react';
import { X, Copy, Check, Calendar, Clock, Target, AlertTriangle, FileText, Download, RotateCcw, ExternalLink, Phone, Users, BarChart3 } from 'lucide-react';

interface RzMissionPlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNotify?: (msg: string) => void;
}

interface DailyRhythmItem {
  dayNumber: number;
  dayLabel: string;
  isWorkday: boolean; // Mon-Fri = true, Sat-Sun = false
  dutyHours: string; // "0800–1700" or "Non-Duty / Recovery"
  morningFocus: string;
  middayFocus: string;
  afternoonFocus: string;
  phoneHours: number; // Hours dedicated to phone calls (x 25/hr)
  f2fHours: number; // Hours dedicated to face-to-face (x 5/hr)
  projectedAppts: number;
}

// SMTB Mandated Production Metrics:
// 25 phone call attempts per hour
// 5 face-to-face attempts per hour
export const PHONE_CALLS_PER_HOUR = 25;
export const F2F_ATTEMPTS_PER_HOUR = 5;

const DEFAULT_7_DAYS: DailyRhythmItem[] = [
  {
    dayNumber: 1,
    dayLabel: "Monday",
    isWorkday: true,
    dutyHours: "0800–1700",
    morningFocus: "Lead input (ARISS/RZ), MEPS line-up, Section cadence with 1SG",
    middayFocus: "High School A Visit: Lunch-table display, Principal & Coach touchpoints",
    afternoonFocus: "Telephone Prospecting Block (Seniors list) & Scheduled Applicant Interview",
    phoneHours: 2.0, // 2.0h x 25 = 50 phone call attempts
    f2fHours: 2.0,   // 2.0h x 5 = 10 face-to-face attempts
    projectedAppts: 2
  },
  {
    dayNumber: 2,
    dayLabel: "Tuesday",
    isWorkday: true,
    dutyHours: "0800–1700",
    morningFocus: "Packet audits, Medical prescreen waivers, Police background checks",
    middayFocus: "Area Canvassing: Vocational Trade School & Community College touchpoint",
    afternoonFocus: "Telephone Prospecting Block (Junior College leads) & Parent Interview",
    phoneHours: 2.0, // 50 calls
    f2fHours: 2.0,   // 10 F2F
    projectedAppts: 2
  },
  {
    dayNumber: 3,
    dayLabel: "Wednesday",
    isWorkday: true,
    dutyHours: "0800–1700",
    morningFocus: "Applicant packet submission to MEPS, ASVAB/PiCAT confirmation",
    middayFocus: "High School B Visit: Classroom presentation & Guidance Counselor meeting",
    afternoonFocus: "Telephone Prospecting Block (Grad list) & In-office Sales Interview",
    phoneHours: 2.0, // 50 calls
    f2fHours: 2.0,   // 10 F2F
    projectedAppts: 2
  },
  {
    dayNumber: 4,
    dayLabel: "Thursday",
    isWorkday: true,
    dutyHours: "0800–1700",
    morningFocus: "MEPS Processing Day: Physical exam monitoring & swear-in coordination",
    middayFocus: "Area Canvassing: Community sports center, fitness gym, & local COI visit",
    afternoonFocus: "Telephone Prospecting Block (Prior service list) & Applicant Interview",
    phoneHours: 2.0, // 50 calls
    f2fHours: 2.0,   // 10 F2F
    projectedAppts: 2
  },
  {
    dayNumber: 5,
    dayLabel: "Friday",
    isWorkday: true,
    dutyHours: "0800–1700",
    morningFocus: "Post-MEPS accession packet audits, Weekend muster confirmations",
    middayFocus: "High School A/B: Athletic department event coordination & display prep",
    afternoonFocus: "Weekly production reconciliation, 1SG Sync, & Monday appointment confirmations",
    phoneHours: 1.5, // 1.5h x 25 = 38 calls (rounded)
    f2fHours: 1.5,   // 1.5h x 5 = 8 F2F (rounded)
    projectedAppts: 1
  },
  {
    dayNumber: 6,
    dayLabel: "Saturday",
    isWorkday: false,
    dutyHours: "Non-Duty / RSP Support",
    morningFocus: "RSP Drill coordination (as scheduled) or Off-Duty Personal Recovery",
    middayFocus: "Optional community event / promotional booth presence",
    afternoonFocus: "Non-duty personal time",
    phoneHours: 0,
    f2fHours: 0,
    projectedAppts: 0
  },
  {
    dayNumber: 7,
    dayLabel: "Sunday",
    isWorkday: false,
    dutyHours: "Non-Duty Recovery",
    morningFocus: "Personal recovery & spiritual fitness",
    middayFocus: "Family time & administrative readiness",
    afternoonFocus: "Confirm Monday morning MEPS applicant transportation and 0800 arrival",
    phoneHours: 0,
    f2fHours: 0,
    projectedAppts: 0
  }
];

export const RzMissionPlannerModal: React.FC<RzMissionPlannerModalProps> = ({
  isOpen,
  onClose,
  onNotify
}) => {
  const [activeTab, setActiveTab] = useState<'EXACT_PDF' | 'PLANNER' | 'BATTLE_RHYTHM' | 'METRICS'>('PLANNER');

  // Header Details
  const [assignedSchools, setAssignedSchools] = useState('Robinson HS, Maumelle HS, Pulaski Tech');
  const [monthlyMission, setMonthlyMission] = useState('2 NPS · 1 PS (3 Total Contracts)');
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  // 7-Day Schedule
  const [schedule, setSchedule] = useState<DailyRhythmItem[]>(DEFAULT_7_DAYS);

  // Conversion rates (Industry standard SMTB benchmarks)
  const [phoneContactRate, setPhoneContactRate] = useState(0.28); // 28% of phone dials result in contact
  const [f2fContactRate, setF2fContactRate] = useState(0.70);    // 70% of F2F attempts result in direct interaction
  const [contactToApptRate, setContactToApptRate] = useState(0.25); // 25% of contacts schedule an appointment
  const [apptToContractRate, setApptToContractRate] = useState(0.20); // 20% of conducted interviews enlist

  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentDay = schedule[selectedDayIndex] || schedule[0];

  const handleDayChange = (field: keyof DailyRhythmItem, val: any) => {
    setSchedule((prev) => {
      const copy = [...prev];
      copy[selectedDayIndex] = { ...copy[selectedDayIndex], [field]: val };
      return copy;
    });
  };

  const handleReset = () => {
    setSchedule(DEFAULT_7_DAYS);
    if (onNotify) onNotify("RZ Mission Planner reset to standard Monday–Friday 0800–1700 battle rhythm");
  };

  // ── SMTB FORMULA CALCULATIONS ──
  // 25 Phone Call attempts per hour
  // 5 Face-to-Face attempts per hour
  const totalPhoneHours = schedule.reduce((sum, d) => sum + (Number(d.phoneHours) || 0), 0);
  const totalF2fHours = schedule.reduce((sum, d) => sum + (Number(d.f2fHours) || 0), 0);

  const totalPhoneCalls = Math.round(totalPhoneHours * PHONE_CALLS_PER_HOUR);
  const totalF2fAttempts = Math.round(totalF2fHours * F2F_ATTEMPTS_PER_HOUR);
  const totalProspectingAttempts = totalPhoneCalls + totalF2fAttempts;

  const totalPhoneContacts = Math.round(totalPhoneCalls * phoneContactRate);
  const totalF2fContacts = Math.round(totalF2fAttempts * f2fContactRate);
  const totalContacts = totalPhoneContacts + totalF2fContacts;

  const expectedApptsFromCalls = Math.round(totalPhoneContacts * contactToApptRate);
  const expectedApptsFromF2f = Math.round(totalF2fContacts * 0.35); // higher conversion from in-person
  const totalProjectedAppts = expectedApptsFromCalls + expectedApptsFromF2f;

  const projectedContracts = Math.max(1, Math.round(totalProjectedAppts * apptToContractRate));

  const handleCopySummary = () => {
    const text = `ARMY NATIONAL GUARD · RECRUITING ZONE (RZ) MISSION PLANNER & BATTLE RHYTHM
Duty Hours: Monday – Friday, 0800–1700 (Saturday/Sunday Non-Duty Recovery)
Pacing Standards: 25 Phone Calls/Hour · 5 Face-to-Face Attempts/Hour

Assigned Schools: ${assignedSchools}
Monthly Mission: ${monthlyMission}

WEEKLY PRODUCTION METRICS:
- Phone Prospecting: ${totalPhoneHours} Hours → ${totalPhoneCalls} Phone Call Attempts (at 25/hr)
- Face-to-Face Canvassing: ${totalF2fHours} Hours → ${totalF2fAttempts} F2F Attempts (at 5/hr)
- Total Prospecting Attempts: ${totalProspectingAttempts}
- Estimated Contacts: ${totalContacts} (${totalPhoneContacts} Phone / ${totalF2fContacts} F2F)
- Projected Conducted Interviews: ${totalProjectedAppts}
- Forecasted Enlistments: ${projectedContracts} Contracts

WEEKLY SCHEDULE (MONDAY – FRIDAY 0800–1700):
${schedule.filter(d => d.isWorkday).map((d) => `
[${d.dayLabel}] 0800–1700:
  - Morning (0800–1130): ${d.morningFocus}
  - Midday (1130–1430): ${d.middayFocus} [${d.f2fHours}h F2F = ${Math.round(d.f2fHours * F2F_ATTEMPTS_PER_HOUR)} Attempts]
  - Afternoon (1430–1700): ${d.afternoonFocus} [${d.phoneHours}h Phone = ${Math.round(d.phoneHours * PHONE_CALLS_PER_HOUR)} Calls]
`).join('')}

Publication: Strength Maintenance Training Battalion (SMTB) · Camp Joseph T. Robinson`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    if (onNotify) onNotify("Weekly RZ Battle Rhythm summary copied to clipboard");
    setTimeout(() => setCopied(false), 2200);
  };

  const pdfUrl = "/documents/RZ_MISSION_PLANNER_AND_BATTLE_RHYTHM.pdf";

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-[#12150F] border border-[#B3A47B] max-w-5xl w-full my-auto shadow-2xl relative flex flex-col max-h-[94vh] overflow-hidden">
        
        {/* Header Bar */}
        <div className="bg-[#1B2016] border-b border-[#DEDCD1]/15 px-6 py-4 flex items-start justify-between gap-4 shrink-0">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-[#C09553] text-[#12150F] font-barlow font-bold text-[10px] tracking-[0.2em] uppercase px-2 py-0.5">
                Mon–Fri 0800–1700
              </span>
              <span className="bg-[#12150F] border border-[#B3A47B]/40 text-[#B3A47B] font-barlow font-bold text-[10px] tracking-wider uppercase px-2 py-0.5">
                25 Calls/Hr · 5 F2F/Hr
              </span>
              <span className="font-barlow text-[11px] text-[#8C9180] uppercase tracking-wider font-semibold">
                Army National Guard · SMTB
              </span>
            </div>
            <h2 className="font-oswald text-2xl sm:text-3xl font-light text-[#DEDCD1] uppercase tracking-wide">
              Mission Planner & Battle Rhythm
            </h2>
            <p className="text-xs font-barlow text-[#8C9180]">
              Standard Work Schedule: Monday through Friday, 0800–1700 · Camp Joseph T. Robinson, Building 3400
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={pdfUrl}
              download="RZ_MISSION_PLANNER_AND_BATTLE_RHYTHM.pdf"
              className="p-2 border border-[#C09553] bg-[#C09553]/10 hover:bg-[#C09553]/20 text-[#C09553] text-xs font-barlow uppercase flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Download Attached PDF"
            >
              <Download size={14} />
              <span className="hidden sm:inline">Download PDF</span>
            </a>

            <button
              onClick={handleCopySummary}
              className="p-2 border border-[#B3A47B]/50 hover:bg-[#B3A47B]/10 text-[#B3A47B] text-xs font-barlow uppercase flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Copy Summary"
            >
              {copied ? <Check size={14} className="text-[#C09553]" /> : <Copy size={14} />}
              <span className="hidden sm:inline">{copied ? "Copied" : "Copy Schedule"}</span>
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

        {/* Operational Zone Header Details (Removed RRNCO Name/Rank & Recruiting Zone/Station) */}
        <div className="bg-[#1B2016]/60 border-b border-[#DEDCD1]/10 px-6 py-3 shrink-0 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-barlow">
          <div>
            <label className="text-[10px] uppercase font-bold text-[#8C9180] tracking-wider block mb-0.5">
              Duty Schedule & Hours:
            </label>
            <div className="w-full bg-[#12150F] border border-[#B3A47B]/40 px-2.5 py-1 text-xs text-[#C09553] font-semibold">
              Mon–Fri: 0800–1700 (40h/wk)
            </div>
          </div>
          <div>
            <label className="text-[10px] uppercase font-bold text-[#8C9180] tracking-wider block mb-0.5">
              Assigned High Schools & Colleges:
            </label>
            <input
              type="text"
              value={assignedSchools}
              onChange={(e) => setAssignedSchools(e.target.value)}
              className="w-full bg-[#12150F] border border-[#DEDCD1]/20 px-2.5 py-1 text-xs text-[#DEDCD1] focus:outline-none focus:border-[#B3A47B]"
            />
          </div>
          <div>
            <label className="text-[10px] uppercase font-bold text-[#8C9180] tracking-wider block mb-0.5">
              Monthly Mission Quota:
            </label>
            <input
              type="text"
              value={monthlyMission}
              onChange={(e) => setMonthlyMission(e.target.value)}
              className="w-full bg-[#12150F] border border-[#DEDCD1]/20 px-2.5 py-1 text-xs text-[#C09553] font-semibold focus:outline-none focus:border-[#B3A47B]"
            />
          </div>
        </div>

        {/* View Mode Navigation Tabs */}
        <div className="px-6 pt-3 pb-2 bg-[#12150F] border-b border-[#DEDCD1]/10 flex items-center justify-between gap-3 shrink-0 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setActiveTab('PLANNER')}
              className={`px-3 py-1 text-xs font-barlow uppercase tracking-wider font-semibold border transition-colors cursor-pointer ${
                activeTab === 'PLANNER'
                  ? 'bg-[#B3A47B] text-[#12150F] border-[#B3A47B]'
                  : 'text-[#8C9180] border-[#DEDCD1]/15 hover:text-[#DEDCD1]'
              }`}
            >
              Weekly Schedule (Mon–Fri 0800–1700)
            </button>
            <button
              onClick={() => setActiveTab('BATTLE_RHYTHM')}
              className={`px-3 py-1 text-xs font-barlow uppercase tracking-wider font-semibold border transition-colors cursor-pointer ${
                activeTab === 'BATTLE_RHYTHM'
                  ? 'bg-[#B3A47B] text-[#12150F] border-[#B3A47B]'
                  : 'text-[#8C9180] border-[#DEDCD1]/15 hover:text-[#DEDCD1]'
              }`}
            >
              0800–1700 Time-Block Doctrine
            </button>
            <button
              onClick={() => setActiveTab('METRICS')}
              className={`px-3 py-1 text-xs font-barlow uppercase tracking-wider font-semibold border transition-colors cursor-pointer ${
                activeTab === 'METRICS'
                  ? 'bg-[#B3A47B] text-[#12150F] border-[#B3A47B]'
                  : 'text-[#8C9180] border-[#DEDCD1]/15 hover:text-[#DEDCD1]'
              }`}
            >
              Hourly Rate Calculator (25 Calls / 5 F2F)
            </button>
            <button
              onClick={() => setActiveTab('EXACT_PDF')}
              className={`px-3 py-1 text-xs font-barlow uppercase tracking-wider font-semibold border transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'EXACT_PDF'
                  ? 'bg-[#C09553] text-[#12150F] border-[#C09553]'
                  : 'text-[#8C9180] border-[#DEDCD1]/15 hover:text-[#DEDCD1]'
              }`}
            >
              <FileText size={13} />
              <span>Exact Attached PDF Form</span>
            </button>
          </div>

          <button
            onClick={handleReset}
            className="text-xs font-barlow text-[#8C9180] hover:text-[#DEDCD1] inline-flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw size={12} />
            <span>Reset Defaults</span>
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6 flex-1">
          
          {/* TAB 1: WEEKLY SCHEDULE (MON-FRI 0800-1700) */}
          {activeTab === 'PLANNER' && (
            <div className="space-y-6">
              
              {/* Day Selector Ribbon */}
              <div className="grid grid-cols-2 sm:grid-cols-7 gap-1.5 pb-2 border-b border-[#DEDCD1]/10">
                {schedule.map((item, idx) => (
                  <button
                    key={item.dayNumber}
                    onClick={() => setSelectedDayIndex(idx)}
                    className={`p-2.5 text-xs font-barlow uppercase border text-center transition-colors cursor-pointer ${
                      selectedDayIndex === idx
                        ? 'bg-[#C09553] text-[#12150F] border-[#C09553] font-bold shadow-md'
                        : item.isWorkday
                        ? 'bg-[#1B2016] text-[#DEDCD1] border-[#DEDCD1]/20 hover:border-[#B3A47B]'
                        : 'bg-[#12150F] text-[#8C9180] border-[#DEDCD1]/10 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <span className="block text-[10px] opacity-80">{item.isWorkday ? 'Duty Day' : 'Non-Duty'}</span>
                    <span className="font-semibold block">{item.dayLabel}</span>
                    <span className="text-[9px] block text-[#C09553]">{item.dutyHours}</span>
                  </button>
                ))}
              </div>

              {/* Day Editor Card */}
              <div className="bg-[#1B2016] border border-[#B3A47B]/60 p-5 space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#DEDCD1]/10">
                  <div className="flex items-center gap-3">
                    <span className={`w-9 h-9 font-oswald font-bold text-lg flex items-center justify-center ${
                      currentDay.isWorkday ? 'bg-[#C09553] text-[#12150F]' : 'bg-[#12150F] text-[#8C9180] border border-[#DEDCD1]/20'
                    }`}>
                      {currentDay.dayNumber}
                    </span>
                    <div>
                      <h3 className="font-oswald text-xl text-[#DEDCD1] uppercase flex items-center gap-2">
                        <span>{currentDay.dayLabel}</span>
                        <span className="text-xs font-barlow font-bold px-2 py-0.5 bg-[#12150F] text-[#C09553] border border-[#C09553]/30">
                          {currentDay.dutyHours}
                        </span>
                      </h3>
                      <span className="text-[11px] font-barlow text-[#8C9180]">
                        {currentDay.isWorkday ? 'Standard 0800–1700 Operational Day' : 'Weekend Recovery / Non-Duty'}
                      </span>
                    </div>
                  </div>

                  {currentDay.isWorkday && (
                    <div className="flex items-center gap-2 flex-wrap text-xs font-barlow">
                      <div className="bg-[#12150F] px-2.5 py-1 border border-[#DEDCD1]/15 flex items-center gap-1.5">
                        <Phone size={12} className="text-[#C09553]" />
                        <span className="text-[#8C9180]">Calls (25/hr):</span>
                        <strong className="text-[#C09553] font-mono">
                          {Math.round(currentDay.phoneHours * PHONE_CALLS_PER_HOUR)}
                        </strong>
                      </div>
                      <div className="bg-[#12150F] px-2.5 py-1 border border-[#DEDCD1]/15 flex items-center gap-1.5">
                        <Users size={12} className="text-[#B3A47B]" />
                        <span className="text-[#8C9180]">F2F (5/hr):</span>
                        <strong className="text-[#B3A47B] font-mono">
                          {Math.round(currentDay.f2fHours * F2F_ATTEMPTS_PER_HOUR)}
                        </strong>
                      </div>
                      <div className="bg-[#12150F] px-2.5 py-1 border border-[#DEDCD1]/15">
                        <span className="text-[#8C9180] mr-1">Interviews:</span>
                        <strong className="text-[#DEDCD1] font-mono">{currentDay.projectedAppts}</strong>
                      </div>
                    </div>
                  )}
                </div>

                {/* 3 Blocks of the 0800-1700 Day */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  
                  {/* Block 1: Morning (0800–1130) */}
                  <div className="bg-[#12150F] border border-[#DEDCD1]/15 p-4 space-y-2">
                    <div className="flex items-center justify-between text-xs pb-1 border-b border-[#DEDCD1]/10">
                      <span className="font-oswald text-[#B3A47B] uppercase tracking-wider font-semibold">
                        Morning (0800–1130)
                      </span>
                      <Clock size={12} className="text-[#8C9180]" />
                    </div>
                    <label className="text-[10px] text-[#8C9180] uppercase block">
                      Admin, MEPS Line-up, Lead Input & 1SG Cadence
                    </label>
                    <textarea
                      rows={3}
                      value={currentDay.morningFocus}
                      onChange={(e) => handleDayChange('morningFocus', e.target.value)}
                      className="w-full bg-[#1B2016] border border-[#DEDCD1]/20 p-2 text-xs text-[#DEDCD1] focus:outline-none focus:border-[#B3A47B] resize-none"
                    />
                  </div>

                  {/* Block 2: Midday (1130–1430) */}
                  <div className="bg-[#12150F] border border-[#DEDCD1]/15 p-4 space-y-2">
                    <div className="flex items-center justify-between text-xs pb-1 border-b border-[#DEDCD1]/10">
                      <span className="font-oswald text-[#C09553] uppercase tracking-wider font-semibold">
                        Midday (1130–1430)
                      </span>
                      <Target size={12} className="text-[#8C9180]" />
                    </div>
                    <label className="text-[10px] text-[#8C9180] uppercase block">
                      Face-to-Face: School Visits & Area Canvassing (5/hr)
                    </label>
                    <textarea
                      rows={3}
                      value={currentDay.middayFocus}
                      onChange={(e) => handleDayChange('middayFocus', e.target.value)}
                      className="w-full bg-[#1B2016] border border-[#DEDCD1]/20 p-2 text-xs text-[#DEDCD1] focus:outline-none focus:border-[#B3A47B] resize-none"
                    />
                  </div>

                  {/* Block 3: Afternoon (1430–1700) */}
                  <div className="bg-[#12150F] border border-[#DEDCD1]/15 p-4 space-y-2">
                    <div className="flex items-center justify-between text-xs pb-1 border-b border-[#DEDCD1]/10">
                      <span className="font-oswald text-[#B3A47B] uppercase tracking-wider font-semibold">
                        Afternoon (1430–1700)
                      </span>
                      <Calendar size={12} className="text-[#8C9180]" />
                    </div>
                    <label className="text-[10px] text-[#8C9180] uppercase block">
                      Phone Prospecting (25/hr) & Scheduled Interviews
                    </label>
                    <textarea
                      rows={3}
                      value={currentDay.afternoonFocus}
                      onChange={(e) => handleDayChange('afternoonFocus', e.target.value)}
                      className="w-full bg-[#1B2016] border border-[#DEDCD1]/20 p-2 text-xs text-[#DEDCD1] focus:outline-none focus:border-[#B3A47B] resize-none"
                    />
                  </div>

                </div>

                {/* Hourly Pacing Calculators for Current Day */}
                {currentDay.isWorkday && (
                  <div className="bg-[#12150F] p-4 border border-[#B3A47B]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="font-oswald text-xs uppercase tracking-wider text-[#C09553] font-semibold block">
                        Hourly Pacing Metrics for {currentDay.dayLabel}:
                      </span>
                      <p className="text-[11px] text-[#8C9180]">
                        Standard rates applied: <strong>25 Phone Call attempts/hour</strong> and <strong>5 Face-to-Face attempts/hour</strong>.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-barlow shrink-0">
                      
                      {/* Phone Hours Input */}
                      <div className="bg-[#1B2016] p-2 border border-[#DEDCD1]/15">
                        <label className="text-[10px] text-[#8C9180] uppercase block">Phone Hours:</label>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <input
                            type="number"
                            step="0.5"
                            min="0"
                            max="8"
                            value={currentDay.phoneHours}
                            onChange={(e) => handleDayChange('phoneHours', parseFloat(e.target.value) || 0)}
                            className="w-14 bg-[#12150F] border border-[#DEDCD1]/20 px-1.5 py-0.5 text-xs text-[#C09553] font-mono font-bold text-center"
                          />
                          <span className="text-[11px] text-[#DEDCD1]">
                            = <strong className="text-[#C09553]">{Math.round(currentDay.phoneHours * PHONE_CALLS_PER_HOUR)}</strong> calls
                          </span>
                        </div>
                      </div>

                      {/* F2F Hours Input */}
                      <div className="bg-[#1B2016] p-2 border border-[#DEDCD1]/15">
                        <label className="text-[10px] text-[#8C9180] uppercase block">F2F Canvass Hours:</label>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <input
                            type="number"
                            step="0.5"
                            min="0"
                            max="8"
                            value={currentDay.f2fHours}
                            onChange={(e) => handleDayChange('f2fHours', parseFloat(e.target.value) || 0)}
                            className="w-14 bg-[#12150F] border border-[#DEDCD1]/20 px-1.5 py-0.5 text-xs text-[#B3A47B] font-mono font-bold text-center"
                          />
                          <span className="text-[11px] text-[#DEDCD1]">
                            = <strong className="text-[#B3A47B]">{Math.round(currentDay.f2fHours * F2F_ATTEMPTS_PER_HOUR)}</strong> F2F
                          </span>
                        </div>
                      </div>

                      {/* Scheduled Interviews */}
                      <div className="bg-[#1B2016] p-2 border border-[#DEDCD1]/15 col-span-2 sm:col-span-1">
                        <label className="text-[10px] text-[#8C9180] uppercase block">Target Interviews:</label>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <input
                            type="number"
                            min="0"
                            max="10"
                            value={currentDay.projectedAppts}
                            onChange={(e) => handleDayChange('projectedAppts', parseInt(e.target.value) || 0)}
                            className="w-14 bg-[#12150F] border border-[#DEDCD1]/20 px-1.5 py-0.5 text-xs text-[#DEDCD1] font-mono font-bold text-center"
                          />
                          <span className="text-[11px] text-[#8C9180]">Appts</span>
                        </div>
                      </div>

                    </div>
                  </div>
                )}
              </div>

              {/* Weekly Production Summary Strip */}
              <div className="bg-[#1B2016] border border-[#DEDCD1]/20 p-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#DEDCD1]/10 pb-3">
                  <div>
                    <h4 className="font-oswald text-base text-[#DEDCD1] uppercase tracking-wide">
                      Weekly Production Pacing (Monday – Friday, 0800–1700 Total)
                    </h4>
                    <p className="text-xs font-barlow text-[#8C9180]">
                      Total hours scheduled: {totalPhoneHours}h Phone + {totalF2fHours}h F2F Canvassing = {totalPhoneHours + totalF2fHours} Active Prospecting Hours
                    </p>
                  </div>
                  <span className="text-xs font-oswald text-[#C09553] uppercase font-bold px-2.5 py-1 bg-[#12150F] border border-[#C09553]/30">
                    Forecast: ~{projectedContracts} Enlistment Contracts
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 text-center">
                  <div className="bg-[#12150F] p-2.5 border border-[#DEDCD1]/10">
                    <span className="text-[10px] font-barlow uppercase text-[#8C9180] block">Phone Call Attempts</span>
                    <strong className="font-oswald text-2xl text-[#C09553]">{totalPhoneCalls}</strong>
                    <span className="text-[9px] text-[#8C9180] block">{totalPhoneHours}h @ 25/hr</span>
                  </div>
                  <div className="bg-[#12150F] p-2.5 border border-[#DEDCD1]/10">
                    <span className="text-[10px] font-barlow uppercase text-[#8C9180] block">Face-to-Face Attempts</span>
                    <strong className="font-oswald text-2xl text-[#B3A47B]">{totalF2fAttempts}</strong>
                    <span className="text-[9px] text-[#8C9180] block">{totalF2fHours}h @ 5/hr</span>
                  </div>
                  <div className="bg-[#12150F] p-2.5 border border-[#DEDCD1]/10">
                    <span className="text-[10px] font-barlow uppercase text-[#8C9180] block">Total Prospecting</span>
                    <strong className="font-oswald text-2xl text-[#DEDCD1]">{totalProspectingAttempts}</strong>
                    <span className="text-[9px] text-[#8C9180] block">Calls + F2F Attempts</span>
                  </div>
                  <div className="bg-[#12150F] p-2.5 border border-[#DEDCD1]/10">
                    <span className="text-[10px] font-barlow uppercase text-[#8C9180] block">Interviews Generated</span>
                    <strong className="font-oswald text-2xl text-[#C09553]">{totalProjectedAppts}</strong>
                    <span className="text-[9px] text-[#8C9180] block">Scheduled & Conducted</span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: 0800-1700 TIME BLOCK DOCTRINE */}
          {activeTab === 'BATTLE_RHYTHM' && (
            <div className="space-y-5">
              <div className="border-b border-[#DEDCD1]/15 pb-2">
                <h3 className="font-oswald text-2xl text-[#DEDCD1] uppercase">
                  Monday – Friday 0800–1700 Duty Day Architecture
                </h3>
                <p className="text-xs font-barlow text-[#8C9180]">
                  The official SMTB 3-part operational day structured around 25 calls/hour and 5 F2F attempts/hour.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    time: "0800 – 1130 · MORNING BATTLE BLOCK",
                    role: "Administration, MEPS Synchronization, Packet Prep, & Cadence",
                    color: "border-[#B3A47B]",
                    badge: "Administrative Foundation",
                    pacing: "Document Audits & Section Sync",
                    bulletPoints: [
                      "Input new prospecting leads into Recruiter Zone (RZ) / ARISS within 24 hours of generation.",
                      "Coordinate with MEPS Guidance Counselor on pending physicals, ASVAB test dates, and medical waivers.",
                      "Conduct daily 0830 sync with Section Chief, Station Commander, or 1SG on daily targets.",
                      "Review applicant source documents (birth certs, social security cards, diplomas, moral records).",
                      "Confirm afternoon and evening prospect appointments by phone/SMS prior to 1100."
                    ]
                  },
                  {
                    time: "1130 – 1430 · MIDDAY ENGAGEMENT BLOCK",
                    role: "School Canvassing, Lunch Tables, COI Engagement, & Athletic Touchpoints",
                    color: "border-[#C09553]",
                    badge: "Metric: 5 F2F Attempts / Hr",
                    pacing: "5 Face-to-Face Attempts per Hour",
                    bulletPoints: [
                      "Execute scheduled high school visits during lunch shifts and free activity periods.",
                      "Maintain the required pace of 5 face-to-face attempts per hour (10 to 15 meaningful interactions per session).",
                      "Staff high-visibility display tables with National Guard literature and branded collateral.",
                      "Engage Centers of Influence (COIs): Guidance Counselors, Principals, JROTC Instructors, and Coaches.",
                      "Deliver classroom presentations (Career Direction, ASVAB prep, Team Building)."
                    ]
                  },
                  {
                    time: "1430 – 1700 · AFTERNOON PRODUCTION BLOCK",
                    role: "Telephone Prospecting (TEL), In-Depth Sales Interviews, & Close-Out",
                    color: "border-[#B3A47B]",
                    badge: "Metric: 25 Calls / Hr",
                    pacing: "25 Phone Call Attempts per Hour",
                    bulletPoints: [
                      "Execute uninterrupted Telephone Prospecting (TEL) blocks at the standard cadence of 25 phone calls per hour.",
                      "Dial through prioritized demographic lists: Seniors list, college stop-outs, and digital/social media leads.",
                      "Conduct formal face-to-face Sales Interviews in the recruiting office.",
                      "Prepare next-day documentation, MEPS shipper packets, and parent meeting materials.",
                      "1630–1700 Daily Close-Out: Update RZ activity log, report daily production to Section Chief."
                    ]
                  }
                ].map((block, i) => (
                  <div key={i} className={`bg-[#1B2016] border ${block.color} p-5 space-y-3`}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#DEDCD1]/10 pb-2">
                      <div>
                        <h4 className="font-oswald text-lg text-[#DEDCD1] uppercase tracking-wide">
                          {block.time}
                        </h4>
                        <span className="text-xs font-barlow text-[#C09553] font-semibold">
                          {block.role}
                        </span>
                      </div>
                      <span className="text-[10px] font-barlow font-bold uppercase px-2.5 py-0.5 border border-[#B3A47B]/40 bg-[#12150F] text-[#B3A47B] self-start sm:self-center">
                        {block.badge}
                      </span>
                    </div>

                    <ul className="space-y-1.5 text-xs font-barlow text-[#8C9180] pl-2">
                      {block.bulletPoints.map((pt, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2">
                          <span className="text-[#C09553] font-bold">▪</span>
                          <span className="text-[#DEDCD1]/90">{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: HOURLY RATE CALCULATOR (25 CALLS & 5 F2F) */}
          {activeTab === 'METRICS' && (
            <div className="space-y-6">
              <div className="border-b border-[#DEDCD1]/15 pb-2">
                <h3 className="font-oswald text-2xl text-[#DEDCD1] uppercase">
                  Hourly Pacing Calculator (25 Calls/Hr · 5 F2F/Hr)
                </h3>
                <p className="text-xs font-barlow text-[#8C9180]">
                  Mathematical activity-to-contract conversion models based on the mandatory SMTB hourly metrics.
                </p>
              </div>

              {/* Standard Pacing Metric Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#1B2016] border border-[#C09553]/50 p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-oswald text-sm text-[#C09553] uppercase font-bold tracking-wider">
                      Standard Metric 1: Telephone Prospecting
                    </span>
                    <Phone size={16} className="text-[#C09553]" />
                  </div>
                  <div className="font-oswald text-3xl text-[#DEDCD1]">
                    25 Phone Call Attempts / Hour
                  </div>
                  <p className="text-xs font-barlow text-[#8C9180] leading-relaxed">
                    When in the TEL block, an RRNCO is expected to maintain an uninterrupted dialing velocity of 25 attempts per hour (1 call every ~2.4 minutes). At a 28% contact rate, 2 hours generates ~14 live conversations.
                  </p>
                </div>

                <div className="bg-[#1B2016] border border-[#B3A47B]/50 p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-oswald text-sm text-[#B3A47B] uppercase font-bold tracking-wider">
                      Standard Metric 2: Area Canvassing (F2F)
                    </span>
                    <Users size={16} className="text-[#B3A47B]" />
                  </div>
                  <div className="font-oswald text-3xl text-[#DEDCD1]">
                    5 Face-to-Face Attempts / Hour
                  </div>
                  <p className="text-xs font-barlow text-[#8C9180] leading-relaxed">
                    When canvassing high schools, lunch tables, trade schools, and athletic events, an RRNCO conducts a minimum of 5 deliberate face-to-face engagements per hour (1 every 12 minutes). High contact-to-interest ratio (~70%).
                  </p>
                </div>
              </div>

              {/* Interactive Mathematical Model */}
              <div className="bg-[#1B2016] border border-[#DEDCD1]/15 p-5 space-y-4">
                <h4 className="font-oswald text-base text-[#DEDCD1] uppercase">
                  Weekly Mon–Fri Conversion Math:
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-barlow">
                  <div className="bg-[#12150F] p-3 border border-[#DEDCD1]/10 space-y-1">
                    <span className="text-[#8C9180] uppercase block text-[10px]">1. Scheduled Phone Hours (Mon–Fri):</span>
                    <strong className="font-oswald text-xl text-[#C09553] block">{totalPhoneHours} Hours</strong>
                    <span className="text-[#8C9180] text-[11px]">
                      {totalPhoneHours}h × 25 = <strong className="text-[#DEDCD1]">{totalPhoneCalls} Phone Calls</strong>
                    </span>
                  </div>

                  <div className="bg-[#12150F] p-3 border border-[#DEDCD1]/10 space-y-1">
                    <span className="text-[#8C9180] uppercase block text-[10px]">2. Scheduled F2F Hours (Mon–Fri):</span>
                    <strong className="font-oswald text-xl text-[#B3A47B] block">{totalF2fHours} Hours</strong>
                    <span className="text-[#8C9180] text-[11px]">
                      {totalF2fHours}h × 5 = <strong className="text-[#DEDCD1]">{totalF2fAttempts} F2F Attempts</strong>
                    </span>
                  </div>

                  <div className="bg-[#12150F] p-3 border border-[#DEDCD1]/10 space-y-1">
                    <span className="text-[#8C9180] uppercase block text-[10px]">3. Total Weekly Production Output:</span>
                    <strong className="font-oswald text-xl text-[#C09553] block">{totalProspectingAttempts} Attempts</strong>
                    <span className="text-[#8C9180] text-[11px]">
                      Yields <strong className="text-[#DEDCD1]">{totalContacts} Contacts</strong> → <strong className="text-[#DEDCD1]">{totalProjectedAppts} Appts</strong>
                    </span>
                  </div>
                </div>

                <div className="bg-[#12150F] p-3 border border-[#C09553]/30 text-xs text-[#8C9180] leading-relaxed">
                  <strong className="text-[#C09553]">Bottom Line for Recruiters:</strong> Operating Monday through Friday (0800–1700) with 2 hours of phone prospecting and 2 hours of school canvassing daily provides <strong className="text-[#DEDCD1]">250 phone calls</strong> and <strong className="text-[#DEDCD1]">50 face-to-face attempts</strong> per week, mathematically guaranteeing enough interviews to write 3 to 4 enlistment contracts per month.
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: EXACT ATTACHED PDF FORM */}
          {activeTab === 'EXACT_PDF' && (
            <div className="space-y-6">
              
              {/* PDF Banner & Quick Actions */}
              <div className="bg-[#1B2016] border border-[#C09553]/60 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-[#C09553] text-[#12150F]">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h4 className="font-oswald text-lg text-[#DEDCD1] uppercase tracking-wide">
                      Exact Attached Document: RZ MISSION PLANNER & BATTLE RHYTHM
                    </h4>
                    <span className="text-xs font-barlow text-[#8C9180]">
                      Official SMTB Form · Formatted with Monday–Friday 0800–1700 schedule & 25 calls/hr, 5 F2F/hr standards
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 text-xs font-barlow font-bold uppercase tracking-wider bg-[#C09553] hover:bg-[#B3A47B] text-[#12150F] inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                  >
                    <span>Open in New Tab</span>
                    <ExternalLink size={13} />
                  </a>
                  <a
                    href={pdfUrl}
                    download="RZ_MISSION_PLANNER_AND_BATTLE_RHYTHM.pdf"
                    className="px-3.5 py-2 text-xs font-barlow font-bold uppercase tracking-wider border border-[#DEDCD1]/30 hover:border-[#DEDCD1] text-[#DEDCD1] inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Download PDF</span>
                    <Download size={13} />
                  </a>
                </div>
              </div>

              {/* Embedded Document Frame */}
              <div className="border border-[#DEDCD1]/20 bg-[#12150F] h-[580px] w-full relative">
                <iframe
                  src={pdfUrl}
                  title="Exact Attached PDF: RZ Mission Planner & Battle Rhythm"
                  className="w-full h-full border-none"
                />
              </div>

              {/* XFA Notice Explanation Callout */}
              <div className="bg-[#1B2016] border-l-4 border-[#C09553] p-4 text-xs font-barlow text-[#DEDCD1] space-y-1">
                <strong className="text-[#C09553] uppercase font-oswald text-sm block">
                  Document Structure:
                </strong>
                <p className="text-[#8C9180] leading-relaxed">
                  Page 1 replicates the standard dynamic Adobe XFA notice. Page 2 provides the complete Monday–Friday 0800–1700 work plan and the 25 calls/hr and 5 F2F attempts/hr conversion benchmarks.
                </p>
              </div>

            </div>
          )}

        </div>

        {/* Modal Bottom Footer */}
        <div className="bg-[#1B2016] border-t border-[#DEDCD1]/15 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <div className="text-[11px] font-barlow text-[#8C9180]">
            <span className="text-[#C09553] font-semibold">SMTB Duty Standard:</span> Monday – Friday 0800–1700 · 25 Phone Calls/Hr · 5 F2F Attempts/Hr.
          </div>
          <div className="flex items-center gap-2">
            <a
              href={pdfUrl}
              download="RZ_MISSION_PLANNER_AND_BATTLE_RHYTHM.pdf"
              className="px-3.5 py-2 text-xs font-semibold uppercase tracking-wider border border-[#C09553] text-[#C09553] hover:bg-[#C09553]/10 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Download size={13} />
              <span>Download PDF</span>
            </a>
            <button
              onClick={handleCopySummary}
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider border border-[#B3A47B]/60 text-[#B3A47B] hover:bg-[#B3A47B]/10 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check size={14} className="text-[#C09553]" /> : <Copy size={14} />}
              <span>{copied ? "Copied" : "Copy Schedule"}</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-[#B3A47B] hover:bg-[#C09553] text-[#12150F] transition-colors cursor-pointer"
            >
              Close Mission Planner
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
