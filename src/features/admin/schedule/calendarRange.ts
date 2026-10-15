import { dateLabel, iso } from '@/lib/formatters';

export type CalendarView = 'week' | 'month';

/** Visible days: Monday–Sunday for week view, a 6-week Sunday-first grid for month view. */
export function calendarDays(date: Date, view: CalendarView): Date[] {
  if (view === 'week') {
    const monday = new Date(date);
    monday.setDate(date.getDate() - ((date.getDay() + 6) % 7));
    return Array.from({ length: 7 }, (_, i) => {
      const x = new Date(monday);
      x.setDate(monday.getDate() + i);
      return x;
    });
  }
  const start = new Date(date.getFullYear(), date.getMonth(), 1);
  start.setDate(start.getDate() - start.getDay());
  return Array.from({ length: 42 }, (_, i) => {
    const x = new Date(start);
    x.setDate(start.getDate() + i);
    return x;
  });
}

/** Moves the anchor date by `n` weeks or months. */
export function shiftDate(date: Date, view: CalendarView, n: number): Date {
  const x = new Date(date);
  if (view === 'week') {
    x.setDate(x.getDate() + 7 * n);
  } else {
    x.setMonth(x.getMonth() + n);
  }
  return x;
}

export function rangeTitle(date: Date, view: CalendarView, days: Date[]): string {
  return view === 'week'
    ? `${dateLabel(iso(days[0]))} – ${dateLabel(iso(days[6]))}`
    : date.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
}
