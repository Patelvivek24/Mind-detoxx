'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useStudio } from '@/providers/StudioProvider';
import { SectionHeader } from '@/components/admin/ui/SectionHeader';
import { getAdminNavItem, type AdminNavKey } from '@/data/admin/navigation';
import type { PageContentKey } from '@/types/studio';

interface QuickCard {
  navKey: AdminNavKey;
  label: string;
  /** Page whose publish status is shown; null for catalogue screens. */
  contentKey: PageContentKey | null;
}

const quickCards: QuickCard[] = [
  { navKey: 'home', label: 'Home page', contentKey: 'home' },
  { navKey: 'about', label: 'About us', contentKey: 'about' },
  { navKey: 'activities', label: 'Activities', contentKey: null },
  { navKey: 'retreatsContent', label: 'Retreats', contentKey: 'retreats' },
  { navKey: 'rentalContent', label: 'Studio rental', contentKey: 'rental' },
];

export const QuickPublishGrid: React.FC = () => {
  const { db } = useStudio();

  return (
    <>
      <SectionHeader title="Website publishing" description="Quickly jump into a page editor." spaced />
      <div className="quick-grid">
        {quickCards.map((card) => {
          const { href, icon: Icon } = getAdminNavItem(card.navKey);
          const status = card.contentKey
            ? db.content[card.contentKey]?.status || 'Draft'
            : 'Catalogue';

          return (
            <Link key={card.navKey} href={href} className="quick-card">
              <Icon size={21} />
              <b>{card.label}</b>
              <span>{status}</span>
              <ArrowUpRight size={16} />
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default QuickPublishGrid;
