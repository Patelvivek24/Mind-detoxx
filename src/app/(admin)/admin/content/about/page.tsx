import type { Metadata } from 'next';
import { PageHeading } from '@/components/admin/layout/PageHeading';
import { ContentEditor } from '@/features/admin/content/ContentEditor';

export const metadata: Metadata = {
  title: 'About Us Content Editor',
  description: 'Manage studio story, values, team profiles and address details.',
};

export default function Page() {
  return (
    <>
      <PageHeading navKey="about" />
      <ContentEditor key="about" section="about" />
    </>
  );
}
