# Jhon Medina · Senior Software Engineer Portfolio

Portafolio profesional de ingeniería de software desarrollado con **Next.js 16 (App Router)**, **React 19**, **TypeScript** y **Tailwind CSS**. Diseñado bajo una estética técnica minimalista inspirada en interfaces terminal/CLI, con soporte completo para **Modo Oscuro** y **Modo Claro**, tipografías Google personalizadas y optimización avanzada de metadatos (SEO / OpenGraph).

---

## 🛠️ Stack Tecnológico

* **Framework**: Next.js 16.3 (App Router / React Server Components)
* **Lenguaje**: TypeScript 5+
* **Librería UI**: React 19
* **Estilos**: Tailwind CSS 4 con sistema de variables CSS personalizadas
* **Tipografía**:
  * `JetBrains Mono` (Terminal, código, números tabulares y metadatos)
  * `Inter` (Lectura y descripciones)
  * `VT323` (Titular retro pixel 8-bit)
* **Iconografía**: `lucide-react` + Componentes SVG independientes
* **Generación de Favicon Dinámico**: Next.js `ImageResponse` API (`@vercel/og`)

---

## 🎨 Sistema de Diseño y Paleta de Colores

El sistema de temas conmuta dinámicamente entre dos paletas de alto contraste:

### 1. Modo Oscuro (`Dark Mode` - Default)
* **Fondo Principal**: `#0c0d12` (Carbón Pizarra Profundo)
* **Superficies / Tarjetas**: `#13161f` (Obsidiana)
* **Acento Primario**: `#e11d48` (Carmín / Sith Crimson)
* **Acento Secundario**: `#f59e0b` (Ámbar Cálido)
* **Texto**: `#f5f0ea` (Marfil) y `#94a3b8` (Gris Ceniza)
* **Bordes**: `#262b3a`

### 2. Modo Claro (`Light Mode`)
* **Fondo Principal**: `#f7f5f0` (Lienzo Lino Cálido)
* **Superficies / Tarjetas**: `#ffffff` (Blanco Marfil)
* **Acento Primario**: `#be123c` (Carmín Profundo)
* **Acento Secundario**: `#b45309` (Madera / Cuero)
* **Texto**: `#1c1917` (Carbón Tinta) y `#665e57` (Sepia Grafito)
* **Bordes**: `#ded5c8`

---

## 📁 Estructura del Proyecto

```
portfolio/
├── public/
│   └── favicon.svg               # Icono vectorial de marca personal
├── src/
│   ├── app/
│   │   ├── apple-icon.tsx        # Generador de icono Apple Touch (180x180)
│   │   ├── icon.tsx              # Generador dinámico de favicon (32x32)
│   │   ├── globals.css           # Tokens CSS, keyframes de marquee y rejilla
│   │   ├── layout.tsx            # Layout raíz, carga de fuentes y SEO / OpenGraph
│   │   └── page.tsx              # Página principal (ensamblado de componentes)
│   ├── components/
│   │   ├── Navbar.tsx            # Barra de navegación con prompt de terminal y ThemeToggle
│   │   ├── Hero.tsx              # Cabecera Zsh, titular pixel y selector de roles
│   │   ├── MarqueeTicker.tsx     # Cinta horizontal infinita de tecnologías
│   │   ├── Experience.tsx        # Línea de tiempo de experiencia laboral
│   │   ├── Skills.tsx            # Matriz técnica categorizada
│   │   ├── Projects.tsx          # Grid de proyectos con filtros interactivos
│   │   ├── Education.tsx         # Sección de educación y certificaciones
│   │   ├── Contact.tsx           # Ventana terminal de conexión rápida
│   │   ├── Footer.tsx            # Pie de página minimalista
│   │   ├── Icons.tsx             # Iconos SVG independientes (GitHub, LinkedIn)
│   │   └── ThemeToggle.tsx       # Conmutador de tema con persistencia en localStorage
│   └── data/
│       └── portfolio.ts          # Base de datos tipada del portafolio
├── package.json
└── tsconfig.json
```

---

## 🚀 Inicio Rápido

### Requisitos
* Node.js 18.17 o superior
* npm, pnpm o yarn

### Instalación
```bash
npm install
```

### Ejecutar en Desarrollo
```bash
npm run dev
```
Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Compilar para Producción
```bash
npm run build
npm run start
```

---

## ⚙️ Personalización de Datos

Toda la información del portafolio está centralizada y tipada en:
`src/data/portfolio.ts`

Puedes modificar:
* **`personal`**: Nombre, titular, roles en rotación, biografías y enlaces a redes.
* **`experiences`**: Historial laboral (Hacienda, CardNET, Arium, BHD), logros y tecnologías.
* **`projects`**: Lista de proyectos, categorías, enlaces a demos y repositorios GitHub.
* **`skillCategories`**: Matriz de tecnologías organizadas por dominio.
* **`certificaciones`**: Certificados profesionales y años de emisión.
* **`marquee`**: Palabras clave para la cinta animada.

---

## 🌐 Despliegue en Vercel

1. Sube el repositorio a tu cuenta de **GitHub**.
2. Conecta el repositorio en [Vercel](https://vercel.com).
3. Vercel detectará Next.js automáticamente y configurará el build (`next build`).
4. Despliega en un clic con soporte SSL y CDN global.
