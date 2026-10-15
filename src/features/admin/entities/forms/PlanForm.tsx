import React from 'react';
import { ADMIN_OPTIONS } from '@/data/admin/options';
import { bindField, type EntityFormProps } from './bindField';

export function PlanForm({ draft, update, isAdmin }: EntityFormProps<'plan'> & { isAdmin: boolean }) {
  const renderField = bindField(draft, update);
  return (
    <div className="form-grid">
      {renderField('name', 'Plan name')}
      {renderField('type', 'Plan type', 'text', ADMIN_OPTIONS.planTypes)}
      {renderField('price', 'Price in ₹', 'number')}
      {renderField('period', 'Validity')}
      {renderField('sessions', 'Included classes or batch')}
      {renderField('status', 'Visibility', 'text', isAdmin ? ['Draft', 'Published'] : ['Draft'])}
      <div className="span2">{renderField('description', 'Description', 'textarea')}</div>
    </div>
  );
}
