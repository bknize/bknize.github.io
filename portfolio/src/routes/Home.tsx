import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { NavBar } from "../components/NavBar.tsx";
import { HeroSection } from "../components/HeroSection.tsx";
import { TechSection } from "../components/TechSection.tsx";
import { WorkHistory } from "../components/WorkHistory.tsx";
import { ContactSection } from "../components/ContactSection.tsx";
import { FooterSection } from "../components/FooterSection.tsx";
import { PageTransition } from "../components/PageTransition.tsx";
import type { HomeLocationState } from "../nav.ts";

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const state = location.state as HomeLocationState | null;
    const id = state?.scrollTo;
    if (!id) return;

    navigate(location.pathname, { replace: true, state: {} });

    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    });
  }, [location.pathname, location.state, navigate]);

  return (
    <PageTransition>
      <NavBar />
      <HeroSection />
      <TechSection />
      <WorkHistory />
      <ContactSection />
      <FooterSection />
    </PageTransition>
  );
}
