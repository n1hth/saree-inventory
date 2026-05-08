import { useState } from 'react';
import type { Saree } from '../types';
import { X, Save } from 'lucide-react';

interface AddSareeFormProps {
  onAdd: (item: Omit<Saree, 'id' | 'created_at' | 'store_id' | 'user_id'>) => void;
  onClose: () => void;
}

export function AddSareeForm({ onAdd, onClose }: AddSareeFormProps) {
  const [formData, setFormData] = useState({
    sku: '',
    category: '',
    color: '',
    quantity: '',
    price: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.sku || !formData.category || !formData.color || !formData.quantity || !formData.price) return;

    onAdd({
      sku: formData.sku,
      category: formData.category,
      color: formData.color,
      quantity: parseInt(formData.quantity, 10),
      price: parseFloat(formData.price)
    });
    
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 90,
          animation: 'fadeIn 0.2s ease-out'
        }}
      />
      
      {/* Full Screen Slide-Up */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'var(--color-bg)',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 'var(--spacing-md) var(--spacing-lg)',
          backgroundColor: 'var(--color-surface)',
          borderBottom: '1px solid var(--color-border)'
        }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Add New Saree</h2>
          <button 
            onClick={onClose}
            style={{ padding: '8px', margin: '-8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            aria-label="Close"
          >
            <X size={24} color="var(--color-text-main)" />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{
          padding: 'var(--spacing-lg)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacing-md)',
          overflowY: 'auto',
          paddingBottom: 'calc(var(--spacing-xl) + env(safe-area-inset-bottom))'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontWeight: 500, fontSize: '0.95rem' }} htmlFor="sku">SKU / Design ID</label>
            <input
              id="sku"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
              placeholder="e.g. SILK-102"
              required
              autoCapitalize="characters"
              style={{
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
                fontSize: '16px', // Prevents iOS zoom
                backgroundColor: 'var(--color-surface)'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontWeight: 500, fontSize: '0.95rem' }} htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              style={{
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
                fontSize: '16px',
                backgroundColor: 'var(--color-surface)',
                WebkitAppearance: 'none'
              }}
            >
              <option value="">Select a category</option>
              <option value="Silk">Silk</option>
              <option value="Cotton">Cotton</option>
              <option value="Fancy">Fancy</option>
              <option value="Georgette">Georgette</option>
              <option value="Linen">Linen</option>
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontWeight: 500, fontSize: '0.95rem' }} htmlFor="color">Color</label>
            <input
              id="color"
              name="color"
              value={formData.color}
              onChange={handleChange}
              placeholder="e.g. Royal Blue"
              required
              autoCapitalize="words"
              style={{
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
                fontSize: '16px',
                backgroundColor: 'var(--color-surface)'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
              <label style={{ fontWeight: 500, fontSize: '0.95rem' }} htmlFor="quantity">Quantity</label>
              <input
                id="quantity"
                name="quantity"
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                min="0"
                value={formData.quantity}
                onChange={handleChange}
                required
                style={{
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                  fontSize: '16px',
                  backgroundColor: 'var(--color-surface)'
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
              <label style={{ fontWeight: 500, fontSize: '0.95rem' }} htmlFor="price">Price (₹)</label>
              <input
                id="price"
                name="price"
                type="number"
                inputMode="decimal"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                required
                style={{
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                  fontSize: '16px',
                  backgroundColor: 'var(--color-surface)'
                }}
              />
            </div>
          </div>

          <div style={{ marginTop: 'var(--spacing-md)' }}>
            <button type="submit" style={{
              width: '100%',
              backgroundColor: 'var(--color-primary)',
              color: 'white',
              padding: '14px',
              borderRadius: 'var(--radius-lg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              fontSize: '1.1rem',
              fontWeight: 600,
              boxShadow: 'var(--shadow-md)'
            }}>
              <Save size={20} />
              Save Item
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
