'use client';

import React from 'react';
import { Info } from 'lucide-react';
import { useStudio } from '@/providers/StudioProvider';
import { Field } from '@/components/admin/ui/Field';
import { dateLabel, fmt } from '@/lib/formatters';
import type { BookingType } from '@/types/studio';
import { bindField, type EntityFormProps } from './bindField';

export function BookingForm({ draft, update }: EntityFormProps<'booking'>) {
  const { db } = useStudio();
  const renderField = bindField(draft, update);

  return (
    <div className="form-grid">
      {renderField('customer', 'Customer name')}
      {renderField('phone', 'Phone number', 'tel')}
      <Field
        label="Booking type"
        value={draft.kind}
        options={['Single class', 'Monthly', 'Group', 'Event', 'Rental']}
        onChange={(v) => update({ kind: v as BookingType, sessionId: '', planId: '' })}
      />
      {draft.kind === 'Single class' && (
        <label className="field">
          <span>Class session</span>
          <select
            value={draft.sessionId || ''}
            onChange={(e) => {
              const s = db.sessions.find((x) => x.id === e.target.value);
              const a = db.activities.find((x) => x.name === s?.activity);
              update({
                sessionId: e.target.value,
                item: s ? `${s.activity} · ${s.time}` : '',
                date: s?.date || draft.date,
                amount: a?.price || '',
              });
            }}
          >
            <option value="">Select a dated class</option>
            {db.sessions
              .filter((x) => x.status === 'Scheduled')
              .sort((a, b) => a.date.localeCompare(b.date))
              .map((s) => (
                <option key={s.id} value={s.id}>
                  {dateLabel(s.date)} · {s.time} · {s.activity}
                </option>
              ))}
          </select>
        </label>
      )}
      {['Monthly', 'Group'].includes(draft.kind) && (
        <label className="field">
          <span>Membership plan</span>
          <select
            value={draft.planId || ''}
            onChange={(e) => {
              const p = db.plans.find((x) => x.id === e.target.value);
              update({
                planId: e.target.value,
                item: p?.name || '',
                amount: p?.price || '',
              });
            }}
          >
            <option value="">Select a plan</option>
            {db.plans
              .filter((x) => x.type !== 'Drop-in')
              .map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} · {fmt(p.price)}
                </option>
              ))}
          </select>
        </label>
      )}
      {renderField('item', 'Class, plan or event')}
      {renderField('date', 'Booking date', 'date')}
      {renderField('amount', 'Amount in ₹', 'number')}
      {renderField('payment', 'Payment state', 'text', ['Unpaid', 'Pending', 'Paid', 'Refunded'])}
      {renderField('status', 'Booking status', 'text', ['Enquiry', 'Awaiting payment', 'Confirmed', 'Cancelled'])}
      <div className="span2">
        <div className="notice compact">
          <Info size={17} />
          Manual Paid status is for demo records only. Live gateway payments require verified callbacks.
        </div>
      </div>
    </div>
  );
}
