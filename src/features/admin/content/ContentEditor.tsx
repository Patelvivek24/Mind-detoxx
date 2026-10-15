'use client';

import React, { useState } from 'react';
import { Eye, Save, Check } from 'lucide-react';
import { useStudio, createAuditEntry, AUDIT_LIMIT } from '@/providers/StudioProvider';
import { Button } from '@/components/admin/ui/Button';
import { StatusBadge } from '@/components/admin/ui/StatusBadge';
import { Field } from '@/components/admin/ui/Field';
import { Modal } from '@/components/admin/ui/Modal';
import type { PageContentKey, StudioContentCollection } from '@/types/studio';
import {
  CONTENT_FIELDS,
  MEDIA_FIELDS,
  SECTION_TITLES,
  type ContentFieldDef,
  type EditableContent,
} from './contentSections';
import { TeamEditor } from './TeamEditor';
import { LivePreview, LargePreview } from './ContentPreview';

export interface ContentEditorProps {
  section: PageContentKey;
}

type PublishStatus = EditableContent['status'];
const TABS = ['Content', 'Media', 'SEO'] as const;

/** Draft/publish editor for one public page, with tabs and a live preview. */
export const ContentEditor: React.FC<ContentEditorProps> = ({ section }) => {
  const { db, setDb, isAdmin, flash } = useStudio();
  const [draft, setDraft] = useState<EditableContent>(db.content[section]);
  const [tab, setTab] = useState<(typeof TABS)[number]>('Content');
  const [preview, setPreview] = useState(false);

  const update = (patch: Partial<EditableContent>) => setDraft({ ...draft, ...patch });

  const renderFields = (fields: ContentFieldDef[]) =>
    fields.map(({ key, label, type }) => (
      <Field
        key={key}
        label={label}
        value={draft[key]}
        type={type || 'text'}
        onChange={(v) => update({ [key]: v })}
      />
    ));

  const handleSave = (status: PublishStatus) => {
    if (status === 'Published' && !isAdmin) {
      flash('Only Super Admin can publish');
      return;
    }
    setDb((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        [section]: { ...draft, status } as StudioContentCollection[typeof section],
      },
      audit: [
        createAuditEntry(prev.role, status === 'Published' ? 'Published' : 'Saved draft', `${section} page`),
        ...prev.audit,
      ].slice(0, AUDIT_LIMIT),
    }));
    setDraft({ ...draft, status });
    flash(status === 'Published' ? 'Page published in demo' : 'Draft saved');
  };

  return (
    <>
      <div className="editor-header">
        <div className="editor-tabs">
          {TABS.map((x) => (
            <button
              key={x}
              type="button"
              className={tab === x ? 'selected' : ''}
              onClick={() => setTab(x)}
            >
              {x}
            </button>
          ))}
        </div>

        <div className="editor-actions">
          <StatusBadge value={draft.status} />
          <Button variant="secondary" icon={Eye} onClick={() => setPreview(true)}>
            Preview
          </Button>
          <Button variant="secondary" icon={Save} onClick={() => handleSave('Draft')}>
            Save draft
          </Button>
          {isAdmin && (
            <Button icon={Check} onClick={() => handleSave('Published')}>
              Publish
            </Button>
          )}
        </div>
      </div>

      <div className="editor-layout">
        <div className="card editor-form">
          {tab === 'Content' && (
            <>
              <div className="form-intro">
                <h2>{SECTION_TITLES[section]} content</h2>
                <p>These fields appear on the public page after publishing.</p>
              </div>

              {renderFields(CONTENT_FIELDS[section])}

              {section === 'home' && (
                <Field
                  label="Featured activities"
                  value={(draft.featured || []).join(', ')}
                  onChange={(v) => update({ featured: v.split(',').map((s) => s.trim()) })}
                  help="Separate activity names with commas"
                />
              )}

              {section === 'about' && (
                <TeamEditor team={draft.team || []} onChange={(team) => update({ team })} />
              )}
            </>
          )}

          {tab === 'Media' && (
            <>
              <h2>Images and video</h2>
              <p className="muted">
                Paste an asset URL, or upload a file to the Media library and copy its link.
              </p>
              {renderFields(MEDIA_FIELDS[section])}
              <p className="footnote">
                For the live product, media should be stored in managed file storage with automatic
                optimization.
              </p>
            </>
          )}

          {tab === 'SEO' && (
            <>
              <h2>Search appearance</h2>
              <p className="muted">Preview how the page will appear in search results.</p>
              <Field
                label="SEO title"
                value={draft.seoTitle || ''}
                onChange={(v) => update({ seoTitle: v })}
                placeholder="Mind DetoxX — ..."
              />
              <Field
                label="Meta description"
                value={draft.seoDescription || ''}
                type="textarea"
                onChange={(v) => update({ seoDescription: v })}
              />
              <div className="search-preview">
                <span>mind-detoxx.vercel.app / {section}</span>
                <b>{draft.seoTitle || draft.title || draft.heroTitle}</b>
                <p>{draft.seoDescription || draft.intro || draft.heroSubtitle}</p>
              </div>
            </>
          )}
        </div>

        <LivePreview section={section} draft={draft} />
      </div>

      {preview && (
        <Modal
          title="Public page preview"
          subtitle="This is a demonstration preview of your unsaved changes."
          onClose={() => setPreview(false)}
          wide
        >
          <LargePreview draft={draft} />
        </Modal>
      )}
    </>
  );
};

export default ContentEditor;
