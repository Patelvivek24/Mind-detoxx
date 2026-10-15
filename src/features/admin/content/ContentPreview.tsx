import React from 'react';
import { Eye } from 'lucide-react';
import type { PageContentKey } from '@/types/studio';
import { heroBackgroundStyle, type EditableContent } from './contentSections';

interface PreviewProps {
  section: PageContentKey;
  draft: EditableContent;
}

/** Side-by-side "live page" approximation shown next to the editor form. */
export function LivePreview({ section, draft }: PreviewProps) {
  return (
    <div className="editor-preview">
      <div className="preview-bar">
        <span>
          <Eye size={15} /> LIVE PAGE PREVIEW
        </span>
        <span>Desktop</span>
      </div>
      <div className="preview-window">
        <div className="mock-nav">
          <b>✺ MIND DETOXX</b>
          <span>Home &nbsp; About &nbsp; Activities &nbsp; Schedule</span>
          <i>Book now</i>
        </div>
        <div className="mock-hero" style={heroBackgroundStyle(draft)}>
          <span>{section === 'home' ? draft.heroEyebrow : 'MIND DETOXX STUDIO'}</span>
          <h2>{draft.heroTitle || draft.title}</h2>
          <p>{draft.heroSubtitle || draft.intro || draft.story}</p>
          <button type="button">{draft.primaryCTA || 'Explore more'}</button>
        </div>
        <div className="mock-after">
          <b>{draft.introTitle || 'Breathe · Move · Heal · Grow · Repeat'}</b>
          <span>{draft.introBody || draft.amenities || draft.values}</span>
        </div>
      </div>
      <p className="preview-note">
        A visual approximation for admin review. Public site styling remains on the existing
        Vercel website.
      </p>
    </div>
  );
}

/** Larger hero-only preview rendered inside the "Public page preview" modal. */
export function LargePreview({ draft }: Pick<PreviewProps, 'draft'>) {
  return (
    <div className="large-preview">
      <div className="mock-hero" style={heroBackgroundStyle(draft)}>
        <span>{draft.heroEyebrow || 'MIND DETOXX'}</span>
        <h2>{draft.heroTitle || draft.title}</h2>
        <p>{draft.heroSubtitle || draft.intro || draft.story}</p>
      </div>
      <div className="mock-after">
        <b>{draft.introTitle || draft.values}</b>
        <span>{draft.introBody || draft.amenities}</span>
      </div>
    </div>
  );
}
