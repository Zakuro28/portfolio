import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Wrench, Workflow } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const toolkits = [
  {
    category: 'Tools & Technologies',
    icon: Wrench,
    items: [
      'Visual Studio',
      'VS Code',
      'Git',
      'GitHub',
      'MySQL',
      'SQL',
      'XAMPP',
      'phpMyAdmin',
      'HTML',
      'CSS',
      'JavaScript',
      'PHP',
      'Bootstrap',
      'SPSS',
      'Draw.io',
      'Microsoft Office',
      'Google Workspace',
      'Windows Environment',
      'Basic Networking Tools',
    ],
  },
  {
    category: 'Methodologies & Practices',
    icon: Workflow,
    items: [
      'Agile methodology',
      'Collaborative development',
      'Version control workflow (Git-based)',
      'Debugging and troubleshooting',
      'Database design and optimization',
      'Responsive web design',
      'System analysis and documentation',
      'Continuous improvement',
      'Performance optimization',
      'Security best practices',
    ],
  },
];

const ExtracurricularSection = () => {
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
          y: 70,
          skewY: 4,
          filter: 'blur(10px)',
        },
        {
          opacity: 1,
          y: 0,
          skewY: 0,
          filter: 'blur(0px)',
          duration: 0.95,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headlineRef.current,
            start: isDesktop ? 'top 88%' : 'top 93%',
            end: isDesktop ? 'top 58%' : 'top 74%',
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
            xPercent: index === 0 ? -22 : 22,
            y: 70,
            rotationY: index === 0 ? -18 : 18,
            rotateZ: index === 0 ? -1.5 : 1.5,
            transformPerspective: 1200,
            clipPath: 'inset(18% 8% 22% 8% round 20px)',
            filter: 'blur(8px)',
          },
          {
            opacity: 1,
            xPercent: 0,
            y: 0,
            rotationY: 0,
            rotateZ: 0,
            clipPath: 'inset(0% 0% 0% 0% round 20px)',
            filter: 'blur(0px)',
            duration: 1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: card,
              start: isDesktop ? 'top 93%' : 'top 97%',
              end: isDesktop ? 'top 64%' : 'top 78%',
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
      id="activities"
      className="relative bg-[#0a0a0f] py-[10vh] px-[6vw]"
      style={{
        background: 'radial-gradient(ellipse at 50% 50%, rgba(112,130,56,0.04) 0%, transparent 50%)',
      }}
    >
      <div ref={headlineRef} className="text-center mb-12">
        <span className="font-mono text-xs tracking-[0.2em] uppercase text-[#708238] block mb-2">
          Tools
        </span>
        <h2 className="text-[clamp(34px,3.6vw,52px)] font-bold text-gradient mb-4">
          Tools & Methodologies
        </h2>
        <p className="text-[#a3b97a]/70 text-[clamp(14px,1.1vw,17px)] max-w-2xl mx-auto leading-relaxed">
          Development tools, workflow methods, and quality practices used in day-to-day execution.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {toolkits.map((category, index) => (
          <div
            key={category.category}
            ref={(el) => {
              cardsRef.current[index] = el;
            }}
            className="group p-6 rounded-2xl card-glass hover:bg-[#708238]/10 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[#708238]/20">
              <div className="p-2 rounded-lg bg-[#708238]/10 text-[#708238]">
                <category.icon size={20} />
              </div>
              <h3 className="text-[#f2f6e8] font-semibold text-sm">{category.category}</h3>
            </div>

            <ul
              className={`text-sm text-[#b7c98a] list-disc list-outside pl-5 space-y-2 ${
                category.category === 'Tools & Technologies' ? 'md:grid md:grid-cols-2 md:gap-x-6 md:gap-y-2' : ''
              }`}
            >
              {category.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExtracurricularSection;
