import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Headset, ClipboardCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    id: 1,
    title: 'Chat Support Representative',
    subtitle: 'SupportZebra, Recto Ave, Cagayan de Oro City',
    icon: Headset,
    points: [
      'Provided professional and timely customer support through live chat, addressing inquiries, concerns, and service-related issues while maintaining a positive customer experience.',
      'Assisted customers with account-related concerns, product or service information, order inquiries, and basic troubleshooting based on established procedures.',
      'Managed multiple chat conversations efficiently while maintaining accuracy, professionalism, and appropriate response times.',
      'Documented customer interactions, concerns, and resolutions accurately in internal systems for proper tracking and follow-up.',
      'Identified customer issues, provided appropriate solutions, and escalated complex concerns to the relevant team when necessary.',
      'Followed company policies and quality standards while collaborating with team members and supervisors to ensure consistent and effective customer service.',
    ],
  },
  {
    id: 2,
    title: 'Medical Claims Analyst',
    subtitle: 'Med-Metrix, TechnoPoint, Pasig City, Luzon',
    icon: ClipboardCheck,
    points: [
      'Reviewed and processed medical claims by validating patient, provider, billing, and insurance information to ensure accuracy and compliance with established guidelines.',
      'Analyzed medical documentation, claim details, and supporting records to identify discrepancies, missing information, and potential processing errors.',
      'Utilized healthcare and claims processing systems to accurately update, maintain, and document claim information while meeting productivity and quality standards.',
      'Collaborated with internal teams and followed established procedures to resolve claim-related issues, clarify discrepancies, and ensure timely and accurate claim processing.',
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
            Core responsibilities and contributions from customer support and medical claims processing roles.
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
