import React from 'react';
import { ADMIN_OPTIONS } from '@/data/admin/options';
import { bindField, type EntityFormProps } from './bindField';

export function ActivityForm({ draft, update, isAdmin }: EntityFormProps<'activity'> & { isAdmin: boolean }) {
  const renderField = bindField(draft, update);
  return (
    <div className="form-grid">
      {renderField('name', 'Activity name')}
      {renderField('category', 'Category', 'text', ADMIN_OPTIONS.activityCategories)}
      {renderField('duration', 'Duration in minutes', 'number')}
      {renderField('mode', 'Booking mode', 'text', ADMIN_OPTIONS.activityModes)}
      {renderField('price', 'Single session price in ₹', 'number', null, 'Leave blank until approved')}
      {renderField('status', 'Visibility', 'text', isAdmin ? ['Draft', 'Published'] : ['Draft'])}
      <div className="span2">{renderField('description', 'Description', 'textarea')}</div>
      <div className="span2">{renderField('image', 'Image URL', 'text', null, 'Use a URL from Media library')}</div>
      <div className="span2">{renderField('video', 'Video URL')}</div>
    </div>
  );
}
