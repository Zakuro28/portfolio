import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileText, Users, Gauge } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const summaryHighlights = [
  {
    icon: FileText,
    title: 'Professional Profile',
    description:
      'Versatile and results-driven with hands-on experience in web development, QA testing, e-commerce, analytics, and general operations.',
  },
  {
    icon: Users,
    title: 'Collaboration & Communication',
    description:
      'Strong at coordinating tasks, managing projects, supporting teams, and translating requirements into practical technical execution.',
  },
  {
    icon: Gauge,
    title: 'Quality & Efficiency',
    description:
      'Focused on reliable delivery, process improvement, and continuous learning across both technical and non-technical responsibilities.',
  },
];

const VolunteerSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const isDesktop = window.matchMedia('(min-width: 1024px)').matches;

      gsap.fromTo(
        headlineRef.current,
        {
          opacity: 0,
          y: 72,
          clipPath: 'inset(40% 0 0 0)',
          filter: 'blur(10px)',
        },
        {
          opacity: 1,
          y: 0,
          clipPath: 'inset(0% 0 0 0)',
          filter: 'blur(0px)',
          duration: 0.95,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headlineRef.current,
            start: isDesktop ? 'top 88%' : 'top 93%',
            end: isDesktop ? 'top 58%' : 'top 73%',
            scrub: isDesktop ? 0.45 : false,
          },
        }
      );

      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 95,
            x: index === 1 ? 0 : index === 0 ? -26 : 26,
            rotateX: 18,
            rotateY: index === 1 ? 0 : index === 0 ? -16 : 16,
            scale: 0.86,
            filter: 'blur(7px)',
            transformPerspective: 1200,
          },
          {
            opacity: 1,
            y: 0,
            x: 0,
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: 1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: card,
              start: isDesktop ? 'top 94%' : 'top 98%',
              end: isDesktop ? 'top 66%' : 'top 79%',
              scrub: isDesktop ? 0.52 : false,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="volunteer"
      className="relative bg-[#0a0a0f] py-[10vh] px-[6vw]"
      style={{
        background: 'radial-gradient(ellipse at 30% 50%, rgba(112,130,56,0.05) 0%, transparent 40%)',
      }}
    >
      <div ref={headlineRef} className="text-center mb-12">
        <span className="font-mono text-xs tracking-[0.2em] uppercase text-[#708238] block mb-2">
          Summary
        </span>
        <h2 className="text-[clamp(34px,3.6vw,52px)] font-bold text-gradient mb-4">
          Professional Summary
        </h2>
        <p className="text-[#a3b97a]/70 text-[clamp(14px,1.1vw,17px)] max-w-2xl mx-auto leading-relaxed">
          Snapshot of strengths, approach, and working style.
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {summaryHighlights.map((item, index) => (
          <div
            key={item.title}
            ref={(el) => {
              cardsRef.current[index] = el;
            }}
            className="group p-6 rounded-2xl card-glass hover:bg-[#708238]/10 transition-all duration-300"
          >
            <div className="p-3 rounded-xl bg-[#708238]/10 text-[#708238] mb-4 w-fit">
              <item.icon size={22} />
            </div>
            <h3 className="text-[#f2f6e8] font-semibold mb-2">{item.title}</h3>
            <p className="text-[#a3b97a]/80 text-sm leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default VolunteerSection;
