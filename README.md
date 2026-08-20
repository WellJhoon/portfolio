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
│   │   ├── api/
│   │   │   ├── guestbook/        # API REST para firmas y moderación Supabase
│   │   │   └── visitors/         # API de telemetría, geolocalización y radar
│   │   ├── apple-icon.tsx        # Generador de icono Apple Touch (180x180)
│   │   ├── icon.tsx              # Generador dinámico de favicon (32x32)
│   │   ├── globals.css           # Tokens CSS, variables de tema y rejillas
│   │   ├── layout.tsx            # Root layout con SEO, OpenGraph, Analytics y Speed Insights
│   │   └── page.tsx              # Página principal (ensamblado de componentes por dominio)
│   │
│   ├── components/
│   │   ├── layout/               # Estructura global y navegación fija
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── MobileDock.tsx
│   │   │   └── MarqueeTicker.tsx
│   │   │
│   │   ├── sections/             # Módulos por dominio de la aplicación
│   │   │   ├── Hero/             # Cabecera interactiva y ParticlePortrait canvas
│   │   │   │   ├── Hero.tsx
│   │   │   │   └── ParticlePortrait.tsx
│   │   │   ├── Experience.tsx    # Línea de tiempo profesional
│   │   │   ├── Skills.tsx        # Matriz técnica categorizada
│   │   │   ├── Projects/         # Proyectos con inspector y simulador técnico
│   │   │   │   ├── Projects.tsx
│   │   │   │   └── ProjectSimulator.tsx
│   │   │   ├── Arcade/           # Centro de juegos 2-en-1 con canvas retro
│   │   │   │   ├── GameMode.tsx
│   │   │   │   └── TechNinjaGame.tsx
│   │   │   ├── Radar/            # Mapa topográfico en tiempo real y telemetría
│   │   │   │   ├── GlobalRadarMap.tsx
│   │   │   │   └── WorldMapSVG.tsx
│   │   │   ├── Guestbook/        # Libro de firmas Pixel Art con Supabase
│   │   │   │   ├── Guestbook.tsx
│   │   │   │   ├── PixelCanvas.tsx
│   │   │   │   └── PixelGallery.tsx
│   │   │   ├── Education.tsx     # Certificaciones y formación académica
│   │   │   └── Contact.tsx       # Terminal de contacto rápido
│   │   │
│   │   └── ui/                   # Componentes atómicos e interactivos
│   │       ├── CommandPalette.tsx # Paleta de comandos global (Ctrl + K)
│   │       ├── ThemeToggle.tsx   # Conmutador dinámico de tema claro/oscuro
│   │       ├── LanguageToggle.tsx# Conmutador i18n (ES / EN)
│   │       ├── SoundToggle.tsx   # Control de sintetizador de audio web
│   │       ├── SpotlightCard.tsx # Tarjetas con iluminación dinámica del cursor
│   │       ├── SecurityAuditor.tsx # Inspector interactivo de seguridad
│   │       ├── EasterEggKonami.tsx # Modo secreto Konami Code
│   │       └── Icons.tsx         # Iconografía SVG nativa
│   │
│   ├── context/
│   │   └── LanguageContext.tsx   # Estado global de internacionalización (i18n)
│   ├── data/
│   │   └── portfolio.ts          # Fuente de datos centralizada y fuertemente tipada
│   └── lib/
│       ├── guestbook.ts          # Cliente y consultas de Supabase para Pixel Art
│       ├── visitors.ts           # Gestión de pings y deduplicación de visitantes
│       └── sound.ts              # Motor de síntesis de audio Web Audio API
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
