import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useAuth } from './hooks/useAuth';
import { useStores } from './hooks/useStores';
import { useInventory } from './hooks/useInventory';
import { Login } from './components/Login';
import { StoreSelector } from './components/StoreSelector';
import { Dashboard } from './components/Dashboard';
import { SareeList } from './components/SareeList';
import { AddSareeForm } from './components/AddSareeForm';
import { Toast } from './components/Toast';

export default function App() {
  const { user, loading: authLoading, signOut } = useAuth();
  const { stores, selectedStoreId, setSelectedStoreId, createStore, loading: storesLoading } = useStores();
  const { inventory, addItem, updateQuantity } = useInventory(selectedStoreId);
  
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
    <div className="container">
      <header style={{ marginBottom: 'var(--spacing-md)', marginTop: 'var(--spacing-md)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 300, color: 'var(--color-primary)', letterSpacing: '-0.5px' }}>
            Lumina Lux
          </h1>
        </div>
        <StoreSelector 
          stores={stores}
          selectedStoreId={selectedStoreId}
          onSelectStore={setSelectedStoreId}
          onCreateStore={createStore}
          onSignOut={signOut}
        />
      </header>

      {storesLoading ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>Loading stores...</div>
      ) : !selectedStoreId ? (
        <div style={{ textAlign: 'center', padding: '2rem', backgroundColor: 'var(--color-surface)', borderRadius: 'var(--radius-lg)' }}>
          <p>You don't have any stores selected.</p>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginTop: '8px' }}>Create one using the dropdown above.</p>
        </div>
      ) : (
        <>
          <Dashboard inventory={inventory} />
          
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

          {/* Premium Floating Action Button */}
          <button
            onClick={() => setIsAdding(true)}
            style={{
              position: 'fixed',
              bottom: 'calc(var(--spacing-lg) + env(safe-area-inset-bottom))',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'var(--color-primary)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--radius-full)',
              padding: '16px 32px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: '1rem',
              fontWeight: 500,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
              zIndex: 40,
            }}
            aria-label="Add New Saree"
          >
            <Plus size={20} />
            <span>Add Item</span>
          </button>
        </>
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
