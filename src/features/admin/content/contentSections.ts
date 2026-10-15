import type { CSSProperties } from 'react';
import type {
  AboutContent,
  HomeContent,
  PageContentKey,
  RentalContent,
  RetreatsContent,
} from '@/types/studio';

/**
 * Editor draft: the union of every page's fields, so shared UI (tabs, preview, SEO)
 * can read whichever fields the current page has.
 */
export type EditableContent = Partial<HomeContent & AboutContent & RentalContent & RetreatsContent> &
  Pick<HomeContent, 'status'>;

type TextKey = {
  [K in keyof EditableContent]-?: NonNullable<EditableContent[K]> extends string ? K : never;
}[keyof EditableContent];

export interface ContentFieldDef {
  key: TextKey;
  label: string;
  type?: 'textarea';
}

export const SECTION_TITLES: Record<PageContentKey, string> = {
  home: 'Home page',
  about: 'About us',
  retreats: 'Retreats page',
  rental: 'Rental page',
};

export const CONTENT_FIELDS: Record<PageContentKey, ContentFieldDef[]> = {
  home: [
    { key: 'heroEyebrow', label: 'Eyebrow' },
    { key: 'heroTitle', label: 'Hero heading' },
    { key: 'heroSubtitle', label: 'Hero description', type: 'textarea' },
    { key: 'primaryCTA', label: 'Primary button label' },
    { key: 'secondaryCTA', label: 'Secondary button label' },
    { key: 'introTitle', label: 'Introduction heading' },
    { key: 'introBody', label: 'Introduction text', type: 'textarea' },
  ],
  about: [
    { key: 'title', label: 'Page heading' },
    { key: 'story', label: 'Studio story', type: 'textarea' },
    { key: 'values', label: 'Mantra / values' },
    { key: 'founderName', label: 'Founder name' },
    { key: 'founderBio', label: 'Founder bio', type: 'textarea' },
    { key: 'studioAddress', label: 'Studio address' },
  ],
  retreats: [
    { key: 'title', label: 'Page heading' },
    { key: 'intro', label: 'Introduction', type: 'textarea' },
  ],
  rental: [
    { key: 'title', label: 'Page heading' },
    { key: 'intro', label: 'Introduction', type: 'textarea' },
    { key: 'amenities', label: 'Amenities', type: 'textarea' },
    { key: 'terms', label: 'Rental terms', type: 'textarea' },
  ],
};

export const MEDIA_FIELDS: Record<PageContentKey, ContentFieldDef[]> = {
  home: [
    { key: 'heroMedia', label: 'Hero video or image URL' },
    { key: 'heroPoster', label: 'Fallback image URL' },
  ],
  about: [{ key: 'studioImage', label: 'Studio image URL' }],
  retreats: [{ key: 'heroMedia', label: 'Cover image URL' }],
  rental: [{ key: 'heroMedia', label: 'Cover image URL' }],
};

/** Inline style for preview heroes: the page's hero/studio image under a dark gradient. */
export function heroBackgroundStyle(draft: EditableContent): CSSProperties {
  const image = draft.heroMedia || draft.studioImage;
  return image ? { backgroundImage: `linear-gradient(#041418bb,#041418ef),url(${image})` } : {};
}
