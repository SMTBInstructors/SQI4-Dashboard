import React, { useState, useEffect } from 'react';
import { COURSE_INFO } from '../data/courseData';
import { GRAD_DATE, DAY_1_DATE, getWeekdaysBetween } from '../utils/dayUtils';

interface CountdownProps {
  currentDay?: number;
}

export const Countdown: React.FC<CountdownProps> = ({ currentDay }) => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      // Target graduation time: 10:00 AM on Graduation day
      const target = new Date(GRAD_DATE);
      target.setHours(10, 0, 0, 0);

      const diff = target.getTime() - now.getTime();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Calculate training day progress based on active day
  const activeDay = currentDay ?? COURSE_INFO.currentSimulatedDay;
  const daysCompleted = Math.max(0, activeDay - 1);
  const totalDays = COURSE_INFO.totalTrainingDays;
  const progressPct = Math.min(100, Math.round((daysCompleted / totalDays) * 100));

  return (
    <section className="bg-[#12150F] border-b border-[#DEDCD1]/15 py-10">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Header & Mission status */}
          <div className="space-y-2 text-center lg:text-left">
            <div className="inline-block bg-[#B3A47B] text-[#12150F] font-barlow font-bold text-[11px] tracking-[0.24em] uppercase px-3 py-1">
              Mission Clock
            </div>
            <h2 className="font-oswald text-2xl sm:text-3xl font-light tracking-[0.14em] text-[#DEDCD1] uppercase">
              Countdown to Graduation
            </h2>
            <p className="text-xs sm:text-sm text-[#8C9180] font-barlow max-w-md">
              Ceremony at Militia Hall · Basic RRNCO Badge Pinning · Class 27-001
            </p>
          </div>

          {/* Large Countdown Digits HUD */}
          <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
            <div className="bg-[#1B2016] border border-[#DEDCD1]/15 px-3 sm:px-6 py-3 min-w-[70px] sm:min-w-[96px]">
              <span className="font-oswald text-3xl sm:text-5xl font-light text-[#DEDCD1] tabular-nums block">
                {String(timeLeft.days).padStart(2, '0')}
              </span>
              <span className="font-barlow text-[10px] sm:text-xs tracking-[0.2em] uppercase text-[#8C9180] mt-1 block">
                Days
              </span>
            </div>
            <div className="bg-[#1B2016] border border-[#DEDCD1]/15 px-3 sm:px-6 py-3 min-w-[70px] sm:min-w-[96px]">
              <span className="font-oswald text-3xl sm:text-5xl font-light text-[#DEDCD1] tabular-nums block">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="font-barlow text-[10px] sm:text-xs tracking-[0.2em] uppercase text-[#8C9180] mt-1 block">
                Hours
              </span>
            </div>
            <div className="bg-[#1B2016] border border-[#DEDCD1]/15 px-3 sm:px-6 py-3 min-w-[70px] sm:min-w-[96px]">
              <span className="font-oswald text-3xl sm:text-5xl font-light text-[#DEDCD1] tabular-nums block">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="font-barlow text-[10px] sm:text-xs tracking-[0.2em] uppercase text-[#8C9180] mt-1 block">
                Mins
              </span>
            </div>
            <div className="bg-[#1B2016] border border-[#C09553]/40 px-3 sm:px-6 py-3 min-w-[70px] sm:min-w-[96px]">
              <span className="font-oswald text-3xl sm:text-5xl font-light text-[#C09553] tabular-nums block">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="font-barlow text-[10px] sm:text-xs tracking-[0.2em] uppercase text-[#C09553] mt-1 block">
                Secs
              </span>
            </div>
          </div>

          {/* Progress Bar & Training Days Remaining */}
          <div className="w-full lg:w-72 bg-[#1B2016] border border-[#DEDCD1]/15 p-4 space-y-2.5">
            <div className="flex items-center justify-between text-xs font-barlow">
              <span className="text-[#8C9180] uppercase tracking-wider">Course Progress</span>
              <span className="font-semibold text-[#DEDCD1] tabular-nums">{progressPct}% Complete</span>
            </div>
            <div className="w-full h-2 bg-[#12150F] overflow-hidden border border-[#DEDCD1]/10">
              <div 
                className="h-full bg-gradient-to-r from-[#B3A47B] to-[#C09553] transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-[#8C9180] font-barlow">
              <span>Day {daysCompleted} Complete</span>
              <span>{totalDays - daysCompleted} Days to Badge</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
