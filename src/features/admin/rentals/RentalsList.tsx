'use client';

import React from 'react';
import Link from 'next/link';
import { Building2, Plus, ArrowUpRight } from 'lucide-react';
import { useStudio } from '@/providers/StudioProvider';
import { StatusBadge } from '@/components/admin/ui/StatusBadge';
import { Button } from '@/components/admin/ui/Button';
import { SectionHeader } from '@/components/admin/ui/SectionHeader';
import { DataTable, type DataTableColumn } from '@/components/admin/ui/DataTable';
import { getAdminNavItem } from '@/data/admin/navigation';
import { dateLabel, fmt } from '@/lib/formatters';
import type { StudioRental } from '@/types/studio';

export const RentalsList: React.FC = () => {
  const { db, openModal } = useStudio();

  const columns: DataTableColumn<StudioRental>[] = [
    {
      header: 'CLIENT',
      render: (x) => (
        <>
          <b>{x.customer}</b>
          <small className="stack">{x.phone}</small>
        </>
      ),
    },
    {
      header: 'DATE / TIME',
      render: (x) => (
        <>
          {dateLabel(x.date)}
          <small className="stack">
            {x.start} – {x.end}
          </small>
        </>
      ),
    },
    { header: 'PURPOSE', render: (x) => x.purpose },
    { header: 'ESTIMATE', render: (x) => fmt(x.amount) },
    { header: 'STATUS', render: (x) => <StatusBadge value={x.status} /> },
    {
      header: '',
      render: (x) => (
        <button type="button" className="text-button" onClick={() => openModal('rental', x)}>
          Review
        </button>
      ),
    },
  ];

  return (
    <>
      <SectionHeader
        title="Rental requests"
        description="Approve studio use after confirming time, terms and availability."
        action={
          <Button icon={Plus} onClick={() => openModal('rental')}>
            Add request
          </Button>
        }
      />

      <div className="rental-banner">
        <Building2 size={22} />
        <div>
          <b>Weekend studio rate · ₹1,500/hour</b>
          <span>Other rates, deposit and minimum duration need confirmation.</span>
        </div>
        <Link href={getAdminNavItem('rentalContent').href}>
          <button type="button">
            Edit public page <ArrowUpRight size={15} />
          </button>
        </Link>
      </div>

      <DataTable columns={columns} rows={db.rentals} />
    </>
  );
};

export default RentalsList;
