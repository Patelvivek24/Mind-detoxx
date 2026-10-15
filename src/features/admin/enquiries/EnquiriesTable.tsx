'use client';

import React from 'react';
import { Plus } from 'lucide-react';
import { useStudio } from '@/providers/StudioProvider';
import { useListFilter } from '@/hooks/useListFilter';
import { Toolbar } from '@/components/admin/ui/Toolbar';
import { StatusBadge } from '@/components/admin/ui/StatusBadge';
import { Button } from '@/components/admin/ui/Button';
import { DataTable, type DataTableColumn } from '@/components/admin/ui/DataTable';
import { ENQUIRY_STATUSES } from '@/data/admin/options';
import { dateLabel } from '@/lib/formatters';
import type { Enquiry } from '@/types/studio';

export const EnquiriesTable: React.FC = () => {
  const { db, openModal } = useStudio();
  const list = useListFilter(db.enquiries, {
    searchText: (x) => `${x.name} ${x.phone}`,
    matchesFilter: (x, filter) => x.status === filter,
  });

  const columns: DataTableColumn<Enquiry>[] = [
    {
      header: 'PERSON',
      render: (x) => (
        <>
          <b>{x.name}</b>
          <small className="stack">{x.phone}</small>
        </>
      ),
    },
    { header: 'INTEREST', render: (x) => x.interest },
    { header: 'TYPE', render: (x) => x.type },
    { header: 'REQUESTED', render: (x) => dateLabel(x.date) },
    { header: 'STATUS', render: (x) => <StatusBadge value={x.status} /> },
    {
      header: '',
      render: (x) => (
        <button type="button" className="text-button" onClick={() => openModal('enquiry', x)}>
          Open
        </button>
      ),
    },
  ];

  return (
    <>
      <Toolbar
        search={list.search}
        setSearch={list.setSearch}
        filter={list.filter}
        setFilter={list.setFilter}
        filters={['All', ...ENQUIRY_STATUSES]}
        action={
          <Button icon={Plus} onClick={() => openModal('enquiry')}>
            Add enquiry
          </Button>
        }
      />

      <DataTable columns={columns} rows={list.filtered} />
    </>
  );
};

export default EnquiriesTable;
