import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { Saree } from '../types';
import { useAuth } from './useAuth';

export function useInventory(storeId: string | null) {
  const { user } = useAuth();
  const [inventory, setInventory] = useState<Saree[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInventory = useCallback(async () => {
    if (!storeId || !user) {
      setInventory([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('inventory')
        .select('*')
        .eq('store_id', storeId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setInventory(data || []);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    } finally {
      setLoading(false);
    }
  }, [storeId, user]);

  useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);

  const addItem = useCallback(async (item: Omit<Saree, 'id' | 'created_at' | 'store_id' | 'user_id'>) => {
    if (!storeId || !user) return;
    try {
      const newItem = {
        ...item,
        store_id: storeId,
        user_id: user.id
      };
      
      const { data, error } = await supabase
        .from('inventory')
        .insert([newItem])
        .select();

      if (error) throw error;
      if (data) {
        setInventory(prev => [data[0], ...prev]);
      }
    } catch (error) {
      console.error('Error adding item:', error);
    }
  }, [storeId, user]);

  const updateQuantity = useCallback(async (id: string, delta: number) => {
    if (!storeId) return;
    try {
      // Optimistic update
      setInventory(prev => prev.map(item => {
        if (item.id === id) {
          return { ...item, quantity: Math.max(0, item.quantity + delta) };
        }
        return item;
      }));

      const currentItem = inventory.find(i => i.id === id);
      if (!currentItem) return;

      const newQuantity = Math.max(0, currentItem.quantity + delta);

      const { error } = await supabase
        .from('inventory')
        .update({ quantity: newQuantity })
        .eq('id', id)
        .eq('store_id', storeId);

      if (error) {
        fetchInventory();
        throw error;
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  }, [inventory, fetchInventory, storeId]);

  const deleteItem = useCallback(async (id: string) => {
    if (!storeId) return;
    try {
      const { error } = await supabase
        .from('inventory')
        .delete()
        .eq('id', id)
        .eq('store_id', storeId);

      if (error) throw error;
      setInventory(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  }, [storeId]);

  return {
    inventory,
    addItem,
    updateQuantity,
    deleteItem,
    loading,
    refresh: fetchInventory
  };
}
