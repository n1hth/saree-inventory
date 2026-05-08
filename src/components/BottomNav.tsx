import { Package, User } from 'lucide-react';

interface BottomNavProps {
  activeTab: 'inventory' | 'profile';
  onChangeTab: (tab: 'inventory' | 'profile') => void;
}

export function BottomNav({ activeTab, onChangeTab }: BottomNavProps) {
  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(5, 5, 5, 0.8)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderTop: '1px solid var(--color-border)',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingBottom: 'env(safe-area-inset-bottom)',
      zIndex: 100,
    }}>
      <button
        onClick={() => onChangeTab('inventory')}
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          padding: '16px 0',
          color: activeTab === 'inventory' ? 'var(--color-primary)' : 'var(--color-text-muted)',
          opacity: activeTab === 'inventory' ? 1 : 0.6
        }}
      >
        <Package size={24} strokeWidth={activeTab === 'inventory' ? 2.5 : 2} />
        <span style={{ fontSize: '0.7rem', fontWeight: activeTab === 'inventory' ? 600 : 400, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Inventory
        </span>
      </button>

      <button
        onClick={() => onChangeTab('profile')}
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          padding: '16px 0',
          color: activeTab === 'profile' ? 'var(--color-primary)' : 'var(--color-text-muted)',
          opacity: activeTab === 'profile' ? 1 : 0.6
        }}
      >
        <User size={24} strokeWidth={activeTab === 'profile' ? 2.5 : 2} />
        <span style={{ fontSize: '0.7rem', fontWeight: activeTab === 'profile' ? 600 : 400, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Profile
        </span>
      </button>
    </div>
  );
}
