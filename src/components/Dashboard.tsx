import type { Saree } from '../types';
import { AlertTriangle } from 'lucide-react';

interface DashboardProps {
  inventory: Saree[];
}

export function Dashboard({ inventory }: DashboardProps) {
  const totalStock = inventory.reduce((sum, item) => sum + item.quantity, 0);
  const totalValue = inventory.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const lowStockItems = inventory.filter(item => item.quantity > 0 && item.quantity < 3);

  // Format currency
  const formattedValue = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(totalValue);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--spacing-md)',
      marginBottom: 'var(--spacing-xl)'
    }}>
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
