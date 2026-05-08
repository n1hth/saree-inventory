import type { Saree, Store } from '../types';
import { AlertTriangle, Store as StoreIcon, ChevronDown, BarChart2 } from 'lucide-react';

interface DashboardProps {
  inventory: Saree[];
  stores: Store[];
  selectedStoreId: string | null;
  onSelectStore: (id: string) => void;
}

export function Dashboard({ inventory, stores, selectedStoreId, onSelectStore }: DashboardProps) {
  const totalStock = inventory.reduce((sum, item) => sum + item.quantity, 0);
  const totalValue = inventory.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const lowStockItems = inventory.filter(item => item.quantity > 0 && item.quantity < 3);

  const selectedStore = stores.find(s => s.id === selectedStoreId);

  // Format currency
  const formattedValue = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(totalValue);

  // Category Analytics Logic
  const categoryCounts = inventory.reduce((acc, item) => {
    if (item.quantity > 0) {
      acc[item.category] = (acc[item.category] || 0) + item.quantity;
    }
    return acc;
  }, {} as Record<string, number>);

  const sortedCategories = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1]);
  const categoryColors = ['#FFFFFF', '#CCCCCC', '#999999', '#666666', '#333333'];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--spacing-md)',
      marginBottom: 'var(--spacing-xl)'
    }}>
      
      {/* Home Screen Store Selector (Glassmorphic Pill) */}
      <div style={{ position: 'relative', alignSelf: 'flex-start' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 16px',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-full)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <StoreIcon size={14} color="var(--color-primary)" />
          <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--color-primary)' }}>
            {selectedStore ? selectedStore.name : 'Select Location'}
          </span>
          <ChevronDown size={14} color="var(--color-text-muted)" />
        </div>
        
        <select
          value={selectedStoreId || ''}
          onChange={(e) => onSelectStore(e.target.value)}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: 0,
            cursor: 'pointer',
            appearance: 'none',
            WebkitAppearance: 'none'
          }}
        >
          <option value="" disabled>Select Location</option>
          {stores.map(store => (
            <option key={store.id} value={store.id}>{store.name}</option>
          ))}
        </select>
      </div>

      <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
        {/* Total Stock Metric */}
        <div style={{
          flex: 1,
          backgroundColor: 'var(--color-surface)',
          padding: 'var(--spacing-lg) var(--spacing-md)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-border)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <p style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-text-muted)', marginBottom: '8px' }}>
            Total Stock
          </p>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 300, lineHeight: 1, color: 'var(--color-primary)' }}>
            {totalStock}
          </h2>
        </div>

        {/* Total Value Metric */}
        <div style={{
          flex: 1,
          backgroundColor: 'var(--color-primary)',
          color: 'var(--color-bg)',
          padding: 'var(--spacing-lg) var(--spacing-md)',
          borderRadius: 'var(--radius-lg)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'var(--glow-primary)'
        }}>
          <p style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.8, marginBottom: '8px' }}>
            Est. Capital
          </p>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 600, lineHeight: 1.2 }}>
            {formattedValue}
          </h2>
        </div>
      </div>

      {/* Category Analytics Bar */}
      {sortedCategories.length > 0 && (
        <div style={{
          backgroundColor: 'var(--color-surface)',
          padding: 'var(--spacing-md)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-main)' }}>
            <BarChart2 size={16} strokeWidth={2.5} />
            <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Category Breakdown</h3>
          </div>
          
          {/* Progress Bar */}
          <div style={{
            display: 'flex',
            height: '12px',
            borderRadius: 'var(--radius-full)',
            overflow: 'hidden',
            backgroundColor: 'var(--color-bg)'
          }}>
            {sortedCategories.map(([category, count], index) => (
              <div 
                key={category}
                style={{
                  width: `${(count / totalStock) * 100}%`,
                  backgroundColor: categoryColors[index % categoryColors.length],
                  transition: 'width 0.5s ease'
                }}
                title={`${category}: ${count} items`}
              />
            ))}
          </div>

          {/* Legend */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {sortedCategories.map(([category, count], index) => (
              <div key={category} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: categoryColors[index % categoryColors.length]
                }} />
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                  {category} <strong style={{ color: 'var(--color-text-main)' }}>{Math.round((count / totalStock) * 100)}%</strong>
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Low Stock Alert */}
      {lowStockItems.length > 0 && (
        <div style={{
          backgroundColor: 'transparent',
          border: '1px solid var(--color-danger)',
          padding: 'var(--spacing-md)',
          borderRadius: 'var(--radius-lg)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacing-sm)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-danger)' }}>
            <AlertTriangle size={18} strokeWidth={2.5} />
            <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Low Stock Alert</h3>
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
            {lowStockItems.map(item => (
              <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '8px' }}>
                <span style={{ fontWeight: 400 }}>{item.sku} <span style={{ color: 'var(--color-text-muted)' }}>— {item.category}</span></span>
                <span style={{ color: 'var(--color-danger)', fontWeight: 600 }}>{item.quantity} left</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
