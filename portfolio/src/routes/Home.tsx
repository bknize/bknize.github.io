import { NavBar } from "../components/NavBar.tsx";
import { HeroSection } from "../components/HeroSection.tsx";
import { TechSection } from "../components/TechSection.tsx";
import { WorkHistory } from "../components/WorkHistory.tsx";
import { ContactSection } from "../components/ContactSection.tsx";
import { FooterSection } from "../components/FooterSection.tsx";

export default function Home() {
  return (
    <>
      <NavBar />
      <HeroSection />
      <TechSection />
      <WorkHistory />
      <ContactSection />

      <FooterSection />
    </>
  );
}
