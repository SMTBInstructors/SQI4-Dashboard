/**
 * Calendar and training day utility functions for NCRC 27-001 course
 * Day 1: Monday, 19 October 2026
 * Day 25: Friday, 20 November 2026
 * (Weekdays only, weekends excluded)
 */

export const DAY_1_DATE = new Date(2026, 9, 19); // Month is 0-indexed: 9 = October
export const GRAD_DATE = new Date(2026, 10, 20);  // 10 = November

export const MONTH_NAMES_SHORT = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
export const DOW_SHORT = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

/**
 * Builds a map from training day (1..25) to exact Date object (skipping Sat & Sun)
 */
export function buildTrainingDayMap(): Record<number, Date> {
  const map: Record<number, Date> = {};
  const current = new Date(DAY_1_DATE);
  
  for (let n = 1; n <= 25; n++) {
    map[n] = new Date(current);
    do {
      current.setDate(current.getDate() + 1);
    } while (current.getDay() === 0 || current.getDay() === 6);
  }
  return map;
}

export const TRAINING_DAY_MAP = buildTrainingDayMap();

export function formatTrainingDayDate(dayNum: number): string {
  const date = TRAINING_DAY_MAP[dayNum];
  if (!date) return `Day ${dayNum}`;
  const dow = DOW_SHORT[date.getDay()];
  const d = date.getDate();
  const m = MONTH_NAMES_SHORT[date.getMonth()];
  return `${dow} ${d} ${m}`;
}

export function formatTrainingDayShort(dayNum: number): string {
  const date = TRAINING_DAY_MAP[dayNum];
  if (!date) return `D${dayNum}`;
  return `${date.getDate()} ${MONTH_NAMES_SHORT[date.getMonth()]}`;
}

export function getWeekdaysBetween(start: Date, end: Date): number {
  if (end < start) return 0;
  const d = new Date(start);
  let count = 0;
  while (d <= end) {
    if (d.getDay() !== 0 && d.getDay() !== 6) {
      count++;
    }
    d.setDate(d.getDate() + 1);
  }
  return count;
}

/**
 * Calculates current training day (1..25) based on current real-world date.
 * If prior to Day 1 (Oct 19, 2026), defaults to Day 1.
 * If past graduation, defaults to Day 25.
 */
export function calculateCurrentTrainingDay(): number {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const start = new Date(DAY_1_DATE.getFullYear(), DAY_1_DATE.getMonth(), DAY_1_DATE.getDate());
  const end = new Date(GRAD_DATE.getFullYear(), GRAD_DATE.getMonth(), GRAD_DATE.getDate());

  if (today < start) {
    return 1;
  }
  if (today >= end) {
    return 25;
  }

  let dayCount = 0;
  const d = new Date(start);
  while (d <= today && dayCount < 25) {
    if (d.getDay() !== 0 && d.getDay() !== 6) {
      dayCount++;
    }
    d.setDate(d.getDate() + 1);
  }
  return Math.max(1, Math.min(25, dayCount));
}

export type AutomatedStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETE';

/**
 * Automatically computes evaluation status based on the live calendar date vs the item's Due Day:
 * - If today's calendar date has passed the Due Day: COMPLETE
 * - If today's calendar date is the Due Day: IN_PROGRESS
 * - If today's calendar date is prior to the Due Day: NOT_STARTED
 */
export function getCalendarAutomatedStatus(item: { assignedDay: number; dueDay: number }): {
  status: AutomatedStatus;
  numericStatus: number;
  label: 'Not Started' | 'In Progress' | 'Complete';
} {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

  const dueDate = TRAINING_DAY_MAP[item.dueDay];
  if (!dueDate) {
    return { status: 'NOT_STARTED', numericStatus: 0, label: 'Not Started' };
  }
  const dueTime = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate()).getTime();

  if (today > dueTime) {
    return {
      status: 'COMPLETE',
      numericStatus: 2,
      label: 'Complete'
    };
  }
  if (today === dueTime) {
    return {
      status: 'IN_PROGRESS',
      numericStatus: 1,
      label: 'In Progress'
    };
  }
  return {
    status: 'NOT_STARTED',
    numericStatus: 0,
    label: 'Not Started'
  };
}

/**
 * Automatically computes evaluation status based on calendar or timeline:
 * - If current training day has passed the due day: COMPLETE
 * - If current training day is the due day: IN_PROGRESS
 * - If current training day is prior to due day: NOT_STARTED
 */
export function getAutomatedEvaluationStatus(
  item: { assignedDay: number; dueDay: number },
  currentDay?: number
): {
  status: AutomatedStatus;
  numericStatus: number;
  label: 'Not Started' | 'In Progress' | 'Complete';
} {
  if (currentDay !== undefined) {
    if (currentDay > item.dueDay) {
      return {
        status: 'COMPLETE',
        numericStatus: 2,
        label: 'Complete'
      };
    }
    if (currentDay === item.dueDay) {
      return {
        status: 'IN_PROGRESS',
        numericStatus: 1,
        label: 'In Progress'
      };
    }
    return {
      status: 'NOT_STARTED',
      numericStatus: 0,
      label: 'Not Started'
    };
  }

  return getCalendarAutomatedStatus(item);
}
