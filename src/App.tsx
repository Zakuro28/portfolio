import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './components/Navigation';
import AuraBackground from './components/AuraBackground';
import TechMarquee from './components/TechMarquee';
import HeroSection from './sections/HeroSection';
import ProjectsSection from './sections/ProjectsSection';
import WorkSection from './sections/WorkSection';
import SkillsSection from './sections/SkillsSection';
import ExtracurricularSection from './sections/ExtracurricularSection';
import AchievementsSection from './sections/AchievementsSection';
import VolunteerSection from './sections/VolunteerSection';
import ContactSection from './sections/ContactSection';

gsap.registerPlugin(ScrollTrigger);

/** Lights up whichever glass card the pointer is over, following the pointer */
function useCardSpotlight() {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover)').matches) return;
    let lit: HTMLElement | null = null;
    const onMove = (e: PointerEvent) => {
      const card = (e.target as HTMLElement | null)?.closest<HTMLElement>('.card-glass') ?? null;
      if (card !== lit) {
        lit?.classList.remove('is-lit');
        card?.classList.add('is-lit');
        lit = card;
      }
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty('--spot-x', `${e.clientX - r.left}px`);
      card.style.setProperty('--spot-y', `${e.clientY - r.top}px`);
    };
    const onLeave = () => {
      lit?.classList.remove('is-lit');
      lit = null;
    };
    document.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    return () => {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, []);
}

function App() {
  const mainRef = useRef<HTMLDivElement>(null);
  useCardSpotlight();

  return (
    <div ref={mainRef} className="relative bg-[#0a0a0f] min-h-screen overflow-x-clip">
      {/* Aurora behind everything */}
      <AuraBackground />

      {/* Grain overlay */}
      <div className="grain-overlay" />

      {/* Navigation */}
      <Navigation />

      {/* Sections */}
      <main className="relative">
        <HeroSection />
        <TechMarquee />
        <ProjectsSection />
        <WorkSection />
        <SkillsSection />
        <ExtracurricularSection />
        <AchievementsSection />
        <VolunteerSection />
        <ContactSection />
      </main>
    </div>
  );
}

export default App;
