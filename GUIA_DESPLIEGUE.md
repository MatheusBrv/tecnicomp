# Guía de Despliegue y Base de Datos Gratuita - Tepnicomp

¡Tu tienda virtual **Tepnicomp** ya está programada y funcionando localmente en `http://localhost:3000`!

---

## 1. ¿Cómo vincular Supabase (Base de Datos Gratuita)?

1. Entra en [Supabase](https://supabase.com/) y regístrate gratis con tu cuenta de GitHub o correo.
2. Haz clic en **"New Project"** y ponle de nombre `tepnicomp-db`.
3. Ve a **SQL Editor** en el menú izquierdo de Supabase.
4. Abre el archivo [`supabase-schema.sql`](file:///c:/Users/Matheus/Desktop/tepnicomp/supabase-schema.sql) que dejamos en este proyecto, copia todo su contenido y pégalo en el editor SQL de Supabase. Haz clic en **Run**.
5. Ve a **Project Settings -> API** en Supabase y copia:
   - `Project URL`
   - `Project API anon key`
6. En tu proyecto local, crea un archivo llamado `.env.local` y coloca:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=tu_project_url_aqui
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_aqui
   ```

---

## 2. ¿Cómo subirla a Internet Gratis con Dominio / Subdominio (Vercel)?

1. Crea una cuenta gratuita en [GitHub](https://github.com/) si aún no tienes una.
2. Sube esta carpeta a un nuevo repositorio de GitHub:
   ```bash
   git add .
   git commit -m "feat: tienda virtual tepnicomp inicial"
   git branch -M main
   git remote add origin https://github.com/tu-usuario/tepnicomp.git
   git push -u origin main
   ```
3. Entra en [Vercel](https://vercel.com/) e inicia sesión con GitHub.
4. Presiona **"Add New... -> Project"** y selecciona tu repositorio `tepnicomp`.
5. Si ya tienes las claves de Supabase, agrégalas en la sección **Environment Variables**.
6. Haz clic en **"Deploy"**. En 60 segundos tu tienda estará activa en una dirección como:
   `https://tepnicomp.vercel.app` (con certificado SSL seguro gratuito).

---

## 3. ¿Cómo agregar tu propio Dominio (.com, .net, .store)?
- En el panel de Vercel, ve a **Settings -> Domains**.
- Escribe tu dominio (ej. `tepnicomp.com`) y Vercel te dará un registro DNS sencillo (CNAME / A record) para vincularlo en minutos.
