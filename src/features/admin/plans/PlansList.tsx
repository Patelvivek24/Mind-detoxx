'use client';

import React from 'react';
import { UsersRound, Check, AlertCircle, Plus } from 'lucide-react';
import { useStudio } from '@/providers/StudioProvider';
import { StatusBadge } from '@/components/admin/ui/StatusBadge';
import { Button } from '@/components/admin/ui/Button';
import { SectionHeader } from '@/components/admin/ui/SectionHeader';
import { fmt } from '@/lib/formatters';

export const PlansList: React.FC = () => {
  const { db, openModal } = useStudio();

  return (
    <>
      <SectionHeader
        title="Offerings"
        description="Define what a single booking or monthly pass includes."
        action={
          <Button icon={Plus} onClick={() => openModal('plan')}>
            New plan
          </Button>
        }
      />

      <div className="plan-grid">
        {db.plans.map((x) => (
          <div className="card plan-card" key={x.id}>
            <div className="split">
              <span className="plan-icon">
                <UsersRound size={20} />
              </span>
              <StatusBadge value={x.status} />
            </div>
            <span className="overline">
              {x.type} / {x.period}
            </span>
            <h3>{x.name}</h3>
            <div className="price">
              {fmt(x.price)}
              <small>{x.type === 'Group' ? ' / person' : ''}</small>
            </div>
            <p>{x.description}</p>
            <div className="divider" />
            <div className="list-line">
              <Check size={16} />
              {x.sessions}
            </div>
            <Button
              variant="secondary full"
              onClick={() => openModal('plan', x)}
            >
              Edit plan
            </Button>
          </div>
        ))}
      </div>

      <div className="notice">
        <AlertCircle size={18} />
        <span>
          Monthly access and the group-of-five purchase rules need client sign-off before checkout
          is enabled.
        </span>
      </div>
    </>
  );
};

export default PlansList;
