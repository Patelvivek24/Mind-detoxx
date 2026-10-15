'use client';

import React, { useState } from 'react';
import { Trash2, Save } from 'lucide-react';
import { useStudio, createAuditEntry, type EditingItem } from '@/providers/StudioProvider';
import type {
  Booking,
  CollectionItem,
  CollectionKey,
  EntityDraft,
  EntityDraftMap,
  EntityKind,
  RecurringDraft,
} from '@/types/studio';
import { Modal } from '@/components/admin/ui/Modal';
import { Button } from '@/components/admin/ui/Button';
import {
  ENTITY_COLLECTION,
  ENTITY_TITLES,
  REQUIRED_FIELD,
  WIDE_KINDS,
  applyStaffRestrictions,
  createEntitySeed,
} from './entityConfig';
import { generateRecurringSessions } from './recurringSessions';
import { ActivityForm } from './forms/ActivityForm';
import { SessionForm } from './forms/SessionForm';
import { RecurringForm } from './forms/RecurringForm';
import { PlanForm } from './forms/PlanForm';
import { BookingForm } from './forms/BookingForm';
import { EventForm } from './forms/EventForm';
import { RentalForm } from './forms/RentalForm';
import { EnquiryForm } from './forms/EnquiryForm';

export interface EntityModalProps {
  kind: EntityKind;
  value: EditingItem | null;
  onClose: () => void;
}

/** Create/edit dialog for every studio record kind; the per-kind fields live in ./forms. */
export const EntityModal: React.FC<EntityModalProps> = ({ kind, value, onClose }) => {
  const { db, setDb, isAdmin, saveRow, removeRow, flash } = useStudio();
  const [data, setData] = useState<EntityDraft>(
    () => ({ ...createEntitySeed(kind), ...value }) as EntityDraft
  );
  const editingId = value && 'id' in value ? value.id : undefined;

  const update = (patch: Partial<EntityDraft>) =>
    setData((prev) => ({ ...prev, ...patch }) as EntityDraft);

  /** Props for the form matching `kind`; the draft was seeded from that kind. */
  const formProps = <K extends EntityKind>() => ({
    draft: data as EntityDraftMap[K],
    update: update as (patch: Partial<EntityDraftMap[K]>) => void,
  });

  const handleSave = () => {
    if (kind === 'recurring') {
      const newRows = generateRecurringSessions(data as RecurringDraft);
      setDb((prev) => ({
        ...prev,
        sessions: [...prev.sessions, ...newRows],
        audit: [
          createAuditEntry(prev.role, 'Generated', `${newRows.length} recurring sessions`),
          ...prev.audit,
        ],
      }));
      flash(`${newRows.length} classes added to the calendar`);
      onClose();
      return;
    }

    const requiredField = REQUIRED_FIELD[kind];
    if (requiredField && !String((data as unknown as Record<string, unknown>)[requiredField] || '').trim()) {
      flash('Complete the required name or title first');
      return;
    }

    if (kind === 'booking') {
      const booking = data as Booking;
      if (booking.kind === 'Single class' && booking.sessionId && booking.status === 'Confirmed') {
        const s = db.sessions.find((x) => x.id === booking.sessionId);
        const used = db.bookings.filter(
          (x) => x.sessionId === booking.sessionId && x.status === 'Confirmed' && x.id !== booking.id
        ).length;
        if (s && used >= Number(s.capacity)) {
          flash('This class is full');
          return;
        }
      }
    }

    let row = data;
    if (!isAdmin) {
      if (kind === 'plan') {
        flash('Only Super Admin can change plans and prices');
        return;
      }
      row = applyStaffRestrictions(kind, data, value);
    }

    saveRow(ENTITY_COLLECTION[kind], row as CollectionItem<CollectionKey>, Boolean(editingId));
  };

  return (
    <Modal
      title={(editingId ? 'Edit ' : 'Add ') + ENTITY_TITLES[kind]}
      subtitle={
        kind === 'recurring'
          ? 'Generate concrete classes for selected days of the week.'
          : kind === 'session'
          ? 'Place a dated class on the calendar.'
          : 'Changes save to this browser demonstration.'
      }
      onClose={onClose}
      wide={WIDE_KINDS.includes(kind)}
      footer={
        <>
          {editingId && isAdmin && (
            <button
              className="delete-link"
              onClick={() => {
                removeRow(ENTITY_COLLECTION[kind], editingId);
                onClose();
              }}
            >
              <Trash2 size={15} /> Archive
            </button>
          )}
          <div className="grow" />
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button icon={Save} onClick={handleSave}>
            {kind === 'recurring' ? 'Create classes' : 'Save changes'}
          </Button>
        </>
      }
    >
      {kind === 'activity' && <ActivityForm {...formProps<'activity'>()} isAdmin={isAdmin} />}
      {kind === 'session' && <SessionForm {...formProps<'session'>()} />}
      {kind === 'recurring' && <RecurringForm {...formProps<'recurring'>()} />}
      {kind === 'plan' && <PlanForm {...formProps<'plan'>()} isAdmin={isAdmin} />}
      {kind === 'booking' && <BookingForm {...formProps<'booking'>()} />}
      {kind === 'event' && <EventForm {...formProps<'event'>()} isAdmin={isAdmin} />}
      {kind === 'rental' && <RentalForm {...formProps<'rental'>()} />}
      {kind === 'enquiry' && <EnquiryForm {...formProps<'enquiry'>()} />}
    </Modal>
  );
};

export default EntityModal;
