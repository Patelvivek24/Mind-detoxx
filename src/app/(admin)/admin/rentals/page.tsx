import type { Metadata } from 'next';
import { PageHeading } from '@/components/admin/layout/PageHeading';
import { RentalsList } from '@/features/admin/rentals/RentalsList';

export const metadata: Metadata = {
  title: 'Studio Rentals',
  description: 'Manage hall rental requests, equipment bookings and studio time slots.',
};

export default function Page() {
  return (
    <>
      <PageHeading navKey="rentals" />
      <RentalsList />
    </>
  );
}
