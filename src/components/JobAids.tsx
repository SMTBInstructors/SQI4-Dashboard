import React, { useState } from 'react';
import { JOB_AIDS, JobAidItem } from '../data/courseData';
import { ChevronRight, X, ExternalLink, BookOpen, Target, Calculator, Calendar } from 'lucide-react';
import { AppleMdtModal } from './AppleMdtModal';
import { ValueMaximizerModal } from './ValueMaximizerModal';
import { ComputationsJobAidModal } from './ComputationsJobAidModal';
import { RzMissionPlannerModal } from './RzMissionPlannerModal';

interface JobAidsProps {
  onNotify?: (msg: string) => void;
}

export const JobAids: React.FC<JobAidsProps> = ({ onNotify }) => {
  const [activeTool, setActiveTool] = useState<JobAidItem | null>(null);
  const [isAppleMdtOpen, setIsAppleMdtOpen] = useState(false);
  const [isValueMaximizerOpen, setIsValueMaximizerOpen] = useState(false);
  const [isComputationsOpen, setIsComputationsOpen] = useState(false);
  const [isRzPlannerOpen, setIsRzPlannerOpen] = useState(false);

  return (
    <section id="jobaids" className="bg-[#1B2016] border-b border-[#DEDCD1]/15 py-14 sm:py-20">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="space-y-4">
          <div className="inline-block bg-[#B3A47B] text-[#12150F] font-barlow font-bold text-[11px] tracking-[0.24em] uppercase px-3 py-1">
            Reach For First
          </div>

          <div className="flex flex-col lg:flex-row lg:items-baseline justify-between gap-6">
            <h2 className="font-oswald text-3xl sm:text-4xl lg:text-5xl font-light tracking-[0.14em] text-[#DEDCD1] uppercase">
              Tools & Job Aids
            </h2>
            <p className="font-barlow text-sm sm:text-base text-[#8C9180] max-w-xl">
              Matrices and CM4R operational tools. They point back at the regulations, not around them.
            </p>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {JOB_AIDS.map((tool) => {
            const isAppleMdt = tool.id === 'tool-1';
            const isValueMaximizer = tool.id === 'tool-2';
            const isComputations = tool.id === 'tool-4';
            const isRzPlanner = tool.id === 'tool-5';

            return (
              <div
                key={tool.id}
                onClick={() => {
                  if (isAppleMdt) {
                    setIsAppleMdtOpen(true);
                  } else if (isValueMaximizer) {
                    setIsValueMaximizerOpen(true);
                  } else if (isComputations) {
                    setIsComputationsOpen(true);
                  } else if (isRzPlanner) {
                    setIsRzPlannerOpen(true);
                  } else {
                    setActiveTool(tool);
                  }
                }}
                className={`bg-[#12150F] border p-6 flex flex-col justify-between transition-all cursor-pointer group ${
                  isAppleMdt || isValueMaximizer || isComputations || isRzPlanner
                    ? 'border-[#B3A47B]/60 hover:border-[#C09553] shadow-md ring-1 ring-[#B3A47B]/20' 
                    : 'border-[#DEDCD1]/15 hover:border-[#B3A47B]/60'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-oswald text-xs tracking-[0.18em] text-[#B3A47B] uppercase">
                      {tool.module}
                    </span>
                    {isAppleMdt ? (
                      <span className="text-[10px] font-barlow uppercase text-[#C09553] tracking-wider px-2 py-0.5 border border-[#C09553]/40 bg-[#C09553]/15 font-semibold">
                        SMTB 805B-SQI4
                      </span>
                    ) : isValueMaximizer ? (
                      <span className="text-[10px] font-barlow uppercase text-[#C09553] tracking-wider px-2 py-0.5 border border-[#C09553]/40 bg-[#C09553]/15 font-semibold">
                        Interactive Worksheet
                      </span>
                    ) : isComputations ? (
                      <span className="text-[10px] font-barlow uppercase text-[#C09553] tracking-wider px-2 py-0.5 border border-[#C09553]/40 bg-[#C09553]/15 font-semibold">
                        SMTB Rules & PPOM
                      </span>
                    ) : isRzPlanner ? (
                      <span className="text-[10px] font-barlow uppercase text-[#C09553] tracking-wider px-2 py-0.5 border border-[#C09553]/40 bg-[#C09553]/15 font-semibold">
                        7-Day Plan · Attached PDF
                      </span>
                    ) : tool.url ? (
                      <span className="text-[10px] font-barlow uppercase text-[#C09553] tracking-wider px-2 py-0.5 border border-[#C09553]/30 bg-[#C09553]/10">
                        External Tool
                      </span>
                    ) : null}
                  </div>

                  <h3 className="font-oswald text-xl font-normal text-[#DEDCD1] uppercase group-hover:text-[#B3A47B] transition-colors">
                    {tool.title}
                  </h3>

                  <p className="font-barlow text-xs text-[#8C9180] leading-relaxed">
                    {tool.note}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#DEDCD1]/10 flex items-center justify-between">
                  <span className="text-[11px] font-barlow text-[#8C9180]">
                    {tool.quickGuide.length} Protocol Rules
                  </span>

                  {isAppleMdt ? (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsAppleMdtOpen(true);
                      }}
                      className="inline-flex items-center gap-1.5 font-barlow text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 bg-[#C09553] hover:bg-[#B3A47B] text-[#12150F] transition-colors shadow-sm cursor-pointer"
                      title="Launch SMTB APPLE-MDT Identify Eligibility Doctrine Tool"
                    >
                      <span>Launch Tool</span>
                      <BookOpen size={13} />
                    </button>
                  ) : isValueMaximizer ? (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsValueMaximizerOpen(true);
                      }}
                      className="inline-flex items-center gap-1.5 font-barlow text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 bg-[#C09553] hover:bg-[#B3A47B] text-[#12150F] transition-colors shadow-sm cursor-pointer"
                      title="Launch Value Maximizer Interactive Radar & Worksheet"
                    >
                      <span>Launch Tool</span>
                      <Target size={13} />
                    </button>
                  ) : isComputations ? (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsComputationsOpen(true);
                      }}
                      className="inline-flex items-center gap-1.5 font-barlow text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 bg-[#C09553] hover:bg-[#B3A47B] text-[#12150F] transition-colors shadow-sm cursor-pointer"
                      title="Launch SMTB Computations & Bars Matrix Job Aid"
                    >
                      <span>Launch Tool</span>
                      <Calculator size={13} />
                    </button>
                  ) : isRzPlanner ? (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsRzPlannerOpen(true);
                      }}
                      className="inline-flex items-center gap-1.5 font-barlow text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 bg-[#C09553] hover:bg-[#B3A47B] text-[#12150F] transition-colors shadow-sm cursor-pointer"
                      title="Launch Mission Planner & Battle Rhythm"
                    >
                      <span>Launch Tool</span>
                      <Calendar size={13} />
                    </button>
                  ) : tool.url ? (
                    <a
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 font-barlow text-xs font-bold uppercase tracking-wider px-3 py-1.5 bg-[#C09553] hover:bg-[#B3A47B] text-[#12150F] transition-colors shadow-sm cursor-pointer"
                      title={`Launch ${tool.title} (${tool.url})`}
                    >
                      <span>Launch Tool</span>
                      <ExternalLink size={13} />
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveTool(tool);
                      }}
                      className="inline-flex items-center gap-1 font-barlow text-xs font-semibold text-[#B3A47B] group-hover:translate-x-0.5 transition-transform cursor-pointer"
                    >
                      <span>Launch Tool</span>
                      <ChevronRight size={14} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SMTB APPLE-MDT Interactive Doctrine Tool Modal */}
      <AppleMdtModal
        isOpen={isAppleMdtOpen}
        onClose={() => setIsAppleMdtOpen(false)}
        onNotify={onNotify}
      />

      {/* CM4R Module 3 Value Maximizer Interactive Tool Modal */}
      <ValueMaximizerModal
        isOpen={isValueMaximizerOpen}
        onClose={() => setIsValueMaximizerOpen(false)}
        onNotify={onNotify}
      />

      {/* SMTB Computations Job Aid & Bars Matrix Modal */}
      <ComputationsJobAidModal
        isOpen={isComputationsOpen}
        onClose={() => setIsComputationsOpen(false)}
        onNotify={onNotify}
      />

      {/* SMTB RZ Mission Planner & Battle Rhythm Modal */}
      <RzMissionPlannerModal
        isOpen={isRzPlannerOpen}
        onClose={() => setIsRzPlannerOpen(false)}
        onNotify={onNotify}
      />

      {/* Standard Tool Guide Modal */}
      {activeTool && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#1B2016] border border-[#B3A47B] max-w-xl w-full p-6 space-y-5 relative">
            <button
              onClick={() => setActiveTool(null)}
              className="absolute top-4 right-4 text-[#8C9180] hover:text-[#DEDCD1] cursor-pointer"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <div className="space-y-1">
              <span className="font-oswald text-xs tracking-widest text-[#B3A47B] uppercase">
                {activeTool.module}
              </span>
              <h3 className="font-oswald text-2xl font-light text-[#DEDCD1] uppercase">
                {activeTool.title}
              </h3>
              <p className="text-xs text-[#8C9180]">{activeTool.note}</p>
            </div>

            <div className="space-y-3 pt-2">
              <h4 className="font-barlow text-xs font-semibold uppercase tracking-wider text-[#B3A47B]">
                Operating Protocol & Steps:
              </h4>
              <ul className="space-y-2">
                {activeTool.quickGuide.map((step, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs font-barlow text-[#DEDCD1] bg-[#12150F] p-3 border border-[#DEDCD1]/10">
                    <span className="font-oswald text-[#B3A47B] font-bold text-sm">{i + 1}.</span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-[#DEDCD1]/15 flex items-center justify-between gap-3">
              <span className="text-xs font-barlow text-[#8C9180]">
                Course Training Matrix Reference
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTool(null)}
                  className="px-3.5 py-2 text-xs font-semibold uppercase tracking-wider border border-[#DEDCD1]/20 text-[#8C9180] hover:text-[#DEDCD1] hover:border-[#DEDCD1]/50 transition-colors cursor-pointer"
                >
                  Close Guide
                </button>

                {activeTool.id === 'tool-1' ? (
                  <button
                    onClick={() => {
                      setActiveTool(null);
                      setIsAppleMdtOpen(true);
                    }}
                    className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-[#C09553] hover:bg-[#B3A47B] text-[#12150F] inline-flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
                  >
                    <span>Launch Doctrine Tool</span>
                    <BookOpen size={14} />
                  </button>
                ) : activeTool.id === 'tool-2' ? (
                  <button
                    onClick={() => {
                      setActiveTool(null);
                      setIsValueMaximizerOpen(true);
                    }}
                    className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-[#C09553] hover:bg-[#B3A47B] text-[#12150F] inline-flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
                  >
                    <span>Launch Interactive Tool</span>
                    <Target size={14} />
                  </button>
                ) : activeTool.id === 'tool-4' ? (
                  <button
                    onClick={() => {
                      setActiveTool(null);
                      setIsComputationsOpen(true);
                    }}
                    className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-[#C09553] hover:bg-[#B3A47B] text-[#12150F] inline-flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
                  >
                    <span>Launch Computations Tool</span>
                    <Calculator size={14} />
                  </button>
                ) : activeTool.id === 'tool-5' ? (
                  <button
                    onClick={() => {
                      setActiveTool(null);
                      setIsRzPlannerOpen(true);
                    }}
                    className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-[#C09553] hover:bg-[#B3A47B] text-[#12150F] inline-flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
                  >
                    <span>Launch Mission Planner</span>
                    <Calendar size={14} />
                  </button>
                ) : activeTool.url ? (
                  <a
                    href={activeTool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-[#C09553] hover:bg-[#B3A47B] text-[#12150F] inline-flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
                  >
                    <span>Launch External Tool</span>
                    <ExternalLink size={14} />
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
