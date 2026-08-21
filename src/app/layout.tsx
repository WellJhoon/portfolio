import type { Metadata } from "next";
import { Inter, JetBrains_Mono, VT323 } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap"
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap"
});

const vt323 = VT323({
  weight: "400",
  variable: "--font-pixel",
  subsets: ["latin"],
  display: "swap"
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jhon-medina.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Jhon Medina | Senior Full Stack Software Engineer",
  description:
    "Portafolio oficial de Jhon Medina. Software Engineer especializado en Angular 18+, Next.js, C# .NET, Java microservicios y Cypress E2E. Fintech, Salud y Sector Gubernamental.",
  keywords: [
    "Jhon Medina",
    "Jhon Medina Software Engineer",
    "Jhon Medina Developer",
    "Full Stack Developer",
    "Angular 18",
    "Cypress E2E",
    "Java Spring Boot",
    ".NET Core",
    "Next.js 16",
    "Frontend Architect",
    "Santo Domingo",
    "República Dominicana"
  ],
  authors: [{ name: "Jhon Medina", url: "https://github.com/WellJhoon" }],
  creator: "Jhon Medina",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    locale: "es_DO",
    url: siteUrl,
    title: "Jhon Medina · Senior Full Stack Software Engineer",
    description:
      "Arquitecturas escalables, sistemas transaccionales y automatización de pruebas con Cypress. Angular 18, Java, .NET Core y Next.js.",
    siteName: "Jhon Medina Portfolio"
  },
  twitter: {
    card: "summary",
    title: "Jhon Medina · Senior Full Stack Software Engineer",
    description: "Angular 18+, Next.js, Java, .NET Core y Cypress E2E.",
    creator: "@WellJhoon"
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg"
  },
  verification: {
    google: "uDO6EbN2k7MCmSUpImP_qfQSZFESVwhJUbjy_CRF--E"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
};

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable} ${vt323.variable} dark scroll-smooth`}
    >
      <body
        suppressHydrationWarning
        className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)] font-sans antialiased flex flex-col selection:bg-[var(--carmine)] selection:text-white overflow-x-hidden w-full max-w-[100vw]"
      >
        <LanguageProvider>{children}</LanguageProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
