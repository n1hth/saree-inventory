import { useState } from 'react';
import type { Store } from '../types';
import { Store as StoreIcon, Plus, ChevronDown } from 'lucide-react';

interface StoreSelectorProps {
  stores: Store[];
  selectedStoreId: string | null;
  onSelectStore: (id: string) => void;
  onCreateStore: (name: string) => void;
  onSignOut: () => void;
}

export function StoreSelector({ stores, selectedStoreId, onSelectStore, onCreateStore, onSignOut }: StoreSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newStoreName, setNewStoreName] = useState('');

  const selectedStore = stores.find(s => s.id === selectedStoreId);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (newStoreName.trim()) {
      onCreateStore(newStoreName.trim());
      setNewStoreName('');
      setIsCreating(false);
      setIsOpen(false);
    }
  };

  return (
    <div style={{ position: 'relative', marginBottom: 'var(--spacing-md)' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: 'var(--color-surface)',
          padding: 'var(--spacing-sm) var(--spacing-md)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border)',
          width: '100%',
          justifyContent: 'space-between',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <StoreIcon size={20} color="var(--color-primary)" />
          <span style={{ fontWeight: 600, fontSize: '1rem' }}>
            {selectedStore ? selectedStore.name : 'Select a Store'}
          </span>
        </div>
        <ChevronDown size={20} color="var(--color-text-muted)" style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          marginTop: '4px',
          backgroundColor: 'var(--color-surface)',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--color-border)',
          zIndex: 50,
          overflow: 'hidden'
        }}>
          {isCreating ? (
            <form onSubmit={handleCreate} style={{ padding: 'var(--spacing-sm)' }}>
              <input
                autoFocus
                type="text"
                placeholder="New Store Name..."
                value={newStoreName}
                onChange={(e) => setNewStoreName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-primary)',
                  marginBottom: '8px'
                }}
              />
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  style={{ flex: 1, padding: '6px', backgroundColor: 'var(--color-bg)', borderRadius: 'var(--radius-md)' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newStoreName.trim()}
                  style={{ flex: 1, padding: '6px', backgroundColor: 'var(--color-primary)', color: 'white', borderRadius: 'var(--radius-md)' }}
                >
                  Create
                </button>
              </div>
            </form>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {stores.map(store => (
                <button
                  key={store.id}
                  onClick={() => {
                    onSelectStore(store.id);
                    setIsOpen(false);
                  }}
                  style={{
                    padding: 'var(--spacing-sm) var(--spacing-md)',
                    textAlign: 'left',
                    backgroundColor: store.id === selectedStoreId ? 'var(--color-bg)' : 'transparent',
                    borderBottom: '1px solid var(--color-border)'
                  }}
                >
                  {store.name}
                </button>
              ))}
              <button
                onClick={() => setIsCreating(true)}
                style={{
                  padding: 'var(--spacing-sm) var(--spacing-md)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'var(--color-primary)',
                  fontWeight: 500,
                  borderBottom: '1px solid var(--color-border)'
                }}
              >
                <Plus size={18} /> Add New Store
              </button>
              <button
                onClick={onSignOut}
                style={{
                  padding: 'var(--spacing-sm) var(--spacing-md)',
                  textAlign: 'left',
                  color: 'var(--color-danger)',
                  fontWeight: 500
                }}
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
