import type { Metadata } from 'next';
import { PageHeading } from '@/components/admin/layout/PageHeading';
import { CalendarGrid } from '@/features/admin/schedule/CalendarGrid';

export const metadata: Metadata = {
  title: 'Class Calendar',
  description: 'Manage recurring timetables, dated sessions and instructor assignments.',
};

export default function Page() {
  return (
    <>
      <PageHeading navKey="schedule" />
      <CalendarGrid />
    </>
  );
}
