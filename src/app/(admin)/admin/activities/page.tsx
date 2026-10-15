import type { Metadata } from 'next';
import { PageHeading } from '@/components/admin/layout/PageHeading';
import { ActivitiesTable } from '@/features/admin/activities/ActivitiesTable';

export const metadata: Metadata = {
  title: 'Activities Catalogue',
  description: 'Manage yoga practices, sound healing, meditations and specialized workshops.',
};

export default function Page() {
  return (
    <>
      <PageHeading navKey="activities" />
      <ActivitiesTable />
    </>
  );
}
