import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'NCO Creed', href: '#creed' },
    { label: 'Announcements', href: '#announcements' },
    { label: 'Evaluations', href: '#tracker' },
    { label: 'Runway', href: '#runway' },
    { label: 'Regulations', href: '#regs' },
    { label: 'Tools', href: '#jobaids' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#12150F]/95 backdrop-blur-md border-b border-[#DEDCD1]/15">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <a 
          href="#" 
          className="font-oswald text-xl sm:text-2xl font-normal tracking-[0.18em] text-[#DEDCD1] hover:text-[#B3A47B] transition-colors whitespace-nowrap shrink-0 uppercase"
        >
          Class Dashboard · NCRC 27-001
        </a>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm tracking-wider uppercase font-barlow font-medium text-[#8C9180]">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-[#DEDCD1] transition-colors whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile menu toggle button */}
        <div className="flex lg:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#DEDCD1] hover:text-[#B3A47B] focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#DEDCD1]/15 bg-[#1B2016] px-4 pt-3 pb-5 space-y-3">
          <div className="flex flex-col gap-2.5">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-barlow text-sm uppercase tracking-wider text-[#8C9180] hover:text-[#DEDCD1] py-1.5 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
