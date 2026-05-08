import type { Store } from '../types';
import { X, Store as StoreIcon, Check } from 'lucide-react';

interface LocationPickerSheetProps {
  stores: Store[];
  selectedStoreId: string | null;
  onSelectStore: (id: string) => void;
  onClose: () => void;
}

export function LocationPickerSheet({ stores, selectedStoreId, onSelectStore, onClose }: LocationPickerSheetProps) {
  return (
    <>
      {/* Backdrop */}
      <div 
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          zIndex: 90,
          animation: 'fadeIn 0.2s ease-out'
        }}
      />
      
      {/* Bottom Sheet */}
      <div style={{
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        maxWidth: '480px',
        margin: '0 auto',
        backgroundColor: 'var(--color-bg)',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        borderTopLeftRadius: '24px',
        borderTopRightRadius: '24px',
        boxShadow: '0 -10px 40px rgba(0,0,0,0.5)',
        animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 'var(--spacing-md) var(--spacing-lg)',
          borderBottom: '1px solid var(--color-border)'
        }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Select Location</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>Choose a store to manage inventory</p>
          </div>
          <button 
            onClick={onClose}
            style={{ padding: '8px', margin: '-8px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--color-surface)', borderRadius: '50%' }}
            aria-label="Close"
          >
            <X size={20} color="var(--color-text-main)" />
          </button>
        </div>

        {/* List */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '60vh',
          overflowY: 'auto',
          padding: 'var(--spacing-md) var(--spacing-lg) calc(var(--spacing-xl) + env(safe-area-inset-bottom))',
          gap: '8px'
        }}>
          {stores.map(store => (
            <button
              key={store.id}
              onClick={() => {
                onSelectStore(store.id);
                onClose();
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px',
                backgroundColor: store.id === selectedStoreId ? 'var(--color-surface)' : 'transparent',
                border: store.id === selectedStoreId ? '1px solid var(--color-border)' : '1px solid transparent',
                borderRadius: 'var(--radius-md)',
                color: 'var(--color-text-main)',
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ 
                  width: '36px', height: '36px', 
                  backgroundColor: store.id === selectedStoreId ? 'var(--color-primary)' : 'var(--color-surface)', 
                  color: store.id === selectedStoreId ? 'var(--color-bg)' : 'var(--color-text-muted)',
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: store.id !== selectedStoreId ? '1px solid var(--color-border)' : 'none'
                }}>
                  <StoreIcon size={16} />
                </div>
                <span style={{ fontSize: '1.1rem', fontWeight: store.id === selectedStoreId ? 600 : 400 }}>
                  {store.name}
                </span>
              </div>
              {store.id === selectedStoreId && (
                <Check size={20} color="var(--color-primary)" />
              )}
            </button>
          ))}
          
          {stores.length === 0 && (
            <div style={{ padding: '32px 0', textAlign: 'center', color: 'var(--color-text-muted)' }}>
              No locations found.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
