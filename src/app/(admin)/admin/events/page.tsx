import type { Metadata } from 'next';
import { PageHeading } from '@/components/admin/layout/PageHeading';
import { EventsGrid } from '@/features/admin/events/EventsGrid';

export const metadata: Metadata = {
  title: 'Events & Retreats',
  description: 'Manage upcoming wellness retreats, masterclasses and sound baths.',
};

export default function Page() {
  return (
    <>
      <PageHeading navKey="events" />
      <EventsGrid />
    </>
  );
}
