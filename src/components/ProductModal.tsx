'use client';

import React from 'react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { X, Star, ShoppingCart, Check, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = React.useState(false);
  const [qty, setQty] = React.useState(1);

  if (!product) return null;

  const handleAdd = () => {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative bg-slate-900 border border-slate-700 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto z-10 shadow-2xl p-6 sm:p-8 text-white">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Imagen */}
          <div className="aspect-square bg-slate-950 rounded-2xl overflow-hidden p-4 flex items-center justify-center border border-slate-800">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>

          {/* Detalles */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded-md border border-cyan-800/50">
                {product.category}
              </span>
              <div className="flex items-center gap-1 text-amber-400 text-xs font-semibold">
                <Star className="w-4 h-4 fill-current" />
                <span>{product.rating}</span>
                <span className="text-slate-500">({product.reviewsCount} opiniones)</span>
              </div>
            </div>

            <h2 className="text-2xl font-bold leading-snug mb-3">
              {product.name}
            </h2>

            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-3xl font-extrabold text-cyan-400">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-base text-slate-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Características principales */}
            {product.features && product.features.length > 0 && (
              <div className="mb-6 space-y-1.5">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Especificaciones destacadas:
                </h4>
                <ul className="text-xs text-slate-300 space-y-1">
                  {product.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Controles y Agregar */}
            <div className="flex items-center gap-4 pt-4 border-t border-slate-800">
              <div className="flex items-center border border-slate-700 rounded-xl bg-slate-800">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-3 py-2 text-slate-400 hover:text-white"
                >
                  -
                </button>
                <span className="px-3 font-semibold text-sm">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="px-3 py-2 text-slate-400 hover:text-white"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAdd}
                className={`flex-1 py-3 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition duration-200 ${
                  added
                    ? 'bg-emerald-500 text-white'
                    : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/20'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-5 h-5" />
                    ¡Agregado al carrito!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    Agregar al Carrito
                  </>
                )}
              </button>
            </div>

            {/* Garantías */}
            <div className="grid grid-cols-3 gap-2 mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-400 text-center">
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Garantía Oficial</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Truck className="w-4 h-4 text-cyan-400" />
                <span>Envío Seguro</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RefreshCw className="w-4 h-4 text-cyan-400" />
                <span>30 Días Devolución</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
