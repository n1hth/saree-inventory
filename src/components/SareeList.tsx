import { useState, useMemo } from 'react';
import type { Saree } from '../types';
import { Search, Plus, Minus, X } from 'lucide-react';

interface SareeListProps {
  inventory: Saree[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onSuccessToast: (message: string) => void;
}

// Helper to generate a consistent color hex from a string
function stringToColor(str: string) {
  const normalized = str.toLowerCase().trim();
  if (normalized.includes('red')) return '#E53935';
  if (normalized.includes('blue')) return '#1E88E5';
  if (normalized.includes('green')) return '#43A047';
  if (normalized.includes('yellow')) return '#FDD835';
  if (normalized.includes('black')) return '#212121';
  if (normalized.includes('white')) return '#FAFAFA';
  if (normalized.includes('pink') || normalized.includes('rose')) return '#D81B60';
  if (normalized.includes('purple')) return '#8E24AA';
  if (normalized.includes('orange')) return '#FB8C00';
  if (normalized.includes('gold')) return '#FFD54F';
  if (normalized.includes('silver')) return '#BDBDBD';
  
  // Fallback hash color
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xFF;
    color += ('00' + value.toString(16)).substr(-2);
  }
  return color;
}

export function SareeList({ inventory, onUpdateQuantity, onSuccessToast }: SareeListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredInventory = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return inventory.filter(item => 
      item.sku.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      item.color.toLowerCase().includes(query)
    );
  }, [inventory, searchQuery]);

  const handleUpdate = (item: Saree, delta: number) => {
    onUpdateQuantity(item.id, delta);
    const action = delta > 0 ? 'Increased' : 'Decreased';
    onSuccessToast(`${action} stock for ${item.sku}`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
      {/* Premium Search Bar */}
      <div style={{
        position: 'sticky',
        top: 'var(--spacing-sm)',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'rgba(17, 17, 17, 0.8)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        padding: '0 var(--spacing-md)',
        borderRadius: 'var(--radius-full)',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-sm)',
        transition: 'border-color 0.2s ease',
      }}>
        <Search size={18} color="var(--color-text-muted)" />
        <input
          type="text"
          placeholder="Search catalog..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            flex: 1,
            border: 'none',
            padding: '16px 12px',
            outline: 'none',
            backgroundColor: 'transparent',
            fontSize: '1rem',
            letterSpacing: '0.5px'
          }}
        />
        {searchQuery && (
          <button onClick={() => setSearchQuery('')} style={{ padding: '4px' }}>
            <X size={18} color="var(--color-text-muted)" />
          </button>
        )}
      </div>

      {/* Inventory List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredInventory.length === 0 ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'var(--spacing-xl) 0',
            textAlign: 'center',
            opacity: 0.7
          }}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '16px', color: 'var(--color-text-muted)' }}>
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M3 9h18" />
              <path d="M9 21V9" />
            </svg>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 300, color: 'var(--color-text-main)', letterSpacing: '1px' }}>
              {searchQuery ? 'No matching items' : 'Empty Catalog'}
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginTop: '8px' }}>
              {searchQuery ? 'Try adjusting your search terms.' : 'Add your first saree to begin.'}
            </p>
          </div>
        ) : (
          filteredInventory.map(item => (
            <div key={item.id} style={{
              backgroundColor: 'var(--color-surface)',
              borderRadius: 'var(--radius-lg)',
              padding: '16px',
              border: '1px solid var(--color-border)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span style={{ fontSize: '1.1rem', fontWeight: 600, letterSpacing: '0.5px' }}>{item.sku}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  <span>{item.category}</span>
                  <span>•</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <div style={{ 
                      width: '10px', 
                      height: '10px', 
                      borderRadius: '50%', 
                      backgroundColor: stringToColor(item.color),
                      border: '1px solid rgba(255,255,255,0.2)'
                    }} />
                    {item.color}
                  </div>
                </div>
                <span style={{ fontWeight: 400, fontSize: '1rem', marginTop: '2px' }}>
                  ₹{item.price.toLocaleString('en-IN')}
                </span>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'var(--color-bg)',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--color-border)',
                padding: '2px'
              }}>
                <button
                  onClick={() => handleUpdate(item, -1)}
                  disabled={item.quantity === 0}
                  style={{
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    color: item.quantity === 0 ? 'var(--color-text-muted)' : 'var(--color-text-main)',
                    opacity: item.quantity === 0 ? 0.5 : 1
                  }}
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </button>
                <span style={{
                  minWidth: '32px',
                  textAlign: 'center',
                  fontWeight: 500,
                  fontSize: '1rem'
                }}>
                  {item.quantity}
                </span>
                <button
                  onClick={() => handleUpdate(item, 1)}
                  style={{
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    color: 'var(--color-text-main)'
                  }}
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
