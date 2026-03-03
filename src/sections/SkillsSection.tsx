import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Database, Code2, GitBranch, ShieldCheck,
  MessageSquare, Users, Lightbulb, Clock, Target
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
        <h2 className="text-[clamp(34px,3.6vw,52px)] font-bold text-gradient mb-4">
          Skills
        </h2>
        <p className="text-[#a3b97a]/70 text-[clamp(14px,1.1vw,17px)] max-w-xl mx-auto leading-relaxed">
          Technical competencies and soft skills aligned with QA, development, and data-focused roles.
        </p>
      </div>

      <div ref={tabsRef} className="flex justify-center gap-4 mb-10">
        <button
          onClick={() => setActiveTab('soft')}
          className={`skills-tab-btn px-6 py-3 rounded-full font-medium transition-all duration-300 ${
            activeTab === 'soft'
              ? 'bg-[#708238] text-[#0a0a0f] shadow-lg shadow-[#708238]/30'
              : 'bg-[#708238]/10 text-[#a3b97a] border border-[#708238]/20 hover:bg-[#708238]/20'
          }`}
        >
          Soft Skills
        </button>
        <button
          onClick={() => setActiveTab('hard')}
          className={`skills-tab-btn px-6 py-3 rounded-full font-medium transition-all duration-300 ${
            activeTab === 'hard'
              ? 'bg-[#708238] text-[#0a0a0f] shadow-lg shadow-[#708238]/30'
              : 'bg-[#708238]/10 text-[#a3b97a] border border-[#708238]/20 hover:bg-[#708238]/20'
          }`}
        >
          Hard Skills
        </button>
      </div>

      <div ref={contentRef} className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
