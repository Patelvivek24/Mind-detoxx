'use client';

import React from 'react';
import { WalletCards, Check, Clock } from 'lucide-react';
import { useStudio } from '@/providers/StudioProvider';
import { MiniMetric } from '@/components/admin/ui/MiniMetric';
import { StatusBadge } from '@/components/admin/ui/StatusBadge';
import { DataTable, type DataTableColumn } from '@/components/admin/ui/DataTable';
import { fmt } from '@/lib/formatters';
import type { Booking } from '@/types/studio';

const columns: DataTableColumn<Booking>[] = [
  { header: 'REFERENCE', render: (x) => <b>{x.id}</b> },
  { header: 'CUSTOMER', render: (x) => x.customer },
  {
    header: 'PURPOSE',
    render: (x) => (
      <>
        {x.kind} · {x.item}
      </>
    ),
  },
  { header: 'AMOUNT', render: (x) => fmt(x.amount) },
  { header: 'PAYMENT STATUS', render: (x) => <StatusBadge value={x.payment} /> },
];

export const PaymentsLedger: React.FC = () => {
  const { db } = useStudio();

  const paidBookings = db.bookings.filter((x) => x.payment === 'Paid');
  const totalPaidAmount = paidBookings.reduce((s, x) => s + Number(x.amount || 0), 0);
  const pendingOrdersCount = db.bookings.filter((x) => x.payment === 'Pending').length;

  return (
    <>
      <div className="notice">
        <WalletCards size={18} />
        <span>
          Gateway integration is planned. This is a read-only demonstration of booking payment
          states; no real transaction is processed.
        </span>
      </div>

      <div className="metrics-row">
        <MiniMetric label="Sample paid amount" value={fmt(totalPaidAmount)} icon={WalletCards} />
        <MiniMetric label="Paid orders" value={paidBookings.length} icon={Check} />
        <MiniMetric label="Pending orders" value={pendingOrdersCount} icon={Clock} />
      </div>

      <DataTable columns={columns} rows={db.bookings} />
    </>
  );
};

export default PaymentsLedger;
