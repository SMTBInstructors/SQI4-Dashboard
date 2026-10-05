import React from 'react';
import { COURSE_INFO } from '../data/courseData';
import { ArrowUp, RefreshCw, Shield } from 'lucide-react';

interface FooterProps {
  onResetTracker: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onResetTracker }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#12150F] border-t border-[#DEDCD1]/15 py-12 text-[#8C9180] font-barlow text-xs">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[#DEDCD1]/10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-oswald text-lg tracking-[0.16em] uppercase text-[#DEDCD1]">
                Class Dashboard · {COURSE_INFO.courseCode}
              </span>
            </div>
            <p className="text-xs text-[#8C9180] max-w-lg">
              {COURSE_INFO.organization} · {COURSE_INFO.location}. Controlled unclassified information (FOUO) for course candidates.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onResetTracker}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#DEDCD1]/15 text-[#8C9180] hover:text-[#DEDCD1] hover:border-[#DEDCD1]/30 transition-colors uppercase text-[11px] tracking-wider"
              title="Reset evaluation tracker to initial state"
            >
              <RefreshCw size={12} />
              <span>Reset Tracker</span>
            </button>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1B2016] border border-[#DEDCD1]/15 text-[#DEDCD1] hover:text-[#B3A47B] transition-colors uppercase text-[11px] tracking-wider"
            >
              <ArrowUp size={12} />
              <span>Top</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#8C9180]/80">
          <div>
            &copy; 2026 National Guard Bureau · Strength Maintenance Training Center · All Rights Reserved
          </div>
          <div className="flex items-center gap-6 uppercase tracking-wider">
            <a href="#runway" className="hover:text-[#B3A47B] transition-colors">Assignment Runway</a>
            <a href="#tracker" className="hover:text-[#B3A47B] transition-colors">Evaluations</a>
            <a href="#regs" className="hover:text-[#B3A47B] transition-colors">Regulations & Doctrine</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
