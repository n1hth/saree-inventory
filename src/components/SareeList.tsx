import { useState, useMemo } from 'react';
import type { Saree } from '../types';
import { Search, Plus, Minus, SearchX } from 'lucide-react';

interface SareeListProps {
  inventory: Saree[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onSuccessToast: (message: string) => void;
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
      {/* Search Bar */}
      <div style={{
        position: 'sticky',
        top: 'var(--spacing-md)',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'var(--color-surface)',
        padding: '0 var(--spacing-sm)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-sm)',
        border: '1px solid var(--color-border)'
      }}>
        <Search size={20} color="var(--color-text-muted)" style={{ marginLeft: '8px' }} />
        <input
          type="text"
          placeholder="Search SKU, Category or Color..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            flex: 1,
            border: 'none',
            padding: 'var(--spacing-sm) var(--spacing-md)',
            outline: 'none',
            backgroundColor: 'transparent',
            minHeight: 'var(--touch-target-min)',
          }}
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            style={{ padding: '8px' }}
          >
            <SearchX size={20} color="var(--color-text-muted)" />
          </button>
        )}
      </div>

      {/* Inventory List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
        {filteredInventory.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: 'var(--spacing-xl)',
            color: 'var(--color-text-muted)'
          }}>
            <p>No sarees found.</p>
          </div>
        ) : (
          filteredInventory.map(item => (
            <div key={item.id} style={{
              backgroundColor: 'var(--color-surface)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--spacing-md)',
              boxShadow: 'var(--shadow-sm)',
              border: '1px solid var(--color-border)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>{item.sku}</span>
                <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                  {item.category} • {item.color}
                </span>
                <span style={{ fontWeight: 500, marginTop: '4px' }}>
                  ₹{item.price}
                </span>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'var(--color-bg)',
                borderRadius: 'var(--radius-full)',
                padding: '4px'
              }}>
                <button
                  onClick={() => handleUpdate(item, -1)}
                  disabled={item.quantity === 0}
                  style={{
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'var(--color-surface)',
                    borderRadius: '50%',
                    boxShadow: 'var(--shadow-sm)',
                    opacity: item.quantity === 0 ? 0.5 : 1
                  }}
                  aria-label="Decrease quantity"
                >
                  <Minus size={20} color="var(--color-text-main)" />
                </button>
                <span style={{
                  minWidth: '40px',
                  textAlign: 'center',
                  fontWeight: 600,
                  fontSize: '1.1rem'
                }}>
                  {item.quantity}
                </span>
                <button
                  onClick={() => handleUpdate(item, 1)}
                  style={{
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'var(--color-surface)',
                    borderRadius: '50%',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                  aria-label="Increase quantity"
                >
                  <Plus size={20} color="var(--color-text-main)" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
