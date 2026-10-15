'use client';

import React from 'react';
import { Sidebar } from '@/components/admin/layout/Sidebar';
import { Topbar } from '@/components/admin/layout/Topbar';
import { Toast } from '@/components/admin/ui/Toast';
import { EntityModal } from '@/features/admin/entities/EntityModal';
import { useStudio } from '@/providers/StudioProvider';

export const AdminShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toast, modal, editingItem, closeModal } = useStudio();

  return (
    <div className="app">
      <Sidebar />
      <div className="main-shell">
        <Topbar />
        <main>{children}</main>
      </div>
      <Toast message={toast} />
      {modal && (
        <EntityModal
          kind={modal}
          value={editingItem}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default AdminShell;
