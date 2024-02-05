export interface ProductAllList_I {
  product_id: number;
  product_name: string;
  seller: number;
  store_name: string;
  image: string;
  price: number;
  shipping_method: string;
  shipping_fee: number;
  stock: number;
  products_info: string;
}

export interface ProductAllListResult {
  results: ProductAllList_I[];
}

export interface ProductInfo_I {
  product_id: number;
  created_at: string;
  updated_at: string;
  product_name: string;
  image: string;
  price: number;
  shipping_method: string;
  shipping_fee: number;
  stock: number;
  products_info: string;
  seller: number;
  store_name: string;
}
