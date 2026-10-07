'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingCart, Cpu, MessageCircle, Settings, X, Search } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { STORE_INFO } from '@/data/products';
import { InstagramIcon } from '@/components/InstagramIcon';
import { TecnicompLogo } from '@/components/TecnicompLogo';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function Navbar({ searchQuery, onSearchChange }: NavbarProps) {
  const { totalItems, setIsCartOpen } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white">
      {/* Top Banner de contacto rápido & Instagram */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-600 text-white text-[11px] font-medium py-1.5 px-4 text-center flex items-center justify-between">
        <div className="hidden sm:flex items-center gap-2">
          <span>📍 Servicio Técnico y Envíos en todo el Ecuador</span>
          <span className="opacity-60">•</span>
          <span>Diferidos con Tarjeta de Crédito</span>
        </div>
        <div className="flex items-center gap-4 mx-auto sm:mx-0">
          <a
            href={STORE_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:underline font-semibold"
          >
            <InstagramIcon className="w-3.5 h-3.5" />
            <span>{STORE_INFO.instagramHandle}</span>
          </a>
          <span className="opacity-60">•</span>
          <a
            href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=Hola%20Tecnicomp,%20deseo%20hacer%20una%20consulta`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-emerald-300 hover:text-emerald-200 font-semibold"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp Directo</span>
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo Oficial Tecnicomp */}
          <Link href="/" className="flex items-center gap-3 group">
            <TecnicompLogo className="w-11 h-11 group-hover:scale-105 transition-transform" />
            <div>
              <span className="text-2xl font-black tracking-tight text-white flex items-center gap-1">
                TECNI<span className="text-cyan-400">COMP</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider text-cyan-400/90 block -mt-1 font-bold">
                Tu Centro de Confianza
              </span>
            </div>
          </Link>

          {/* Barra de Búsqueda */}
          <div className="hidden md:flex flex-1 max-w-lg mx-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Buscar impresoras Epson, repuestos, JBL, Xiaomi..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-slate-800/80 border border-slate-700 rounded-full px-5 py-2.5 pl-11 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
              />
              <Search className="absolute left-4 top-3 h-4 w-4 text-slate-400" />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3.5 top-2.5 text-xs text-slate-400 hover:text-white bg-slate-700 rounded-full px-1.5 py-0.5"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Botones de Acción (Admin, Instagram, Carrito) */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/admin"
              className="flex items-center gap-1.5 bg-slate-800/70 hover:bg-slate-700 text-slate-300 hover:text-white px-3 py-2 rounded-xl border border-slate-700/80 transition text-xs font-semibold"
              title="Panel de Administrador"
            >
              <Settings className="w-4 h-4 text-cyan-400" />
              <span className="hidden sm:inline">Administrar</span>
            </Link>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold px-4 py-2.5 rounded-xl transition text-sm shadow-lg shadow-cyan-500/20 group"
              aria-label="Abrir carrito"
            >
              <ShoppingCart className="w-4 h-4 text-slate-950 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">Carrito</span>
              {totalItems > 0 && (
                <span className="bg-slate-950 text-cyan-400 text-xs font-extrabold rounded-full h-5 min-w-[20px] px-1.5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Búsqueda en móvil */}
        <div className="md:hidden pb-4">
          <input
            type="text"
            placeholder="Buscar impresoras, repuestos, JBL..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
          />
        </div>
      </div>
    </header>
  );
}
