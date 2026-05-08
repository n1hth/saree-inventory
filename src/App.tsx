import { useState } from 'react';
import { User as UserIcon } from 'lucide-react';
import { useAuth } from './hooks/useAuth';
import { useStores } from './hooks/useStores';
import { useInventory } from './hooks/useInventory';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { SareeList } from './components/SareeList';
import { AddSareeForm } from './components/AddSareeForm';
import { Toast } from './components/Toast';
import { Dock } from './components/Dock';
import { Profile } from './components/Profile';

export default function App() {
  const { user, loading: authLoading, signOut } = useAuth();
  const { stores, selectedStoreId, setSelectedStoreId, createStore, loading: storesLoading } = useStores();
  const { inventory, addItem, updateQuantity } = useInventory(selectedStoreId);
  
  const [activeTab, setActiveTab] = useState<'inventory' | 'profile'>('inventory');
  const [isAdding, setIsAdding] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  if (authLoading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div>;
  }

  if (!user) {
    return <Login />;
  }

  const handleAddSaree = (item: any) => {
    addItem(item);
    setToastMessage(`Added ${item.sku} to inventory`);
  };

  const handleSuccessToast = (message: string) => {
    setToastMessage(message);
  };

  return (
    <div className="container" style={{ paddingBottom: 'calc(var(--spacing-xl) * 3)' }}>
      <header style={{ position: 'relative', zIndex: 50, marginBottom: 'var(--spacing-lg)', marginTop: 'var(--spacing-md)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h1 
            onClick={() => setActiveTab('inventory')}
            style={{ fontSize: '1.5rem', fontWeight: 300, color: 'var(--color-primary)', letterSpacing: '-0.5px', cursor: 'pointer' }}
          >
            Nisira
          </h1>
          <button 
            onClick={() => setActiveTab('profile')}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: activeTab === 'profile' ? 'var(--color-primary)' : 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
              color: activeTab === 'profile' ? 'var(--color-bg)' : 'var(--color-text-main)'
            }}
          >
            <UserIcon size={18} />
          </button>
        </div>
      </header>

      {activeTab === 'profile' ? (
        <Profile 
          user={user}
          stores={stores}
          selectedStoreId={selectedStoreId}
          onSelectStore={setSelectedStoreId}
          onCreateStore={createStore}
          onSignOut={signOut}
        />
      ) : (
        /* Inventory Tab */
        <>
          {storesLoading ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>Loading stores...</div>
          ) : !selectedStoreId ? (
            <div style={{ textAlign: 'center', padding: '2rem', backgroundColor: 'var(--color-surface)', borderRadius: 'var(--radius-lg)' }}>
              <p>You don't have any locations selected.</p>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginTop: '8px' }}>Go to Profile to create or select one.</p>
            </div>
          ) : (
            <>
              <Dashboard 
                inventory={inventory} 
                stores={stores}
                selectedStoreId={selectedStoreId}
                onSelectStore={setSelectedStoreId}
              />
              
              <SareeList 
                inventory={inventory} 
                onUpdateQuantity={updateQuantity}
                onSuccessToast={handleSuccessToast}
              />

              {isAdding && (
                <AddSareeForm 
                  onAdd={handleAddSaree} 
                  onClose={() => setIsAdding(false)} 
                />
              )}
            </>
          )}
        </>
      )}

      {/* Replaced BottomNav and Floating Action Button with a unified Dock */}
      {!isAdding && (
        <Dock 
          activeTab={activeTab} 
          onChangeTab={setActiveTab} 
          onAddClick={() => setIsAdding(true)} 
        />
      )}

      {toastMessage && (
        <Toast 
          message={toastMessage} 
          onClose={() => setToastMessage(null)} 
        />
      )}
    </div>
  );
}
