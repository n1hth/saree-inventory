import { useState } from 'react';
import type { Store } from '../types';
import { User as UserIcon, LogOut, Store as StoreIcon, Plus, ChevronDown } from 'lucide-react';
import type { User } from '@supabase/supabase-js';
import { LocationPickerSheet } from './LocationPickerSheet';

interface ProfileProps {
  user: User;
  stores: Store[];
  selectedStoreId: string | null;
  onSelectStore: (id: string) => void;
  onCreateStore: (name: string) => void;
  onSignOut: () => void;
}

export function Profile({ user, stores, selectedStoreId, onSelectStore, onCreateStore, onSignOut }: ProfileProps) {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const selectedStore = stores.find(s => s.id === selectedStoreId);

  const handleCreateStore = () => {
    const name = window.prompt('Enter new store name:');
    if (name && name.trim()) {
      onCreateStore(name.trim());
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)', paddingBottom: 'var(--spacing-xl)' }}>
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '2rem', fontWeight: 300, letterSpacing: '-0.5px' }}>Profile</h2>
        <p style={{ color: 'var(--color-text-muted)' }}>Manage your account and locations.</p>
      </div>

      {/* User Info Card */}
      <div style={{
        backgroundColor: 'var(--color-surface)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--spacing-lg)',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-md)',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--spacing-md)'
      }}>
        <div style={{
          width: '48px', height: '48px',
          backgroundColor: 'rgba(255,255,255,0.1)',
          borderRadius: 'var(--radius-full)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <UserIcon size={24} color="var(--color-primary)" />
        </div>
        <div>
          <p style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-text-muted)' }}>Logged in as</p>
          <p style={{ fontWeight: 500, fontSize: '1.1rem' }}>{user.email}</p>
        </div>
      </div>

      {/* Location Management */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 400, letterSpacing: '0.5px' }}>Current Location</h3>
        
        {/* Custom Location Picker Button */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setIsPickerOpen(true)}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: 'var(--color-surface)',
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-sm)',
              color: 'var(--color-text-main)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <StoreIcon size={20} color="var(--color-primary)" />
              <span style={{ fontSize: '1.1rem', fontWeight: 500 }}>
                {selectedStore ? selectedStore.name : 'Select a Location'}
              </span>
            </div>
            <ChevronDown size={20} color="var(--color-text-muted)" />
          </button>
        </div>

        {isPickerOpen && (
          <LocationPickerSheet
            stores={stores}
            selectedStoreId={selectedStoreId}
            onSelectStore={onSelectStore}
            onClose={() => setIsPickerOpen(false)}
          />
        )}

        <button
          onClick={handleCreateStore}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '16px',
            marginTop: '8px',
            backgroundColor: 'transparent',
            border: '1px dashed var(--color-border)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--color-text-main)',
            justifyContent: 'center',
            fontWeight: 500
          }}
        >
          <Plus size={18} /> Add New Location
        </button>
      </div>

      {/* Danger Zone */}
      <div style={{ marginTop: 'var(--spacing-lg)' }}>
        <button
          onClick={onSignOut}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            width: '100%',
            padding: '16px',
            backgroundColor: 'rgba(255, 68, 68, 0.1)',
            border: '1px solid rgba(255, 68, 68, 0.2)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--color-danger)',
            fontWeight: 600,
            fontSize: '1rem',
            letterSpacing: '0.5px',
            textTransform: 'uppercase'
          }}
        >
          <LogOut size={18} /> Sign Out
        </button>
      </div>
    </div>
  );
}
