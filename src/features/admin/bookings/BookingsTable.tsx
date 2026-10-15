'use client';

import React from 'react';
import { BookOpen, Check, Clock, Plus } from 'lucide-react';
import { useStudio } from '@/providers/StudioProvider';
import { useListFilter } from '@/hooks/useListFilter';
import { MiniMetric } from '@/components/admin/ui/MiniMetric';
import { Toolbar } from '@/components/admin/ui/Toolbar';
import { StatusBadge } from '@/components/admin/ui/StatusBadge';
import { Button } from '@/components/admin/ui/Button';
import { DataTable, type DataTableColumn } from '@/components/admin/ui/DataTable';
import { dateLabel, fmt } from '@/lib/formatters';
import type { Booking } from '@/types/studio';

export const BookingsTable: React.FC = () => {
  const { db, openModal } = useStudio();
  const list = useListFilter(db.bookings, {
    searchText: (x) => `${x.id} ${x.customer} ${x.phone}`,
    matchesFilter: (x, filter) => x.status === filter,
  });

  const totalBookings = db.bookings.length;
  const confirmedCount = db.bookings.filter((x) => x.status === 'Confirmed').length;
  const pendingCount = db.bookings.filter((x) => x.payment === 'Pending').length;

  const columns: DataTableColumn<Booking>[] = [
    {
      header: 'REFERENCE / CUSTOMER',
      render: (x) => (
        <>
          <b>{x.id}</b>
          <small className="stack">
            {x.customer} · {x.phone}
          </small>
        </>
      ),
    },
    { header: 'TYPE', render: (x) => x.kind },
    { header: 'ITEM', render: (x) => x.item },
    { header: 'DATE', render: (x) => dateLabel(x.date) },
    { header: 'AMOUNT', render: (x) => fmt(x.amount) },
    { header: 'PAYMENT', render: (x) => <StatusBadge value={x.payment} /> },
    { header: 'BOOKING', render: (x) => <StatusBadge value={x.status} /> },
    {
      header: '',
      render: (x) => (
        <button type="button" className="text-button" onClick={() => openModal('booking', x)}>
          View / edit
        </button>
      ),
    },
  ];

  return (
    <>
      <div className="metrics-row">
        <MiniMetric label="Total bookings" value={totalBookings} icon={BookOpen} />
        <MiniMetric label="Confirmed" value={confirmedCount} icon={Check} />
        <MiniMetric label="Awaiting payment" value={pendingCount} icon={Clock} />
      </div>

      <Toolbar
        search={list.search}
        setSearch={list.setSearch}
        filter={list.filter}
        setFilter={list.setFilter}
        filters={['All', 'Confirmed', 'Awaiting payment', 'Enquiry', 'Cancelled']}
        action={
          <Button icon={Plus} onClick={() => openModal('booking')}>
            New booking
          </Button>
        }
      />

      <DataTable columns={columns} rows={list.filtered} />

      <p className="footnote">
        Attendance is outside this prototype. Payment statuses are sample data and cannot charge
        customers.
      </p>
    </>
  );
};

export default BookingsTable;
