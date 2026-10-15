'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type {
  StudioDB,
  Role,
  EntityKind,
  EntityDraftMap,
  AuditEntry,
  CollectionKey,
  CollectionItem,
} from '@/types/studio';
import { initialStudioData } from '@/data/admin/seed';

/** Partial record handed to the entity modal: an existing row to edit, or prefilled fields. */
export type EditingItem = Partial<EntityDraftMap[EntityKind]>;

interface StudioContextType {
  db: StudioDB;
  setDb: React.Dispatch<React.SetStateAction<StudioDB>>;
  isAdmin: boolean;
  toggleRole: () => void;
  toast: string;
  flash: (message: string) => void;
  saveRow: <K extends CollectionKey>(key: K, row: CollectionItem<K>, isEditing?: boolean) => void;
  removeRow: (key: CollectionKey, id: string) => void;
  modal: EntityKind | null;
  editingItem: EditingItem | null;
  openModal: <K extends EntityKind>(kind: K, item?: Partial<EntityDraftMap[K]>) => void;
  closeModal: () => void;
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
  isHydrated: boolean;
}

const StudioContext = createContext<StudioContextType | undefined>(undefined);

const STORAGE_KEY = 'mdx-admin-v2';

/** Max audit entries kept by row and content changes. */
export const AUDIT_LIMIT = 100;

export function createAuditEntry(actor: Role, action: string, entity: string): AuditEntry {
  return { at: new Date().toISOString(), actor, action, entity };
}

function withAudit(prev: StudioDB, action: string, entity: string): AuditEntry[] {
  return [createAuditEntry(prev.role, action, entity), ...prev.audit].slice(0, AUDIT_LIMIT);
}

export function StudioProvider({ children }: { children: React.ReactNode }) {
  const [db, setDb] = useState<StudioDB>(initialStudioData);
  const [isHydrated, setIsHydrated] = useState(false);
  const [toast, setToast] = useState('');
  const [modal, setModal] = useState<EntityKind | null>(null);
  const [editingItem, setEditingItem] = useState<EditingItem | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Hydrate from localStorage once on client. This must run after mount: reading storage
  // during render would make the first client render differ from the server HTML.
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<StudioDB>;
        // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time post-mount hydration
        setDb((prev) => ({
          ...prev,
          ...parsed,
          content: { ...prev.content, ...(parsed.content || {}) },
          settings: { ...prev.settings, ...(parsed.settings || {}) },
        }));
      }
    } catch {
      // Ignore fallback to initial
    }
    setIsHydrated(true);
  }, []);

  // Save changes to localStorage after hydration
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
      } catch {
        // storage quota exceeded or disabled
      }
    }
  }, [db, isHydrated]);

  const flash = useCallback((text: string) => {
    setToast(text);
    setTimeout(() => {
      setToast('');
    }, 3500);
  }, []);

  const isAdmin = db.role === 'Super Admin';

  const toggleRole = useCallback(() => {
    setDb((prev) => {
      const newRole: Role = prev.role === 'Super Admin' ? 'Staff' : 'Super Admin';
      return { ...prev, role: newRole };
    });
  }, []);

  const saveRow = useCallback(
    <K extends CollectionKey>(key: K, row: CollectionItem<K>, isEditing = false) => {
      setDb((prev) => {
        const list = prev[key] as CollectionItem<K>[];
        const exists = list.some((x) => x.id === row.id);
        const nextList = exists ? list.map((x) => (x.id === row.id ? row : x)) : [row, ...list];
        const label = 'name' in row ? row.name : 'title' in row ? row.title : row.id;
        return {
          ...prev,
          [key]: nextList,
          audit: withAudit(prev, isEditing ? 'Updated' : 'Created', `${key} ${label || row.id}`),
        };
      });
      setModal(null);
      setEditingItem(null);
      flash('Saved successfully');
    },
    [flash]
  );

  const removeRow = useCallback(
    (key: CollectionKey, id: string) => {
      if (typeof window !== 'undefined' && !window.confirm('Archive this item from the demo?')) {
        return;
      }
      setDb((prev) => {
        const list = prev[key] as { id: string }[];
        return {
          ...prev,
          [key]: list.filter((x) => x.id !== id),
          audit: withAudit(prev, 'Archived', `${key} ${id}`),
        };
      });
      flash('Item archived');
    },
    [flash]
  );

  const openModal = useCallback(
    <K extends EntityKind>(kind: K, item?: Partial<EntityDraftMap[K]>) => {
      setEditingItem(item || null);
      setModal(kind);
    },
    []
  );

  const closeModal = useCallback(() => {
    setModal(null);
    setEditingItem(null);
  }, []);

  return (
    <StudioContext.Provider
      value={{
        db,
        setDb,
        isAdmin,
        toggleRole,
        toast,
        flash,
        saveRow,
        removeRow,
        modal,
        editingItem,
        openModal,
        closeModal,
        drawerOpen,
        setDrawerOpen,
        isHydrated,
      }}
    >
      {children}
    </StudioContext.Provider>
  );
}

export function useStudio() {
  const context = useContext(StudioContext);
  if (!context) {
    throw new Error('useStudio must be used within a StudioProvider');
  }
  return context;
}
