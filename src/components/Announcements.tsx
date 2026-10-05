import React, { useState } from 'react';
import { EVALUATION_ANNOUNCEMENTS } from '../data/courseData';
import { formatTrainingDayDate, formatTrainingDayShort } from '../utils/dayUtils';
import { AlertCircle, Clock, Calendar, ChevronRight, ChevronLeft, Award } from 'lucide-react';

interface AnnouncementsProps {
  currentDay?: number;
}

const WEEKS = [
  { week: 1, label: 'Wk 1 (19–23 Oct)', startDay: 1 },
  { week: 2, label: 'Wk 2 (26–30 Oct)', startDay: 6 },
  { week: 3, label: 'Wk 3 (02–06 Nov)', startDay: 11 },
  { week: 4, label: 'Wk 4 (09–13 Nov)', startDay: 16 },
  { week: 5, label: 'Wk 5 (16–20 Nov)', startDay: 21 },
];

export const Announcements: React.FC<AnnouncementsProps> = () => {
  // Calendar explicitly starts on Day 1 (19 Oct)
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [filterType, setFilterType] = useState<'ACTIVE' | 'ALL' | 'written' | 'performance' | 'module'>('ACTIVE');

  // Notices announced on the selected day (scheduled day before due)
  const dayNotices = EVALUATION_ANNOUNCEMENTS.filter((item) => item.announceDay === selectedDay);

  // Next upcoming announcement if current selected day has none
  const nextUpcomingNotice = EVALUATION_ANNOUNCEMENTS.find((item) => item.announceDay > selectedDay) 
    || EVALUATION_ANNOUNCEMENTS[0];

  // Filtered list for the notices grid
  const filteredNotices = EVALUATION_ANNOUNCEMENTS.filter((item) => {
    if (filterType === 'ACTIVE') {
      return item.announceDay === selectedDay;
    }
    if (filterType === 'written') return item.type === 'written';
    if (filterType === 'performance') return item.type === 'performance';
    if (filterType === 'module') return item.type === 'module';
    return true; // 'ALL'
  });

  const handlePrevDay = () => {
    setSelectedDay((prev) => Math.max(1, prev - 1));
    setFilterType('ACTIVE');
  };

  const handleNextDay = () => {
    setSelectedDay((prev) => Math.min(25, prev + 1));
    setFilterType('ACTIVE');
  };

  return (
    <section id="announcements" className="bg-[#12150F] border-b border-[#DEDCD1]/15 py-14 sm:py-20">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#DEDCD1]/15">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2">
              <span className="bg-[#B3A47B] text-[#12150F] font-barlow font-bold text-[11px] tracking-[0.24em] uppercase px-3 py-1">
                Announcement Calendar
              </span>
              <span className="font-barlow text-xs uppercase tracking-[0.2em] text-[#C09553] font-semibold">
                19 Oct – 20 Nov 2026 · Days 01–25
              </span>
            </div>

            <h2 className="font-oswald text-3xl sm:text-5xl lg:text-6xl font-light tracking-[0.12em] text-[#DEDCD1] uppercase leading-tight">
              Announcements
            </h2>
            <p className="font-barlow text-sm sm:text-base text-[#8C9180] leading-relaxed">
              Course announcement timeline starting on the first day of class (19 Oct) through graduation (20 Nov). Evaluation directives are published the training day before each evaluation is due.
            </p>
          </div>

          {/* Quick Date Range Cockpit Card */}
          <div className="bg-[#1B2016] border border-[#DEDCD1]/20 p-4 shrink-0 flex items-center gap-5">
            <div>
              <span className="text-[10px] font-barlow uppercase tracking-wider text-[#8C9180] block">
                Class Schedule
              </span>
              <span className="font-oswald text-lg text-[#DEDCD1]">
                19 OCT – 20 NOV 2026
              </span>
              <span className="text-[11px] font-barlow text-[#C09553] block">
                25 Training Days · NCRC 27-001
              </span>
            </div>
          </div>
        </div>

        {/* ── COURSE TIMELINE STEPPER (19 OCT – 20 NOV) ── */}
        <div className="bg-[#1B2016]/80 border border-[#DEDCD1]/20 p-4 sm:p-5 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Week Fast-Jump Chips */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-barlow uppercase tracking-wider text-[#8C9180] mr-1">
                Jump to Week:
              </span>
              {WEEKS.map((w) => {
                const isCurrentWeek = selectedDay >= w.startDay && selectedDay < w.startDay + 5;
                return (
                  <button
                    key={w.week}
                    onClick={() => {
                      setSelectedDay(w.startDay);
                      setFilterType('ACTIVE');
                    }}
                    className={`px-2.5 py-1 text-xs font-barlow uppercase font-medium border transition-colors cursor-pointer ${
                      isCurrentWeek
                        ? 'bg-[#C09553] text-[#12150F] border-[#C09553] font-bold'
                        : 'bg-[#12150F] text-[#8C9180] border-[#DEDCD1]/20 hover:border-[#B3A47B] hover:text-[#DEDCD1]'
                    }`}
                  >
                    {w.label}
                  </button>
                );
              })}
            </div>

            {/* Quick First Day / Graduation Shortcuts */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setSelectedDay(1);
                  setFilterType('ACTIVE');
                }}
                className={`px-3 py-1 text-xs font-barlow uppercase border transition-colors cursor-pointer ${
                  selectedDay === 1
                    ? 'bg-[#B3A47B] text-[#12150F] border-[#B3A47B] font-bold'
                    : 'bg-[#12150F] text-[#8C9180] border-[#DEDCD1]/20 hover:text-[#DEDCD1]'
                }`}
              >
                Day 01 · 19 Oct (First Day)
              </button>
              <button
                onClick={() => {
                  setSelectedDay(25);
                  setFilterType('ACTIVE');
                }}
                className={`px-3 py-1 text-xs font-barlow uppercase border transition-colors cursor-pointer ${
                  selectedDay === 25
                    ? 'bg-[#C09553] text-[#12150F] border-[#C09553] font-bold'
                    : 'bg-[#12150F] text-[#8C9180] border-[#DEDCD1]/20 hover:text-[#DEDCD1]'
                }`}
              >
                Day 25 · 20 Nov (Graduation)
              </button>
            </div>
          </div>

          {/* Stepper Control Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-[#DEDCD1]/10">
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrevDay}
                disabled={selectedDay <= 1}
                className="p-2 border border-[#DEDCD1]/20 bg-[#12150F] text-[#DEDCD1] hover:border-[#B3A47B] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                title="Previous Training Day"
                aria-label="Previous Training Day"
              >
                <ChevronLeft size={16} />
              </button>

              <div className="flex items-baseline gap-2">
                <span className="font-oswald text-2xl font-light text-[#B3A47B]">
                  Day {selectedDay < 10 ? `0${selectedDay}` : selectedDay}
                </span>
                <span className="text-[#DEDCD1]/30">/</span>
                <span className="font-barlow text-sm font-semibold uppercase tracking-wider text-[#DEDCD1]">
                  {formatTrainingDayDate(selectedDay)}
                </span>
                {selectedDay === 1 && (
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 bg-[#B3A47B]/20 text-[#C09553] border border-[#C09553]/40 ml-1">
                    First Day of Class
                  </span>
                )}
                {selectedDay === 25 && (
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 bg-[#C09553]/20 text-[#C09553] border border-[#C09553]/40 ml-1">
                    Graduation Day
                  </span>
                )}
              </div>

              <button
                onClick={handleNextDay}
                disabled={selectedDay >= 25}
                className="p-2 border border-[#DEDCD1]/20 bg-[#12150F] text-[#DEDCD1] hover:border-[#B3A47B] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                title="Next Training Day"
                aria-label="Next Training Day"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Direct 25-Day Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-barlow text-[#8C9180]">Select Day:</span>
              <select
                value={selectedDay}
                onChange={(e) => {
                  setSelectedDay(Number(e.target.value));
                  setFilterType('ACTIVE');
                }}
                className="bg-[#12150F] border border-[#DEDCD1]/30 text-xs font-oswald text-[#DEDCD1] px-3 py-1.5 focus:outline-none focus:border-[#B3A47B] cursor-pointer"
              >
                {Array.from({ length: 25 }, (_, i) => i + 1).map((d) => (
                  <option key={d} value={d}>
                    Day {d < 10 ? `0${d}` : d} · {formatTrainingDayDate(d)} {d === 1 ? '(First Day)' : d === 25 ? '(Graduation)' : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* ── ACTIVE DAY DIRECTIVES SPOTLIGHT ── */}
        <div className="border-2 border-[#B3A47B]/60 bg-[#1B2016] p-6 sm:p-10 relative overflow-hidden shadow-xl space-y-6">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#B3A47B]/5 pointer-events-none" />

          {dayNotices.length > 0 ? (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#DEDCD1]/15">
                <div className="inline-flex items-center gap-2">
                  <span className="bg-[#C09553] text-[#12150F] text-xs font-bold uppercase tracking-wider px-2.5 py-1 font-barlow flex items-center gap-1.5">
                    <AlertCircle size={14} />
                    Active Directive · Announced Day {selectedDay < 10 ? `0${selectedDay}` : selectedDay} ({formatTrainingDayShort(selectedDay)})
                  </span>
                  <span className="text-xs font-barlow text-[#8C9180]">
                    {selectedDay === 1 ? 'First Day of Class (19 Oct 2026)' : 'Scheduled 24-Hour Notice'}
                  </span>
                </div>
                <span className="text-xs font-oswald text-[#B3A47B] uppercase tracking-widest">
                  {dayNotices.length} Directive{dayNotices.length > 1 ? 's' : ''} on Calendar
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {dayNotices.map((notice) => {
                  const isOrientationDay = notice.dueDay === selectedDay;
                  return (
                    <div 
                      key={notice.id} 
                      className={`bg-[#12150F] border p-5 sm:p-6 space-y-4 flex flex-col justify-between ${
                        isOrientationDay ? 'border-[#C09553]' : 'border-[#DEDCD1]/20'
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-3">
                          <span className="font-oswald text-sm font-semibold tracking-wider text-[#B3A47B] uppercase">
                            {notice.evalCode} · {notice.evalTitle}
                          </span>
                          <span className={`font-barlow text-xs font-semibold px-2 py-0.5 border uppercase ${
                            isOrientationDay 
                              ? 'bg-[#C09553]/20 text-[#C09553] border-[#C09553]'
                              : 'bg-[#1B2016] text-[#DEDCD1] border-[#DEDCD1]/30'
                          }`}>
                            {isOrientationDay 
                              ? 'Today · 19 Oct' 
                              : `Due Day ${notice.dueDay < 10 ? `0${notice.dueDay}` : notice.dueDay} (${formatTrainingDayShort(notice.dueDay)})`}
                          </span>
                        </div>

                        <h3 className="font-oswald text-2xl font-light text-[#DEDCD1] uppercase leading-snug">
                          {notice.headline}
                        </h3>

                        <p className="font-barlow text-xs sm:text-sm text-[#8C9180] leading-relaxed">
                          {notice.directive}
                        </p>

                        <div className="pt-2 text-xs font-barlow flex flex-col gap-1">
                          <span className="text-[#8C9180]">
                            <strong className="text-[#C6B891]">Execution Channel:</strong> {notice.channel}
                          </span>
                        </div>

                        {notice.materials && notice.materials.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {notice.materials.map((mat) => (
                              <span key={mat} className="text-[10px] font-barlow bg-[#1B2016] text-[#8C9180] border border-[#DEDCD1]/15 px-2 py-0.5">
                                {mat}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="pt-4 border-t border-[#DEDCD1]/10 flex items-center justify-between">
                        <span className="text-[11px] font-barlow text-[#8C9180] italic">
                          Standard: 70% passing threshold
                        </span>
                        <a
                          href="#tracker"
                          className="text-xs font-barlow font-semibold uppercase text-[#B3A47B] hover:text-[#C09553] inline-flex items-center gap-1 transition-colors"
                        >
                          <span>View Evaluation</span>
                          <ChevronRight size={14} />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3 pb-3 border-b border-[#DEDCD1]/15">
                <span className="bg-[#12150F] text-[#8C9180] text-xs font-semibold uppercase tracking-wider px-3 py-1 font-barlow border border-[#DEDCD1]/20">
                  Instruction & Study Day · Day {selectedDay < 10 ? `0${selectedDay}` : selectedDay} ({formatTrainingDayDate(selectedDay)})
                </span>
                <span className="text-xs font-barlow text-[#8C9180]">
                  No 24-hour advance warnings issued for this training day
                </span>
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-2">
                <div className="space-y-2 max-w-2xl">
                  <h3 className="font-oswald text-2xl sm:text-3xl font-light text-[#DEDCD1] uppercase">
                    Class Instruction & Guided Practical Application
                  </h3>
                  <p className="font-barlow text-sm text-[#8C9180] leading-relaxed">
                    Cadre instruction in session. Next scheduled advance warning on the 19 Oct – 20 Nov calendar is for <strong>{nextUpcomingNotice.evalCode} — {nextUpcomingNotice.evalTitle}</strong>, announced on Day {nextUpcomingNotice.announceDay} ({formatTrainingDayShort(nextUpcomingNotice.announceDay)}) for completion on Day {nextUpcomingNotice.dueDay}.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setSelectedDay(nextUpcomingNotice.announceDay);
                    setFilterType('ACTIVE');
                  }}
                  className="bg-[#B3A47B] hover:bg-[#C09553] text-[#12150F] px-4 py-2.5 font-barlow font-semibold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2 shrink-0 self-start md:self-auto cursor-pointer"
                >
                  <Clock size={15} />
                  <span>Jump to Next Warning (Day {nextUpcomingNotice.announceDay})</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── FILTER TABS & FULL COURSE ARCHIVE ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[#DEDCD1]/10">
          <div className="flex items-center gap-2 flex-wrap">
            {[
              { id: 'ACTIVE', label: `Day ${selectedDay < 10 ? `0${selectedDay}` : selectedDay} Notices (${dayNotices.length})` },
              { id: 'ALL', label: `Full Course Calendar 19 Oct–20 Nov (${EVALUATION_ANNOUNCEMENTS.length})` },
              { id: 'written', label: 'Written Exams' },
              { id: 'performance', label: 'Performance Evals' },
              { id: 'module', label: 'E-Learning (CM4R)' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterType(tab.id as any)}
                className={`px-3.5 py-1.5 text-xs font-barlow font-semibold tracking-wider uppercase transition-colors border cursor-pointer ${
                  filterType === tab.id
                    ? 'bg-[#B3A47B] text-[#12150F] border-[#B3A47B]'
                    : 'text-[#8C9180] border-[#DEDCD1]/15 hover:border-[#DEDCD1]/40 hover:text-[#DEDCD1]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <span className="font-barlow text-xs text-[#8C9180]">
            Complete 25-Day Calendar (19 Oct – 20 Nov 2026)
          </span>
        </div>

        {/* Grid of Announcements */}
        {filteredNotices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredNotices.map((item) => (
              <div
                key={item.id}
                className="bg-[#1B2016]/70 border border-[#DEDCD1]/15 p-5 flex flex-col justify-between hover:border-[#B3A47B]/50 transition-colors group"
              >
                <div className="space-y-3">
                  {/* Timeline Badge */}
                  <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-[#DEDCD1]/10">
                    <span className="font-oswald text-xs font-medium tracking-wider text-[#B3A47B] uppercase">
                      Announced: Day {item.announceDay < 10 ? `0${item.announceDay}` : item.announceDay} ({formatTrainingDayShort(item.announceDay)})
                    </span>
                    <span className="font-barlow text-[11px] font-semibold text-[#C09553] uppercase tracking-wide">
                      Due: Day {item.dueDay < 10 ? `0${item.dueDay}` : item.dueDay} ({formatTrainingDayShort(item.dueDay)})
                    </span>
                  </div>

                  {/* Headline & Evaluation */}
                  <div>
                    <span className="text-[10px] font-barlow uppercase tracking-wider text-[#8C9180] block">
                      {item.evalCode} · {item.type === 'written' ? 'Written Exam' : item.type === 'performance' ? 'Performance Eval' : 'E-Learning Module'}
                    </span>
                    <h4 className="font-oswald text-lg font-normal text-[#DEDCD1] uppercase group-hover:text-[#B3A47B] transition-colors mt-0.5">
                      {item.headline}
                    </h4>
                  </div>

                  <p className="font-barlow text-xs text-[#8C9180] leading-relaxed line-clamp-3">
                    {item.directive}
                  </p>

                  <div className="text-[11px] font-barlow text-[#8C9180] pt-1">
                    <span className="text-[#C6B891]">Execution:</span> {item.channel}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-[#DEDCD1]/10 flex items-center justify-between">
                  <span className="text-[10px] font-barlow uppercase text-[#8C9180] tracking-wider">
                    {formatTrainingDayDate(item.announceDay)}
                  </span>
                  <a
                    href="#tracker"
                    className="text-xs font-barlow font-semibold uppercase text-[#B3A47B] hover:underline inline-flex items-center gap-1"
                  >
                    <span>Tracker</span>
                    <ChevronRight size={12} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[#1B2016]/40 border border-dashed border-[#DEDCD1]/15 p-8 text-center space-y-2">
            <Calendar size={28} className="mx-auto text-[#8C9180]" />
            <p className="font-barlow text-sm text-[#8C9180]">
              No evaluation announcements scheduled for Day {selectedDay}. Use the filter above to browse all 24-hour notices across the 19 Oct – 20 Nov syllabus.
            </p>
          </div>
        )}

      </div>
    </section>
  );
};
