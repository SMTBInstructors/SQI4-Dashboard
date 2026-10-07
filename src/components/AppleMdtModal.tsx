import React, { useState } from 'react';
import { X, Search, Copy, Check, ExternalLink, ShieldAlert, BookOpen, Layers, Award, HelpCircle, CheckCircle2 } from 'lucide-react';

interface AppleMdtModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNotify?: (msg: string) => void;
}

export interface AppleMdtEntry {
  letter: string;
  category: string;
  nonPriorService: string;
  priorService: string;
  primaryRegulations: string[];
  docLinks?: { label: string; href?: string }[];
  keyNotes?: string;
}

export const APPLE_MDT_DOCTRINE: AppleMdtEntry[] = [
  {
    letter: "A",
    category: "Age / Citizenship",
    nonPriorService: "AR 601-210 paras. 2-3 & 2-4 / AOC para. 2-4",
    priorService: "AR 601-210 para. 3-3 / AOC para. 3-3",
    primaryRegulations: ["AR 601-210", "AOC para. 2-4 / 3-3"],
    keyNotes: "Minimum age 17 with parental consent (up to 35th birthday for NPS). U.S. Citizenship or lawful permanent residency verification.",
    docLinks: [
      { label: "AR 601-210 (Paras. 2-3 & 2-4 Age/Citizenship)", href: "https://armypubs.army.mil/epubs/DR_pubs/DR_a/pdf/web/ARN18684_AR601-210_FINAL.pdf" },
      { label: "AOC para. 2-4 & 3-3" }
    ]
  },
  {
    letter: "P",
    category: "Physical",
    nonPriorService: "AR 601-210 para. 2-9, AR 40-501, AR 670-1 para. 3-3 / AOC para. 2-9",
    priorService: "AR 601-210 para. 3-7, AR 670-1 para. 3-3, AR 600-9 / AOC para. 3-7",
    primaryRegulations: ["AR 601-210", "AR 40-501", "AR 670-1 para. 3-3", "AR 600-9", "AOC"],
    keyNotes: "DoDMERB / MEPS physical qualification under AR 40-501, tattoo & body appearance standards under AR 670-1 para. 3-3, body fat compliance under AR 600-9.",
    docLinks: [
      { label: "AR 40-501 (Standards of Medical Fitness)", href: "https://armypubs.army.mil/epubs/DR_pubs/DR_a/pdf/web/ARN3801_AR40-501_Web_FINAL.pdf" },
      { label: "AR 670-1 (Para 3-3 Tattoo/Appearance)", href: "https://armypubs.army.mil/epubs/DR_pubs/DR_a/ARN30297-AR_670-1-000-WEB-1.pdf" },
      { label: "AR 600-9 (Army Body Composition Program)", href: "https://armypubs.army.mil/epubs/DR_pubs/DR_a/ARN37750-AR_600-9-000-WEB-1.pdf" }
    ]
  },
  {
    letter: "P",
    category: "Prior Service",
    nonPriorService: "AR 601-210 para. 3-2",
    priorService: "AR 601-210 paras. 3-2, 3-11, 3-20 / AOC, para. 3-2, Table 4-2",
    primaryRegulations: ["AR 601-210", "AOC Table 4-2"],
    keyNotes: "Verification of RE-Code (RE-1, RE-3 waiverable, RE-4 non-waiverable), DD-214 characterization, and grade determination under AOC Table 4-2.",
    docLinks: [
      { label: "AR 601-210 (Prior Service Enlistment)", href: "https://armypubs.army.mil/epubs/DR_pubs/DR_a/pdf/web/ARN18684_AR601-210_FINAL.pdf" },
      { label: "AOC Table 4-2 (Grade Determination)" }
    ]
  },
  {
    letter: "L",
    category: "Law Violations",
    nonPriorService: "AR 601-210 para. 2-11, Ch. 4 Offense Tables / AOC para. 2-11, Ch. 4",
    priorService: "AR 601-210 para. 2-11, Ch. 4 Offense Tables / AOC par. 2-11, Ch. 4, Table 4-1",
    primaryRegulations: ["AR 601-210 (Ch. 4)", "AOC Ch. 4", "Table 4-1"],
    keyNotes: "Moral waivers: Traffic, Misdemeanor, and Felony classifications. TAG vs NGB waiver approval authority matrix.",
    docLinks: [
      { label: "AR 601-210 (Chapter 4 Waiver Authorities)", href: "https://armypubs.army.mil/epubs/DR_pubs/DR_a/pdf/web/ARN18684_AR601-210_FINAL.pdf" },
      { label: "AOC Table 4-1 (Offense Matrix)" }
    ]
  },
  {
    letter: "E",
    category: "Education",
    nonPriorService: "AR 601-210 para. 2-7 / AOC para. 2-7",
    priorService: "AR 601-210 para. 3-5",
    primaryRegulations: ["AR 601-210", "AOC para. 2-7"],
    keyNotes: "Tier 1 (High school diploma / 15 college credits) vs Tier 2 (GED). Official transcripts and state education requirements.",
    docLinks: [
      { label: "AR 601-210 (Education Tiers & Credentials)", href: "https://armypubs.army.mil/epubs/DR_pubs/DR_a/pdf/web/ARN18684_AR601-210_FINAL.pdf" }
    ]
  },
  {
    letter: "M",
    category: "Marital Status",
    nonPriorService: "AR 601-210 para. 2-10",
    priorService: "AR 601-210 paras. 2-10, 3-8",
    primaryRegulations: ["AR 601-210 (Paras. 2-10 & 3-8)"],
    keyNotes: "Enlistment eligibility criteria regarding marital status, single parent certifications, and spousal military concurrence.",
    docLinks: [
      { label: "AR 601-210 (Marital Provisions)", href: "https://armypubs.army.mil/epubs/DR_pubs/DR_a/pdf/web/ARN18684_AR601-210_FINAL.pdf" }
    ]
  },
  {
    letter: "D",
    category: "Dependents",
    nonPriorService: "AR 601-210 para. 2-10, / AOC para. 4-3(d)",
    priorService: "AR 601-210 paras. 2-10, 3-8 / AOC, para. 4-3(d)",
    primaryRegulations: ["AR 601-210", "AOC para. 4-3(d)"],
    keyNotes: "Dependency caps and restrictions. AOC para. 4-3(d) waiver requirements for applicants exceeding authorized dependent counts.",
    docLinks: [
      { label: "AR 601-210 (Dependency Restrictions)", href: "https://armypubs.army.mil/epubs/DR_pubs/DR_a/pdf/web/ARN18684_AR601-210_FINAL.pdf" },
      { label: "AOC para. 4-3(d) (Dependency Waivers)" }
    ]
  },
  {
    letter: "T",
    category: "Testing",
    nonPriorService: "AR 601-210 para. 2-8 / AOC para. 2-8",
    priorService: "AR 601-210 para. 3-6 / AOC para. 3-6",
    primaryRegulations: ["AR 601-210", "AOC Testing Standards"],
    keyNotes: "Armed Forces Qualification Test (AFQT) percentiles (Tier 1 vs Tier 2), line scores, and MOS trainability under AR 601-210.",
    docLinks: [
      { label: "AR 601-210 (Paras. 2-8 & 3-6 Enlistment Testing)", href: "https://armypubs.army.mil/epubs/DR_pubs/DR_a/pdf/web/ARN18684_AR601-210_FINAL.pdf" },
      { label: "AOC para. 2-8 & 3-6 (Testing Scores)" }
    ]
  }
];

