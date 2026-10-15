'use client';

import React from 'react';
import { Sparkles, Plus } from 'lucide-react';
import { useStudio } from '@/providers/StudioProvider';
import { useListFilter } from '@/hooks/useListFilter';
import { Toolbar } from '@/components/admin/ui/Toolbar';
import { StatusBadge } from '@/components/admin/ui/StatusBadge';
import { Button } from '@/components/admin/ui/Button';
import { DataTable, type DataTableColumn } from '@/components/admin/ui/DataTable';
import { ACTIVITY_CATEGORIES } from '@/data/admin/options';
import { fmt } from '@/lib/formatters';
import type { Activity } from '@/types/studio';

export const ActivitiesTable: React.FC = () => {
  const { db, openModal } = useStudio();
  const list = useListFilter(db.activities, {
    searchText: (x) => x.name,
    matchesFilter: (x, filter) => x.status === filter || x.category === filter,
  });

  const columns: DataTableColumn<Activity>[] = [
    {
      header: 'ACTIVITY',
      render: (x) => (
        <div className="name-cell">
          <div className="row-image">
            {x.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={x.image} alt={x.name} />
            ) : (
              <Sparkles size={19} />
            )}
          </div>
          <div>
            <b>{x.name}</b>
            <small>{x.description}</small>
          </div>
        </div>
      ),
    },
    { header: 'CATEGORY', render: (x) => x.category },
    { header: 'DURATION', render: (x) => `${x.duration} min` },
    { header: 'BOOKING', render: (x) => x.mode },
    { header: 'PRICE', render: (x) => fmt(x.price) },
    { header: 'VISIBILITY', render: (x) => <StatusBadge value={x.status} /> },
    {
      header: '',
      render: (x) => (
        <button type="button" className="text-button" onClick={() => openModal('activity', x)}>
          Edit
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
        filters={['All', 'Published', 'Draft', ...ACTIVITY_CATEGORIES]}
        action={
          <Button icon={Plus} onClick={() => openModal('activity')}>
            Add activity
          </Button>
        }
      />

      <DataTable columns={columns} rows={list.filtered} />

      <p className="footnote">
        Activity prices are intentionally blank until approved. Draft activities do not appear on
        the public site.
      </p>
    </>
  );
};

export default ActivitiesTable;
