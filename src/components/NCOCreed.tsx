import React, { useState } from 'react';
import { ExternalLink, Copy, Check, ShieldCheck, Award } from 'lucide-react';

interface NCOCreedProps {
  onNotify?: (message: string) => void;
}

const OFFICIAL_CREED_URL = "https://www.army.mil/values/nco.html";

const COMBINED_CREED_TEXT = 
  "No one is more professional than I. I am a noncommissioned officer, a leader of Soldiers. As a noncommissioned officer, I realize that I am a member of a time-honored corps, which is known as “The Backbone of the Army”. I am proud of the Corps of Noncommissioned Officers and will at all times conduct myself so as to bring credit upon the Corps, the military service and my country regardless of the situation in which I find myself. I will not use my grade or position to attain pleasure, profit, or personal safety. " +
  "Competence is my watchword. My two basic responsibilities will always be uppermost in my mind—accomplishment of my mission and the welfare of my Soldiers. I will strive to remain technically and tactically proficient. I am aware of my role as a noncommissioned officer. I will fulfill my responsibilities inherent in that role. All Soldiers are entitled to outstanding leadership; I will provide that leadership. I know my Soldiers and I will always place their needs above my own. I will communicate consistently with my Soldiers and never leave them uninformed. I will be fair and impartial when recommending both rewards and punishment. " +
  "Officers of my unit will have maximum time to accomplish their duties; they will not have to accomplish mine. I will earn their respect and confidence as well as that of my Soldiers. I will be loyal to those with whom I serve; seniors, peers, and subordinates alike. I will exercise initiative by taking appropriate action in the absence of orders. I will not compromise my integrity, nor my moral courage. I will not forget, nor will I allow my comrades to forget, the close relationship between the noncommissioned officer and the officer, and that we are the backbone of the Army.";

export const NCOCreed: React.FC<NCOCreedProps> = ({ onNotify }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(COMBINED_CREED_TEXT);
    setCopied(true);
    if (onNotify) {
      onNotify("The Creed of the Noncommissioned Officer copied to clipboard");
    }
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="creed" className="bg-[#12150F] border-b border-[#DEDCD1]/15 py-12 sm:py-16 relative overflow-hidden">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#DEDCD1]/15">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2">
              <span className="bg-[#B3A47B] text-[#12150F] font-barlow font-bold text-[11px] tracking-[0.24em] uppercase px-3 py-1">
                Corps Heritage & Doctrine
              </span>
              <span className="font-barlow text-xs uppercase tracking-[0.2em] text-[#8C9180]">
                TC 7-22.7 Standard
              </span>
            </div>

            <h2 className="font-oswald text-3xl sm:text-5xl lg:text-6xl font-light tracking-[0.12em] text-[#DEDCD1] uppercase leading-tight">
              The Creed of the Noncommissioned Officer
            </h2>
            <p className="font-barlow text-sm sm:text-base text-[#8C9180] leading-relaxed">
              The ethical compass, operational imperative, and professional covenant of the United States Army and Army National Guard NCO Corps.
            </p>
          </div>

          {/* Quick Action Toolbar */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={handleCopy}
              className="font-barlow text-xs font-semibold uppercase tracking-[0.16em] px-4 py-2.5 border border-[#B3A47B]/60 text-[#B3A47B] hover:bg-[#B3A47B]/10 transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              {copied ? <Check size={14} className="text-[#C09553]" /> : <Copy size={14} />}
              <span>{copied ? "Creed Copied" : "Copy Full Creed"}</span>
            </button>

            <a
              href={OFFICIAL_CREED_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-barlow text-xs font-semibold uppercase tracking-[0.16em] px-4 py-2.5 bg-[#C09553] hover:bg-[#B3A47B] text-[#12150F] transition-colors inline-flex items-center gap-2 shadow-sm"
            >
              <span>Official Army.mil Creed</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>

        {/* Unified Single Stanza Presentation */}
        <div className="bg-[#1B2016] border border-[#B3A47B]/40 p-6 sm:p-10 lg:p-12 relative shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#DEDCD1]/15">
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-[#C09553]" size={22} />
              <span className="font-oswald text-sm sm:text-base font-semibold tracking-[0.24em] text-[#C09553] uppercase">
                The Noncommissioned Officer Creed
              </span>
            </div>
            <div className="flex items-center gap-2 text-[#8C9180] text-xs font-barlow uppercase tracking-wider">
              <Award size={15} className="text-[#B3A47B]" />
              <span>Backbone of the Army</span>
            </div>
          </div>

          {/* Combined Text Content */}
          <div className="font-barlow text-sm sm:text-base lg:text-[17px] text-[#DEDCD1] leading-relaxed sm:leading-[1.9] tracking-normal space-y-4">
            <p>
              <strong className="font-oswald text-base sm:text-lg lg:text-xl font-normal text-[#C09553] uppercase tracking-wide mr-2">
                No one is more professional than I.
              </strong>
              I am a noncommissioned officer, a leader of Soldiers. As a noncommissioned officer, I realize that I am a member of a time-honored corps, which is known as “The Backbone of the Army”. I am proud of the Corps of Noncommissioned Officers and will at all times conduct myself so as to bring credit upon the Corps, the military service and my country regardless of the situation in which I find myself. I will not use my grade or position to attain pleasure, profit, or personal safety.
            </p>

            <p>
              <strong className="font-oswald text-base sm:text-lg lg:text-xl font-normal text-[#C09553] uppercase tracking-wide mr-2">
                Competence is my watchword.
              </strong>
              My two basic responsibilities will always be uppermost in my mind—accomplishment of my mission and the welfare of my Soldiers. I will strive to remain technically and tactically proficient. I am aware of my role as a noncommissioned officer. I will fulfill my responsibilities inherent in that role. All Soldiers are entitled to outstanding leadership; I will provide that leadership. I know my Soldiers and I will always place their needs above my own. I will communicate consistently with my Soldiers and never leave them uninformed. I will be fair and impartial when recommending both rewards and punishment.
            </p>

            <p>
              <strong className="font-oswald text-base sm:text-lg lg:text-xl font-normal text-[#C09553] uppercase tracking-wide mr-2">
                Officers of my unit will have maximum time to accomplish their duties; they will not have to accomplish mine.
              </strong>
              I will earn their respect and confidence as well as that of my Soldiers. I will be loyal to those with whom I serve; seniors, peers, and subordinates alike. I will exercise initiative by taking appropriate action in the absence of orders. I will not compromise my integrity, nor my moral courage. I will not forget, nor will I allow my comrades to forget, the close relationship between the noncommissioned officer and the officer, and that we are the backbone of the Army.
            </p>
          </div>

          {/* Footer Ribbon */}
          <div className="pt-6 border-t border-[#DEDCD1]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-barlow text-[#8C9180]">
            <span className="uppercase tracking-widest text-[#B3A47B]">
              U.S. Army & Army National Guard Doctrine · TC 7-22.7
            </span>
            <span className="italic">
              Adopted 1974 · Official Professional Creed
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
