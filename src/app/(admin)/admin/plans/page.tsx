import type { Metadata } from 'next';
import { PageHeading } from '@/components/admin/layout/PageHeading';
import { PlansList } from '@/features/admin/plans/PlansList';

export const metadata: Metadata = {
  title: 'Plans & Memberships',
  description: 'Manage drop-in classes, monthly passes and group wellness packages.',
};

export default function Page() {
  return (
    <>
      <PageHeading navKey="plans" />
      <PlansList />
    </>
  );
}
