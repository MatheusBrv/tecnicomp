'use client';

import React, { useState } from 'react';
import { useProducts } from '@/context/ProductContext';
import { CATEGORIES, STORE_INFO } from '@/data/products';
import { Product, ProductCategory } from '@/types';
import Link from 'next/link';
import { ArrowLeft, Plus, Edit, Trash2, RotateCcw, Save, X, CheckCircle } from 'lucide-react';
import { TecnicompLogo } from '@/components/TecnicompLogo';

export default function AdminPage() {
  const { products, addProduct, updateProduct, deleteProduct, resetToDefaults } = useProducts();
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form state
  const [form, setForm] = useState<Partial<Product>>({
    name: '',
    slug: '',
    description: '',
    price: 0,
    originalPrice: 0,
    category: 'impresoras',
    condition: 'Nuevo',
    image: '',
    stock: 10,
    features: [],
    rating: 5.0,
    reviewsCount: 10
  });

  const [featuresInput, setFeaturesInput] = useState('');

  const formRef = React.useRef<HTMLDivElement>(null);

  const openCreate = () => {
    setForm({
      name: '',
      slug: '',
      description: '',
      price: 0,
      originalPrice: 0,
      category: 'impresoras',
      condition: 'Nuevo',
      image: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?auto=format&fit=crop&w=800&q=80',
      stock: 10,
      features: [],
      rating: 5.0,
      reviewsCount: 1
    });
    setFeaturesInput('');
    setIsCreating(true);
    setEditingId(null);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const openEdit = (p: Product) => {
    setForm({ ...p });
    setFeaturesInput(p.features ? p.features.join(', ') : '');
    setEditingId(p.id);
    setIsCreating(false);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanFeatures = featuresInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const dataToSave = {
      ...form,
      features: cleanFeatures,
      price: Number(form.price),
      originalPrice: form.originalPrice ? Number(form.originalPrice) : undefined,
      stock: Number(form.stock)
    };

    if (isCreating) {
      addProduct(dataToSave as Omit<Product, 'id'>);
    } else if (editingId) {
      updateProduct(editingId, dataToSave);
    }

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
    setIsCreating(false);
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Header */}
      <header className="bg-slate-900 border-b border-slate-800 py-4 px-6 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-slate-400 hover:text-white text-xs font-semibold bg-slate-800/80 px-3 py-2 rounded-xl transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver a la Tienda</span>
            </Link>
            <div className="flex items-center gap-2">
              <TecnicompLogo className="w-8 h-8" />
              <h1 className="text-lg font-black tracking-tight text-white">
                Panel Administrativo <span className="text-cyan-400">TECNICOMP</span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={openCreate}
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition shadow-lg shadow-cyan-500/20"
            >
              <Plus className="w-4 h-4" />
              <span>Añadir Producto</span>
            </button>
            <button
              onClick={() => {
                if (confirm('¿Restablecer el catálogo a los productos predeterminados?')) {
                  resetToDefaults();
                }
              }}
              className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-xl transition text-xs flex items-center gap-1"
              title="Restablecer catálogo"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl w-full mx-auto p-6 flex-1 space-y-6">
        {saveSuccess && (
          <div className="p-4 bg-emerald-500/20 border border-emerald-500/50 rounded-2xl flex items-center gap-2 text-emerald-300 text-sm">
            <CheckCircle className="w-5 h-5" />
            <span>¡Producto guardado exitosamente!</span>
          </div>
        )}

        {/* Modal / Panel de Formulario si está creando o editando */}
        {(isCreating || editingId) && (
          <div ref={formRef} className="bg-slate-900 border border-cyan-500/40 rounded-2xl p-6 shadow-2xl space-y-4 ring-1 ring-cyan-500/20">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h2 className="text-base font-bold text-cyan-400">
                {isCreating ? '➕ Crear Nuevo Producto o Servicio' : '✏️ Editar Producto'}
              </h2>
              <button
                onClick={() => {
                  setIsCreating(false);
                  setEditingId(null);
                }}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Nombre del Producto / Servicio *</label>
                <input
                  required
                  type="text"
                  value={form.name || ''}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Ej. Impresora Epson EcoTank L3250"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Categoría *</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value as ProductCategory })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="impresoras">Impresoras Epson</option>
                  <option value="repuestos">Repuestos & Tintas</option>
                  <option value="audio">Audio JBL</option>
                  <option value="smartwatch">Smartwatch Xiaomi</option>
                  <option value="laptops">Laptops Gamer</option>
                  <option value="servicios">Servicios Técnicos</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Condición del Producto</label>
                <select
                  value={form.condition || 'Nuevo'}
                  onChange={(e) => setForm({ ...form, condition: e.target.value as any })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="Nuevo">Nuevo Sellado</option>
                  <option value="Seminuevo / Tintas cargadas">Seminuevo / Tintas cargadas</option>
                  <option value="Servicio">Servicio Técnico</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Precio ($ USD) *</label>
                  <input
                    required
                    type="number"
                    step="0.01"
                    value={form.price || ''}
                    onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Precio Anterior (Opcional)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={form.originalPrice || ''}
                    onChange={(e) => setForm({ ...form, originalPrice: Number(e.target.value) })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="block text-slate-300 font-semibold">
                  Foto del Producto (Sube un archivo de tu PC o pega un enlace) *
                </label>
                <div className="flex flex-col sm:flex-row gap-3 items-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          const img = new Image();
                          img.onload = () => {
                            const canvas = document.createElement('canvas');
                            let width = img.width;
                            let height = img.height;
                            const maxDim = 800;
                            if (width > maxDim || height > maxDim) {
                              if (width > height) {
                                height = Math.round((height * maxDim) / width);
                                width = maxDim;
                              } else {
                                width = Math.round((width * maxDim) / height);
                                height = maxDim;
                              }
                            }
                            canvas.width = width;
                            canvas.height = height;
                            const ctx = canvas.getContext('2d');
                            ctx?.drawImage(img, 0, 0, width, height);
                            const compressed = canvas.toDataURL('image/jpeg', 0.82);
                            setForm((prev) => ({ ...prev, image: compressed }));
                          };
                          img.src = event.target?.result as string;
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="w-full sm:w-auto text-xs text-slate-400 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-cyan-500 file:text-slate-950 hover:file:bg-cyan-400 cursor-pointer"
                  />
                  <span className="text-slate-500 text-xs">o</span>
                  <input
                    required
                    type="text"
                    value={form.image || ''}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                    placeholder="URL de la imagen o ruta local..."
                    className="flex-1 w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                {form.image && (
                  <div className="mt-2 flex items-center gap-3 p-2 bg-slate-950/60 rounded-xl border border-slate-800 w-fit">
                    <img
                      src={form.image}
                      alt="Vista previa"
                      className="w-16 h-16 object-contain rounded-lg bg-slate-900 border border-slate-800"
                    />
                    <span className="text-[11px] text-cyan-400 font-semibold">Vista previa de la imagen cargada</span>
                  </div>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-slate-300 mb-1 font-semibold">Descripción del Producto *</label>
                <textarea
                  rows={2}
                  required
                  value={form.description || ''}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-slate-300 mb-1 font-semibold">
                  Características (separadas por coma)
                </label>
                <input
                  type="text"
                  value={featuresInput}
                  onChange={(e) => setFeaturesInput(e.target.value)}
                  placeholder="Wi-Fi Direct, 33 ppm, Garantía 1 año"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="md:col-span-2 flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreating(false);
                    setEditingId(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Guardar Producto</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tabla de Productos Existentes */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <h2 className="text-sm font-bold text-white">
              Inventario de Productos ({products.length})
            </h2>
            <span className="text-xs text-slate-400">
              Los cambios se guardan automáticamente en tu navegador
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-800/60 text-slate-400 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3.5">Producto</th>
                  <th className="p-3.5">Categoría</th>
                  <th className="p-3.5">Condición</th>
                  <th className="p-3.5">Precio</th>
                  <th className="p-3.5">Stock</th>
                  <th className="p-3.5 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-800/40 transition">
                    <td className="p-3.5 flex items-center gap-3">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-10 h-10 object-cover rounded-lg bg-slate-950"
                      />
                      <div>
                        <div className="font-semibold text-white line-clamp-1">{p.name}</div>
                        <div className="text-[10px] text-slate-400">{p.id}</div>
                      </div>
                    </td>
                    <td className="p-3.5 capitalize font-medium">{p.category}</td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-800 border border-slate-700">
                        {p.condition || 'Nuevo'}
                      </span>
                    </td>
                    <td className="p-3.5 font-bold text-cyan-400">${p.price.toFixed(2)}</td>
                    <td className="p-3.5">{p.stock} unid.</td>
                    <td className="p-3.5 text-right space-x-2">
                      <button
                        onClick={() => openEdit(p)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400"
                        title="Editar"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`¿Eliminar ${p.name}?`)) deleteProduct(p.id);
                        }}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950 text-rose-400"
                        title="Eliminar"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
