export type Saree = {
  id: string;
  sku: string;
  category: string;
  color: string;
  quantity: number;
  price: number;
  created_at: string;
  store_id: string;
  user_id: string;
};

export type Store = {
  id: string;
  user_id: string;
  name: string;
  created_at: string;
};

