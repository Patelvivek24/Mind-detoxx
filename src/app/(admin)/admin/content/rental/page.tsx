import type { Metadata } from 'next';
import { PageHeading } from '@/components/admin/layout/PageHeading';
import { ContentEditor } from '@/features/admin/content/ContentEditor';

export const metadata: Metadata = {
  title: 'Rental Page Content Editor',
  description: 'Manage studio hall rental copy, terms and listed amenities.',
};

export default function Page() {
  return (
    <>
      <PageHeading navKey="rentalContent" />
      <ContentEditor key="rental" section="rental" />
    </>
  );
}
