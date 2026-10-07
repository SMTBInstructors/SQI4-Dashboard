import React, { useState } from 'react';
import { ExternalLink, Copy, Check, Shield, FileText, Lock, Globe } from 'lucide-react';

const SHAREPOINT_URL = "https://armyeitaas.sharepoint-mil.us/teams/NGBSMTCARNGNONCAREERRECRUITER/References/Forms/Directorate.aspx?TeamsCID=c13b2cae%2De7ee%2D451a%2Db728%2De7084fd1252e";

export const Regulations: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(SHAREPOINT_URL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const keyRegulationsCovered = [
    { code: "AR 601-210", title: "Active and Reserve Components Enlistment Program", tag: "Statutory" },
    { code: "PPOM 25-042", title: "ARNG Accessions Options Criteria (AOC)", tag: "Policy" },
    { code: "AR 40-501", title: "Standards of Medical Fitness (Chapter 2)", tag: "Medical" },
    { code: "DA Pam 611-21", title: "Military Occupational Classification & 79T", tag: "Classification" },
    { code: "SRIP 27-01", title: "Selected Reserve Incentive Program & Matrix (ARNG-HRZ #27-01)", tag: "Incentives" },
    { code: "AR 670-1", title: "Wear & Appearance of Army Uniforms (AGSU/ASU)", tag: "Standards" },
    { code: "NGR 601-1", title: "Army National Guard Strength Maintenance", tag: "Operations" },
    { code: "AR 600-9", title: "The Army Body Composition Program", tag: "Readiness" },
  ];

  return (
    <section id="regs" className="bg-[#12150F] border-b border-[#DEDCD1]/15 py-14 sm:py-20">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="space-y-4">
          <div className="inline-block bg-[#B3A47B] text-[#12150F] font-barlow font-bold text-[11px] tracking-[0.24em] uppercase px-3 py-1">
            Policy of Record
          </div>
          
          <div className="flex flex-col lg:flex-row lg:items-baseline justify-between gap-6">
            <h2 className="font-oswald text-3xl sm:text-4xl lg:text-5xl font-light tracking-[0.14em] text-[#DEDCD1] uppercase">
              Regulations & Doctrine
            </h2>
            <p className="font-cormorant italic text-lg sm:text-2xl text-[#C6B891] max-w-xl">
              &ldquo;The Guard Gospel and all the law — what points to the statutory standard.&rdquo;
            </p>
          </div>
        </div>

        {/* Directorate References SharePoint Military Portal Card */}
        <div className="bg-[#1B2016] border border-[#B3A47B]/60 p-6 sm:p-10 relative overflow-hidden space-y-8">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#B3A47B]/5 pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-[#DEDCD1]/15">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="font-barlow text-xs font-bold uppercase tracking-wider text-[#12150F] bg-[#B3A47B] px-2.5 py-0.5">
                  Army 365 EITAAS
                </span>
                <span className="font-oswald text-xs uppercase tracking-widest text-[#8C9180]">
                  NGB SMTC Directorate References
                </span>
              </div>
              <h3 className="font-oswald text-2xl sm:text-3xl font-light tracking-wide text-[#DEDCD1] uppercase">
                Official Regulatory & Doctrine Repository
              </h3>
              <p className="font-barlow text-sm text-[#8C9180] leading-relaxed">
                All statutory regulations, policy operational memorandums (PPOMs), Selected Reserve Incentive Program (SRIP) policies, classification standards, and instructional doctrine are managed directly through the official Directorate SharePoint directory.
              </p>
            </div>

            {/* Primary Action Button */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto shrink-0">
              <a
                href={SHAREPOINT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#C09553] hover:bg-[#B3A47B] text-[#12150F] font-barlow font-bold text-xs uppercase tracking-[0.2em] transition-colors shadow-md"
              >
                <span>Access SharePoint Repository</span>
                <ExternalLink size={15} />
              </a>

              <button
                onClick={handleCopyLink}
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 bg-[#12150F] hover:bg-[#12150F]/80 text-[#DEDCD1] border border-[#DEDCD1]/20 font-barlow text-xs font-semibold uppercase tracking-wider transition-colors"
                title="Copy SharePoint link to clipboard"
              >
                {copied ? <Check size={14} className="text-[#B3A47B]" /> : <Copy size={14} />}
                <span>{copied ? "Link Copied" : "Copy Link"}</span>
              </button>
            </div>
          </div>

          {/* Direct Hyperlink Box */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-barlow">
              <span className="text-[#8C9180] uppercase tracking-wider font-semibold">
                Direct Directorate Repository Link:
              </span>
              <span className="text-[#C6B891] hidden sm:inline">
                CAC / Army 365 Authentication Required
              </span>
            </div>

            <div className="p-3.5 bg-[#12150F] border border-[#DEDCD1]/15 font-mono text-xs text-[#B3A47B] break-all select-all flex items-center justify-between gap-4">
              <a
                href={SHAREPOINT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-[#DEDCD1] truncate"
              >
                {SHAREPOINT_URL}
              </a>
              <a
                href={SHAREPOINT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 text-[#B3A47B] hover:text-[#C09553] inline-flex items-center gap-1 font-barlow text-xs font-semibold uppercase tracking-wider"
              >
                <span>Open</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>

          {/* Directory Summary of Covered Regulations */}
          <div className="space-y-3 pt-2">
            <h4 className="font-barlow text-xs font-semibold uppercase tracking-wider text-[#8C9180]">
              Key Doctrine & Regulatory Volumes Hosted on SharePoint:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {keyRegulationsCovered.map((item) => (
                <div
                  key={item.code}
                  className="bg-[#12150F]/60 border border-[#DEDCD1]/10 p-3 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-oswald text-xs font-semibold text-[#B3A47B] uppercase">
                      {item.code}
                    </span>
                    <span className="text-[10px] font-barlow text-[#8C9180] uppercase border border-[#DEDCD1]/10 px-1.5 py-0.5">
                      {item.tag}
                    </span>
                  </div>
                  <span className="text-xs text-[#DEDCD1] font-barlow leading-tight">
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Authentication Notice Footer */}
          <div className="pt-4 border-t border-[#DEDCD1]/10 flex items-center gap-3 text-xs font-barlow text-[#8C9180]">
            <Lock size={14} className="text-[#C09553] shrink-0" />
            <span>
              Network Access: If browsing from a non-government network, sign in using your DoD Enterprise Email / CAC credentials on the Army EITAAS authentication gateway.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
