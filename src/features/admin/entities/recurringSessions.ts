import type { RecurringDraft, Session } from '@/types/studio';
import { iso, uid } from '@/lib/formatters';

/** Expands a weekly pattern into dated sessions for `weeks` weeks starting at `start`. */
export function generateRecurringSessions(draft: RecurringDraft): Session[] {
  const sessions: Session[] = [];
  const start = new Date(draft.start + 'T12:00:00');
  for (let i = 0; i < Number(draft.weeks) * 7; i++) {
    const day = new Date(start);
    day.setDate(start.getDate() + i);
    if (draft.days.includes(day.getDay())) {
      sessions.push({
        id: uid('s'),
        date: iso(day),
        time: draft.time,
        duration: Number(draft.duration),
        activity: draft.activity,
        instructor: draft.instructor,
        capacity: Number(draft.capacity),
        status: 'Scheduled',
      });
    }
  }
  return sessions;
}
