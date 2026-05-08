import { LayoutDashboard, Plus } from 'lucide-react';

interface DockProps {
  activeTab: 'inventory' | 'profile';
  onChangeTab: (tab: 'inventory' | 'profile') => void;
  onAddClick: () => void;
}

export function Dock({ activeTab, onChangeTab, onAddClick }: DockProps) {
  return (
    <div style={{
      position: 'fixed',
      bottom: 'calc(var(--spacing-md) + env(safe-area-inset-bottom))',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: 'rgba(20, 20, 20, 0.65)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: 'var(--radius-full)',
      display: 'flex',
      alignItems: 'center',
      padding: '8px',
      gap: '8px',
      zIndex: 100,
      boxShadow: 'var(--shadow-lg)',
    }}>
      <button
        onClick={() => onChangeTab('inventory')}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          padding: '12px 24px',
          borderRadius: 'var(--radius-full)',
          backgroundColor: activeTab === 'inventory' ? 'rgba(255,255,255,0.1)' : 'transparent',
          color: activeTab === 'inventory' ? 'var(--color-primary)' : 'var(--color-text-muted)',
          transition: 'all 0.2s ease'
        }}
      >
        <LayoutDashboard size={20} strokeWidth={activeTab === 'inventory' ? 2.5 : 2} />
        <span style={{ fontSize: '0.85rem', fontWeight: activeTab === 'inventory' ? 600 : 500 }}>Home</span>
      </button>

      <div style={{ width: '1px', height: '24px', backgroundColor: 'rgba(255,255,255,0.1)' }} />

      <button
        onClick={onAddClick}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          padding: '12px 24px',
          borderRadius: 'var(--radius-full)',
          backgroundColor: 'var(--color-primary)',
          color: 'var(--color-bg)',
          boxShadow: 'var(--glow-primary)',
          transition: 'transform 0.2s ease',
        }}
      >
        <Plus size={20} strokeWidth={2.5} />
        <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Add</span>
      </button>
    </div>
  );
}
