'use client';

import React, { useState, useMemo } from 'react';
import { Navbar } from '@/components/Navbar';
import { ProductCard } from '@/components/ProductCard';
import { ProductModal } from '@/components/ProductModal';
import { CATEGORIES, STORE_INFO } from '@/data/products';
import { useProducts } from '@/context/ProductContext';
import { Product } from '@/types';
import { ShieldCheck, Truck, Headphones, Sparkles, MessageCircle, CreditCard, Wrench } from 'lucide-react';
import { InstagramIcon } from '@/components/InstagramIcon';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  const { products } = useProducts();

  // Filtrado de productos
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  const openWhatsAppQuote = () => {
    const text = encodeURIComponent(
      '¡Hola Tecnicomp! Deseo solicitar una cotización técnica personalizada para equipos y servicios.'
    );
    window.open(`https://wa.me/${STORE_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      {/* Barra de navegación */}
      <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Banner Hero Principal */}
        <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950/80 to-slate-900 border border-slate-800 p-8 sm:p-12 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              Equipos de Alta Productividad & Soporte Especializado
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Soluciones Tecnológicas con la Garantía de{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
                TECNICOMP
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Equipos de impresión continua, repuestos originales y servicio técnico certificado. Tu centro de confianza con envíos seguros en Ecuador y facilidades de pago diferido.
            </p>

            <div className="pt-2 flex flex-wrap gap-3 items-center">
              <button
                onClick={() => {
                  setSelectedCategory('impresoras');
                  window.scrollTo({ top: 460, behavior: 'smooth' });
                }}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black px-6 py-3 rounded-xl text-xs sm:text-sm transition shadow-lg shadow-cyan-500/25"
              >
                Ver Impresoras Epson
              </button>
              
              <button
                onClick={openWhatsAppQuote}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-3 rounded-xl text-xs sm:text-sm transition flex items-center gap-2 shadow-lg shadow-emerald-600/20"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Pedir Cotización Inmediata</span>
              </button>

              <a
                href={STORE_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-white font-medium px-4 py-3 rounded-xl text-xs sm:text-sm transition flex items-center gap-2"
              >
                <InstagramIcon className="w-4 h-4 text-rose-400" />
                <span>Ver Instagram Oficial</span>
              </a>
            </div>
          </div>
        </section>

        {/* Barra de Beneficios y Confianza */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-2xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Pago en Cuotas</h4>
              <p className="text-[11px] text-slate-400">Diferido con tarjeta segura</p>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-2xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Garantía Real</h4>
              <p className="text-[11px] text-slate-400">En equipos y reparaciones</p>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-2xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Taller Especializado</h4>
              <p className="text-[11px] text-slate-400">Servicio eléctrico y placas</p>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-2xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Movilización y Envíos</h4>
              <p className="text-[11px] text-slate-400">Entrega rápida en todo Ecuador</p>
            </div>
          </div>
        </section>

        {/* Sección de Catálogo y Filtros */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight">
                Nuestros Productos y Servicios
              </h2>
              <p className="text-xs text-slate-400">
                Mostrando {filteredProducts.length} ítem(s) disponible(s)
              </p>
            </div>

            {/* Categorías */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                      : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Grilla de Productos */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800">
              <p className="text-slate-400 text-base">No se encontraron productos con ese filtro.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-4 text-xs font-semibold text-cyan-400 hover:underline"
              >
                Restablecer búsqueda
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelectProduct={(p) => setActiveProduct(p)}
                />
              ))}
            </div>
          )}
        </section>

        {/* Banner de Contacto / Cotización WhatsApp */}
        <section className="bg-gradient-to-r from-emerald-950/70 via-slate-900 to-emerald-950/70 border border-emerald-500/30 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-black text-white">¿Necesitas una cotización formal o servicio a medida?</h3>
            <p className="text-sm text-slate-300 max-w-xl">
              Si buscas repuestos de impresoras que no ves en el catálogo, reparación de tarjetas o compras corporativas, escríbenos directamente a WhatsApp.
            </p>
          </div>
          <button
            onClick={openWhatsAppQuote}
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-6 py-3.5 rounded-2xl text-sm flex items-center gap-2 shadow-xl shadow-emerald-500/20 transition whitespace-nowrap"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>Hablar con un Asesor Técnico</span>
          </button>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-slate-800/80 bg-slate-900/60 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <span className="text-xl font-black text-white">
                TECNI<span className="text-cyan-400">COMP</span>
              </span>
              <p className="text-xs text-slate-400 mt-1">
                Tecnología, Impresoras Epson, Repuestos & Servicio Técnico en Ecuador.
              </p>
            </div>
            
            <div className="flex items-center gap-4 text-xs font-semibold">
              <a
                href={STORE_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-400 hover:underline flex items-center gap-1.5"
              >
                <InstagramIcon className="w-4 h-4" />
                <span>Instagram {STORE_INFO.instagramHandle}</span>
              </a>
              <span className="text-slate-600">•</span>
              <button
                onClick={openWhatsAppQuote}
                className="text-emerald-400 hover:underline flex items-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Atención</span>
              </button>
            </div>
          </div>

          {/* Insignias de Pago Seguro Payphone */}
          <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-semibold">Métodos de Pago Aceptados:</span>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="bg-orange-500/20 text-orange-400 border border-orange-500/30 text-[10px] font-black px-2 py-0.5 rounded">
                  PAYPHONE
                </span>
                <span className="bg-blue-600/20 text-blue-400 border border-blue-500/30 text-[10px] font-bold px-2 py-0.5 rounded">
                  VISA
                </span>
                <span className="bg-rose-600/20 text-rose-400 border border-rose-500/30 text-[10px] font-bold px-2 py-0.5 rounded">
                  MASTERCARD
                </span>
                <span className="bg-cyan-600/20 text-cyan-400 border border-cyan-500/30 text-[10px] font-bold px-2 py-0.5 rounded">
                  TRANSFERENCIA BANCARIA
                </span>
              </div>
            </div>

            <div className="text-[11px] text-slate-500">
              🔒 Pagos cifrados con certificación bancaria SSL
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800/50 text-center md:text-left text-xs text-slate-500 flex flex-col md:flex-row justify-between gap-2">
            <span>© 2026 TECNICOMP ECUADOR. Todos los derechos reservados.</span>
            <span>Precios en Dólares Americanos (USD) con opción a cuotas diferidas.</span>
          </div>
        </div>
      </footer>

      {/* Modal de Detalle */}
      <ProductModal
        product={activeProduct}
        onClose={() => setActiveProduct(null)}
      />
    </div>
  );
}
