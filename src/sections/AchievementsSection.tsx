import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  GraduationCap, Award, BookOpen, School
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const achievements = [
  {
    icon: GraduationCap,
    title: 'Bachelor of Science in Computer Science',
    subtitle: 'Western Mindanao State University, Zamboanga City, Philippines',
  },
  {
    icon: School,
    title: 'TVL - Electrical Installation and Maintenance',
    subtitle: 'Secondary track credential',
  },
  {
    icon: Award,
    title: 'Graduated With Honors',
    subtitle: 'Approximate grade: 90%',
  },
  {
    icon: BookOpen,
    title: 'Best Research Paper',
    subtitle: 'Academic recognition',
  },
];

const AchievementsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const isDesktop = window.matchMedia('(min-width: 1024px)').matches;

      gsap.fromTo(
        headlineRef.current,
        {
          opacity: 0,
          y: 72,
          scale: 0.92,
          rotateX: 16,
          filter: 'blur(10px)',
          transformPerspective: 1200,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          filter: 'blur(0px)',
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: headlineRef.current,
            start: isDesktop ? 'top 88%' : 'top 93%',
            end: isDesktop ? 'top 56%' : 'top 72%',
            scrub: isDesktop ? 0.46 : false,
          },
        }
      );

      itemsRef.current.forEach((item, index) => {
        if (!item) return;
        gsap.fromTo(
          item,
          {
            opacity: 0,
            y: 65,
            x: index % 2 === 0 ? -22 : 22,
            rotateY: index % 2 === 0 ? -24 : 24,
            rotateX: 12,
            scale: 0.86,
            transformPerspective: 1300,
            filter: 'blur(8px)',
          },
          {
            opacity: 1,
            y: 0,
            x: 0,
            rotateY: 0,
            rotateX: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: 1,
            ease: 'back.out(1.5)',
            scrollTrigger: {
              trigger: item,
              start: isDesktop ? 'top 94%' : 'top 98%',
              end: isDesktop ? 'top 65%' : 'top 78%',
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
      id="achievements"
      className="relative bg-[#0a0a0f] py-[10vh] px-[6vw]"
      style={{
        background: 'radial-gradient(ellipse at 80% 50%, rgba(112,130,56,0.06) 0%, transparent 40%)',
      }}
    >
      <div ref={headlineRef} className="text-center mb-12">
        <span className="font-mono text-xs tracking-[0.2em] uppercase text-[#708238] block mb-2">
          Recognition
        </span>
        <h2 className="text-[clamp(34px,3.6vw,52px)] font-bold text-gradient mb-4">
          Education & Recognition
        </h2>
        <p className="text-[#a3b97a]/70 text-[clamp(14px,1.1vw,17px)] max-w-xl mx-auto leading-relaxed">
          Academic background and key educational recognitions.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement, index) => (
            <div
              key={achievement.title}
              ref={(el) => {
                itemsRef.current[index] = el;
              }}
              className="group p-5 rounded-2xl transition-all duration-300 card-glass hover:bg-[#708238]/10"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[#708238]/10 text-[#708238]">
                  <achievement.icon size={22} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1 text-[#f2f6e8]">
                    {achievement.title}
                  </h3>
                  {achievement.subtitle && (
                    <p className="text-[#a3b97a]/70 text-sm">{achievement.subtitle}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute top-1/2 left-0 w-32 h-32 bg-[#708238]/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute bottom-1/4 right-0 w-40 h-40 bg-[#556b2f]/5 rounded-full blur-3xl" />
    </section>
  );
};

export default AchievementsSection;
