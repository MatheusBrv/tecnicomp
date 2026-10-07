'use client';

import React from 'react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { Star, ShoppingCart, Check, CreditCard, MessageCircle } from 'lucide-react';
import { STORE_INFO } from '@/data/products';

interface ProductCardProps {
  product: Product;
  onSelectProduct?: (product: Product) => void;
}

export function ProductCard({ product, onSelectProduct }: ProductCardProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = React.useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const handleQuickQuote = (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = encodeURIComponent(
      `Hola Tecnicomp! Deseo cotizar o consultar disponibilidad de: ${product.name} (Precio: $${product.price.toFixed(2)}).`
    );
    window.open(`https://wa.me/${STORE_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div
      onClick={() => onSelectProduct?.(product)}
      className="group bg-slate-800/60 hover:bg-slate-800/90 border border-slate-700/60 hover:border-cyan-500/50 rounded-2xl p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 cursor-pointer relative overflow-hidden"
    >
      {/* Badges superiores */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        {product.condition && (
          <span
            className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-md shadow-md ${
              product.condition.includes('Seminuevo')
                ? 'bg-amber-500/90 text-slate-950'
                : product.condition === 'Servicio'
                ? 'bg-purple-600/90 text-white'
                : 'bg-emerald-600/90 text-white'
            }`}
          >
            {product.condition}
          </span>
        )}
        {discount && (
          <span className="bg-rose-500/90 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider ml-auto">
            -{discount}%
          </span>
        )}
      </div>

      {/* Imagen del Producto */}
      <div className="relative w-full aspect-square bg-slate-950/80 rounded-xl overflow-hidden mb-4 flex items-center justify-center p-3 border border-slate-800/60">
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full rounded-lg group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>

      {/* Datos */}
      <div className="flex-1 flex flex-col">
        {/* Rating y Categoría */}
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
          <span className="capitalize px-2 py-0.5 bg-slate-700/60 text-slate-300 rounded-md font-medium text-[11px]">
            {product.category}
          </span>
          <div className="flex items-center gap-1 text-amber-400">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="font-semibold text-xs">{product.rating}</span>
            <span className="text-slate-500 text-[10px]">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Nombre */}
        <h3 className="font-bold text-white text-base line-clamp-2 group-hover:text-cyan-300 transition-colors mb-1.5">
          {product.name}
        </h3>

        {/* Descripción corta */}
        <p className="text-xs text-slate-400 line-clamp-2 mb-3 leading-relaxed">
          {product.description}
        </p>

        {/* Cuota mensual informativa si aplica */}
        {product.installments && (
          <div className="flex items-center gap-1.5 text-[11px] text-cyan-300 bg-cyan-950/40 border border-cyan-800/40 rounded-lg px-2.5 py-1 mb-3">
            <CreditCard className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>
              Hasta <strong>{product.installments.months} cuotas</strong> de <strong>${product.installments.amount.toFixed(2)}/mes</strong>
            </span>
          </div>
        )}

        {/* Precios y Botones */}
        <div className="mt-auto pt-3 border-t border-slate-700/60 flex items-center justify-between gap-2">
          <div>
            <div className="text-xl font-black text-white">
              ${product.price.toFixed(2)}
            </div>
            {product.originalPrice && (
              <div className="text-xs text-slate-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </div>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleQuickQuote}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 transition hover:scale-105"
              title="Cotizar por WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </button>

            <button
              onClick={handleAdd}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                added
                  ? 'bg-emerald-500 text-white'
                  : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 hover:shadow-lg hover:shadow-cyan-500/25'
              }`}
              title="Añadir al carrito"
            >
              {added ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Listo</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>Carrito</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
