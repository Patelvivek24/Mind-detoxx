import React from 'react';
import { Field } from '@/components/admin/ui/Field';
import type { EntityDraftMap, EntityKind } from '@/types/studio';

export interface EntityFormProps<K extends EntityKind> {
  draft: EntityDraftMap[K];
  update: (patch: Partial<EntityDraftMap[K]>) => void;
}

type FieldValue = string | number | null | undefined;

/**
 * Returns a renderer for a <Field> bound to one key of the draft.
 * Inputs report strings; like the original forms, they are stored as typed in.
 */
export function bindField<T>(draft: T, update: (patch: Partial<T>) => void) {
  return function renderField(
    key: keyof T & string,
    label: string,
    type = 'text',
    options?: string[] | null,
    help?: string
  ) {
    return (
      <Field
        key={key}
        label={label}
        type={type}
        options={options}
        value={draft[key] as FieldValue}
        onChange={(v) => update({ [key]: v } as Partial<T>)}
        help={help}
      />
    );
  };
}
