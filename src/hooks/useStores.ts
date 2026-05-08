import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { Store } from '../types';
import { useAuth } from './useAuth';

export function useStores() {
  const { user } = useAuth();
  const [stores, setStores] = useState<Store[]>([]);
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStores = useCallback(async () => {
    if (!user) {
      setStores([]);
      setSelectedStoreId(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('stores')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      
      setStores(data || []);
      
      // Select first store by default if none selected
      if (data && data.length > 0 && !selectedStoreId) {
        setSelectedStoreId(data[0].id);
      }
    } catch (error) {
      console.error('Error fetching stores:', error);
    } finally {
      setLoading(false);
    }
  }, [user, selectedStoreId]);

  useEffect(() => {
    fetchStores();
  }, [fetchStores]);

  const createStore = async (name: string) => {
    if (!user) return;
    try {
      const { data, error } = await supabase
        .from('stores')
        .insert([{ user_id: user.id, name }])
        .select();

      if (error) throw error;
      if (data) {
        setStores(prev => [...prev, data[0]]);
        setSelectedStoreId(data[0].id);
      }
    } catch (error) {
      console.error('Error creating store:', error);
    }
  };

  return {
    stores,
    selectedStoreId,
    setSelectedStoreId,
    createStore,
    loading,
    refreshStores: fetchStores
  };
}
