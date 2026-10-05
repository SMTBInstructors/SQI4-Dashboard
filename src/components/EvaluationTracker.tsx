import React, { useState } from 'react';
import { EVALS, ELEARN_MODULES, EvaluationItem } from '../data/courseData';
import { formatTrainingDayDate, getCalendarAutomatedStatus } from '../utils/dayUtils';
import { CheckCircle2, Circle, Clock, Search, X } from 'lucide-react';

interface EvaluationTrackerProps {
  statusMap?: Record<string, number>;
  onToggleStatus?: (id: string) => void;
}

export const EvaluationTracker: React.FC<EvaluationTrackerProps> = ({
  statusMap,
  onToggleStatus
}) => {
  const [filterType, setFilterType] = useState<'ALL' | 'written' | 'performance' | 'module'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEval, setSelectedEval] = useState<EvaluationItem | null>(null);

  const allItems: EvaluationItem[] = [...EVALS, ...ELEARN_MODULES];

  const filteredItems = allItems.filter((item) => {
    if (filterType !== 'ALL' && item.type !== filterType) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.code.toLowerCase().includes(q) ||
      item.title.toLowerCase().includes(q) ||
      item.lesson.toLowerCase().includes(q)
    );
  });

  const getEffectiveStatus = (item: EvaluationItem) => {
    const auto = getCalendarAutomatedStatus(item);
    const numeric = (statusMap && statusMap[item.id] !== undefined)
      ? statusMap[item.id]
      : auto.numericStatus;

    switch (numeric) {
      case 2:
        return {
          status: 'COMPLETE',
          numericStatus: 2,
          label: 'Complete',
          bg: 'bg-[#B3A47B]',
          text: 'text-[#12150F]',
          border: 'border-[#B3A47B]',
          icon: <CheckCircle2 size={13} className="text-[#12150F]" />
        };
      case 1:
        return {
          status: 'IN_PROGRESS',
          numericStatus: 1,
          label: 'In Progress',
          bg: 'bg-[#B3A47B]/15',
          text: 'text-[#C6B891]',
          border: 'border-[#B3A47B]/60',
          icon: <Clock size={13} className="text-[#C6B891]" />
        };
      default:
        return {
          status: 'NOT_STARTED',
          numericStatus: 0,
          label: 'Not Started',
          bg: 'bg-transparent',
          text: 'text-[#8C9180]',
          border: 'border-[#DEDCD1]/20',
          icon: <Circle size={13} className="text-[#8C9180]" />
        };
    }
  };

  const completedCount = allItems.filter((i) => getEffectiveStatus(i).numericStatus === 2).length;
  const inProgressCount = allItems.filter((i) => getEffectiveStatus(i).numericStatus === 1).length;
  const totalCount = allItems.length;
  const completionPct = Math.round((completedCount / totalCount) * 100);

  return (
    <section id="tracker" className="bg-[#12150F] border-b border-[#DEDCD1]/15 py-14 sm:py-20">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header Strip */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3">
            <h2 className="font-oswald text-3xl sm:text-4xl lg:text-5xl font-light tracking-[0.14em] text-[#DEDCD1] uppercase">
              Written & Performance Evaluations
            </h2>
            <p className="font-barlow text-sm text-[#8C9180] max-w-xl">
              Day numbers correspond to the Master Training Schedule. Status updates automatically as Due Days pass on the calendar: Not Started &rarr; In Progress &rarr; Complete.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="bg-[#1B2016] border border-[#DEDCD1]/15 p-4 flex items-center gap-6 shrink-0">
            <div>
              <div className="text-[11px] font-barlow uppercase tracking-wider text-[#8C9180]">Complete</div>
              <div className="font-oswald text-3xl font-light text-[#B3A47B] tabular-nums">
                {completedCount} <span className="text-sm text-[#8C9180]">/ {totalCount}</span>
              </div>
            </div>
            <div className="h-10 w-[1px] bg-[#DEDCD1]/15" />
            <div>
              <div className="text-[11px] font-barlow uppercase tracking-wider text-[#8C9180]">In Progress</div>
              <div className="font-oswald text-3xl font-light text-[#C6B891] tabular-nums">
                {inProgressCount}
              </div>
            </div>
            <div className="h-10 w-[1px] bg-[#DEDCD1]/15" />
            <div>
              <div className="text-[11px] font-barlow uppercase tracking-wider text-[#8C9180]">Rate</div>
              <div className="font-oswald text-3xl font-light text-[#DEDCD1] tabular-nums">
                {completionPct}%
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[#DEDCD1]/10">
          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {[
              { id: 'ALL', label: 'All Items' },
              { id: 'written', label: 'Written Exams' },
              { id: 'performance', label: 'Performance Evals' },
              { id: 'module', label: 'E-Learning (CM4R)' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterType(tab.id as any)}
                className={`px-3 py-1.5 text-xs font-barlow font-semibold tracking-wider uppercase transition-colors border ${
                  filterType === tab.id
                    ? 'bg-[#B3A47B] text-[#12150F] border-[#B3A47B]'
                    : 'text-[#8C9180] border-[#DEDCD1]/15 hover:border-[#DEDCD1]/40 hover:text-[#DEDCD1]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative w-full sm:w-64">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8C9180]" />
            <input
              type="text"
              placeholder="Search code or lesson..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1B2016] border border-[#DEDCD1]/20 pl-9 pr-3 py-1.5 text-xs text-[#DEDCD1] placeholder-[#8C9180] focus:outline-none focus:border-[#B3A47B] font-barlow"
            />
          </div>
        </div>

        {/* Table / List of Evaluations */}
        <div className="border border-[#DEDCD1]/15 bg-[#1B2016]/40 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-[#DEDCD1]/15 bg-[#12150F]/70 text-[11px] font-barlow uppercase tracking-[0.16em] text-[#8C9180]">
                <th className="py-3 px-4 font-semibold">Code</th>
                <th className="py-3 px-4 font-semibold">Evaluation / Deliverable</th>
                <th className="py-3 px-4 font-semibold">Assigned</th>
                <th className="py-3 px-4 font-semibold">Due Day</th>
                <th className="py-3 px-4 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DEDCD1]/10 text-xs font-barlow">
              {filteredItems.map((item) => {
                const statusInfo = getEffectiveStatus(item);

                return (
                  <tr
                    key={item.id}
                    className="hover:bg-[#1B2016] transition-colors cursor-pointer group"
                    onClick={() => setSelectedEval(item)}
                  >
                    {/* Code */}
                    <td className="py-3.5 px-4 font-oswald text-sm font-medium tracking-wider text-[#DEDCD1] group-hover:text-[#B3A47B] transition-colors whitespace-nowrap">
                      {item.code}
                    </td>

                    {/* Title & Lesson */}
                    <td className="py-3.5 px-4 max-w-md">
                      <div className="font-medium text-[#DEDCD1] text-sm group-hover:underline">
                        {item.title}
                      </div>
                      <div className="text-[#8C9180] text-[11px] mt-0.5">
                        {item.lesson}
                      </div>
                    </td>

                    {/* Assigned */}
                    <td className="py-3.5 px-4 text-[#8C9180] whitespace-nowrap">
                      Day {item.assignedDay < 10 ? `0${item.assignedDay}` : item.assignedDay} · {formatTrainingDayDate(item.assignedDay)}
                    </td>

                    {/* Due */}
                    <td className="py-3.5 px-4 text-[#DEDCD1] font-medium whitespace-nowrap">
                      Day {item.dueDay < 10 ? `0${item.dueDay}` : item.dueDay} · {formatTrainingDayDate(item.dueDay)}
                    </td>

                    {/* Interactive Automated/Manual Status Button */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => onToggleStatus && onToggleStatus(item.id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-semibold tracking-wider uppercase border transition-all cursor-pointer hover:opacity-85 ${statusInfo.bg} ${statusInfo.text} ${statusInfo.border}`}
                        title={`Status: ${statusInfo.label} (Due Day ${item.dueDay}). Click to toggle status.`}
                      >
                        {statusInfo.icon}
                        <span>{statusInfo.label}</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedEval && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#1B2016] border border-[#B3A47B] max-w-xl w-full p-6 space-y-5 relative">
            <button
              onClick={() => setSelectedEval(null)}
              className="absolute top-4 right-4 text-[#8C9180] hover:text-[#DEDCD1]"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <div className="space-y-1">
              <span className="font-oswald text-xs tracking-widest text-[#B3A47B] uppercase">
                {selectedEval.code} · Evaluation Standard
              </span>
              <h3 className="font-oswald text-2xl font-light text-[#DEDCD1] uppercase">
                {selectedEval.title}
              </h3>
              <p className="text-xs text-[#8C9180]">{selectedEval.lesson}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 py-3 border-y border-[#DEDCD1]/15 text-xs font-barlow">
              <div>
                <span className="text-[#8C9180] block">Assigned Day:</span>
                <span className="font-semibold text-[#DEDCD1]">
                  Day {selectedEval.assignedDay} ({formatTrainingDayDate(selectedEval.assignedDay)})
                </span>
              </div>
              <div>
                <span className="text-[#8C9180] block">Due Day:</span>
                <span className="font-semibold text-[#C09553]">
                  Day {selectedEval.dueDay} ({formatTrainingDayDate(selectedEval.dueDay)})
                </span>
              </div>
              <div className="col-span-2">
                <span className="text-[#8C9180] block">Delivery Method / Platform:</span>
                <span className="font-medium text-[#DEDCD1]">{selectedEval.channel}</span>
              </div>
            </div>

            {selectedEval.deliverable && (
              <div className="space-y-1">
                <span className="font-barlow text-xs font-semibold uppercase tracking-wider text-[#B3A47B]">
                  Deliverable & Evaluation Focus:
                </span>
                <p className="text-xs sm:text-sm text-[#DEDCD1] font-barlow leading-relaxed">
                  {selectedEval.deliverable}
                </p>
              </div>
            )}

            {selectedEval.materials && selectedEval.materials.length > 0 && (
              <div className="space-y-1 pt-1">
                <span className="font-barlow text-xs font-semibold uppercase tracking-wider text-[#8C9180]">
                  Required Reference Materials:
                </span>
                <div className="flex flex-wrap gap-2 pt-1">
                  {selectedEval.materials.map((mat) => (
                    <span
                      key={mat}
                      className="text-[11px] font-barlow text-[#DEDCD1] bg-[#12150F] px-2.5 py-1 border border-[#DEDCD1]/15"
                    >
                      {mat}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Current Status Banner with Quick Toggle */}
            {(() => {
              const s = getEffectiveStatus(selectedEval);
              return (
                <div className="p-3 bg-[#12150F] border border-[#DEDCD1]/15 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-barlow uppercase tracking-wider text-[#8C9180] block">
                      Evaluation Status:
                    </span>
                    <span className="text-xs text-[#8C9180] font-barlow">
                      Due on Day {selectedEval.dueDay} ({formatTrainingDayDate(selectedEval.dueDay)})
                    </span>
                  </div>
                  <button
                    onClick={() => onToggleStatus && onToggleStatus(selectedEval.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold tracking-wider uppercase border cursor-pointer hover:opacity-85 ${s.bg} ${s.text} ${s.border}`}
                    title="Click to toggle status"
                  >
                    {s.icon}
                    <span>{s.label}</span>
                  </button>
                </div>
              );
            })()}

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedEval(null)}
                className="px-4 py-2 text-xs font-medium uppercase tracking-wider bg-[#B3A47B] text-[#12150F] hover:bg-[#C09553] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
