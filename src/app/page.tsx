import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileDock from "@/components/layout/MobileDock";
import MarqueeTicker from "@/components/layout/MarqueeTicker";

import Hero from "@/components/sections/Hero/Hero";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects/Projects";
import GameMode from "@/components/sections/Arcade/GameMode";
import GlobalRadarMap from "@/components/sections/Radar/GlobalRadarMap";
import Guestbook from "@/components/sections/Guestbook/Guestbook";
import Education from "@/components/sections/Education";
import Contact from "@/components/sections/Contact";

import CommandPalette from "@/components/ui/CommandPalette";
import SecurityAuditor from "@/components/ui/SecurityAuditor";
import EasterEggKonami from "@/components/ui/EasterEggKonami";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jhon-medina.vercel.app";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Jhon Medina",
      jobTitle: "Senior Full Stack Software Engineer",
      description:
        "Software Engineer specialized in distributed transactional architectures, Angular 18+, Java enterprise microservices, .NET Core, and Cypress test automation.",
      url: siteUrl,
      sameAs: [
        "https://github.com/WellJhoon",
        "https://www.linkedin.com/in/jhon-medina-well"
      ],
      knowsAbout: [
        "Angular",
        "TypeScript",
        "JavaScript",
        "Java",
        "Spring Boot",
        ".NET Core",
        "Next.js",
        "Cypress",
        "SQL Server",
        "MongoDB",
        "Microservices",
        "PCI-DSS"
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Santo Domingo",
        addressCountry: "DO"
      }
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Jhon Medina Portfolio",
      publisher: {
        "@id": `${siteUrl}/#person`
      },
      inLanguage: ["es", "en"]
    }
  ]
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <MarqueeTicker />
        <Experience />
        <SecurityAuditor />
        <Skills />
        <Projects />
        <GameMode />
        <GlobalRadarMap />
        <Guestbook />
        <Education />
        <Contact />
      </main>
      <Footer />
      <MobileDock />
      <CommandPalette />
      <EasterEggKonami />
    </div>
  );
}
