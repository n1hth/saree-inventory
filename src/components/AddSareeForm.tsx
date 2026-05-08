import { useState } from 'react';
import type { Saree } from '../types';
import { X, Save } from 'lucide-react';

interface AddSareeFormProps {
  onAdd: (item: Omit<Saree, 'id' | 'created_at'>) => void;
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
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'var(--color-bg)',
      zIndex: 100,
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 'var(--spacing-md)',
        backgroundColor: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border)'
      }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Add New Saree</h2>
        <button 
          onClick={onClose}
          style={{ padding: '8px', minWidth: 'var(--touch-target-min)', minHeight: 'var(--touch-target-min)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          aria-label="Close"
        >
          <X size={24} color="var(--color-text-main)" />
        </button>
      </div>

      <form onSubmit={handleSubmit} style={{
        padding: 'var(--spacing-md)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-md)',
        flex: 1,
        overflowY: 'auto'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontWeight: 500 }} htmlFor="sku">SKU / Design ID</label>
          <input
            id="sku"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            placeholder="e.g. SILK-102"
            required
            style={{
              padding: 'var(--spacing-sm) var(--spacing-md)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)',
              minHeight: 'var(--touch-target-min)'
            }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontWeight: 500 }} htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            style={{
              padding: 'var(--spacing-sm) var(--spacing-md)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)',
              minHeight: 'var(--touch-target-min)',
              backgroundColor: 'white'
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
          <label style={{ fontWeight: 500 }} htmlFor="color">Color</label>
          <input
            id="color"
            name="color"
            value={formData.color}
            onChange={handleChange}
            placeholder="e.g. Royal Blue"
            required
            style={{
              padding: 'var(--spacing-sm) var(--spacing-md)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)',
              minHeight: 'var(--touch-target-min)'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
            <label style={{ fontWeight: 500 }} htmlFor="quantity">Quantity</label>
            <input
              id="quantity"
              name="quantity"
              type="number"
              min="0"
              value={formData.quantity}
              onChange={handleChange}
              required
              style={{
                padding: 'var(--spacing-sm) var(--spacing-md)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
                minHeight: 'var(--touch-target-min)'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
            <label style={{ fontWeight: 500 }} htmlFor="price">Price (₹)</label>
            <input
              id="price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              required
              style={{
                padding: 'var(--spacing-sm) var(--spacing-md)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
                minHeight: 'var(--touch-target-min)'
              }}
            />
          </div>
        </div>

        <div style={{ marginTop: 'auto', paddingBottom: 'var(--spacing-lg)' }}>
          <button type="submit" style={{
            width: '100%',
            backgroundColor: 'var(--color-primary)',
            color: 'white',
            padding: 'var(--spacing-sm) var(--spacing-md)',
            borderRadius: 'var(--radius-lg)',
            minHeight: 'var(--touch-target-min)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            fontSize: '1.1rem',
            fontWeight: 600,
            boxShadow: 'var(--shadow-md)'
          }}>
            <Save size={20} />
            Save Saree
          </button>
        </div>
      </form>
    </div>
  );
}
