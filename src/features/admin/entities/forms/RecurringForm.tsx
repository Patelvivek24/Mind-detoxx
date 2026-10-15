'use client';

import React from 'react';
import { useStudio } from '@/providers/StudioProvider';
import { weekdays } from '@/lib/formatters';
import { bindField, type EntityFormProps } from './bindField';

export function RecurringForm({ draft, update }: EntityFormProps<'recurring'>) {
  const { db } = useStudio();
  const renderField = bindField(draft, update);
  return (
    <>
      <div className="form-grid">
        {renderField(
          'activity',
          'Activity',
          'text',
          db.activities.filter((x) => x.mode === 'Class').map((x) => x.name)
        )}
        {renderField('time', 'Start time', 'time')}
        {renderField('duration', 'Duration in minutes', 'number')}
        {renderField('capacity', 'Seats per class', 'number')}
        {renderField('start', 'Start generating from', 'date')}
        {renderField('weeks', 'Number of weeks', 'number')}
        {renderField('instructor', 'Instructor')}
      </div>
      <div className="field">
        <span>Repeat on days</span>
        <div className="day-picker">
          {weekdays.map((day, i) => (
            <button
              key={day}
              type="button"
              className={draft.days?.includes(i) ? 'selected' : ''}
              onClick={() =>
                update({
                  days: draft.days?.includes(i)
                    ? draft.days.filter((x) => x !== i)
                    : [...(draft.days || []), i],
                })
              }
            >
              {day}
            </button>
          ))}
        </div>
      </div>
      <p className="footnote">
        For the demo, recurring sessions are generated for the selected number of weeks. Check
        holidays and studio closures before publishing a real timetable.
      </p>
    </>
  );
}
