import React from 'react';
import { ADMIN_OPTIONS } from '@/data/admin/options';
import { bindField, type EntityFormProps } from './bindField';

export function RentalForm({ draft, update }: EntityFormProps<'rental'>) {
  const renderField = bindField(draft, update);
  return (
    <div className="form-grid">
      {renderField('customer', 'Contact name')}
      {renderField('phone', 'Phone number', 'tel')}
      {renderField('date', 'Date', 'date')}
      {renderField('purpose', 'Purpose')}
      {renderField('start', 'Start time', 'time')}
      {renderField('end', 'End time', 'time')}
      {renderField('amount', 'Quoted amount in ₹', 'number')}
      {renderField('status', 'Request status', 'text', ADMIN_OPTIONS.rentalStatuses)}
      {renderField('payment', 'Payment state', 'text', ADMIN_OPTIONS.rentalPaymentStates)}
    </div>
  );
}
