import React from 'react';
import { bindField, type EntityFormProps } from './bindField';

export function EventForm({ draft, update, isAdmin }: EntityFormProps<'event'> & { isAdmin: boolean }) {
  const renderField = bindField(draft, update);
  return (
    <div className="form-grid">
      {renderField('title', 'Event title')}
      {renderField('date', 'Date', 'date')}
      {renderField('time', 'Start time', 'time')}
      {renderField('venue', 'Venue')}
      {renderField('capacity', 'Ticket capacity', 'number')}
      {renderField('price', 'Ticket price in ₹', 'number')}
      {renderField('status', 'Visibility', 'text', isAdmin ? ['Draft', 'Published', 'Cancelled'] : ['Draft'])}
      {renderField('image', 'Cover image URL')}
      <div className="span2">{renderField('description', 'Full description', 'textarea')}</div>
    </div>
  );
}
