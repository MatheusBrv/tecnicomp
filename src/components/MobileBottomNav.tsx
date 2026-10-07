'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Grid, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export function MobileBottomNav({ onOpenCategories }: { onOpenCategories?: () => void }) {
  const pathname = usePathname();
  const { totalItems, setIsCartOpen } = useCart();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 md:hidden py-2 px-6 flex items-center justify-between text-xs">
      <Link
        href="/"
        className={`flex flex-col items-center gap-1 font-medium transition ${
          pathname === '/' ? 'text-cyan-400 font-bold' : 'text-slate-400 hover:text-white'
        }`}
      >
        <Home className="w-5 h-5" />
        <span className="text-[10px]">Inicio</span>
      </Link>

      <button
        onClick={onOpenCategories}
        className="flex flex-col items-center gap-1 font-medium text-slate-400 hover:text-white transition"
      >
        <Grid className="w-5 h-5" />
        <span className="text-[10px]">Categorías</span>
      </button>

      <button
        onClick={() => setIsCartOpen(true)}
        className="relative flex flex-col items-center gap-1 font-medium text-slate-400 hover:text-white transition"
      >
        <div className="relative">
          <ShoppingBag className="w-5 h-5" />
          {totalItems > 0 && (
            <span className="absolute -top-1.5 -right-2.5 bg-rose-500 text-white text-[10px] font-black rounded-full h-4 min-w-[16px] px-1 flex items-center justify-center animate-pulse">
              {totalItems}
            </span>
          )}
        </div>
        <span className="text-[10px]">Carrito</span>
      </button>

      <Link
        href="/admin"
        className={`flex flex-col items-center gap-1 font-medium transition ${
          pathname === '/admin' ? 'text-cyan-400 font-bold' : 'text-slate-400 hover:text-white'
        }`}
      >
        <ShieldCheck className="w-5 h-5" />
        <span className="text-[10px]">Admin</span>
      </Link>
    </div>
  );
}
