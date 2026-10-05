import React from 'react';
import { Check } from 'lucide-react';

interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-[#1B2016] text-[#DEDCD1] border border-[#B3A47B] px-4 py-3 shadow-2xl flex items-center gap-3 animate-fade-in">
      <div className="w-5 h-5 rounded-full bg-[#B3A47B] text-[#12150F] flex items-center justify-center shrink-0">
        <Check size={12} strokeWidth={3} />
      </div>
      <span className="font-barlow text-xs uppercase tracking-wider font-medium text-[#DEDCD1]">
        {message}
      </span>
    </div>
  );
};
