'use client';

import React from 'react';
import { useStudio } from '@/providers/StudioProvider';
import { ADMIN_OPTIONS } from '@/data/admin/options';
import { bindField, type EntityFormProps } from './bindField';

export function SessionForm({ draft, update }: EntityFormProps<'session'>) {
  const { db } = useStudio();
  const renderField = bindField(draft, update);
  return (
    <div className="form-grid">
      {renderField(
        'activity',
        'Activity',
        'text',
        db.activities.filter((x) => x.mode === 'Class').map((x) => x.name)
      )}
      {renderField('date', 'Class date', 'date')}
      {renderField('time', 'Start time', 'time')}
      {renderField('duration', 'Duration in minutes', 'number')}
      {renderField('capacity', 'Maximum seats', 'number')}
      {renderField('instructor', 'Instructor')}
      {renderField('status', 'Session status', 'text', ADMIN_OPTIONS.sessionStatuses)}
    </div>
  );
}
