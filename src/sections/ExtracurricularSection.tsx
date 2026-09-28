import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ClipboardCheck, Code2, Database, GitBranch, Headset, ShieldCheck, Workflow } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const toolkits = [
  {
    category: 'Web Development',
    icon: Code2,
    items: [
      'HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React', 'Vite', 'Tailwind CSS', 'Bootstrap',
      'PHP', 'Laravel', 'Blade', 'Java', 'C++', 'REST APIs', 'JSON', 'Responsive design',
    ],
  },
  {
    category: 'Databases & Analytics',
    icon: Database,
    items: [
      'MySQL', 'SQL', 'PL/SQL', 'phpMyAdmin', 'XAMPP', 'Database design', 'ER diagrams',
      'SPSS', 'Microsoft Excel', 'Google Sheets', 'Pivot tables', 'Data cleaning', 'Reports & summaries',
    ],
  },
  {
    category: 'QA & Testing',
    icon: ShieldCheck,
    items: [
      'Manual testing', 'Test cases & test plans', 'Bug reporting', 'Regression testing',
      'Cross-browser testing', 'Mobile & responsive testing', 'API testing', 'Chrome DevTools',
      'Lighthouse', 'Thunder Client', 'Playwright',
    ],
  },
  {
    category: 'Dev Tools & Deployment',
    icon: GitBranch,
    items: [
      'Git', 'GitHub', 'GitHub CLI', 'VS Code', 'Visual Studio', 'npm', 'Vercel', 'Render',
      'Draw.io', 'Microsoft Office', 'Google Workspace', 'Windows', 'Basic networking',
    ],
  },
  {
    category: 'Customer Support & Operations',
    icon: Headset,
    items: [
      'Live chat support', 'Handling multiple chats', 'Ticketing & CRM systems', 'Knowledge bases & SOPs',
      'Escalation handling', 'Account troubleshooting', 'Order inquiries', 'E-commerce orders & listings',
      'Response-time & CSAT targets', 'Quality scorecards', 'Team coordination',
    ],
  },
  {
    category: 'Medical Claims',
    icon: ClipboardCheck,
    items: [
      'Claims review & validation', 'Insurance information checks', 'Patient & provider data',
      'Billing discrepancy analysis', 'Medical documentation review', 'Claims processing systems',
      'Productivity & quality targets', 'Confidential data handling',
    ],
  },
  {
    category: 'Methodologies & Practices',
    icon: Workflow,
    wide: true,
    items: [
      'Agile & Scrum', 'Software development life cycle', 'Git branching & pull requests', 'Code review',
      'Collaborative development', 'Debugging & troubleshooting', 'Root-cause analysis', 'Database normalization',
      'Requirements gathering', 'System analysis & documentation', 'Following & writing SOPs', 'Process improvement',
      'Performance optimization', 'Accessibility basics', 'Security best practices', 'Data privacy',
      'KPI tracking', 'Continuous learning',
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
        const left = index % 2 === 0;
        gsap.fromTo(
          card,
          {
            opacity: 0,
            xPercent: left ? -12 : 12,
            y: 70,
            rotationY: left ? -14 : 14,
            rotateZ: left ? -1.5 : 1.5,
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
        <h2 className="text-[clamp(26px,2.5vw,36px)] font-bold text-gradient mb-4">
          Tools & Methodologies
        </h2>
        <p className="text-[#a3b97a]/70 text-[clamp(14px,1vw,15px)] max-w-2xl mx-auto leading-relaxed">
          The tools, systems and working methods behind my web development, QA, support, claims and analytics work.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {toolkits.map((category, index) => (
          <div
            key={category.category}
            ref={(el) => {
              cardsRef.current[index] = el;
            }}
            className={`group p-6 rounded-2xl card-glass hover:bg-[#708238]/10 transition-all duration-300 ${
              category.wide ? 'md:col-span-2 lg:col-span-3' : ''
            }`}
          >
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[#708238]/20">
              <div className="p-2 rounded-lg bg-[#708238]/10 text-[#708238] transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                <category.icon size={20} />
              </div>
              <h3 className="text-[#f2f6e8] font-semibold">{category.category}</h3>
              <span className="ml-auto text-xs text-[#a3b97a]/70">{category.items.length}</span>
            </div>

            <ul className="tool-chips flex flex-wrap gap-2">
              {category.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-[#708238]/25 bg-[#708238]/10 px-3 py-1 text-xs text-[#b7c98a] transition-colors duration-200 hover:border-[#708238]/60 hover:bg-[#708238]/25"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExtracurricularSection;
