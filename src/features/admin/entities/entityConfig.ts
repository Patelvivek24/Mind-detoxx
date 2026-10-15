import type {
  CollectionKey,
  EntityDraft,
  EntityDraftMap,
  EntityKind,
} from '@/types/studio';
import type { EditingItem } from '@/providers/StudioProvider';
import { iso, uid, REFERENCE_NOW } from '@/lib/formatters';

/** StudioDB collection each kind saves into ('recurring' generates sessions). */
export const ENTITY_COLLECTION: Record<EntityKind, CollectionKey> = {
  activity: 'activities',
  session: 'sessions',
  plan: 'plans',
  booking: 'bookings',
  event: 'events',
  rental: 'rentals',
  enquiry: 'enquiries',
  recurring: 'sessions',
};

export const ENTITY_TITLES: Record<EntityKind, string> = {
  activity: 'Activity',
  session: 'Class session',
  recurring: 'Repeat weekly classes',
  plan: 'Membership plan',
  booking: 'Booking',
  event: 'Event or retreat',
  rental: 'Studio rental',
  enquiry: 'Enquiry',
};

/** Field that must be non-blank before saving. */
export const REQUIRED_FIELD: Partial<Record<EntityKind, string>> = {
  activity: 'name',
  plan: 'name',
  booking: 'customer',
  event: 'title',
  rental: 'customer',
  enquiry: 'name',
  session: 'activity',
};

export const WIDE_KINDS: EntityKind[] = ['activity', 'event', 'recurring'];

const SEEDS: { [K in EntityKind]: () => EntityDraftMap[K] } = {
  activity: () => ({
    id: uid('a'),
    name: '',
    category: 'Movement',
    duration: 60,
    price: '',
    mode: 'Class',
    status: 'Draft',
    image: '',
    video: '',
    description: '',
  }),
  session: () => ({
    id: uid('s'),
    date: iso(REFERENCE_NOW),
    time: '08:00',
    duration: 60,
    activity: 'Yoga',
    instructor: '',
    capacity: 12,
    status: 'Scheduled',
  }),
  recurring: () => ({
    activity: 'Yoga',
    time: '08:00',
    duration: 60,
    capacity: 12,
    instructor: '',
    days: [1, 3, 5],
    start: iso(REFERENCE_NOW),
    weeks: 4,
  }),
  plan: () => ({
    id: uid('p'),
    name: '',
    price: '',
    period: '1 month',
    type: 'Monthly',
    sessions: '',
    description: '',
    status: 'Draft',
  }),
  booking: () => ({
    id: 'MDX-' + Math.floor(1000 + Math.random() * 9000),
    customer: '',
    phone: '',
    kind: 'Single class',
    item: '',
    date: iso(REFERENCE_NOW),
    amount: '',
    payment: 'Unpaid',
    status: 'Enquiry',
    source: 'Admin',
    sessionId: '',
    planId: '',
  }),
  event: () => ({
    id: uid('e'),
    title: '',
    date: iso(REFERENCE_NOW),
    time: '17:00',
    venue: 'Mind DetoxX Studio, Surat',
    capacity: 20,
    price: '',
    status: 'Draft',
    description: '',
    image: '',
  }),
  rental: () => ({
    id: uid('r'),
    customer: '',
    phone: '',
    date: iso(REFERENCE_NOW),
    start: '10:00',
    end: '12:00',
    purpose: '',
    amount: '',
    status: 'Enquiry',
    payment: 'Unpaid',
  }),
  enquiry: () => ({
    id: uid('q'),
    name: '',
    phone: '',
    type: 'Activity',
    interest: '',
    date: iso(REFERENCE_NOW),
    status: 'New',
    note: '',
  }),
};

/** A fresh blank record (with a new id) for the given kind. */
export function createEntitySeed<K extends EntityKind>(kind: K): EntityDraftMap[K] {
  return SEEDS[kind]();
}

/**
 * Staff may edit records but not their commercial fields: those are reset to the
 * values the record had before editing (or blank/Draft for new records).
 */
export function applyStaffRestrictions(
  kind: EntityKind,
  draft: EntityDraft,
  original: EditingItem | null
): EntityDraft {
  const prev = (original ?? {}) as Record<string, unknown>;
  switch (kind) {
    case 'activity':
    case 'event':
      return { ...draft, price: prev.price || '', status: prev.status || 'Draft' } as EntityDraft;
    case 'booking':
      return { ...draft, payment: prev.payment || 'Unpaid' } as EntityDraft;
    case 'rental':
      return { ...draft, amount: prev.amount || '' } as EntityDraft;
    default:
      return draft;
  }
}
