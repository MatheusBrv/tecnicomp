import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { ProductProvider } from '@/context/ProductContext';
import { CartDrawer } from '@/components/CartDrawer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TECNICOMP | Tienda de Tecnología, Impresoras Epson & Servicio Técnico Ecuador',
  description: 'Impresoras Epson de primera y seminuevas con tintas cargadas, repuestos originales, audio JBL, smartwatch Xiaomi y servicio técnico especializado en Ecuador.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body className={`${inter.className} bg-slate-950 text-slate-100 min-h-screen flex flex-col antialiased selection:bg-cyan-500 selection:text-slate-950`}>
        <ProductProvider>
          <CartProvider>
            {children}
            <CartDrawer />
          </CartProvider>
        </ProductProvider>
      </body>
    </html>
  );
}
