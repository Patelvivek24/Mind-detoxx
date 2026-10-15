import React from 'react';
import { getAdminNavItem, type AdminNavKey } from '@/data/admin/navigation';

export interface PageHeadingProps {
  /** Which admin screen this is; icon, eyebrow, title and description come from the nav config. */
  navKey: AdminNavKey;
  action?: React.ReactNode;
}

export const PageHeading: React.FC<PageHeadingProps> = ({ navKey, action }) => {
  const { icon: Icon, eyebrow, title, description } = getAdminNavItem(navKey);

  return (
    <div className="page-heading">
      <div>
        <div className="eyebrow">
          <Icon size={14} />
          {eyebrow}
        </div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};

export default PageHeading;
