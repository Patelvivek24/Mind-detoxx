import React from 'react';
import { ADMIN_OPTIONS } from '@/data/admin/options';
import { bindField, type EntityFormProps } from './bindField';

export function EnquiryForm({ draft, update }: EntityFormProps<'enquiry'>) {
  const renderField = bindField(draft, update);
  return (
    <div className="form-grid">
      {renderField('name', 'Contact name')}
      {renderField('phone', 'Phone number', 'tel')}
      {renderField('type', 'Enquiry type', 'text', ADMIN_OPTIONS.enquiryTypes)}
      {renderField('date', 'Preferred date', 'date')}
      {renderField('interest', 'Interest or requested service')}
      {renderField('status', 'Follow-up status', 'text', ADMIN_OPTIONS.enquiryStatuses)}
      <div className="span2">{renderField('note', 'Internal notes', 'textarea')}</div>
    </div>
  );
}
