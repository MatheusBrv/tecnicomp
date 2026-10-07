'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, MessageSquare, CreditCard, ShieldAlert } from 'lucide-react';
import { STORE_INFO } from '@/data/products';

export function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, clearCart, subtotal } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'whatsapp' | 'card_installments'>('whatsapp');
  const [installmentsCount, setInstallmentsCount] = useState<number>(3);

  // Datos del cliente
  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    city: '',
    notes: ''
  });

  if (!isCartOpen) return null;

  const shipping = subtotal > 150 || subtotal === 0 ? 0 : 5.00; // Envíos locales en Ecuador
  const total = subtotal + shipping;

  // Calculadora de cuotas estimada
  const installmentValue = (total * (1 + (installmentsCount > 3 ? 0.08 : 0.04))) / installmentsCount;

  const handleWhatsAppCheckout = (e: React.FormEvent) => {
    e.preventDefault();

    let itemsList = cart
      .map(
        (item, index) =>
          `${index + 1}. *${item.product.name}* x${item.quantity} - $${(item.product.price * item.quantity).toFixed(2)}`
      )
      .join('\n');

    let methodText = paymentMethod === 'card_installments'
      ? `💳 *Pago:* Tarjeta de Crédito (${installmentsCount} cuotas de aprox. $${installmentValue.toFixed(2)})`
      : `💵 *Pago:* Transferencia / Efectivo / Contraentrega`;

    let message = `🛒 *NUEVO PEDIDO - TECNICOMP ECUADOR*\n\n` +
      `👤 *Cliente:* ${customer.name}\n` +
      `📞 *Teléfono:* ${customer.phone}\n` +
      `📍 *Ciudad / Dirección:* ${customer.city}\n` +
      `${customer.notes ? `📝 *Observaciones:* ${customer.notes}\n` : ''}` +
      `\n🛍️ *PRODUCTOS:*\n${itemsList}\n\n` +
      `📦 *Subtotal:* $${subtotal.toFixed(2)}\n` +
      `🚚 *Envío:* ${shipping === 0 ? 'GRATIS' : `$${shipping.toFixed(2)}`}\n` +
      `💰 *TOTAL A CANCELAR:* $${total.toFixed(2)}\n` +
      `${methodText}\n\n` +
      `_Por favor confirmar disponibilidad y datos de cuenta para finalizar la compra._`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${STORE_INFO.whatsappNumber}?text=${encoded}`, '_blank');
    
    // Opcional: limpiar y cerrar
    clearCart();
    setIsCheckingOut(false);
    setIsCartOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 text-white flex flex-col shadow-2xl">
          
          {/* Header */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-6 h-6 text-cyan-400" />
              <div>
                <h2 className="text-xl font-bold tracking-tight">Tu Carrito</h2>
                <p className="text-[11px] text-slate-400">Atención personalizada directa por WhatsApp</p>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6">
            {isCheckingOut ? (
              <form onSubmit={handleWhatsAppCheckout} className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <h3 className="font-semibold text-white">Datos para tu Pedido</h3>
                  <button
                    type="button"
                    onClick={() => setIsCheckingOut(false)}
                    className="text-xs text-cyan-400 hover:underline"
                  >
                    Editar Carrito
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Nombre Completo *</label>
                  <input
                    required
                    type="text"
                    value={customer.name}
                    onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
                    placeholder="Ej. Carlos Mendoza"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">WhatsApp / Teléfono *</label>
                  <input
                    required
                    type="tel"
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
                    placeholder="Ej. 0991234567"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Ciudad y Dirección *</label>
                  <input
                    required
                    type="text"
                    value={customer.city}
                    onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
                    placeholder="Ej. Guayaquil / Av. 9 de Octubre y Boyacá"
                  />
                </div>

                {/* Forma de Pago */}
                <div className="pt-2">
                  <label className="block text-xs font-medium text-slate-300 mb-2">Forma de Pago Preferida</label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('whatsapp')}
                      className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition ${
                        paymentMethod === 'whatsapp'
                          ? 'border-emerald-500 bg-emerald-950/30 text-white'
                          : 'border-slate-800 bg-slate-800/40 text-slate-400'
                      }`}
                    >
                      <span className="font-bold text-emerald-400">Transferencia / Depósito</span>
                      <span className="text-[10px] text-slate-400">Banco Pichincha, Guayaquil o Efectivo</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card_installments')}
                      className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition ${
                        paymentMethod === 'card_installments'
                          ? 'border-cyan-500 bg-cyan-950/30 text-white ring-1 ring-cyan-500/50'
                          : 'border-slate-800 bg-slate-800/40 text-slate-400'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 font-bold text-cyan-400">
                          <CreditCard className="w-3.5 h-3.5" />
                          <span>Tarjeta / Cuotas</span>
                        </div>
                        <span className="text-[9px] font-extrabold bg-orange-500/20 text-orange-400 border border-orange-500/30 px-1.5 py-0.5 rounded">
                          Payphone
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400">Visa, Mastercard, Diners, Discover</span>
                    </button>
                  </div>
                </div>

                {/* Si elige cuotas Payphone */}
                {paymentMethod === 'card_installments' && (
                  <div className="p-3 bg-gradient-to-br from-slate-900 to-cyan-950/40 border border-cyan-800/60 rounded-xl space-y-2.5">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-bold text-cyan-300">
                        Selecciona meses a diferir (Cuotas):
                      </label>
                      <span className="text-[10px] font-mono text-cyan-400 bg-cyan-900/40 px-2 py-0.5 rounded">
                        Cobro seguro Payphone
                      </span>
                    </div>
                    <select
                      value={installmentsCount}
                      onChange={(e) => setInstallmentsCount(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-cyan-700/60 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-cyan-400 font-medium"
                    >
                      <option value={3}>3 meses - (${((total * 1.04) / 3).toFixed(2)}/mes)</option>
                      <option value={6}>6 meses - (${((total * 1.06) / 6).toFixed(2)}/mes)</option>
                      <option value={12}>12 meses - (${((total * 1.09) / 12).toFixed(2)}/mes)</option>
                    </select>
                    <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-start gap-2 text-[11px] text-slate-300 leading-tight">
                      <ShieldAlert className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                      <span>
                        Al enviar tu pedido a WhatsApp te responderemos con tu <strong>Link de Pago oficial de Payphone</strong> para que difieras tus cuotas con tu banco de forma 100% cifrada y protegida.
                      </span>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Notas o Preguntas Adicionales</label>
                  <textarea
                    rows={2}
                    value={customer.notes}
                    onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
                    placeholder="Ej. Horario preferido de entrega o consultar modelo"
                  />
                </div>

                {/* Resumen */}
                <div className="bg-slate-800/70 p-4 rounded-xl border border-slate-700 space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Subtotal:</span>
                    <span className="text-white">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Envío:</span>
                    <span className="text-emerald-400">{shipping === 0 ? '¡GRATIS!' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between font-bold text-sm text-white pt-2 border-t border-slate-700">
                    <span>Total:</span>
                    <span className="text-cyan-400">${total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-3.5 px-4 rounded-xl shadow-lg shadow-emerald-500/20 transition flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-5 h-5 fill-current" />
                  Enviar Pedido a WhatsApp
                </button>
              </form>
            ) : cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <ShoppingBag className="w-16 h-16 text-slate-700 mb-4" />
                <h3 className="text-lg font-semibold text-slate-300 mb-1">Tu carrito está vacío</h3>
                <p className="text-slate-500 text-sm max-w-xs mb-6">
                  Agrega impresoras Epson, repuestos, parlantes JBL o solicita servicios técnicos.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-5 py-2.5 rounded-xl text-sm transition"
                >
                  Explorar Catálogo
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-4 p-3 bg-slate-800/60 rounded-xl border border-slate-700/50"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-lg bg-slate-900 flex-shrink-0"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-xs font-semibold text-white line-clamp-2">
                          {item.product.name}
                        </h4>
                        <div className="text-xs text-cyan-400 font-bold mt-1">
                          ${item.product.price.toFixed(2)}
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-slate-700 rounded-lg overflow-hidden bg-slate-800">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 hover:bg-slate-700 text-slate-400 hover:text-white transition"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 text-xs font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 hover:bg-slate-700 text-slate-400 hover:text-white transition"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-slate-500 hover:text-rose-400 transition p-1"
                          title="Eliminar producto"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer del Carrito */}
          {!isCheckingOut && cart.length > 0 && (
            <div className="p-6 border-t border-slate-800 bg-slate-900/95 space-y-4">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal:</span>
                  <span className="text-white font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-400 text-xs">
                  <span>Envío:</span>
                  <span className="text-emerald-400">
                    {subtotal > 150 ? 'Gratis en compras +$150' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-slate-800">
                  <span>Total estimado:</span>
                  <span className="text-cyan-400 text-lg">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => setIsCheckingOut(true)}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black py-3.5 px-4 rounded-xl shadow-lg shadow-emerald-500/20 transition flex items-center justify-center gap-2 group"
              >
                <span>Finalizar Pedido vía WhatsApp</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
