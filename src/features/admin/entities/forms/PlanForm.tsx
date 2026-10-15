import React from 'react';
import { bindField, type EntityFormProps } from './bindField';

export function PlanForm({ draft, update, isAdmin }: EntityFormProps<'plan'> & { isAdmin: boolean }) {
  const renderField = bindField(draft, update);
  return (
    <div className="form-grid">
      {renderField('name', 'Plan name')}
      {renderField('type', 'Plan type', 'text', ['Monthly', 'Group', 'Drop-in', 'Quarterly'])}
      {renderField('price', 'Price in ₹', 'number')}
      {renderField('period', 'Validity')}
      {renderField('sessions', 'Included classes or batch')}
      {renderField('status', 'Visibility', 'text', isAdmin ? ['Draft', 'Published'] : ['Draft'])}
      <div className="span2">{renderField('description', 'Description', 'textarea')}</div>
    </div>
  );
}
