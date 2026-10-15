import type { Metadata } from 'next';
import { PageHeading } from '@/components/admin/layout/PageHeading';
import { ContentEditor } from '@/features/admin/content/ContentEditor';

export const metadata: Metadata = {
  title: 'Retreats Page Content Editor',
  description: 'Manage retreats overview, headlines and promotional media.',
};

export default function Page() {
  return (
    <>
      <PageHeading navKey="retreatsContent" />
      <ContentEditor key="retreats" section="retreats" />
    </>
  );
}
