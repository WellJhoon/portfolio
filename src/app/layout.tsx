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

export const metadata: Metadata = {
  title: "Jhon Medina | Full Stack Software Engineer",
  description:
    "Software Engineer especializado en Angular 18+, React/Next.js, C# .NET, Java y automatización con Cypress. Experiencia en Fintech, Salud y Sector Público.",
  keywords: [
    "Jhon Medina",
    "Software Engineer",
    "Full Stack Developer",
    "Angular 18",
    "Cypress",
    "Java",
    ".NET Core",
    "Next.js",
    "Clean Architecture",
    "Santo Domingo",
    "República Dominicana"
  ],
  authors: [{ name: "Jhon Medina", url: "https://github.com/WellJhoon" }],
  creator: "Jhon Medina",
  openGraph: {
    type: "website",
    locale: "es_DO",
    url: "https://github.com/WellJhoon",
    title: "Jhon Medina · Full Stack Software Engineer",
    description:
      "Construcción de aplicaciones web escalables, arquitecturas limpias y suites E2E para Fintech, Salud y Sector Público.",
    siteName: "Jhon Medina Portfolio"
  },
  twitter: {
    card: "summary_large_image",
    title: "Jhon Medina · Full Stack Software Engineer",
    description: "Angular 18+, Next.js, Java, .NET Core y Cypress E2E."
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg"
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${jetbrainsMono.variable} ${vt323.variable} dark scroll-smooth`}
    >
      <body className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)] font-sans antialiased flex flex-col selection:bg-[var(--carmine)] selection:text-white">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
