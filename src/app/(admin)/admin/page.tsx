import type { Metadata } from 'next';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { PageHeading } from '@/components/admin/layout/PageHeading';
import { Button } from '@/components/admin/ui/Button';
import { getAdminNavItem } from '@/data/admin/navigation';
import { WelcomeBanner } from '@/features/admin/dashboard/WelcomeBanner';
import { DashboardMetrics } from '@/features/admin/dashboard/DashboardMetrics';
import { UpcomingAgenda } from '@/features/admin/dashboard/UpcomingAgenda';
import { AttentionList } from '@/features/admin/dashboard/AttentionList';
import { QuickPublishGrid } from '@/features/admin/dashboard/QuickPublishGrid';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Your studio at a glance — manage classes, bookings and enquiries.',
};

export default function Page() {
  return (
    <>
      <PageHeading
        navKey="dashboard"
        action={
          <Link href={getAdminNavItem('schedule').href}>
            <Button icon={Plus}>Add a class</Button>
          </Link>
        }
      />

      <WelcomeBanner />
      <DashboardMetrics />

      <div className="dash-grid">
        <UpcomingAgenda />
        <AttentionList />
      </div>

      <QuickPublishGrid />
    </>
  );
}
