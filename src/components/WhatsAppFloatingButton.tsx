'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { STORE_INFO } from '@/data/products';

export function WhatsAppFloatingButton() {
  const handleClick = () => {
    const text = encodeURIComponent('¡Hola Tecnicomp! Deseo hacer una consulta sobre sus productos y servicios.');
    window.open(`https://wa.me/${STORE_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-20 md:bottom-8 right-5 z-40 bg-emerald-500 hover:bg-emerald-400 text-white p-3.5 rounded-full shadow-2xl shadow-emerald-500/40 hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center group"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="w-7 h-7 fill-current" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 ease-in-out font-bold text-xs pl-0 group-hover:pl-2 text-slate-950">
        ¿Te asesoramos?
      </span>
    </button>
  );
}
