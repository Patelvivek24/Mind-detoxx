import type { Metadata } from 'next';
import { PageHeading } from '@/components/admin/layout/PageHeading';
import { PaymentsLedger } from '@/features/admin/payments/PaymentsLedger';

export const metadata: Metadata = {
  title: 'Payments',
  description: 'View demonstration ledger of booking payments and transaction states.',
};

export default function Page() {
  return (
    <>
      <PageHeading navKey="payments" />
      <PaymentsLedger />
    </>
  );
}
