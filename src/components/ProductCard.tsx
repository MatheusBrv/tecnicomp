'use client';

import React from 'react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelectProduct?: (product: Product) => void;
}

export function ProductCard({ product, onSelectProduct }: ProductCardProps) {
  const { cart, addToCart, updateQuantity } = useCart();

  const cartItem = cart.find((item) => item.product.id === product.id);
  const quantity = cartItem?.quantity || 0;

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateQuantity(product.id, quantity + 1);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateQuantity(product.id, quantity - 1);
  };

  return (
    <div
      onClick={() => onSelectProduct?.(product)}
      className="group bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/50 rounded-3xl p-3.5 sm:p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10 cursor-pointer relative"
    >
      {/* Badge Superior */}
      <div className="absolute top-3.5 left-3.5 z-10">
        <span
          className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md ${
            product.condition && product.condition.includes('Seminuevo')
              ? 'bg-amber-400 text-slate-950'
              : 'bg-emerald-500 text-slate-950'
          }`}
        >
          {product.condition || 'Más vendido'}
        </span>
      </div>

      {/* Imagen del Producto */}
      <div className="relative w-full aspect-square bg-slate-950/70 rounded-2xl overflow-hidden mb-3 flex items-center justify-center p-2 border border-slate-800/80">
        <img
          src={product.image}
          alt={product.name}
          className="object-contain w-full h-full rounded-xl group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>

      {/* Información del Producto */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block mb-1">
            {product.category}
          </span>

          <h3 className="font-bold text-white text-sm line-clamp-2 leading-snug group-hover:text-cyan-300 transition-colors mb-2">
            {product.name}
          </h3>
        </div>

        {/* Precio y Selector de Cantidad */}
        <div className="pt-2 flex items-center justify-between gap-2">
          <div>
            <div className="text-xl font-black text-white">
              ${product.price.toFixed(2)}
            </div>
            {product.originalPrice && (
              <div className="text-[11px] text-slate-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </div>
            )}
          </div>

          {/* Botón o Selector Interactivo de Cantidad */}
          {quantity === 0 ? (
            <button
              onClick={handleAdd}
              className="w-10 h-10 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold flex items-center justify-center shadow-lg shadow-emerald-500/25 active:scale-95 transition-all"
              title="Añadir al carrito"
            >
              <Plus className="w-5 h-5" />
            </button>
          ) : (
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 bg-slate-950 border border-emerald-500/70 rounded-full px-2 py-1 shadow-md"
            >
              <button
                onClick={handleDecrement}
                className="w-6 h-6 rounded-full hover:bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition"
              >
                {quantity === 1 ? <Trash2 className="w-3.5 h-3.5 text-rose-400" /> : <Minus className="w-3 h-3" />}
              </button>
              <span className="text-xs font-bold text-white px-1 min-w-[16px] text-center">
                {quantity}
              </span>
              <button
                onClick={handleIncrement}
                className="w-6 h-6 rounded-full bg-emerald-500/20 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 flex items-center justify-center transition"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
