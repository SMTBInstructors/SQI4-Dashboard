import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Countdown } from './components/Countdown';
import { Announcements } from './components/Announcements';
import { EvaluationTracker } from './components/EvaluationTracker';
import { AssignmentRunway } from './components/AssignmentRunway';
import { Regulations } from './components/Regulations';
import { NCOCreed } from './components/NCOCreed';
import { JobAids } from './components/JobAids';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { calculateCurrentTrainingDay, getAutomatedEvaluationStatus } from './utils/dayUtils';
import { EVALS, ELEARN_MODULES } from './data/courseData';

const STORAGE_KEY = 'ncrc27001-class-tracker-oct19-baseline';
const DAY_STORAGE_KEY = 'ncrc27001-current-training-day';

// Default initial state reflecting Course Start (Oct 19, Day 01 baseline: all evals open/pending)
const DEFAULT_STATUS_MAP: Record<string, number> = {};

export default function App() {
  const [currentDay, setCurrentDay] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(DAY_STORAGE_KEY);
      if (saved) {
        const parsed = parseInt(saved, 10);
        if (parsed >= 1 && parsed <= 25) return parsed;
      }
    } catch (e) {
      console.error('Failed to load training day', e);
    }
    return calculateCurrentTrainingDay();
  });

  const handleSelectDay = (day: number) => {
    setCurrentDay(day);
    try {
      localStorage.setItem(DAY_STORAGE_KEY, day.toString());
    } catch (e) {
      console.error('Failed to save training day', e);
    }
    showToast(`Active training day set to Day ${day}`);
  };

  const [statusMap, setStatusMap] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load tracker state from localStorage', e);
    }
    return DEFAULT_STATUS_MAP;
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const saveStatus = (newMap: Record<string, number>) => {
    setStatusMap(newMap);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newMap));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  };

  const handleToggleStatus = (id: string) => {
    const allItems = [...EVALS, ...ELEARN_MODULES];
    const item = allItems.find((i) => i.id === id);
    const defaultStatus = item ? getAutomatedEvaluationStatus(item, currentDay).numericStatus : 0;
    const current = statusMap[id] !== undefined ? statusMap[id] : defaultStatus;
    const next = (current + 1) % 3;
    const updated = { ...statusMap, [id]: next };
    saveStatus(updated);

    const labels = ['Not Started', 'In Progress', 'Complete'];
    showToast(`Updated ${item ? item.code : 'item'} status to: ${labels[next]}`);
  };

  const handleResetTracker = () => {
    saveStatus(DEFAULT_STATUS_MAP);
    showToast('Reset evaluation tracker to baseline');
  };

  // Ensure hash navigation works smoothly on mount (e.g. if URL has #runway)
  useEffect(() => {
    if (window.location.hash) {
      const element = document.querySelector(window.location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#12150F] text-[#DEDCD1] selection:bg-[#B3A47B] selection:text-[#12150F] flex flex-col font-barlow">
      {/* Top Bar with Top Bar Contract */}
      <Navbar />

      {/* Hero Header with Platoon Formation Scrim */}
      <main className="flex-1">
        <Hero currentDay={currentDay} />

        {/* The Creed of the Noncommissioned Officer */}
        <NCOCreed onNotify={showToast} />

        {/* Live Mission Countdown & Progress Meter */}
        <Countdown currentDay={currentDay} />

        {/* Cadre & Platoon Announcements (Day-Before Evaluation Warnings) */}
        <Announcements currentDay={currentDay} />

        {/* Written & Performance Evaluations Tracker */}
        <EvaluationTracker 
          statusMap={statusMap}
          onToggleStatus={handleToggleStatus}
        />

        {/* Primary Feature: The Assignment Runway (#runway) */}
        <AssignmentRunway currentDay={currentDay} />

        {/* Policy of Record — Regulations & Doctrine */}
        <Regulations />

        {/* Tools & Job Aids */}
        <JobAids onNotify={showToast} />
      </main>

      {/* Tactical Institutional Footer */}
      <Footer onResetTracker={handleResetTracker} />

      {/* Feedback Toast */}
      <Toast message={toastMessage} />
    </div>
  );
}
