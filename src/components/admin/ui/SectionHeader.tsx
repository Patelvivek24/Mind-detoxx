import React from 'react';

export interface SectionHeaderProps {
  title: string;
  description: string;
  action?: React.ReactNode;
  /** Adds vertical spacing above, for headers that follow other content. */
  spaced?: boolean;
}

/** Title + description row above a grid or list, with an optional action button. */
export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, description, action, spaced }) => (
  <div className={spaced ? 'section-head spaced' : 'section-head'}>
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
    {action}
  </div>
);

export default SectionHeader;
