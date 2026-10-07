'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ArrowLeft, ShieldCheck, Check, CreditCard, Banknote } from 'lucide-react';
import { STORE_INFO } from '@/data/products';

export function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, clearCart, subtotal } = useCart();
  
  // Pasos de compra: 1. Carrito -> 2. Datos y Envío -> 3. Pago
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [paymentMethod, setPaymentMethod] = useState<'transfer' | 'payphone'>('transfer');

  // Formulario Facturación y Envío (Ecuador)
  const [customer, setCustomer] = useState({
    name: '',
    idNumber: '', // Cédula o RUC
    phone: '',
    email: '',
    address: '',
    city: 'Guayaquil',
    province: 'Guayas'
  });

  if (!isCartOpen) return null;

  // Cálculos de Ecuador
  const shippingServientrega = subtotal > 150 || subtotal === 0 ? 0 : 5.00;
  const iva = 0; // Precios mostrados ya con IVA o transparentes
  const cardFee = paymentMethod === 'payphone' ? subtotal * 0.05 : 0; // Recargo tarjeta 5% común en Ecuador
  const total = subtotal + shippingServientrega + cardFee;

  const handleFinishWhatsApp = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    let itemsList = cart
      .map(
        (item, index) =>
          `${index + 1}. *${item.product.name}* (x${item.quantity}) - $${(item.product.price * item.quantity).toFixed(2)}`
      )
      .join('\n');

    let paymentLabel = paymentMethod === 'payphone'
      ? `💳 *Tarjeta / Payphone (+5%):* Diferido o Corriente (Link de cobro seguro)`
      : `💵 *Transferencia / Efectivo:* Banco Pichincha / Guayaquil`;

    let message = `🛒 *FINALIZAR COMPRA - TECNICOMP ECUADOR*\n\n` +
      `📋 *DATOS DE FACTURACIÓN Y ENVÍO:*\n` +
      `👤 *Nombre:* ${customer.name}\n` +
      `🆔 *Cédula/RUC:* ${customer.idNumber}\n` +
      `📞 *WhatsApp:* ${customer.phone}\n` +
      `📧 *Email:* ${customer.email}\n` +
      `📍 *Ciudad / Provincia:* ${customer.city}, ${customer.province}\n` +
      `🏠 *Dirección:* ${customer.address}\n\n` +
      `🛍️ *DETALLE DEL PEDIDO:*\n${itemsList}\n\n` +
      `📦 *Subtotal:* $${subtotal.toFixed(2)}\n` +
      `🚚 *Envío Servientrega:* ${shippingServientrega === 0 ? 'GRATIS' : `$${shippingServientrega.toFixed(2)}`}\n` +
      `${cardFee > 0 ? `💳 *Recargo tarjeta (5%):* $${cardFee.toFixed(2)}\n` : ''}` +
      `💰 *TOTAL A PAGAR:* $${total.toFixed(2)} USD\n\n` +
      `${paymentLabel}\n\n` +
      `_Por favor confirmar pedido y coordinar entrega._`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${STORE_INFO.whatsappNumber}?text=${encoded}`, '_blank');
    
    clearCart();
    setStep(1);
    setIsCartOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-lg bg-slate-900 border-l border-slate-800 text-white flex flex-col shadow-2xl">
          
          {/* Header con Indicador de Pasos tipo MonsterWare */}
          <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => {
                  if (step > 1) setStep((prev) => (prev - 1) as any);
                  else setIsCartOpen(false);
                }}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white bg-slate-800 px-2.5 py-1.5 rounded-lg transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{step === 1 ? 'Seguir comprando' : 'Atrás'}</span>
              </button>

              <h2 className="text-sm font-bold tracking-tight text-white">Finalizar compra</h2>

              <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Pago protegido</span>
              </div>
            </div>

            {/* Pasos Visuales 1 -> 2 -> 3 */}
            <div className="flex items-center justify-between max-w-xs mx-auto text-xs font-semibold">
              <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-emerald-400' : 'text-slate-500'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${step > 1 ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 border border-emerald-400'}`}>
                  {step > 1 ? '✓' : '1'}
                </span>
                <span>Carrito</span>
              </div>
              <div className="w-6 h-[1px] bg-slate-800" />

              <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-emerald-400' : 'text-slate-500'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${step > 2 ? 'bg-emerald-500 text-slate-950' : step === 2 ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800'}`}>
                  {step > 2 ? '✓' : '2'}
                </span>
                <span>Datos y envío</span>
              </div>
              <div className="w-6 h-[1px] bg-slate-800" />

              <div className={`flex items-center gap-1.5 ${step === 3 ? 'text-cyan-400 font-bold' : 'text-slate-500'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${step === 3 ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800'}`}>
                  3
                </span>
                <span>Pago</span>
              </div>
            </div>
          </div>

          {/* Contenido según el paso */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            
            {/* PASO 1: Lista de Productos en el Carrito */}
            {step === 1 && (
              <>
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-16">
                    <ShoppingBag className="w-16 h-16 text-slate-700 mb-3" />
                    <h3 className="text-base font-bold text-white mb-1">Tu carrito está vacío</h3>
                    <p className="text-xs text-slate-400 max-w-xs mb-4">
                      Explora nuestras impresoras Epson, repuestos y audio JBL.
                    </p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs"
                    >
                      Ver Productos
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex gap-3 p-3 bg-slate-800/60 rounded-2xl border border-slate-700/60 items-center"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-16 h-16 object-contain rounded-xl bg-slate-950 p-1 flex-shrink-0 border border-slate-700/50"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-white truncate">
                            {item.product.name}
                          </h4>
                          <div className="text-xs font-black text-cyan-400 mt-0.5">
                            ${item.product.price.toFixed(2)}
                          </div>

                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-lg px-2 py-0.5">
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                className="text-slate-400 hover:text-white"
                              >
                                {item.quantity === 1 ? <Trash2 className="w-3 h-3 text-rose-400" /> : <Minus className="w-3 h-3" />}
                              </button>
                              <span className="text-xs font-bold px-1">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                className="text-slate-400 hover:text-white"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <span className="text-xs font-bold text-slate-300">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* PASO 2: Datos y Envío (Ecuador) */}
            {step === 2 && (
              <form id="step2-form" onSubmit={(e) => { e.preventDefault(); setStep(3); }} className="space-y-3.5">
                <h3 className="text-sm font-bold text-white mb-2">Facturación y envío</h3>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Nombres y apellidos *</label>
                  <input
                    required
                    type="text"
                    value={customer.name}
                    onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                    placeholder="Ej. Juan Pérez Mendoza"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Cédula o RUC *</label>
                    <input
                      required
                      type="text"
                      value={customer.idNumber}
                      onChange={(e) => setCustomer({ ...customer, idNumber: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                      placeholder="0912345678"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Teléfono / WhatsApp *</label>
                    <input
                      required
                      type="tel"
                      value={customer.phone}
                      onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                      placeholder="0991234567"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Correo electrónico *</label>
                  <input
                    required
                    type="email"
                    value={customer.email}
                    onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                    placeholder="cliente@ejemplo.com"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Ciudad *</label>
                    <input
                      required
                      type="text"
                      value={customer.city}
                      onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                      placeholder="Guayaquil / Quito"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Provincia *</label>
                    <input
                      required
                      type="text"
                      value={customer.province}
                      onChange={(e) => setCustomer({ ...customer, province: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                      placeholder="Guayas, Pichincha, El Oro..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Dirección de envío *</label>
                  <textarea
                    required
                    rows={2}
                    value={customer.address}
                    onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                    placeholder="Calle principal, secundaria y número de casa / referencia"
                  />
                </div>
              </form>
            )}

            {/* PASO 3: Método de Pago (Transferencia / Payphone) */}
            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-white">Método de pago</h3>

                <div className="grid grid-cols-2 gap-2.5">
                  {/* Opción 1: Transferencia */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('transfer')}
                    className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition ${
                      paymentMethod === 'transfer'
                        ? 'border-emerald-500 bg-emerald-950/40 text-white ring-1 ring-emerald-500/50'
                        : 'border-slate-800 bg-slate-800/40 text-slate-400'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5 font-bold text-xs text-emerald-400 mb-1">
                        <Banknote className="w-4 h-4" />
                        <span>Transferencia / Efectivo</span>
                      </div>
                      <span className="text-[10px] text-slate-400 block">Sin recargo</span>
                    </div>
                  </button>

                  {/* Opción 2: Tarjeta Payphone */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('payphone')}
                    className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition ${
                      paymentMethod === 'payphone'
                        ? 'border-cyan-500 bg-cyan-950/40 text-white ring-1 ring-cyan-500/50'
                        : 'border-slate-800 bg-slate-800/40 text-slate-400'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5 font-bold text-xs text-cyan-400 mb-1">
                        <CreditCard className="w-4 h-4" />
                        <span>Tarjeta Payphone</span>
                      </div>
                      <span className="text-[10px] text-cyan-300 font-bold block">+5% recargo</span>
                    </div>
                  </button>
                </div>

                {/* Mensaje descriptivo según método */}
                <div className="p-3 bg-slate-800/80 border border-slate-700/80 rounded-2xl text-xs space-y-1 text-slate-300">
                  {paymentMethod === 'transfer' ? (
                    <p className="leading-relaxed">
                      🏦 Te enviaremos el pedido por WhatsApp con las cuentas bancarias (Banco Pichincha y Guayaquil) para coordinar la transferencia o contraentrega.
                    </p>
                  ) : (
                    <p className="leading-relaxed">
                      💳 Recibirás tu <strong>Link oficial de Payphone</strong> por WhatsApp para ingresar tu tarjeta de crédito o débito de forma 100% segura y diferir tus cuotas.
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Pago protegido. No guardamos los datos de tu tarjeta.</span>
                </div>
              </div>
            )}
          </div>

          {/* Footer Resumen de Facturación */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950 space-y-3">
              <div className="space-y-1.5 text-xs text-slate-400">
                <div className="flex justify-between">
                  <span>Subtotal ({cart.reduce((a, b) => a + b.quantity, 0)} uds.):</span>
                  <span className="text-white font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Envío Servientrega:</span>
                  <span className="text-emerald-400 font-semibold">
                    {shippingServientrega === 0 ? 'Gratis (+ $150)' : `$${shippingServientrega.toFixed(2)}`}
                  </span>
                </div>
                {paymentMethod === 'payphone' && step === 3 && (
                  <div className="flex justify-between text-cyan-400">
                    <span>Recargo tarjeta (5%):</span>
                    <span>${cardFee.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-black text-white pt-2 border-t border-slate-800">
                  <span>Total a pagar:</span>
                  <span className="text-emerald-400 text-lg">${total.toFixed(2)} USD</span>
                </div>
              </div>

              {/* Botón de Acción según el paso */}
              {step === 1 && (
                <button
                  onClick={() => setStep(2)}
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-3 px-4 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 text-xs sm:text-sm"
                >
                  <span>Continuar con Datos de Envío</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              {step === 2 && (
                <button
                  type="submit"
                  form="step2-form"
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-3 px-4 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 text-xs sm:text-sm"
                >
                  <span>Continuar al Método de Pago</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              {step === 3 && (
                <button
                  onClick={() => handleFinishWhatsApp()}
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-3.5 px-4 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 text-sm"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Enviar pedido por WhatsApp</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
