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

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
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
