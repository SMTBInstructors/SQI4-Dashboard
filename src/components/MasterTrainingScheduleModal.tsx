import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, User, BookOpen, AlertCircle, Download, Search, Filter } from 'lucide-react';
import { MASTER_TRAINING_SCHEDULE, SchedulePeriod } from '../data/masterScheduleData';

interface MasterTrainingScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDay?: number;
}

export const MasterTrainingScheduleModal: React.FC<MasterTrainingScheduleModalProps> = ({
  isOpen,
  onClose,
  initialDay = 1
}) => {
  const [selectedDay, setSelectedDay] = useState<number>(initialDay);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  if (!isOpen) return null;

  const weeks = [
    { num: 1, range: "Days 1–5", dates: "19–23 Oct 2026", title: "Eligibility & Written Exam 1" },
    { num: 2, range: "Days 6–10", dates: "26–30 Oct 2026", title: "Options, Programs & Written Exam 2" },
    { num: 3, range: "Days 11–15", dates: "2–6 Nov 2026", title: "Prospecting & RRNCO Work Plan" },
    { num: 4, range: "Days 16–20", dates: "9–13 Nov 2026", title: "Applicant Processing & SEV Presentation" },
    { num: 5, range: "Days 21–25", dates: "16–20 Nov 2026", title: "Guard X Evaluations & Graduation" },
  ];

  const currentWeekNum = Math.ceil(selectedDay / 5);

  const filteredPeriods = MASTER_TRAINING_SCHEDULE.filter((p) => {
    // Day match
    if (selectedDay !== 0 && p.dayNumber !== selectedDay) return false;
    
    // Category match
    if (selectedCategory === 'EVAL' && !(p.isEvaluation || p.isRetest)) return false;
    if (selectedCategory === 'PT' && !p.isPT) return false;
    if (selectedCategory === 'MILESTONE' && !p.isMilestone) return false;

    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchSub = p.subject.toLowerCase().includes(q);
      const matchRef = p.reference.toLowerCase().includes(q);
      const matchInst = p.instructor.toLowerCase().includes(q);
      const matchLoc = p.location.toLowerCase().includes(q);
      return matchSub || matchRef || matchInst || matchLoc;
    }

    return true;
  });

  const selectedDayPeriod = MASTER_TRAINING_SCHEDULE.find(p => p.dayNumber === selectedDay);

  const pdfUrl = "/documents/NCRC_27-001_Master_Training_Schedule.pdf";

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-[#12150F] border border-[#B3A47B] max-w-5xl w-full my-auto shadow-2xl relative flex flex-col max-h-[94vh] overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#1B2016] border-b border-[#DEDCD1]/15 px-6 py-4 flex items-start justify-between gap-4 shrink-0">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-[#C09553] text-[#12150F] font-barlow font-bold text-[10px] tracking-[0.2em] uppercase px-2 py-0.5">
                Official Schedule
              </span>
              <span className="font-barlow text-[11px] text-[#B3A47B] uppercase tracking-wider font-semibold">
                NCRC 27-001 · Class 27-001 (19 Oct – 20 Nov 2026)
              </span>
            </div>
            <h2 className="font-oswald text-2xl sm:text-3xl font-light text-[#DEDCD1] uppercase tracking-wide">
              Master Training Schedule (MTS)
            </h2>
            <p className="text-xs font-barlow text-[#8C9180]">
              Strength Maintenance Training Battalion (SMTB) · Camp Joseph T. Robinson
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={pdfUrl}
              download="NCRC_27-001_Master_Training_Schedule.pdf"
              className="p-2 border border-[#C09553] bg-[#C09553]/10 hover:bg-[#C09553]/20 text-[#C09553] text-xs font-barlow uppercase flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Download Master Training Schedule PDF"
            >
              <Download size={14} />
              <span className="hidden sm:inline">Download MTS PDF</span>
            </a>

            <button
              onClick={onClose}
              className="p-2 text-[#8C9180] hover:text-[#DEDCD1] hover:bg-[#DEDCD1]/10 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Filter Ribbon & Week Controls */}
        <div className="bg-[#1B2016]/60 border-b border-[#DEDCD1]/10 px-6 py-3 shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs font-barlow">
          {/* Week Jump */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] uppercase font-bold text-[#8C9180] tracking-wider mr-1">
              Week:
            </span>
            {weeks.map((w) => (
              <button
                key={w.num}
                onClick={() => setSelectedDay((w.num - 1) * 5 + 1)}
                className={`px-2.5 py-1 text-xs uppercase border transition-colors cursor-pointer ${
                  currentWeekNum === w.num && selectedDay !== 0
                    ? 'bg-[#B3A47B] text-[#12150F] border-[#B3A47B] font-bold'
                    : 'bg-[#12150F] text-[#8C9180] border-[#DEDCD1]/15 hover:text-[#DEDCD1]'
                }`}
              >
                W{w.num} ({w.range})
              </button>
            ))}
            <button
              onClick={() => setSelectedDay(0)}
              className={`px-2.5 py-1 text-xs uppercase border transition-colors cursor-pointer ${
                selectedDay === 0
                  ? 'bg-[#C09553] text-[#12150F] border-[#C09553] font-bold'
                  : 'bg-[#12150F] text-[#8C9180] border-[#DEDCD1]/15 hover:text-[#DEDCD1]'
              }`}
            >
              All 25 Days
            </button>
          </div>

          {/* Search Input */}
          <div className="flex items-center gap-2">
            <div className="relative w-full sm:w-64">
              <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#8C9180]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search subject, location (Guard X)..."
                className="w-full bg-[#12150F] border border-[#DEDCD1]/20 pl-8 pr-2 py-1 text-xs text-[#DEDCD1] placeholder-[#8C9180]/60 focus:outline-none focus:border-[#B3A47B]"
              />
            </div>
          </div>
        </div>

        {/* Day Selector Ribbon (when not in "All Days" view) */}
        {selectedDay !== 0 && (
          <div className="px-6 py-2 bg-[#12150F] border-b border-[#DEDCD1]/10 flex items-center justify-between gap-2 overflow-x-auto shrink-0">
            <div className="flex items-center gap-1.5 shrink-0">
              {Array.from({ length: 5 }, (_, i) => (currentWeekNum - 1) * 5 + 1 + i).map((day) => {
                const p = MASTER_TRAINING_SCHEDULE.find(item => item.dayNumber === day);
                const isSelected = selectedDay === day;
                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`px-3 py-1.5 text-xs font-barlow uppercase border text-center transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#C09553] text-[#12150F] border-[#C09553] font-bold shadow-md'
                        : 'bg-[#1B2016] text-[#8C9180] border-[#DEDCD1]/15 hover:text-[#DEDCD1]'
                    }`}
                  >
                    <span className="block font-semibold">Day {day}</span>
                    <span className="block text-[10px] opacity-75">{p?.dayOfWeek.slice(0, 3)} {p?.dateStr.split('-')[0]} {p?.dateStr.split('-')[1]}</span>
                  </button>
                );
              })}
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => setSelectedCategory('ALL')}
                className={`px-2 py-0.5 text-[10px] font-barlow uppercase border ${
                  selectedCategory === 'ALL'
                    ? 'border-[#B3A47B] bg-[#B3A47B]/20 text-[#B3A47B] font-bold'
                    : 'border-[#DEDCD1]/15 text-[#8C9180]'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedCategory('EVAL')}
                className={`px-2 py-0.5 text-[10px] font-barlow uppercase border ${
                  selectedCategory === 'EVAL'
                    ? 'border-[#C09553] bg-[#C09553]/20 text-[#C09553] font-bold'
                    : 'border-[#DEDCD1]/15 text-[#8C9180]'
                }`}
              >
                Evals & Retests
              </button>
              <button
                onClick={() => setSelectedCategory('PT')}
                className={`px-2 py-0.5 text-[10px] font-barlow uppercase border ${
                  selectedCategory === 'PT'
                    ? 'border-[#B3A47B] bg-[#B3A47B]/20 text-[#B3A47B] font-bold'
                    : 'border-[#DEDCD1]/15 text-[#8C9180]'
                }`}
              >
                PRT
              </button>
            </div>
          </div>
        )}

        {/* Selected Day Banner */}
        {selectedDay !== 0 && selectedDayPeriod && (
          <div className="bg-[#1B2016] border-b border-[#DEDCD1]/10 px-6 py-2 flex items-center justify-between text-xs font-barlow shrink-0">
            <div className="flex items-center gap-2">
              <span className="font-oswald text-sm text-[#C09553] font-bold uppercase">
                Day {selectedDay} · {selectedDayPeriod.dayOfWeek} ({selectedDayPeriod.dateStr})
              </span>
              <span className="text-[#8C9180]">
                — {weeks[currentWeekNum - 1].title}
              </span>
            </div>
            <span className="text-[11px] text-[#8C9180]">
              {filteredPeriods.length} Scheduled Periods
            </span>
          </div>
        )}

        {/* Periods Table */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-3 flex-1">
          {filteredPeriods.length === 0 ? (
            <div className="p-8 text-center text-xs font-barlow text-[#8C9180] border border-dashed border-[#DEDCD1]/20">
              No periods matching the selected filters.
            </div>
          ) : (
            <div className="space-y-2">
              {filteredPeriods.map((period) => {
                const isEval = period.isEvaluation || period.isRetest;
                const isPT = period.isPT;

                return (
                  <div
                    key={period.id}
                    className={`p-3.5 border transition-all text-xs font-barlow flex flex-col md:flex-row md:items-center justify-between gap-3 ${
                      period.isEvaluation
                        ? 'bg-[#1B2016] border-[#C09553] shadow-md'
                        : period.isRetest
                        ? 'bg-[#1B2016] border-[#B3A47B]/80'
                        : isPT
                        ? 'bg-[#12150F] border-[#B3A47B]/40'
                        : 'bg-[#12150F] border-[#DEDCD1]/15 hover:border-[#DEDCD1]/30'
                    }`}
                  >
                    {/* Time & Day */}
                    <div className="flex items-center gap-3 shrink-0 sm:w-48">
                      {selectedDay === 0 && (
                        <span className="px-1.5 py-0.5 text-[9px] font-oswald bg-[#B3A47B]/20 text-[#B3A47B] border border-[#B3A47B]/40 uppercase font-bold">
                          D{period.dayNumber}
                        </span>
                      )}
                      <div className="flex items-center gap-1.5 text-[#DEDCD1]">
                        <Clock size={12} className="text-[#8C9180]" />
                        <span className="font-mono font-semibold">{period.time}</span>
                      </div>
                    </div>

                    {/* Subject & Reference */}
                    <div className="flex-1 space-y-0.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className={`font-oswald text-sm font-normal uppercase ${
                          period.isEvaluation
                            ? 'text-[#C09553] font-semibold'
                            : period.isRetest
                            ? 'text-[#B3A47B]'
                            : 'text-[#DEDCD1]'
                        }`}>
                          {period.subject}
                        </h4>
                        {period.isEvaluation && (
                          <span className="px-2 py-0.5 text-[9px] uppercase font-bold bg-[#C09553] text-[#12150F]">
                            Graded Evaluation
                          </span>
                        )}
                        {period.isRetest && (
                          <span className="px-2 py-0.5 text-[9px] uppercase font-bold border border-[#B3A47B] text-[#B3A47B]">
                            Retest
                          </span>
                        )}
                        {period.isMilestone && !isEval && (
                          <span className="px-2 py-0.5 text-[9px] uppercase border border-[#8C9180]/40 text-[#8C9180]">
                            Milestone
                          </span>
                        )}
                      </div>

                      <div className="text-[11px] text-[#8C9180] flex items-center gap-3 flex-wrap">
                        <span><strong className="text-[#DEDCD1]">Ref:</strong> {period.reference}</span>
                        <span><strong className="text-[#DEDCD1]">Hrs:</strong> {period.hours}</span>
                      </div>
                    </div>

                    {/* Instructor & Location */}
                    <div className="flex items-center gap-4 text-[11px] shrink-0 sm:w-64 justify-start md:justify-end">
                      <div className="flex items-center gap-1 text-[#8C9180]">
                        <User size={12} className="text-[#8C9180]" />
                        <span>{period.instructor}</span>
                      </div>

                      <div className="flex items-center gap-1 text-[#C09553] bg-[#1B2016] px-2 py-0.5 border border-[#DEDCD1]/15">
                        <MapPin size={11} />
                        <span className="font-semibold">{period.location}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-[#1B2016] border-t border-[#DEDCD1]/15 px-6 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-barlow shrink-0">
          <div className="text-[#8C9180]">
            <span className="text-[#C09553] font-semibold">Master Training Schedule:</span> 185 Academic Hours · 18 Administrative Hours · Class 27-001.
          </div>

          <div className="flex items-center gap-2">
            <a
              href={pdfUrl}
              download="NCRC_27-001_Master_Training_Schedule.pdf"
              className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider border border-[#C09553] text-[#C09553] hover:bg-[#C09553]/10 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Download size={13} />
              <span>Download PDF</span>
            </a>
            <button
              onClick={onClose}
              className="px-4 py-1.5 text-xs font-semibold uppercase tracking-wider bg-[#B3A47B] hover:bg-[#C09553] text-[#12150F] transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
