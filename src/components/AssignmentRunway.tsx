import React, { useState } from 'react';
import { EVALS, MILESTONES, ELEARN_MODULES } from '../data/courseData';
import { formatTrainingDayDate, formatTrainingDayShort, calculateCurrentTrainingDay } from '../utils/dayUtils';
import { Calendar, ChevronRight } from 'lucide-react';
import { MasterTrainingScheduleModal } from './MasterTrainingScheduleModal';

interface AssignmentRunwayProps {
  currentDay?: number;
}

export const AssignmentRunway: React.FC<AssignmentRunwayProps> = ({ currentDay }) => {
  const activeDay = currentDay ?? calculateCurrentTrainingDay();
  const [isMtsOpen, setIsMtsOpen] = useState(false);
  const [selectedMtsDay, setSelectedMtsDay] = useState(activeDay);

  // Group runway calendar weeks (Days 1 to 25 across full course)
  const runwayWeeks = [
    {
      weekNumber: 1,
      label: "Week 1 · Statutory Eligibility & Written Exam 1 (NCRCW001 Due Day 4)",
      range: "19–23 Oct (Days 1–5)",
      days: [1, 2, 3, 4, 5]
    },
    {
      weekNumber: 2,
      label: "Week 2 · Options, Financial Programs & Written Exam 2 (NCRCW002 Due Day 8, Wed 28 Oct)",
      range: "26–30 Oct (Days 6–10)",
      days: [6, 7, 8, 9, 10]
    },
    {
      weekNumber: 3,
      label: "Week 3 · Prospecting, Planning & Prospecting Memo (NCRCP002 Due Day 15)",
      range: "2–6 Nov (Days 11–15)",
      days: [11, 12, 13, 14, 15]
    },
    {
      weekNumber: 4,
      label: "Week 4 · Work Plan (Day 16), Packet (Day 17), Catalog (Day 18) & Presentation (Day 20)",
      range: "9–13 Nov (Days 16–20)",
      days: [16, 17, 18, 19, 20]
    },
    {
      weekNumber: 5,
      label: "Week 5 · Practical Evals (Phone Day 21, Interview Day 22, AO Brief & Counseling Day 23) & Graduation",
      range: "16–20 Nov (Days 21–25)",
      days: [21, 22, 23, 24, 25]
    }
  ];

  // Helper to find requirements due or assigned on a specific day
  const getItemsForDay = (day: number) => {
    const dueItems = EVALS.filter((e) => e.dueDay === day);
    const dueModules = ELEARN_MODULES.filter((m) => m.dueDay === day);
    const milestones = MILESTONES.filter((m) => m.day === day);
    return { dueItems, dueModules, milestones };
  };

  return (
    <section 
      id="runway" 
      data-screen-label="Assignment runway"
      className="bg-[#1B2016] border-t-2 border-b border-[#C09553] py-14 sm:py-20"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Runway Main Header */}
        <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-[#DEDCD1]/15">
          <div className="space-y-4 max-w-2xl">
            <span className="inline-block bg-[#B3A47B] text-[#12150F] font-barlow font-bold text-xs tracking-[0.24em] uppercase px-3.5 py-1.5 shadow-sm">
              SQI4 · Class Dashboard · NCRC 27-001
            </span>
            <h2 className="font-oswald text-4xl sm:text-5xl lg:text-6xl font-light tracking-[0.12em] text-[#DEDCD1] uppercase leading-tight">
              Course Execution Runway
            </h2>
            <p className="font-barlow text-sm sm:text-base text-[#8C9180] leading-relaxed">
              Every graded requirement, e-learning milestone, and practical evaluation validated against Attachment 3 and the Course Syllabus across Days 1–25.
            </p>
          </div>

          {/* Quick Cockpit Stats & MTS Launch */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-[#12150F] border border-[#DEDCD1]/15 p-4 min-w-[130px]">
              <div className="font-barlow text-[11px] font-semibold tracking-[0.18em] uppercase text-[#8C9180]">
                Current Day
              </div>
              <div className="font-oswald text-3xl font-light text-[#DEDCD1] mt-0.5">
                Day {activeDay}
              </div>
              <div className="font-barlow text-xs text-[#8C9180]">
                {formatTrainingDayDate(activeDay)}
              </div>
            </div>

            <div className="bg-[#12150F] border-t-2 border-[#C09553] border-r border-b border-l border-[#C09553]/30 p-4 min-w-[140px]">
              <div className="font-barlow text-[11px] font-semibold tracking-[0.18em] uppercase text-[#C09553]">
                Graduation
              </div>
              <div className="font-oswald text-3xl font-light text-[#C09553] mt-0.5">
                20 NOV
              </div>
              <div className="font-barlow text-xs text-[#8C9180]">
                Day 25 Militia Hall
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedMtsDay(activeDay);
                setIsMtsOpen(true);
              }}
              className="bg-[#C09553] hover:bg-[#B3A47B] text-[#12150F] p-4 flex flex-col justify-between transition-colors shadow-md cursor-pointer min-w-[170px]"
              title="Open full 25-Day Master Training Schedule"
            >
              <div className="flex items-center justify-between w-full">
                <span className="font-barlow text-[11px] font-bold tracking-[0.18em] uppercase">
                  Training Schedule
                </span>
                <Calendar size={15} />
              </div>
              <div className="font-oswald text-2xl font-normal uppercase mt-1 leading-tight text-left">
                View MTS
              </div>
              <div className="font-barlow text-[11px] opacity-90 text-left">
                Hour-by-Hour Matrix
              </div>
            </button>
          </div>
        </header>

        {/* 25-Day Visual Runway Grid */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="font-oswald text-2xl text-[#DEDCD1] uppercase tracking-wider font-light">
              Course Execution Runway (Days 1–25)
            </h3>
            <span className="text-xs font-barlow text-[#8C9180]">
              Click any day to open period schedule
            </span>
          </div>

          <div className="space-y-6">
            {runwayWeeks.map((week) => (
              <div key={week.weekNumber} className="space-y-3">
                <div className="flex items-center justify-between text-xs font-barlow border-b border-[#DEDCD1]/10 pb-1">
                  <span className="text-[#C6B891] font-semibold uppercase tracking-wider">
                    {week.label}
                  </span>
                  <span className="text-[#8C9180]">{week.range}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                  {week.days.map((dayNum) => {
                    const { dueItems, dueModules, milestones } = getItemsForDay(dayNum);
                    const isToday = dayNum === activeDay;
                    const hasItems = dueItems.length > 0 || dueModules.length > 0 || milestones.length > 0;

                    return (
                      <div
                        key={dayNum}
                        onClick={() => {
                          setSelectedMtsDay(dayNum);
                          setIsMtsOpen(true);
                        }}
                        className={`p-3.5 border transition-all flex flex-col justify-between min-h-[155px] cursor-pointer group ${
                          isToday
                            ? 'bg-[#12150F] border-[#B3A47B] ring-1 ring-[#B3A47B] shadow-md'
                            : hasItems
                            ? 'bg-[#12150F]/80 border-[#DEDCD1]/20 hover:border-[#B3A47B]/60 hover:bg-[#1B2016]'
                            : 'bg-[#12150F]/40 border-[#DEDCD1]/10 opacity-75 hover:opacity-100 hover:border-[#DEDCD1]/30'
                        }`}
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className={`font-oswald text-sm font-semibold tracking-wider group-hover:text-[#B3A47B] transition-colors ${
                              isToday ? 'text-[#B3A47B]' : 'text-[#DEDCD1]'
                            }`}>
                              Day {dayNum < 10 ? `0${dayNum}` : dayNum}
                            </span>
                            <span className="text-[11px] font-barlow text-[#8C9180]">
                              {formatTrainingDayShort(dayNum)}
                            </span>
                          </div>

                          {/* Items due on this day */}
                          <div className="space-y-1.5 pt-1">
                            {/* Graded Evaluations */}
                            {dueItems.map((item) => (
                              <div
                                key={item.id}
                                className="bg-[#1B2016] border border-[#B3A47B]/40 p-1.5 text-[11px] font-barlow space-y-0.5"
                              >
                                <div className="font-semibold text-[#B3A47B] flex items-center justify-between">
                                  <span>{item.code}</span>
                                  <span className="text-[9px] uppercase px-1 py-0.2 bg-[#B3A47B]/20 text-[#C6B891]">
                                    Due
                                  </span>
                                </div>
                                <div className="text-[#DEDCD1] text-[10px] leading-tight line-clamp-1">
                                  {item.title}
                                </div>
                              </div>
                            ))}

                            {/* E-Learning Modules */}
                            {dueModules.map((mod) => (
                              <div
                                key={mod.id}
                                className="bg-[#12150F] border border-[#8C9180]/40 p-1.5 text-[11px] font-barlow space-y-0.5"
                              >
                                <div className="font-semibold text-[#DEDCD1] flex items-center justify-between text-[10px]">
                                  <span>{mod.code}</span>
                                  <span className="text-[8px] uppercase px-1 py-0.2 bg-[#8C9180]/20 text-[#B3A47B]">
                                    E-Learn
                                  </span>
                                </div>
                                <div className="text-[#8C9180] text-[9.5px] leading-tight line-clamp-1">
                                  {mod.title}
                                </div>
                              </div>
                            ))}

                            {/* Milestones */}
                            {milestones.map((m, mIdx) => (
                              <div
                                key={mIdx}
                                className={`p-1.5 text-[11px] font-barlow space-y-0.5 border ${
                                  m.gold
                                    ? 'bg-[#C09553]/15 border-[#C09553] text-[#C09553]'
                                    : 'bg-[#12150F] border-[#DEDCD1]/20 text-[#8C9180]'
                                }`}
                              >
                                <div className="font-semibold text-[10px] uppercase flex items-center justify-between">
                                  <span>{m.title}</span>
                                </div>
                                <div className="text-[10px] text-[#DEDCD1]/80 leading-tight line-clamp-1">
                                  {m.detail}
                                </div>
                              </div>
                            ))}

                            {!hasItems && (
                              <div className="text-[10px] font-barlow text-[#8C9180]/60 italic pt-1">
                                Academic instruction & PRT
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="mt-2 pt-2 border-t border-[#DEDCD1]/10 flex items-center justify-between text-[10px] text-[#8C9180] group-hover:text-[#B3A47B] transition-colors">
                          <span>View Schedule</span>
                          <ChevronRight size={12} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Master Training Schedule Modal */}
      <MasterTrainingScheduleModal
        isOpen={isMtsOpen}
        onClose={() => setIsMtsOpen(false)}
        initialDay={selectedMtsDay}
      />
    </section>
  );
};
