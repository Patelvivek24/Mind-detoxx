import React from 'react';
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
      {renderField('status', 'Request status', 'text', ['Enquiry', 'Pending', 'Confirmed', 'Cancelled'])}
      {renderField('payment', 'Payment state', 'text', ['Unpaid', 'Pending', 'Paid'])}
    </div>
  );
}
