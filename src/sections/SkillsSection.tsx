import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Database, Code2, GitBranch, ShieldCheck,
  MessageSquare, Users, Lightbulb, Clock, Target,
  ClipboardCheck, Headset, HeartHandshake, Cpu
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const softSkills = [
  { icon: Lightbulb, name: 'Analytical & Critical Thinking', level: 92 },
  { icon: Target, name: 'Problem Solving', level: 92 },
  { icon: MessageSquare, name: 'Communication', level: 90 },
  { icon: Users, name: 'Team Collaboration', level: 89 },
  { icon: Clock, name: 'Organization & Reliability', level: 90 },
  { icon: Users, name: 'Adaptability', level: 90 },
];

const hardSkills = [
  { icon: Database, name: 'SQL / PL-SQL / Relational Databases', level: 90 },
  { icon: Code2, name: 'Java / C++ / PHP / JavaScript', level: 88 },
  { icon: Code2, name: 'Web & API Development', level: 87 },
  { icon: Database, name: 'Database Design & Data Modeling', level: 89 },
  { icon: GitBranch, name: 'Version Control (Git/GitHub)', level: 88 },
  { icon: ShieldCheck, name: 'Testing, Debugging & Quality', level: 88 },
  { icon: ClipboardCheck, name: 'Medical Claims Processing', level: 88 },
  { icon: Headset, name: 'Customer Support', level: 90 },
];

const SWITCH = [
  { id: 'soft' as const, label: 'Soft Skills', icon: HeartHandshake },
  { id: 'hard' as const, label: 'Hard Skills', icon: Cpu },
];

const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'soft' | 'hard'>('soft');

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const isDesktop = window.matchMedia('(min-width: 1024px)').matches;

      gsap.fromTo(
        headlineRef.current,
        {
          opacity: 0,
          y: 80,
          rotateX: 24,
          transformPerspective: 1100,
          filter: 'blur(12px)',
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          filter: 'blur(0px)',
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: headlineRef.current,
            start: isDesktop ? 'top 88%' : 'top 92%',
            end: isDesktop ? 'top 58%' : 'top 74%',
            scrub: isDesktop ? 0.45 : false,
          },
        }
      );

      gsap.fromTo(
        tabsRef.current,
        { opacity: 0, scale: 0.85, y: 28, rotateZ: -1.5 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          rotateZ: 0,
          duration: 0.95,
          ease: 'elastic.out(1, 0.6)',
          scrollTrigger: {
            trigger: tabsRef.current,
            start: isDesktop ? 'top 90%' : 'top 95%',
            end: isDesktop ? 'top 64%' : 'top 78%',
            scrub: isDesktop ? 0.42 : false,
          },
        }
      );

      gsap.fromTo(
        contentRef.current,
        {
          opacity: 0,
          y: 95,
          rotateX: 14,
          filter: 'blur(10px)',
          transformPerspective: 1000,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          filter: 'blur(0px)',
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: isDesktop ? 'top 92%' : 'top 96%',
            end: isDesktop ? 'top 62%' : 'top 76%',
            scrub: isDesktop ? 0.5 : false,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // After switching, the new cards slide in from the side that was picked
  const gridRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);
  useLayoutEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const cards = gridRef.current?.children;
    if (!cards?.length) return;
    const from = activeTab === 'hard' ? 40 : -40;
    gsap.fromTo(
      cards,
      { opacity: 0, x: from, filter: 'blur(6px)' },
      { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.5, stagger: 0.05, ease: 'power3.out', clearProps: 'transform,filter' }
    );
  }, [activeTab]);

  const currentSkills = activeTab === 'soft' ? softSkills : hardSkills;

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative bg-[#0a0a0f] py-[10vh] px-[6vw]"
      style={{
        background: 'radial-gradient(ellipse at 20% 80%, rgba(112,130,56,0.06) 0%, transparent 40%)',
      }}
    >
      <div ref={headlineRef} className="text-center mb-12">
        <span className="font-mono text-xs tracking-[0.2em] uppercase text-[#708238] block mb-2">
          Expertise
        </span>
        <h2 className="text-[clamp(26px,2.5vw,36px)] font-bold text-gradient mb-4">
          Skills
        </h2>
        <p className="text-[#a3b97a]/70 text-[clamp(14px,1vw,15px)] max-w-xl mx-auto leading-relaxed">
          Technical competencies and soft skills aligned with QA, development, and data-focused roles.
        </p>
      </div>

      {/* One switch: the olive thumb slides to whichever side is chosen */}
      <div ref={tabsRef} className="flex justify-center mb-10">
        <div
          role="tablist"
          aria-label="Skill type"
          className="skills-switch relative grid grid-cols-2 rounded-full p-1.5"
          onKeyDown={(e) => {
            if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
            const next = e.key === 'ArrowRight' ? 1 : 0;
            setActiveTab(SWITCH[next].id);
            e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus();
          }}
        >
          <span aria-hidden className="skills-switch__thumb" data-side={activeTab} />
          {SWITCH.map((opt) => (
            <button
              key={opt.id}
              type="button"
              role="tab"
              aria-selected={activeTab === opt.id}
              tabIndex={activeTab === opt.id ? 0 : -1}
              onClick={() => setActiveTab(opt.id)}
              className="skills-switch__btn relative z-10 flex items-center justify-center gap-2 rounded-full px-6 py-2.5 font-semibold"
            >
              <opt.icon size={17} aria-hidden />
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div ref={contentRef} className="max-w-4xl mx-auto">
        <div ref={gridRef} key={activeTab} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentSkills.map((skill, index) => (
            <div
              key={skill.name}
              className="group p-5 rounded-2xl card-glass hover:bg-[#708238]/10 transition-all duration-300"
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-[#708238]/10 text-[#708238] group-hover:bg-[#708238] group-hover:text-[#0a0a0f] transition-colors">
                  <skill.icon size={22} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h3 className="text-[#f2f6e8] font-semibold">{skill.name}</h3>
                  </div>
                  <div className="h-2 bg-[#708238]/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#556b2f] to-[#708238] rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
