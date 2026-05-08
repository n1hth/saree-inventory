import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useInventory } from './hooks/useInventory';
import { Dashboard } from './components/Dashboard';
import { SareeList } from './components/SareeList';
import { AddSareeForm } from './components/AddSareeForm';
import { Toast } from './components/Toast';

export default function App() {
  const { inventory, addItem, updateQuantity } = useInventory();
  const [isAdding, setIsAdding] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleAddSaree = (item: any) => {
    addItem(item);
    setToastMessage(`Added ${item.sku} to inventory`);
  };

  const handleSuccessToast = (message: string) => {
    setToastMessage(message);
  };

  return (
    <div className="container">
      <header style={{ marginBottom: 'var(--spacing-lg)', marginTop: 'var(--spacing-sm)' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-primary)' }}>
          Inventory Manager
        </h1>
      </header>

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

      {toastMessage && (
        <Toast 
          message={toastMessage} 
          onClose={() => setToastMessage(null)} 
        />
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsAdding(true)}
        style={{
          position: 'fixed',
          bottom: 'var(--spacing-md)',
          right: 'var(--spacing-md)',
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-primary)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'var(--shadow-lg)',
          zIndex: 50
        }}
        aria-label="Add New Saree"
      >
        <Plus size={32} />
      </button>
    </div>
  );
}
