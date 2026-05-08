import { useState } from 'react';
import type { Store } from '../types';
import { Store as StoreIcon, Plus, ChevronDown, LogOut } from 'lucide-react';

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
    <div style={{ position: 'relative', marginBottom: 'var(--spacing-xl)', zIndex: 100 }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          backgroundColor: 'transparent',
          padding: '12px 0',
          width: '100%',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ 
            width: '32px', height: '32px', 
            backgroundColor: 'var(--color-primary)', color: 'white', 
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: 'var(--radius-sm)'
          }}>
            <StoreIcon size={16} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-text-muted)' }}>
              Location
            </span>
            <span style={{ fontWeight: 600, fontSize: '1.2rem', letterSpacing: '-0.5px' }}>
              {selectedStore ? selectedStore.name : 'Select a Store'}
            </span>
          </div>
        </div>
        <ChevronDown size={20} color="var(--color-text-main)" style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)' }} />
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          marginTop: '8px',
          backgroundColor: 'var(--color-surface)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--color-border)',
          zIndex: 50,
          overflow: 'hidden',
          animation: 'slideUpFade 0.2s ease-out forwards'
        }}>
          {isCreating ? (
            <form onSubmit={handleCreate} style={{ padding: '16px' }}>
              <input
                autoFocus
                type="text"
                placeholder="New Store Name..."
                value={newStoreName}
                onChange={(e) => setNewStoreName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 0',
                  border: 'none',
                  borderBottom: '1px solid var(--color-primary)',
                  marginBottom: '16px',
                  borderRadius: 0,
                  fontSize: '1rem'
                }}
              />
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  style={{ flex: 1, padding: '10px', backgroundColor: 'var(--color-bg)', fontWeight: 500 }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newStoreName.trim()}
                  style={{ flex: 1, padding: '10px', backgroundColor: 'var(--color-primary)', color: 'white', fontWeight: 500 }}
                >
                  Create
                </button>
              </div>
            </form>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {stores.map(store => (
                  <button
                    key={store.id}
                    onClick={() => {
                      onSelectStore(store.id);
                      setIsOpen(false);
                    }}
                    style={{
                      width: '100%',
                      padding: '16px',
                      textAlign: 'left',
                      backgroundColor: store.id === selectedStoreId ? 'var(--color-bg)' : 'transparent',
                      borderBottom: '1px solid var(--color-border)',
                      fontSize: '1rem',
                      fontWeight: store.id === selectedStoreId ? 600 : 400
                    }}
                  >
                    {store.name}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setIsCreating(true)}
                style={{
                  width: '100%',
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'var(--color-text-main)',
                  fontWeight: 500,
                  borderBottom: '1px solid var(--color-border)',
                  backgroundColor: 'var(--color-bg)'
                }}
              >
                <Plus size={18} /> Create Location
              </button>
              <button
                onClick={onSignOut}
                style={{
                  width: '100%',
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'var(--color-danger)',
                  fontWeight: 500
                }}
              >
                <LogOut size={18} /> Sign Out
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
