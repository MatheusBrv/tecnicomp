'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product } from '@/types';
import { INITIAL_PRODUCTS } from '@/data/products';

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updated: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  resetToDefaults: () => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('tecnicomp_custom_products');
      if (stored) {
        setProducts(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Error cargando catálogo local:', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem('tecnicomp_custom_products', JSON.stringify(products));
    } catch (e) {
      console.error('Error guardando catálogo:', e);
    }
  }, [products, isLoaded]);

  const addProduct = (newProd: Omit<Product, 'id'>) => {
    const id = 'prod-' + Date.now();
    const productWithId: Product = { ...newProd, id };
    setProducts((prev) => [productWithId, ...prev]);
  };

  const updateProduct = (id: string, updated: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updated } : item))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
  };

  const resetToDefaults = () => {
    setProducts(INITIAL_PRODUCTS);
    localStorage.removeItem('tecnicomp_custom_products');
  };

  return (
    <ProductContext.Provider
      value={{ products, addProduct, updateProduct, deleteProduct, resetToDefaults }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts debe ser usado dentro de ProductProvider');
  }
  return context;
}
