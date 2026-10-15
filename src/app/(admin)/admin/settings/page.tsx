import type { Metadata } from 'next';
import { PageHeading } from '@/components/admin/layout/PageHeading';
import { SettingsForm } from '@/features/admin/settings/SettingsForm';

export const metadata: Metadata = {
  title: 'Settings',
  description: 'Manage studio profile, payment gateways, permissions and audit trail.',
};

export default function Page() {
  return (
    <>
      <PageHeading navKey="settings" />
      <SettingsForm />
    </>
  );
}
