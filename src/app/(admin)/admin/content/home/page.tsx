import type { Metadata } from 'next';
import { PageHeading } from '@/components/admin/layout/PageHeading';
import { ContentEditor } from '@/features/admin/content/ContentEditor';

export const metadata: Metadata = {
  title: 'Home Page Content Editor',
  description: 'Manage homepage hero copy, intro text and featured activity tags.',
};

export default function Page() {
  return (
    <>
      <PageHeading navKey="home" />
      <ContentEditor key="home" section="home" />
    </>
  );
}
