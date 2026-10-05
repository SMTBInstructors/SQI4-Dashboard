import React from 'react';
import { COURSE_INFO } from '../data/courseData';

interface HeroProps {
  currentDay?: number;
}

export const Hero: React.FC<HeroProps> = ({ currentDay }) => {
  const displayDay = currentDay ?? COURSE_INFO.currentSimulatedDay;
  return (
    <section className="relative overflow-hidden min-h-[480px] sm:min-h-[540px] lg:min-h-[600px] flex items-center border-b border-[#DEDCD1]/15">
      {/* Background Image with Tactical Scrim */}
      <img
        src="/src/assets/images/hero_military_platoon_1790791496853.jpg"
        alt="Class Dashboard in formation at dawn"
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover object-[50%_35%] filter brightness-[0.45] contrast-[1.15]"
      />
      {/* Measured Dark Olive Gradient Scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#12150F] via-[#12150F]/75 to-[#12150F]/45" />

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8 space-y-6">
            {/* Top context line */}
            <div className="inline-flex items-center gap-2">
              <div className="bg-[#B3A47B] text-[#12150F] font-barlow font-bold text-xl sm:text-2xl px-5 py-1.5 tracking-[0.22em] uppercase">
                {COURSE_INFO.organization}
              </div>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="font-oswald text-5xl sm:text-7xl lg:text-8xl font-light tracking-[0.14em] text-[#DEDCD1] uppercase leading-none">
                Class Dashboard
              </h1>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <div className="bg-[#B3A47B] text-[#12150F] font-barlow font-bold text-xl sm:text-2xl px-5 py-1.5 tracking-[0.22em] uppercase">
                  {COURSE_INFO.courseCode}
                </div>
              </div>
            </div>

            {/* Editorial quote */}
            <p className="font-cormorant italic text-lg sm:text-2xl text-[#C6B891] max-w-2xl leading-relaxed pt-2">
              &ldquo;Non-Career Recruiter and Retention Noncommissioned Officer Course. Everything the platoon needs in one place &mdash; what&apos;s due and where the doctrine lives.&rdquo;
            </p>
          </div>

          {/* Quick HUD Metrics Card */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <div className="bg-[#1B2016]/90 border border-[#DEDCD1]/15 p-5 backdrop-blur-sm">
              <div className="flex items-center justify-between pb-3 border-b border-[#DEDCD1]/10">
                <span className="font-barlow text-xs uppercase tracking-[0.2em] text-[#8C9180]">Duty Station</span>
                <span className="font-barlow text-xs font-semibold text-[#DEDCD1]">Camp Robinson, AR</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div>
                  <div className="font-barlow text-[11px] uppercase tracking-wider text-[#8C9180]">Training Day</div>
                  <div className="font-oswald text-3xl font-light text-[#DEDCD1] mt-0.5">
                    Day {displayDay}
                  </div>
                  <div className="text-xs text-[#8C9180] font-barlow">of 25 Days</div>
                </div>
                <div className="border-l border-[#DEDCD1]/10 pl-4">
                  <div className="font-barlow text-[11px] uppercase tracking-wider text-[#C09553]">Graduation</div>
                  <div className="font-oswald text-3xl font-light text-[#C09553] mt-0.5">
                    20 NOV
                  </div>
                  <div className="text-xs text-[#8C9180] font-barlow">Militia Hall Ceremony</div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-[#DEDCD1]/10 flex items-center justify-between">
                <span className="font-barlow text-xs text-[#8C9180]">Course SQI</span>
                <span className="font-barlow text-xs font-semibold text-[#B3A47B] bg-[#12150F] px-2.5 py-1 border border-[#B3A47B]/30">
                  SQI4 Recruiter
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
