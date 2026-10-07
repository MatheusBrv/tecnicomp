-- 1. Tabla de Categorías
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL
);

-- Insertar categorías por defecto
INSERT INTO categories (id, name) VALUES
  ('laptops', 'Laptops & Portátiles'),
  ('componentes', 'Componentes de PC'),
  ('perifericos', 'Teclados & Ratones'),
  ('monitores', 'Monitores'),
  ('accesorios', 'Audio & Accesorios')
ON CONFLICT (id) DO NOTHING;

-- 2. Tabla de Productos
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  original_price NUMERIC(10, 2),
  rating NUMERIC(2, 1) DEFAULT 5.0,
  reviews_count INTEGER DEFAULT 0,
  category_id TEXT REFERENCES categories(id),
  image TEXT NOT NULL,
  stock INTEGER DEFAULT 10,
  features TEXT[] DEFAULT '{}',
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Habilitar lectura pública (Row Level Security)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Permitir lectura pública a productos" ON products FOR SELECT USING (true);

-- 3. Tabla de Pedidos / Órdenes
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  shipping_address TEXT NOT NULL,
  total NUMERIC(10, 2) NOT NULL,
  status TEXT DEFAULT 'pendiente',
  items JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Permitir inserción de pedidos a cualquier cliente" ON orders FOR INSERT WITH CHECK (true);
