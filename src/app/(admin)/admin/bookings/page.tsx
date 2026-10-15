import type { Metadata } from 'next';
import { PageHeading } from '@/components/admin/layout/PageHeading';
import { BookingsTable } from '@/features/admin/bookings/BookingsTable';

export const metadata: Metadata = {
  title: 'Bookings',
  description: 'Track customer bookings, payments and attendance records.',
};

export default function Page() {
  return (
    <>
      <PageHeading navKey="bookings" />
      <BookingsTable />
    </>
  );
}
