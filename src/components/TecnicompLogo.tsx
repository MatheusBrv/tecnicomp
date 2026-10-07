import React from 'react';

export function TecnicompLogo({ className = "w-11 h-11" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center rounded-xl overflow-hidden bg-white shadow-md shadow-cyan-500/10 p-0.5 border border-slate-700/50 ${className}`}>
      <img
        src="/logo.png"
        alt="Tecnicomp - Tu Centro de Confianza"
        className="w-full h-full object-contain rounded-lg"
      />
    </div>
  );
}
