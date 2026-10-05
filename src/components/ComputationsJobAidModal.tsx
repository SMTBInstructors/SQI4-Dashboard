import React, { useState } from 'react';
import { X, Copy, Check, Calculator, ShieldAlert, BookOpen, Clock, Calendar, AlertTriangle, ArrowRight } from 'lucide-react';

interface ComputationsJobAidModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNotify?: (msg: string) => void;
}

export const ComputationsJobAidModal: React.FC<ComputationsJobAidModalProps> = ({
  isOpen,
  onClose,
  onNotify
}) => {
  const [activeTab, setActiveTab] = useState<'CALCULATORS' | 'RULES' | 'BARS_TABLE' | 'FACSIMILE'>('CALCULATORS');
  const [calcMode, setCalcMode] = useState<'EXTENSION' | 'AGE' | 'PEBD' | 'PHA_ACFT' | 'AGE59'>('EXTENSION');

  // ── INPUT STATES ──
  // Scenario 1: Earliest Extension
  const [etsExtension, setEtsExtension] = useState('2028-11-30');

  // Scenario 2: Age at ETS
  const [etsAge, setEtsAge] = useState('2028-02-24');
  const [dobAge, setDobAge] = useState('1996-11-10');

  // Scenario 3: Creditable Service at ETS
  const [etsService, setEtsService] = useState('2028-02-24');
  const [pebdService, setPebdService] = useState('2010-08-29');

  // Scenario 4: PHA & ACFT Validity
  const [sigDate, setSigDate] = useState('2026-10-19');
  const [phaDate, setPhaDate] = useState('2025-11-10');
  const [testDate, setTestDate] = useState('2025-08-15');
  const [soldierType, setSoldierType] = useState<'MDAY' | 'AGR'>('MDAY');

  // Scenario 5: Age 59+ Maximum Extension
  const [ets59, setEts59] = useState('2028-11-24');
  const [dob59, setDob59] = useState('1969-07-26');

  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // ── SMTB MILITARY SUBTRACTION UTILITY (RULES 3, 4, 5, 6) ──
  const calculateMilitaryDifference = (
    endDateStr: string,
    startDateStr: string,
    addInclusiveDay = true
  ) => {
    const endParts = endDateStr.split('-').map(Number);
    const startParts = startDateStr.split('-').map(Number);
    if (endParts.length !== 3 || startParts.length !== 3 || endParts.some(isNaN) || startParts.some(isNaN)) {
      return { years: 0, months: 0, days: 0, formatted: 'Invalid Date', stepLog: [] };
    }

    let [endY, endM, endD] = endParts;
    const [startY, startM, startD] = startParts;
    const stepLog: string[] = [];

    stepLog.push(`Original dates: End = ${endY}-${String(endM).padStart(2, '0')}-${String(endD).padStart(2, '0')} | Start = ${startY}-${String(startM).padStart(2, '0')}-${String(startD).padStart(2, '0')}`);

    // Rule #4: If ending date is last day of the month, it will always be 30.
    // Check if endD is last day of endM in endY
    const daysInEndMonth = new Date(endY, endM, 0).getDate();
    if (endD === daysInEndMonth && endD !== 30) {
      stepLog.push(`Rule #4: Ending day ${endD} is last day of month. Converted to 30.`);
      endD = 30;
    }

    // Rule #5: Borrowing if needed
    let borrowD = endD;
    let borrowM = endM;
    let borrowY = endY;

    if (borrowD < startD) {
      borrowM -= 1;
      borrowD += 30;
      stepLog.push(`Rule #5: Borrowed 1 month (30 days) to DD. Current: ${borrowY}-${String(borrowM).padStart(2, '0')}-${borrowD}`);
    }

    if (borrowM < startM) {
      borrowY -= 1;
      borrowM += 12;
      stepLog.push(`Rule #5: Borrowed 1 year (12 months) to MM. Current: ${borrowY}-${borrowM}-${borrowD}`);
    }

    let diffY = borrowY - startY;
    let diffM = borrowM - startM;
    let diffD = borrowD - startD;

    stepLog.push(`Raw subtraction: ${diffY} Y, ${diffM} M, ${diffD} D`);

    if (addInclusiveDay) {
      diffD += 1;
      stepLog.push(`Rule #3: Added inclusive day (+01): ${diffY} Y, ${diffM} M, ${diffD} D`);
    }

    // Rule #6: Round up if days == 30 or months == 12
    if (diffD >= 30) {
      diffD -= 30;
      diffM += 1;
      stepLog.push(`Rule #6: Rounded up 30 days to +1 month. Current: ${diffY} Y, ${diffM} M, ${diffD} D`);
    }
    if (diffM >= 12) {
      diffM -= 12;
      diffY += 1;
      stepLog.push(`Rule #6: Rounded up 12 months to +1 year. Current: ${diffY} Y, ${diffM} M, ${diffD} D`);
    }

    const formatted = `${String(diffY).padStart(2, '0')}-${String(diffM).padStart(2, '0')}-${String(diffD).padStart(2, '0')}`;
    return { years: diffY, months: diffM, days: diffD, formatted, stepLog };
  };

  // Scenario 1 Calculation: Earliest Date of Extension (ETS - 12 months)
  const calcEarliestExtension = (etsStr: string) => {
    const parts = etsStr.split('-').map(Number);
    if (parts.length !== 3 || parts.some(isNaN)) return { earliest: 'Invalid', note: '' };
    const [y, m, d] = parts;
    const targetY = y - 1;
    let targetM = m;
    let targetD = d;

    // Rule 1: Special leap year February check
    let note = "Standard 12-month window prior to ETS.";
    if (m === 2 && d === 29) {
      targetD = 28;
      note = "Rule #1 Applied: Leap year 29 Feb converted to valid 28 Feb earliest extension date.";
    } else if (m === 2 && d === 28) {
      targetD = 28;
      note = "Rule #1: 28 Feb non-leap year earliest date is 28 Feb.";
    }

    const earliest = `${targetY}-${String(targetM).padStart(2, '0')}-${String(targetD).padStart(2, '0')}`;
    return { earliest, note };
  };

  // Scenario 5: Age 59+ Maximum Extension
  const calcAge59Extension = () => {
    const ageAtEts = calculateMilitaryDifference(ets59, dob59, true);
    const dobParts = dob59.split('-').map(Number);
    if (dobParts.length !== 3 || dobParts.some(isNaN)) {
      return { ageAtEts, turn60: 'Invalid', ldobm: 'Invalid', ede: 'Invalid', maxExt: 'Invalid', stepLog: [] };
    }
    const [y, m, d] = dobParts;
    const turn60 = `${y + 60}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    
    // LDOBM: Last Day of Birth Month (always 30 per Rule 4)
    const ldobm = `${y + 60}-${String(m).padStart(2, '0')}-30`;
    
    // EDE: Effective Date of Extension (Day after current ETS)
    const etsParts = ets59.split('-').map(Number);
    const etsDate = new Date(etsParts[0], etsParts[1] - 1, etsParts[2]);
    etsDate.setDate(etsDate.getDate() + 1);
    const ede = `${etsDate.getFullYear()}-${String(etsDate.getMonth() + 1).padStart(2, '0')}-${String(etsDate.getDate()).padStart(2, '0')}`;

    // Maximum Time of Extension: LDOBM - EDE + 1 day
    const maxExtDiff = calculateMilitaryDifference(ldobm, ede, true);

    return {
      ageAtEts,
      turn60,
      ldobm,
      ede,
      maxExt: maxExtDiff.formatted,
      maxYears: maxExtDiff.years,
      maxMonths: maxExtDiff.months,
      maxDays: maxExtDiff.days,
      stepLog: maxExtDiff.stepLog
    };
  };

  const extensionRes = calcEarliestExtension(etsExtension);
  const ageRes = calculateMilitaryDifference(etsAge, dobAge, true);
  const pebdRes = calculateMilitaryDifference(etsService, pebdService, true);
  const phaRes = calculateMilitaryDifference(sigDate, phaDate, true);
  const testRes = calculateMilitaryDifference(sigDate, testDate, true);
  const age59Res = calcAge59Extension();

  const isPhaValid = phaRes.years === 0 && phaRes.months <= 12;
  const isTestValid = soldierType === 'MDAY'
    ? (testRes.years === 0 || (testRes.years === 1 && testRes.months < 2) || (testRes.years === 1 && testRes.months === 2 && testRes.days === 0))
    : (testRes.years === 0 && testRes.months <= 8);

  const handleCopySummary = () => {
    const summary = `ARMY NATIONAL GUARD SMTB JOB AID: RULES FOR COMPUTATIONS
Earliest Date of Extension: ${extensionRes.earliest} (Current ETS: ${etsExtension})
Age at Current ETS: ${ageRes.years} Y, ${ageRes.months} M, ${ageRes.days} D (${ageRes.formatted})
Total Creditable Service for Pay: ${pebdRes.years} Y, ${pebdRes.months} M, ${pebdRes.days} D (${pebdRes.formatted})
PHA Age at Signature: ${phaRes.months} Months, ${phaRes.days} Days [${isPhaValid ? 'VALID' : 'EXPIRED'}]
ACFT/APFT Age at Signature (${soldierType}): ${testRes.years} Y, ${testRes.months} M, ${testRes.days} D [${isTestValid ? 'VALID' : 'EXPIRED'}]
Age 59+ Maximum Extension: ${age59Res.maxMonths} Months, ${age59Res.maxDays} Days (LDOBM: ${age59Res.ldobm})

Publication: SMTB Professional Education Center · Camp Joseph T. Robinson · 04 Nov 2020`;

    navigator.clipboard.writeText(summary);
    setCopied(true);
    if (onNotify) onNotify("Computation results copied to clipboard");
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-[#12150F] border border-[#B3A47B] max-w-4xl w-full my-auto shadow-2xl relative flex flex-col max-h-[94vh] overflow-hidden">
        
        {/* Header Bar */}
        <div className="bg-[#1B2016] border-b border-[#DEDCD1]/15 px-6 py-4 flex items-start justify-between gap-4 shrink-0">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-[#B3A47B] text-[#12150F] font-barlow font-bold text-[10px] tracking-[0.2em] uppercase px-2 py-0.5">
                SMTB Job Aid
              </span>
              <span className="font-barlow text-[11px] text-[#C09553] uppercase tracking-wider font-semibold">
                Rules for Computations & Bars to Reenlistment
              </span>
            </div>
            <h2 className="font-oswald text-2xl sm:text-3xl font-light text-[#DEDCD1] uppercase tracking-wide">
              Computations Job Aid & Bars Matrix
            </h2>
            <p className="text-xs font-barlow text-[#8C9180]">
              Army National Guard · Strength Maintenance Training Battalion (SMTB) · Camp Robinson, Building 3400
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleCopySummary}
              className="p-2 border border-[#B3A47B]/50 hover:bg-[#B3A47B]/10 text-[#B3A47B] text-xs font-barlow uppercase flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Copy Summary"
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

        {/* View Mode Navigation Tabs */}
        <div className="px-6 pt-3 pb-2 bg-[#12150F] border-b border-[#DEDCD1]/10 flex items-center justify-between gap-3 shrink-0 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setActiveTab('CALCULATORS')}
              className={`px-3 py-1 text-xs font-barlow uppercase tracking-wider font-semibold border transition-colors cursor-pointer ${
                activeTab === 'CALCULATORS'
                  ? 'bg-[#B3A47B] text-[#12150F] border-[#B3A47B]'
                  : 'text-[#8C9180] border-[#DEDCD1]/15 hover:text-[#DEDCD1]'
              }`}
            >
              Interactive SMTB Calculators
            </button>
            <button
              onClick={() => setActiveTab('RULES')}
              className={`px-3 py-1 text-xs font-barlow uppercase tracking-wider font-semibold border transition-colors cursor-pointer ${
                activeTab === 'RULES'
                  ? 'bg-[#B3A47B] text-[#12150F] border-[#B3A47B]'
                  : 'text-[#8C9180] border-[#DEDCD1]/15 hover:text-[#DEDCD1]'
              }`}
            >
              Rules 1 through 6
            </button>
            <button
              onClick={() => setActiveTab('BARS_TABLE')}
              className={`px-3 py-1 text-xs font-barlow uppercase tracking-wider font-semibold border transition-colors cursor-pointer ${
                activeTab === 'BARS_TABLE'
                  ? 'bg-[#C09553] text-[#12150F] border-[#C09553]'
                  : 'text-[#8C9180] border-[#DEDCD1]/15 hover:text-[#DEDCD1]'
              }`}
            >
              Bars to Reenlistment Matrix (PPOM 09-026)
            </button>
            <button
              onClick={() => setActiveTab('FACSIMILE')}
              className={`px-3 py-1 text-xs font-barlow uppercase tracking-wider font-semibold border transition-colors cursor-pointer ${
                activeTab === 'FACSIMILE'
                  ? 'bg-[#B3A47B] text-[#12150F] border-[#B3A47B]'
                  : 'text-[#8C9180] border-[#DEDCD1]/15 hover:text-[#DEDCD1]'
              }`}
            >
              Official Document Facsimile
            </button>
          </div>

          <span className="text-[11px] font-barlow text-[#8C9180] hidden sm:inline">
            SMTB Professional Education Center (04 Nov 2020)
          </span>
        </div>

        {/* Content Area */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6 flex-1">
          {activeTab === 'CALCULATORS' && (
            <div className="space-y-6">
              
              {/* Calculator Subtabs */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pb-2 border-b border-[#DEDCD1]/10">
                {[
                  { id: 'EXTENSION', label: '1. Earliest Extension' },
                  { id: 'AGE', label: '2. Age at ETS' },
                  { id: 'PEBD', label: '3. Creditable Service' },
                  { id: 'PHA_ACFT', label: '4. PHA & Fitness Valid' },
                  { id: 'AGE59', label: '5. Age 59+ Maximum' }
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setCalcMode(t.id as any)}
                    className={`p-2 text-xs font-barlow uppercase font-semibold text-center border transition-colors cursor-pointer ${
                      calcMode === t.id
                        ? 'bg-[#C09553] text-[#12150F] border-[#C09553] font-bold'
                        : 'bg-[#1B2016] text-[#8C9180] border-[#DEDCD1]/15 hover:text-[#DEDCD1]'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Sub-Calculator 1: Earliest Date Soldier May Extend */}
              {calcMode === 'EXTENSION' && (
                <div className="bg-[#1B2016] border border-[#DEDCD1]/15 p-5 space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-[#DEDCD1]/10">
                    <div>
                      <h3 className="font-oswald text-xl text-[#DEDCD1] uppercase">
                        Determine Earliest Date a Soldier May Extend (Rules 1 & 2)
                      </h3>
                      <p className="text-xs font-barlow text-[#8C9180]">
                        Formula: Soldier's Current ETS minus up to 12 months. Enforces valid calendar dates and leap year February rules.
                      </p>
                    </div>
                    <span className="text-xs font-barlow text-[#C09553] uppercase font-bold">
                      Rule 1 & 2
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-[10px] uppercase font-bold text-[#8C9180] tracking-wider block mb-1">
                          Soldier's Current ETS (YYYY-MM-DD):
                        </label>
                        <input
                          type="date"
                          value={etsExtension}
                          onChange={(e) => setEtsExtension(e.target.value)}
                          className="w-full bg-[#12150F] border border-[#DEDCD1]/20 px-3 py-2 text-sm text-[#DEDCD1] focus:outline-none focus:border-[#B3A47B]"
                        />
                      </div>

                      {/* Presets from SMTB Guide */}
                      <div className="flex items-center gap-2 pt-1">
                        <span className="text-[10px] font-barlow text-[#8C9180] uppercase">Examples:</span>
                        <button
                          type="button"
                          onClick={() => setEtsExtension('2028-11-30')}
                          className="text-[11px] font-barlow text-[#B3A47B] hover:underline"
                        >
                          Nov 30 (Guide Ex.)
                        </button>
                        <button
                          type="button"
                          onClick={() => setEtsExtension('2028-02-29')}
                          className="text-[11px] font-barlow text-[#B3A47B] hover:underline"
                        >
                          Feb 29 (Leap Year)
                        </button>
                        <button
                          type="button"
                          onClick={() => setEtsExtension('2027-02-28')}
                          className="text-[11px] font-barlow text-[#B3A47B] hover:underline"
                        >
                          Feb 28 (Non-Leap)
                        </button>
                      </div>
                    </div>

                    {/* Result Output Card */}
                    <div className="bg-[#12150F] border border-[#B3A47B]/40 p-4 space-y-3 flex flex-col justify-center">
                      <span className="text-[10px] font-barlow uppercase tracking-wider text-[#8C9180]">
                        Earliest Date of Extension:
                      </span>
                      <div className="font-oswald text-3xl text-[#C09553]">
                        {extensionRes.earliest}
                      </div>
                      <p className="text-xs font-barlow text-[#DEDCD1]/80 leading-relaxed border-t border-[#DEDCD1]/10 pt-2">
                        {extensionRes.note}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Sub-Calculator 2: Age at Current ETS */}
              {calcMode === 'AGE' && (
                <div className="bg-[#1B2016] border border-[#DEDCD1]/15 p-5 space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-[#DEDCD1]/10">
                    <div>
                      <h3 className="font-oswald text-xl text-[#DEDCD1] uppercase">
                        Determine Soldier's Age at Current ETS (Rules 3, 4, 5, & 6)
                      </h3>
                      <p className="text-xs font-barlow text-[#8C9180]">
                        Formula: Current ETS - Date of Birth + 1 inclusive day. Converts end-of-month dates to 30.
                      </p>
                    </div>
                    <span className="text-xs font-barlow text-[#C09553] uppercase font-bold">
                      Rules 3, 4, 5, 6
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-[10px] uppercase font-bold text-[#8C9180] tracking-wider block mb-1">
                          Soldier's Current ETS (YYYY-MM-DD):
                        </label>
                        <input
                          type="date"
                          value={etsAge}
                          onChange={(e) => setEtsAge(e.target.value)}
                          className="w-full bg-[#12150F] border border-[#DEDCD1]/20 px-3 py-2 text-sm text-[#DEDCD1] focus:outline-none focus:border-[#B3A47B]"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-bold text-[#8C9180] tracking-wider block mb-1">
                          Soldier's Date of Birth (YYYY-MM-DD):
                        </label>
                        <input
                          type="date"
                          value={dobAge}
                          onChange={(e) => setDobAge(e.target.value)}
                          className="w-full bg-[#12150F] border border-[#DEDCD1]/20 px-3 py-2 text-sm text-[#DEDCD1] focus:outline-none focus:border-[#B3A47B]"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-barlow text-[#8C9180] uppercase">Guide Preset:</span>
                        <button
                          type="button"
                          onClick={() => {
                            setEtsAge('2008-02-24');
                            setDobAge('1976-11-10');
                          }}
                          className="text-[11px] font-barlow text-[#B3A47B] hover:underline"
                        >
                          SMTB Guide Example (31-03-15)
                        </button>
                      </div>
                    </div>

                    <div className="bg-[#12150F] border border-[#B3A47B]/40 p-4 space-y-3 flex flex-col justify-center">
                      <span className="text-[10px] font-barlow uppercase tracking-wider text-[#8C9180]">
                        Age at Current ETS:
                      </span>
                      <div className="font-oswald text-3xl text-[#C09553]">
                        {ageRes.years} Years · {ageRes.months} Months · {ageRes.days} Days
                      </div>
                      <div className="font-mono text-xs text-[#8C9180] border-t border-[#DEDCD1]/10 pt-2">
                        Military Format (YY-MM-DD): <strong className="text-[#DEDCD1]">{ageRes.formatted}</strong> (+01 inclusive day applied)
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Sub-Calculator 3: Total Creditable Service for Pay */}
              {calcMode === 'PEBD' && (
                <div className="bg-[#1B2016] border border-[#DEDCD1]/15 p-5 space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-[#DEDCD1]/10">
                    <div>
                      <h3 className="font-oswald text-xl text-[#DEDCD1] uppercase">
                        Total Creditable Service for Pay at Current ETS
                      </h3>
                      <p className="text-xs font-barlow text-[#8C9180]">
                        Formula: Soldier's Current ETS - PEBD (Pay Entry Basic Date) + 1 inclusive day.
                      </p>
                    </div>
                    <span className="text-xs font-barlow text-[#C09553] uppercase font-bold">
                      Pay Matrix Reference
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-[10px] uppercase font-bold text-[#8C9180] tracking-wider block mb-1">
                          Soldier's Current ETS:
                        </label>
                        <input
                          type="date"
                          value={etsService}
                          onChange={(e) => setEtsService(e.target.value)}
                          className="w-full bg-[#12150F] border border-[#DEDCD1]/20 px-3 py-2 text-sm text-[#DEDCD1] focus:outline-none focus:border-[#B3A47B]"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-bold text-[#8C9180] tracking-wider block mb-1">
                          Soldier's PEBD (Pay Entry Basic Date):
                        </label>
                        <input
                          type="date"
                          value={pebdService}
                          onChange={(e) => setPebdService(e.target.value)}
                          className="w-full bg-[#12150F] border border-[#DEDCD1]/20 px-3 py-2 text-sm text-[#DEDCD1] focus:outline-none focus:border-[#B3A47B]"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setEtsService('2008-02-24');
                          setPebdService('1989-08-29');
                        }}
                        className="text-[11px] font-barlow text-[#B3A47B] hover:underline"
                      >
                        Load SMTB Guide Example (18-05-26)
                      </button>
                    </div>

                    <div className="bg-[#12150F] border border-[#B3A47B]/40 p-4 space-y-3 flex flex-col justify-center">
                      <span className="text-[10px] font-barlow uppercase tracking-wider text-[#8C9180]">
                        Total Creditable Service for Pay:
                      </span>
                      <div className="font-oswald text-3xl text-[#C09553]">
                        {pebdRes.years} Yrs · {pebdRes.months} Mos · {pebdRes.days} Days
                      </div>
                      <div className="font-mono text-xs text-[#8C9180] border-t border-[#DEDCD1]/10 pt-2">
                        Official Record Format: <strong className="text-[#DEDCD1]">{pebdRes.formatted}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Sub-Calculator 4: PHA & ACFT / APFT Validity */}
              {calcMode === 'PHA_ACFT' && (
                <div className="bg-[#1B2016] border border-[#DEDCD1]/15 p-5 space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-[#DEDCD1]/10">
                    <div>
                      <h3 className="font-oswald text-xl text-[#DEDCD1] uppercase">
                        Determine if PHA and Physical Fitness Test are Valid at Extension
                      </h3>
                      <p className="text-xs font-barlow text-[#8C9180]">
                        DA Pam 40-502 para 6-6d(3): PHA valid if ≤ 1 year (12 mos). ACFT/APFT valid if ≤ 14 mos (M-Day) or ≤ 8 mos (AGR).
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-[10px] uppercase font-bold text-[#8C9180] tracking-wider block mb-1">
                          Date of DA Form 4836 Signature:
                        </label>
                        <input
                          type="date"
                          value={sigDate}
                          onChange={(e) => setSigDate(e.target.value)}
                          className="w-full bg-[#12150F] border border-[#DEDCD1]/20 px-3 py-2 text-sm text-[#DEDCD1] focus:outline-none focus:border-[#B3A47B]"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-bold text-[#8C9180] tracking-wider block mb-1">
                          Date of Last PHA:
                        </label>
                        <input
                          type="date"
                          value={phaDate}
                          onChange={(e) => setPhaDate(e.target.value)}
                          className="w-full bg-[#12150F] border border-[#DEDCD1]/20 px-3 py-2 text-sm text-[#DEDCD1] focus:outline-none focus:border-[#B3A47B]"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-bold text-[#8C9180] tracking-wider block mb-1">
                          Date of Last Record ACFT / Fitness Test:
                        </label>
                        <input
                          type="date"
                          value={testDate}
                          onChange={(e) => setTestDate(e.target.value)}
                          className="w-full bg-[#12150F] border border-[#DEDCD1]/20 px-3 py-2 text-sm text-[#DEDCD1] focus:outline-none focus:border-[#B3A47B]"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-bold text-[#8C9180] tracking-wider block mb-1">
                          Soldier Component:
                        </label>
                        <div className="flex items-center gap-3">
                          <label className="inline-flex items-center gap-1.5 text-xs text-[#DEDCD1] cursor-pointer">
                            <input
                              type="radio"
                              name="soldierType"
                              checked={soldierType === 'MDAY'}
                              onChange={() => setSoldierType('MDAY')}
                            />
                            <span>M-Day (14 Months Max)</span>
                          </label>
                          <label className="inline-flex items-center gap-1.5 text-xs text-[#DEDCD1] cursor-pointer">
                            <input
                              type="radio"
                              name="soldierType"
                              checked={soldierType === 'AGR'}
                              onChange={() => setSoldierType('AGR')}
                            />
                            <span>AGR (8 Months Max)</span>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {/* PHA Status */}
                      <div className={`p-4 border ${isPhaValid ? 'border-green-600/60 bg-green-950/20' : 'border-red-600/60 bg-red-950/20'} space-y-1`}>
                        <div className="flex items-center justify-between">
                          <span className="font-oswald text-xs uppercase tracking-wider text-[#B3A47B]">
                            PHA Status at Signature:
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 uppercase ${isPhaValid ? 'bg-green-700 text-white' : 'bg-red-700 text-white'}`}>
                            {isPhaValid ? 'VALID (≤ 12 MOS)' : 'EXPIRED (> 12 MOS)'}
                          </span>
                        </div>
                        <div className="font-oswald text-2xl text-[#DEDCD1]">
                          Age: {phaRes.months} Months · {phaRes.days} Days
                        </div>
                        <p className="text-[11px] font-barlow text-[#8C9180]">
                          IAW DA Pam 40-502 para 6-6d(3), physical must be 1 year or less at time of DA 4836 signature.
                        </p>
                      </div>

                      {/* Fitness Test Status */}
                      <div className={`p-4 border ${isTestValid ? 'border-green-600/60 bg-green-950/20' : 'border-red-600/60 bg-red-950/20'} space-y-1`}>
                        <div className="flex items-center justify-between">
                          <span className="font-oswald text-xs uppercase tracking-wider text-[#B3A47B]">
                            Fitness Test Status:
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 uppercase ${isTestValid ? 'bg-green-700 text-white' : 'bg-red-700 text-white'}`}>
                            {isTestValid ? `VALID (${soldierType})` : `EXPIRED (${soldierType})`}
                          </span>
                        </div>
                        <div className="font-oswald text-2xl text-[#DEDCD1]">
                          Age: {testRes.years} Yrs · {testRes.months} Mos · {testRes.days} Days
                        </div>
                        <p className="text-[11px] font-barlow text-[#8C9180]">
                          Standard: Within 14 months for M-Day or 8 months for AGR of signing DA Form 4836 (with passing score).
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Sub-Calculator 5: Maximum Time for Extension (Age 59+) */}
              {calcMode === 'AGE59' && (
                <div className="bg-[#1B2016] border border-[#DEDCD1]/15 p-5 space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-[#DEDCD1]/10">
                    <div>
                      <h3 className="font-oswald text-xl text-[#DEDCD1] uppercase">
                        Maximum Extension for Soldiers Reaching Age 60 at ETS (Not Retirement)
                      </h3>
                      <p className="text-xs font-barlow text-[#8C9180]">
                        3-Step Formula: Step 1 (Age at ETS) &rarr; Step 2 (60th Birthday) &rarr; Step 3 (LDOBM - EDE + 1 day).
                      </p>
                    </div>
                    <span className="text-xs font-barlow text-[#C09553] uppercase font-bold">
                      Age 59+ Window
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-[10px] uppercase font-bold text-[#8C9180] tracking-wider block mb-1">
                          Current ETS:
                        </label>
                        <input
                          type="date"
                          value={ets59}
                          onChange={(e) => setEts59(e.target.value)}
                          className="w-full bg-[#12150F] border border-[#DEDCD1]/20 px-3 py-2 text-sm text-[#DEDCD1] focus:outline-none focus:border-[#B3A47B]"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-bold text-[#8C9180] tracking-wider block mb-1">
                          Date of Birth:
                        </label>
                        <input
                          type="date"
                          value={dob59}
                          onChange={(e) => setDob59(e.target.value)}
                          className="w-full bg-[#12150F] border border-[#DEDCD1]/20 px-3 py-2 text-sm text-[#DEDCD1] focus:outline-none focus:border-[#B3A47B]"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setEts59('2008-11-24');
                          setDob59('1949-07-26');
                        }}
                        className="text-[11px] font-barlow text-[#B3A47B] hover:underline"
                      >
                        Load SMTB Guide Example (59 Yrs, 8 Mos, 6 Days Max)
                      </button>
                    </div>

                    <div className="bg-[#12150F] border border-[#B3A47B]/40 p-4 space-y-3 flex flex-col justify-center">
                      <div className="space-y-1">
                        <span className="text-[10px] font-barlow uppercase text-[#8C9180]">
                          Step 1: Age at Current ETS
                        </span>
                        <div className="font-oswald text-lg text-[#DEDCD1]">
                          {age59Res.ageAtEts.years} Years · {age59Res.ageAtEts.months} Months · {age59Res.ageAtEts.days} Days
                        </div>
                      </div>

                      <div className="space-y-1 border-t border-[#DEDCD1]/10 pt-2">
                        <span className="text-[10px] font-barlow uppercase text-[#8C9180]">
                          Step 2 & 3: LDOBM & Effective Date of Extension
                        </span>
                        <div className="text-xs font-mono text-[#B3A47B]">
                          LDOBM: {age59Res.ldobm} · EDE: {age59Res.ede}
                        </div>
                      </div>

                      <div className="space-y-1 border-t border-[#DEDCD1]/10 pt-2">
                        <span className="text-[10px] font-barlow uppercase text-[#C09553] font-bold">
                          Maximum Time of Extension:
                        </span>
                        <div className="font-oswald text-2xl text-[#C09553]">
                          {age59Res.maxMonths} Months · {age59Res.maxDays} Days ({age59Res.maxExt})
                        </div>
                      </div>

                      <div className="bg-[#1B2016] p-2 border border-amber-500/30 text-[10px] text-amber-300 leading-tight">
                        <strong>Important Caution:</strong> If a Soldier’s 60th birthday is the 1st day of the month and you extend them to the end of their birth month, they will lose 1 month retirement pay & benefits.
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 2: RULES 1 THROUGH 6 BREAKDOWN */}
          {activeTab === 'RULES' && (
            <div className="space-y-4">
              <div className="border-b border-[#DEDCD1]/15 pb-2">
                <h3 className="font-oswald text-2xl text-[#DEDCD1] uppercase">
                  SMTB Rules for Computations (Official Guide)
                </h3>
                <p className="text-xs font-barlow text-[#8C9180]">
                  Mandatory calculation protocols taught at Strength Maintenance Training Battalion, Camp Robinson.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    rule: "Rule # 1",
                    title: "Special Month-End ETS & Leap Years",
                    body: "A Soldier whose ETS falls on the last day of certain months requires special care. In non-leap years: 28 Feb becomes 28 Feb. In leap years: 29 Feb becomes 28 Feb earliest extension. Result must always be a valid calendar date."
                  },
                  {
                    rule: "Rule # 2",
                    title: "Segment Format & No Zero Months/Days",
                    body: "Each segment (YYYY, MM, DD) must include at least one number. The final answer must convert to a valid calendar date (e.g. 08-02-30 is invalid because February never has 30 days). No computed date will ever have 00 months or 00 days. Adjust by deducting 1 year/month and adding 12 mos / 30 days (08-00-30 = 07-12-30; 07-12-00 = 07-11-30)."
                  },
                  {
                    rule: "Rule # 3",
                    title: "Inclusive Date (+01 Day)",
                    body: "When calculating a period of time using a known start date and a known end date, 1 day must be added back in to the calculation (+ 01). This accounts for both endpoints being served."
                  },
                  {
                    rule: "Rule # 4",
                    title: "Ending Date Last Day of Month = Always 30",
                    body: "When determining a period of time (age, total service, etc.) and the ending date (top number in the formula) is the last day of the month, it will always be 30. If it is 31 Mar, 31 Jan, 28 Feb, 29 Feb, change it to 30. (e.g. 08-03-31 becomes 08-03-30)."
                  },
                  {
                    rule: "Rule # 5",
                    title: "Borrowing from Years and Months",
                    body: "When subtracting and more months or days are required: deduct 1 year from YYYY and add 12 months to MM, or deduct 1 month from MM and add 30 days to DD, or do both if required."
                  },
                  {
                    rule: "Rule # 6",
                    title: "Rounding Up to Keep MM ≤ 11 and DD ≤ 29",
                    body: "When calculating a period of time, always round up the final answer so that there is no more than 11 in the MM column, and no more than 29 in the DD column. (05-11-30 becomes 05-12-00 becomes 06-00-00)."
                  }
                ].map((r, i) => (
                  <div key={i} className="bg-[#1B2016] border border-[#DEDCD1]/15 p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-oswald text-sm text-[#C09553] font-bold uppercase">
                        {r.rule}
                      </span>
                      <span className="text-[10px] font-barlow text-[#8C9180] uppercase">
                        Standard Protocol
                      </span>
                    </div>
                    <h4 className="font-oswald text-base text-[#DEDCD1] uppercase">
                      {r.title}
                    </h4>
                    <p className="text-xs font-barlow text-[#8C9180] leading-relaxed">
                      {r.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: BARS TO REENLISTMENT MATRIX (PPOM 09-026) */}
          {activeTab === 'BARS_TABLE' && (
            <div className="space-y-5">
              <div className="border-b border-[#DEDCD1]/15 pb-2">
                <div className="flex items-center gap-2">
                  <span className="bg-[#C09553] text-[#12150F] text-[10px] font-bold px-2 py-0.5 font-barlow uppercase">
                    PPOM 09-026 Section IV
                  </span>
                  <h3 className="font-oswald text-2xl text-[#DEDCD1] uppercase">
                    BAR to Reenlistment / Immediate Reenlistment / Extension
                  </h3>
                </div>
                <p className="text-xs font-barlow text-[#8C9180] mt-1">
                  Official authority matrix based on Soldier's qualifying service at Current ETS.
                </p>
              </div>

              <div className="border border-[#DEDCD1]/20 overflow-x-auto">
                <table className="w-full text-left text-xs font-barlow border-collapse">
                  <thead>
                    <tr className="bg-[#C09553] text-[#12150F] font-oswald text-xs uppercase">
                      <th className="p-3 border-r border-[#12150F]/20 w-1/3">Action</th>
                      <th className="p-3 border-r border-[#12150F]/20 w-1/3">Less than 10 Years Qualifying Service</th>
                      <th className="p-3 w-1/3">At least 10, but less than 18, or more than 20 Years</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#DEDCD1]/10 bg-[#12150F]">
                    <tr>
                      <td className="p-3 font-semibold text-[#DEDCD1] border-r border-[#DEDCD1]/10">
                        BAR may be initiated by:
                      </td>
                      <td className="p-3 text-[#8C9180] border-r border-[#DEDCD1]/10">
                        Any commander in Soldier’s chain of command (NGB Form 602-R)
                      </td>
                      <td className="p-3 text-[#8C9180]">
                        Any commander in Soldier’s chain of command (NGB Form 602-R)
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-[#DEDCD1] border-r border-[#DEDCD1]/10">
                        Approval / Disapproval authority:
                      </td>
                      <td className="p-3 text-[#B3A47B] border-r border-[#DEDCD1]/10 font-medium">
                        First commander (LTC / O-5 or above) in normal chain of command
                      </td>
                      <td className="p-3 text-[#C09553] font-medium">
                        First commander, Colonel (COL / O-6) or above in normal chain of command
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-[#DEDCD1] border-r border-[#DEDCD1]/10">
                        Appeal Approval / Disapproval authority:
                      </td>
                      <td className="p-3 text-[#B3A47B] border-r border-[#DEDCD1]/10 font-medium">
                        First commander (COL or above) in normal chain of command
                      </td>
                      <td className="p-3 text-[#C09553] font-bold">
                        TAG (The Adjutant General)
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-[#DEDCD1] border-r border-[#DEDCD1]/10">
                        Recommendation of removal authority:
                      </td>
                      <td className="p-3 text-[#8C9180] border-r border-[#DEDCD1]/10">
                        Unit commander
                      </td>
                      <td className="p-3 text-[#8C9180]">
                        Unit commander
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-[#DEDCD1] border-r border-[#DEDCD1]/10">
                        Removal Approval / Disapproval authority:
                      </td>
                      <td className="p-3 text-[#B3A47B] border-r border-[#DEDCD1]/10 font-medium">
                        First commander (LTC / O-5 or above) in normal chain of command
                      </td>
                      <td className="p-3 text-[#C09553] font-medium">
                        First commander, Colonel (COL / O-6) or above in normal chain of command
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Sanctuary Callout Note */}
              <div className="bg-[#1B2016] border-l-4 border-[#C09553] p-4 space-y-2">
                <span className="font-oswald text-sm text-[#C09553] uppercase font-bold tracking-wider block">
                  Sanctuary Provision (18 to 20 Years of Qualifying Service):
                </span>
                <p className="text-xs font-barlow text-[#DEDCD1] leading-relaxed">
                  Soldiers with at least <strong>18 but less than 20 years</strong> of qualifying service at current ETS <strong>will be allowed to extend</strong> to the point where they attain 20 years. They may, after the extension is executed, be barred.
                </p>
                <p className="text-xs font-barlow text-[#8C9180] leading-relaxed">
                  The approval/disapproval authority for this bar is <strong>TAG</strong>. These Soldiers may be processed for separation before they attain 20 years of service, but <strong>will not be separated before that point without approval of Chief, NGB</strong>.
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: FACSIMILE VIEW */}
          {activeTab === 'FACSIMILE' && (
            <div className="bg-[#1B2016] border border-[#DEDCD1]/20 p-6 sm:p-10 space-y-8 font-serif max-w-3xl mx-auto shadow-inner">
              <div className="text-center space-y-2 border-b border-[#DEDCD1]/20 pb-6">
                <span className="text-[10px] font-mono tracking-widest text-[#8C9180] block">
                  FOR TRAINING PURPOSES ONLY · SMTB · 04 NOVEMBER 2020
                </span>
                <h3 className="font-oswald text-2xl sm:text-3xl uppercase tracking-widest text-[#DEDCD1]">
                  RULES FOR COMPUTATIONS
                </h3>
                <h4 className="font-oswald text-lg tracking-widest text-[#C09553]">
                  & BARS TO REENLISTMENT, IMMEDIATE REENLISTMENT, AND EXTENSION
                </h4>
                <div className="text-xs font-mono text-[#8C9180] pt-1">
                  Professional Education Center · Camp Joseph T. Robinson · North Little Rock Arkansas 72199
                </div>
              </div>

              <div className="space-y-4 text-xs font-mono text-[#DEDCD1]">
                <div className="bg-[#12150F] p-4 border border-[#DEDCD1]/10 space-y-2">
                  <span className="text-[#C09553] font-bold block">Page 2 Excerpt · Core Rules:</span>
                  <p>Rule # 1: Special care for month-end ETS (Feb 29 &rarr; Feb 28 earliest date).</p>
                  <p>Rule # 2: Each segment must include at least 1 digit; no 00 months or 00 days in final answers.</p>
                  <p>Rule # 3: Start to End date calculation: ALWAYS add 1 inclusive day (+ 01).</p>
                  <p>Rule # 4: Ending date (top number) on month-end is always converted to 30.</p>
                  <p>Rule # 5: Borrowing: 1 Year = 12 Months, 1 Month = 30 Days.</p>
                  <p>Rule # 6: Round up final answers so MM &le; 11 and DD &le; 29.</p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Footer */}
        <div className="bg-[#1B2016] border-t border-[#DEDCD1]/15 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <div className="text-[11px] font-barlow text-[#8C9180]">
            <span className="text-[#C09553] font-semibold">SMTB Curriculum:</span> Standard mathematical protocols for DA Form 4836 and NGB Form 602-R.
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopySummary}
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider border border-[#B3A47B]/60 text-[#B3A47B] hover:bg-[#B3A47B]/10 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check size={14} className="text-[#C09553]" /> : <Copy size={14} />}
              <span>{copied ? "Copied" : "Copy Results"}</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-[#B3A47B] hover:bg-[#C09553] text-[#12150F] transition-colors cursor-pointer"
            >
              Close Job Aid
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
