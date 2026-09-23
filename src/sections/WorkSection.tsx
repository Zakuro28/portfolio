import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, Code2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    id: 1,
    title: 'Web Developer - E-Commerce & Data Analytics Project',
    subtitle: 'WMSU TBIU',
    icon: Code2,
    points: [
      'Developed and maintained an e-commerce and analytics website using HTML, CSS, JavaScript, PHP, and MySQL.',
      'Built product listings, shopping cart, order management, and analytics dashboards.',
      'Designed and optimized the database structure for fast and accurate retrieval.',
      'Implemented input validation and security measures to protect sensitive data.',
      'Resolved technical issues, improved performance, and supported checkout and reporting tests.',
    ],
  },
  {
    id: 2,
    title: 'QA Engineer / On-the-Job Trainee',
    subtitle: 'BSCS Industry Visit, Manila, Luzon',
    icon: Briefcase,
    points: [
      'Led development and debugging of software modules using Java and C++.',
      'Designed and modified scripts and modules to automate repetitive tasks.',
      'Collaborated with senior IT engineers to gather technical requirements and propose system improvements.',
      'Tested software components for correctness, performance, and security compliance.',
    ],
  },
];

const WorkSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const isDesktop = window.matchMedia('(min-width: 1024px)').matches;

      gsap.fromTo(
        headlineRef.current,
        {
          y: 70,
          opacity: 0,
          rotateX: 18,
          filter: 'blur(12px)',
          transformPerspective: 1000,
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          filter: 'blur(0px)',
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headlineRef.current,
            start: isDesktop ? 'top 88%' : 'top 92%',
            end: isDesktop ? 'top 56%' : 'top 72%',
            scrub: isDesktop ? 0.45 : false,
          },
        }
      );

      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        gsap.fromTo(
          card,
          {
            y: 90,
            x: index % 2 === 0 ? -30 : 30,
            rotateZ: index % 2 === 0 ? -2.5 : 2.5,
            scale: 0.9,
            opacity: 0,
            filter: 'blur(8px)',
          },
          {
            y: 0,
            x: 0,
            rotateZ: 0,
            scale: 1,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.95,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: card,
              start: isDesktop ? 'top 92%' : 'top 96%',
              end: isDesktop ? 'top 62%' : 'top 74%',
              scrub: isDesktop ? 0.5 : false,
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
      id="work"
      className="relative bg-[#0a0a0f] py-[10vh] px-[6vw] overflow-visible"
      style={{
        background: 'radial-gradient(ellipse at 80% 20%, rgba(112,130,56,0.06) 0%, transparent 40%)',
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div ref={headlineRef} className="mb-10 text-center">
          <span className="font-mono text-base tracking-[0.2em] uppercase text-[#708238] block mb-3">
            Professional Experience
          </span>
          <h2 className="text-[clamp(44px,4.4vw,66px)] font-bold text-gradient mb-3">
            Work Highlights
          </h2>
          <p className="text-[#a3b97a]/70 text-[clamp(17px,1.35vw,21px)] max-w-2xl mx-auto leading-relaxed">
            Core responsibilities and contributions from QA and web development roles.
          </p>
        </div>

        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {experiences.map((experience, index) => (
            <div
              key={experience.id}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="group w-full rounded-2xl shadow-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[#708238]/20 card-glass border border-[#708238]/20 p-6"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-[#b9cc8f] text-xl font-bold mb-1">
                    {experience.title}
                  </h3>
                  <p className="text-[#a3b97a] text-sm">
                    {experience.subtitle}
                  </p>
                </div>
                <div className="p-2 rounded-full bg-[#708238]/10 text-[#708238]">
                  <experience.icon size={18} />
                </div>
              </div>

              <ul className="space-y-2 list-disc list-outside pl-5 marker:text-[#708238]">
                {experience.points.map((point) => (
                  <li key={point} className="text-[#eaf2d8] text-sm leading-relaxed">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
