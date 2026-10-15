import type { Metadata } from 'next';
import { PageHeading } from '@/components/admin/layout/PageHeading';
import { EnquiriesTable } from '@/features/admin/enquiries/EnquiriesTable';

export const metadata: Metadata = {
  title: 'Enquiries',
  description: 'Manage prospect leads, workshop questions and rental queries.',
};

export default function Page() {
  return (
    <>
      <PageHeading navKey="enquiries" />
      <EnquiriesTable />
    </>
  );
}
