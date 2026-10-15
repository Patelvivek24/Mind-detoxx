import type { Metadata } from 'next';
import { PageHeading } from '@/components/admin/layout/PageHeading';
import { MediaLibrary } from '@/features/admin/media/MediaLibrary';

export const metadata: Metadata = {
  title: 'Media Library',
  description: 'Upload and manage photography, background videos and brand assets.',
};

export default function Page() {
  return (
    <>
      <PageHeading navKey="media" />
      <MediaLibrary />
    </>
  );
}
