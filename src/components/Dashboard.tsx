import type { Saree } from '../types';
import { AlertTriangle, Package } from 'lucide-react';

interface DashboardProps {
  inventory: Saree[];
}

export function Dashboard({ inventory }: DashboardProps) {
  const totalStock = inventory.reduce((sum, item) => sum + item.quantity, 0);
  const lowStockItems = inventory.filter(item => item.quantity > 0 && item.quantity < 3);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--spacing-md)',
      marginBottom: 'var(--spacing-lg)'
    }}>
      {/* Total Stock Card */}
      <div style={{
        backgroundColor: 'var(--color-primary)',
        color: 'white',
        padding: 'var(--spacing-lg)',
        borderRadius: 'var(--radius-lg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: 'var(--shadow-md)'
      }}>
        <div>
          <h2 style={{ fontSize: '1rem', fontWeight: 500, opacity: 0.9, marginBottom: '4px' }}>
            Total Sarees in Stock
          </h2>
          <p style={{ fontSize: '2.5rem', fontWeight: 700, lineHeight: 1 }}>
            {totalStock}
          </p>
        </div>
        <Package size={48} opacity={0.8} />
      </div>

      {/* Low Stock Alert */}
      {lowStockItems.length > 0 && (
        <div style={{
          backgroundColor: '#fff5f5',
          border: '1px solid #ffe3e3',
          padding: 'var(--spacing-md)',
          borderRadius: 'var(--radius-lg)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacing-sm)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-danger)' }}>
            <AlertTriangle size={20} />
            <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Low Stock Alert</h3>
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {lowStockItems.map(item => (
              <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span style={{ fontWeight: 500 }}>{item.sku} - {item.category}</span>
                <span style={{ color: 'var(--color-danger)', fontWeight: 600 }}>{item.quantity} left</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
