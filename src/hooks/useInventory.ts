import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { Saree } from '../types';

export function useInventory() {
  const [inventory, setInventory] = useState<Saree[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInventory = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('inventory')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setInventory(data || []);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);

  const addItem = useCallback(async (item: Omit<Saree, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('inventory')
        .insert([item])
        .select();

      if (error) throw error;
      if (data) {
        setInventory(prev => [data[0], ...prev]);
      }
    } catch (error) {
      console.error('Error adding item:', error);
    }
  }, []);

  const updateQuantity = useCallback(async (id: string, delta: number) => {
    try {
      // Optimistic update
      setInventory(prev => prev.map(item => {
        if (item.id === id) {
          return { ...item, quantity: Math.max(0, item.quantity + delta) };
        }
        return item;
      }));

      // Find current item for precise update
      const currentItem = inventory.find(i => i.id === id);
      if (!currentItem) return;

      const newQuantity = Math.max(0, currentItem.quantity + delta);

      const { error } = await supabase
        .from('inventory')
        .update({ quantity: newQuantity })
        .eq('id', id);

      if (error) {
        // Rollback on error
        fetchInventory();
        throw error;
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  }, [inventory, fetchInventory]);

  const deleteItem = useCallback(async (id: string) => {
    try {
      const { error } = await supabase
        .from('inventory')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setInventory(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  }, []);

  return {
    inventory,
    addItem,
    updateQuantity,
    deleteItem,
    loading,
    refresh: fetchInventory
  };
}
