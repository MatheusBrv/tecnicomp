export type ProductCategory = 
  | 'impresoras' 
  | 'repuestos' 
  | 'audio' 
  | 'smartwatch' 
  | 'servicios' 
  | 'laptops' 
  | 'componentes';

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  category: ProductCategory;
  condition?: 'Nuevo' | 'Seminuevo / Tintas cargadas' | 'Servicio';
  image: string;
  stock: number;
  features: string[];
  isFeatured?: boolean;
  installments?: {
    months: number;
    amount: number;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
}