export const AppleMdtModal: React.FC<AppleMdtModalProps> = ({ isOpen, onClose, onNotify }) => {
  const [activeTab, setActiveTab] = useState<'BOTH' | 'NPS' | 'PS' | 'FACSIMILE' | 'FLASHCARDS'>('BOTH');
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);
  
  // Flashcard state
  const [flashcardIdx, setFlashcardIdx] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  if (!isOpen) return null;

  const filteredDoctrine = APPLE_MDT_DOCTRINE.filter((item) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.category.toLowerCase().includes(q) ||
      item.letter.toLowerCase().includes(q) ||
      item.nonPriorService.toLowerCase().includes(q) ||
      item.priorService.toLowerCase().includes(q)
    );
  });

  const fullTextCitations = `IDENTIFY ELIGIBILITY DOCTRINE
APPLE-MDT

Army National Guard
Strength Maintenance Training Battalion (SMTB)
Camp Joseph T. Robinson
Building 3400
North Little Rock AR 72199
805B-SQI4 For Training Purposes Only 20230612

Instructions: Research and record specific reference, including the paragraph, correlating to each of the following:

Non-Prior Service
Age / Citizenship: AR 601-210 paras. 2-3 & 2-4 / AOC para. 2-4
Physical: AR 601-210 para. 2-9, AR 40-501, AR 670-1 para. 3-3 / AOC para. 2-9
Prior Service: AR 601-210 para. 3-2
Law Violations: AR 601-210 para. 2-11, Ch. 4 Offense Tables / AOC para. 2-11, Ch. 4
Education: AR 601-210 para. 2-7 / AOC para. 2-7
Marital Status: AR 601-210 para. 2-10
Dependents: AR 601-210 para. 2-10, / AOC para. 4-3(d)
Testing: AR 601-210 para. 2-8 / AOC para. 2-8

Prior Service
Age / Citizenship: AR 601-210 para. 3-3 / AOC para. 3-3
Physical: AR 601-210 para. 3-7, AR 670-1 para. 3-3, AR 600-9 / AOC para. 3-7
Prior Service: AR 601-210 paras. 3-2, 3-11, 3-20 / AOC, para. 3-2, Table 4-2
Law Violations: AR 601-210 para. 2-11, Ch. 4 Offense Tables / AOC par. 2-11, Ch. 4, Table 4-1
Education: AR 601-210 para. 3-5
Marital Status: AR 601-210 paras. 2-10, 3-8
Dependents: AR 601-210 paras. 2-10, 3-8 / AOC, para. 4-3(d)
Testing: AR 601-210 para. 3-6 / AOC para. 3-6`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullTextCitations);
    setCopied(true);
    if (onNotify) {
      onNotify("APPLE-MDT Eligibility Doctrine copied to clipboard");
    }
    setTimeout(() => setCopied(false), 2200);
  };

  const currentFlashcard = APPLE_MDT_DOCTRINE[flashcardIdx];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-[#12150F] border border-[#B3A47B] max-w-4xl w-full my-auto shadow-2xl relative flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Document Header Bar */}
        <div className="bg-[#1B2016] border-b border-[#DEDCD1]/15 px-6 py-4 flex items-start justify-between gap-4 shrink-0">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-[#C09553] text-[#12150F] font-barlow font-bold text-[10px] tracking-[0.2em] uppercase px-2 py-0.5">
                805B-SQI4 · SMTB
              </span>
              <span className="font-barlow text-[11px] text-[#8C9180] uppercase tracking-wider">
                For Training Purposes Only · 20230612
              </span>
            </div>
            <h2 className="font-oswald text-2xl sm:text-3xl font-light text-[#DEDCD1] uppercase tracking-wide">
              Identify Eligibility Doctrine · APPLE-MDT
            </h2>
            <p className="text-xs font-barlow text-[#8C9180]">
              Army National Guard · Strength Maintenance Training Battalion (SMTB) · Camp Joseph T. Robinson, Building 3400
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleCopy}
              className="p-2 border border-[#B3A47B]/50 hover:bg-[#B3A47B]/10 text-[#B3A47B] text-xs font-barlow uppercase flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Copy All Regulatory Citations"
            >
              {copied ? <Check size={14} className="text-[#C09553]" /> : <Copy size={14} />}
              <span className="hidden sm:inline">{copied ? "Copied" : "Copy Citations"}</span>
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

        {/* Doctrine Instructions Callout */}
        <div className="bg-[#1B2016]/60 border-b border-[#DEDCD1]/10 px-6 py-3 shrink-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-barlow">
          <div className="text-[#DEDCD1] flex items-center gap-2">
            <ShieldAlert size={15} className="text-[#C09553] shrink-0" />
            <span>
              <strong>Cadre Instruction:</strong> Research and record specific reference, including the paragraph, correlating to each of the following:
            </span>
          </div>

          {/* Quick Search */}
          <div className="relative shrink-0">
            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#8C9180]" />
            <input
              type="text"
              placeholder="Search category / paragraph..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#12150F] border border-[#DEDCD1]/20 pl-8 pr-3 py-1 text-xs text-[#DEDCD1] placeholder-[#8C9180] focus:outline-none focus:border-[#B3A47B] w-48 sm:w-56"
            />
          </div>
        </div>

        {/* View Mode Tabs */}
        <div className="px-6 pt-3 pb-2 bg-[#12150F] border-b border-[#DEDCD1]/10 flex items-center gap-2 shrink-0 flex-wrap">
          <button
            onClick={() => setActiveTab('BOTH')}
            className={`px-3 py-1 text-xs font-barlow uppercase tracking-wider font-semibold border transition-colors cursor-pointer ${
              activeTab === 'BOTH'
                ? 'bg-[#B3A47B] text-[#12150F] border-[#B3A47B]'
                : 'text-[#8C9180] border-[#DEDCD1]/15 hover:text-[#DEDCD1]'
            }`}
          >
            Combined Comparison
          </button>
          <button
            onClick={() => setActiveTab('NPS')}
            className={`px-3 py-1 text-xs font-barlow uppercase tracking-wider font-semibold border transition-colors cursor-pointer ${
              activeTab === 'NPS'
                ? 'bg-[#B3A47B] text-[#12150F] border-[#B3A47B]'
                : 'text-[#8C9180] border-[#DEDCD1]/15 hover:text-[#DEDCD1]'
            }`}
          >
            Non-Prior Service (NPS)
          </button>
          <button
            onClick={() => setActiveTab('PS')}
            className={`px-3 py-1 text-xs font-barlow uppercase tracking-wider font-semibold border transition-colors cursor-pointer ${
              activeTab === 'PS'
                ? 'bg-[#B3A47B] text-[#12150F] border-[#B3A47B]'
                : 'text-[#8C9180] border-[#DEDCD1]/15 hover:text-[#DEDCD1]'
            }`}
          >
            Prior Service (PS)
          </button>
          <button
            onClick={() => setActiveTab('FACSIMILE')}
            className={`px-3 py-1 text-xs font-barlow uppercase tracking-wider font-semibold border transition-colors cursor-pointer ${
              activeTab === 'FACSIMILE'
                ? 'bg-[#C09553] text-[#12150F] border-[#C09553]'
                : 'text-[#8C9180] border-[#DEDCD1]/15 hover:text-[#DEDCD1]'
            }`}
          >
            Original SMTB Publication View
          </button>
          <button
            onClick={() => setActiveTab('FLASHCARDS')}
            className={`px-3 py-1 text-xs font-barlow uppercase tracking-wider font-semibold border transition-colors cursor-pointer ${
              activeTab === 'FLASHCARDS'
                ? 'bg-[#8C9180] text-[#12150F] border-[#8C9180]'
                : 'text-[#8C9180] border-[#DEDCD1]/15 hover:text-[#DEDCD1]'
            }`}
          >
            Study Flashcards
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-4 flex-1">
          {activeTab === 'FACSIMILE' ? (
            /* Exact Authentic Document Facsimile */
            <div className="bg-[#1B2016] border border-[#DEDCD1]/20 p-6 sm:p-10 space-y-8 font-serif max-w-2xl mx-auto shadow-inner">
              <div className="text-center space-y-2 border-b border-[#DEDCD1]/20 pb-6">
                <span className="text-[10px] font-mono tracking-widest text-[#8C9180] block">
                  805B-SQI4 · FOR TRAINING PURPOSES ONLY · 20230612
                </span>
                <h3 className="font-oswald text-2xl sm:text-3xl uppercase tracking-widest text-[#DEDCD1]">
                  IDENTIFY ELIGIBILITY DOCTRINE
                </h3>
                <h4 className="font-oswald text-xl tracking-widest text-[#C09553]">
                  APPLE-MDT
                </h4>
                <div className="text-xs font-mono text-[#8C9180] pt-1">
                  Army National Guard · Strength Maintenance Training Battalion (SMTB)<br />
                  Camp Joseph T. Robinson · Building 3400 · North Little Rock AR 72199
                </div>
              </div>

              <div className="space-y-6 text-sm text-[#DEDCD1]">
                <p className="italic text-xs text-[#8C9180]">
                  Instructions: Research and record specific reference, including the paragraph, correlating to each of the following:
                </p>

                {/* Non-Prior Service Section */}
                <div className="space-y-3">
                  <h5 className="font-oswald text-base text-[#B3A47B] uppercase tracking-wider underline underline-offset-4">
                    Non-Prior Service
                  </h5>
                  <div className="space-y-2 font-mono text-xs text-[#DEDCD1]/90 pl-2">
                    {APPLE_MDT_DOCTRINE.map((item, idx) => (
                      <div key={idx} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                        <span className="font-bold text-[#C09553] shrink-0 min-w-[130px]">
                          {item.category}:
                        </span>
                        <span className="text-[#DEDCD1] underline decoration-[#DEDCD1]/30">
                          {item.nonPriorService}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Prior Service Section */}
                <div className="space-y-3 pt-4 border-t border-[#DEDCD1]/15">
                  <h5 className="font-oswald text-base text-[#B3A47B] uppercase tracking-wider underline underline-offset-4">
                    Prior Service
                  </h5>
                  <div className="space-y-2 font-mono text-xs text-[#DEDCD1]/90 pl-2">
                    {APPLE_MDT_DOCTRINE.map((item, idx) => (
                      <div key={idx} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                        <span className="font-bold text-[#C09553] shrink-0 min-w-[130px]">
                          {item.category}:
                        </span>
                        <span className="text-[#DEDCD1] underline decoration-[#DEDCD1]/30">
                          {item.priorService}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : activeTab === 'FLASHCARDS' ? (
            /* Interactive Flashcards Study Mode */
            <div className="max-w-xl mx-auto py-6 space-y-6">
              <div className="flex items-center justify-between text-xs font-barlow text-[#8C9180]">
                <span>Criterion {flashcardIdx + 1} of {APPLE_MDT_DOCTRINE.length}</span>
                <span className="font-oswald text-sm text-[#C09553] tracking-widest uppercase">
                  APPLE-MDT Flashcard
                </span>
              </div>

              <div 
                onClick={() => setShowAnswer(!showAnswer)}
                className="bg-[#1B2016] border-2 border-[#B3A47B] p-8 text-center cursor-pointer min-h-[260px] flex flex-col items-center justify-center space-y-4 hover:border-[#C09553] transition-all shadow-xl group"
              >
                <span className="w-12 h-12 bg-[#C09553] text-[#12150F] font-oswald text-2xl font-bold flex items-center justify-center">
                  {currentFlashcard.letter}
                </span>

                <div className="space-y-1">
                  <h4 className="font-oswald text-2xl text-[#DEDCD1] uppercase tracking-wider">
                    {currentFlashcard.category}
                  </h4>
                  <p className="text-xs text-[#8C9180]">
                    {showAnswer ? "Click card to hide citations" : "Click anywhere on card to reveal regulatory paragraphs"}
                  </p>
                </div>

                {showAnswer ? (
                  <div className="w-full space-y-3 pt-3 border-t border-[#DEDCD1]/15 text-left font-mono text-xs animate-fadeIn">
                    <div className="bg-[#12150F] p-3 border border-[#DEDCD1]/10">
                      <span className="text-[#C09553] font-bold block uppercase text-[10px]">
                        Non-Prior Service (NPS):
                      </span>
                      <span className="text-[#DEDCD1] text-xs">
                        {currentFlashcard.nonPriorService}
                      </span>
                    </div>

                    <div className="bg-[#12150F] p-3 border border-[#DEDCD1]/10">
                      <span className="text-[#B3A47B] font-bold block uppercase text-[10px]">
                        Prior Service (PS):
                      </span>
                      <span className="text-[#DEDCD1] text-xs">
                        {currentFlashcard.priorService}
                      </span>
                    </div>

                    {currentFlashcard.keyNotes && (
                      <p className="text-[11px] font-barlow text-[#8C9180] italic pt-1">
                        Key Context: {currentFlashcard.keyNotes}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="py-6 text-xs font-barlow text-[#8C9180] group-hover:text-[#DEDCD1] transition-colors flex items-center gap-1.5">
                    <HelpCircle size={15} />
                    <span>Reveal Non-Prior & Prior Service Citations</span>
                  </div>
                )}
              </div>

              {/* Navigation controls */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => {
                    setShowAnswer(false);
                    setFlashcardIdx((prev) => (prev > 0 ? prev - 1 : APPLE_MDT_DOCTRINE.length - 1));
                  }}
                  className="px-4 py-2 border border-[#DEDCD1]/20 text-[#DEDCD1] text-xs uppercase font-barlow font-semibold hover:border-[#B3A47B] transition-colors cursor-pointer"
                >
                  &larr; Previous
                </button>

                <div className="flex items-center gap-1">
                  {APPLE_MDT_DOCTRINE.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setShowAnswer(false);
                        setFlashcardIdx(idx);
                      }}
                      className={`w-6 h-6 text-[10px] font-oswald font-bold transition-colors cursor-pointer ${
                        flashcardIdx === idx
                          ? 'bg-[#B3A47B] text-[#12150F]'
                          : 'bg-[#12150F] text-[#8C9180] hover:text-[#DEDCD1]'
                      }`}
                    >
                      {item.letter}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => {
                    setShowAnswer(false);
                    setFlashcardIdx((prev) => (prev < APPLE_MDT_DOCTRINE.length - 1 ? prev + 1 : 0));
                  }}
                  className="px-4 py-2 bg-[#B3A47B] text-[#12150F] text-xs uppercase font-barlow font-semibold hover:bg-[#C09553] transition-colors cursor-pointer"
                >
                  Next &rarr;
                </button>
              </div>
            </div>
          ) : (
            /* Interactive Matrix Table / Cards */
            <div className="space-y-3">
              {filteredDoctrine.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#1B2016] border border-[#DEDCD1]/15 p-4 sm:p-5 transition-colors hover:border-[#B3A47B]/50"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#DEDCD1]/10">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-none bg-[#C09553] text-[#12150F] font-oswald font-bold text-lg flex items-center justify-center shrink-0">
                        {item.letter}
                      </span>
                      <div>
                        <h4 className="font-oswald text-lg font-normal text-[#DEDCD1] uppercase tracking-wide">
                          {item.category}
                        </h4>
                        <span className="text-[10px] font-barlow uppercase text-[#8C9180] tracking-wider">
                          APPLE-MDT Criterion {idx + 1} of 8
                        </span>
                      </div>
                    </div>

                    {/* Primary Regulations Badges */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      {item.primaryRegulations.map((reg, rIdx) => (
                        <span
                          key={rIdx}
                          className="text-[10px] font-barlow font-semibold uppercase px-2 py-0.5 bg-[#12150F] text-[#B3A47B] border border-[#B3A47B]/30"
                        >
                          {reg}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Body Comparison */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3">
                    {/* NPS */}
                    {(activeTab === 'BOTH' || activeTab === 'NPS') && (
                      <div className="bg-[#12150F] p-3.5 border border-[#DEDCD1]/10 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-oswald uppercase tracking-wider text-[#C09553] font-semibold">
                            Non-Prior Service (NPS):
                          </span>
                          <span className="text-[9px] uppercase px-1.5 py-0.5 bg-[#C09553]/15 text-[#C09553] font-mono">
                            NPS Crosswalk
                          </span>
                        </div>
                        <p className="font-mono text-xs sm:text-[13px] text-[#DEDCD1] font-medium leading-relaxed">
                          {item.nonPriorService}
                        </p>
                      </div>
                    )}

                    {/* PS */}
                    {(activeTab === 'BOTH' || activeTab === 'PS') && (
                      <div className="bg-[#12150F] p-3.5 border border-[#DEDCD1]/10 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-oswald uppercase tracking-wider text-[#B3A47B] font-semibold">
                            Prior Service (PS):
                          </span>
                          <span className="text-[9px] uppercase px-1.5 py-0.5 bg-[#B3A47B]/15 text-[#B3A47B] font-mono">
                            PS Crosswalk
                          </span>
                        </div>
                        <p className="font-mono text-xs sm:text-[13px] text-[#DEDCD1] font-medium leading-relaxed">
                          {item.priorService}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Key Notes */}
                  {item.keyNotes && (
                    <div className="mt-3 pt-2 text-[11px] font-barlow text-[#8C9180] flex items-center gap-1.5">
                      <span className="text-[#B3A47B] font-semibold uppercase text-[10px]">Context:</span>
                      <span>{item.keyNotes}</span>
                    </div>
                  )}

                  {/* Quick Doc Links if present */}
                  {item.docLinks && item.docLinks.length > 0 && (
                    <div className="pt-2 mt-2 border-t border-[#DEDCD1]/10 flex flex-wrap items-center gap-3">
                      <span className="text-[10px] font-barlow uppercase text-[#8C9180] tracking-wider">
                        Regulatory Links:
                      </span>
                      {item.docLinks.map((link, lIdx) => (
                        link.href ? (
                          <a
                            key={lIdx}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] font-barlow text-[#C09553] hover:text-[#B3A47B] inline-flex items-center gap-1 underline underline-offset-2"
                          >
                            <span>{link.label}</span>
                            <ExternalLink size={10} />
                          </a>
                        ) : (
                          <span key={lIdx} className="text-[11px] font-barlow text-[#8C9180]">
                            {link.label}
                          </span>
                        )
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-[#1B2016] border-t border-[#DEDCD1]/15 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <div className="text-[11px] font-barlow text-[#8C9180]">
            <span className="text-[#C09553] font-semibold">Standard:</span> AR 601-210, AR 40-501, AR 670-1 para. 3-3, AR 600-9 & AOC Paragraph Crosswalk · SMTB Building 3400
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider border border-[#B3A47B]/60 text-[#B3A47B] hover:bg-[#B3A47B]/10 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check size={14} className="text-[#C09553]" /> : <Copy size={14} />}
              <span>{copied ? "Copied" : "Copy Citations"}</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-[#B3A47B] hover:bg-[#C09553] text-[#12150F] transition-colors cursor-pointer"
            >
              Close Doctrine Tool
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
