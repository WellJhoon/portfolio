import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MarqueeTicker from "@/components/MarqueeTicker";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import GameMode from "@/components/GameMode";
import Guestbook from "@/components/Guestbook";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import MobileDock from "@/components/MobileDock";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <MarqueeTicker />
        <Experience />
        <Skills />
        <Projects />
        <GameMode />
        <Guestbook />
        <Education />
        <Contact />
      </main>
      <Footer />
      <MobileDock />
    </div>
  );
}
