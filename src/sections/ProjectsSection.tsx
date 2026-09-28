import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Github } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    name: 'Pitaka',
    kind: 'Expense tracker',
    url: 'https://pitaka-nine.vercel.app',
    repo: 'https://github.com/Zakuro28/expense-tracker',
    image: '/projects/pitaka.jpg',
    description:
      'Tracks money in, money out and savings by day, week, month or year. Includes budgets, bill due dates, savings goals, a wishlist and Excel import and export. Works without an account and saves on the device.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Motion'],
  },
  {
    name: 'Skyfall',
    kind: 'Weather app',
    url: 'https://zacc-skyfall.vercel.app',
    repo: 'https://github.com/Zakuro28/weather-app',
    image: '/projects/skyfall.png',
    description:
      'Live weather for any city, with an animated sky that follows the real conditions: the sun moves along its arc by day, nights turn dark with stars, and heavy rain brings lightning.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Open-Meteo API'],
  },
  {
    name: 'Zacc Websites',
    kind: 'Landing page',
    url: 'https://zacc-website.vercel.app',
    repo: 'https://github.com/Zakuro28/landing-page',
    image: '/projects/zacc-websites.jpg',
    description:
      'The page for my web development service for small businesses. Animated from the first load, fully responsive, with every contact link one tap away.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Motion'],
  },
  {
    name: 'Pager',
    kind: 'Parenting manager',
    url: 'https://pager-dz8g.onrender.com',
    repo: 'https://github.com/Zakuro28/Pager',
    image: '/projects/pager.jpg',
    description:
      'A web app for parents and caregivers: a private journal, milestone tracking with reminders for the child’s age, tips for each stage and a resource library.',
    tech: ['Laravel', 'PHP', 'Blade'],
    note: 'Runs on a free server, so the first visit can take up to a minute to wake up.',
  },
];

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const isDesktop = window.matchMedia('(min-width: 1024px)').matches;

      gsap.fromTo(
        headlineRef.current,
        { y: 70, opacity: 0, rotateX: 18, filter: 'blur(12px)', transformPerspective: 1000 },
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
          { y: 90, x: index % 2 === 0 ? -30 : 30, rotateZ: index % 2 === 0 ? -2.5 : 2.5, scale: 0.9, opacity: 0, filter: 'blur(8px)' },
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
      id="projects"
      className="relative bg-[#0a0a0f] py-[10vh] px-[6vw] overflow-visible"
      style={{
        background: 'radial-gradient(ellipse at 20% 20%, rgba(112,130,56,0.06) 0%, transparent 40%)',
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div ref={headlineRef} className="mb-10 text-center">
          <span className="font-mono text-base tracking-[0.2em] uppercase text-[#708238] block mb-3">
            Live on the web
          </span>
          <h2 className="text-[clamp(44px,4.4vw,66px)] font-bold text-gradient mb-3">Projects</h2>
          <p className="text-[#a3b97a]/70 text-[clamp(17px,1.35vw,21px)] max-w-2xl mx-auto leading-relaxed">
            Websites and apps I designed and built. Click one to open the live site.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <div
              key={project.name}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="group relative rounded-2xl shadow-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[#708238]/20 card-glass border border-[#708238]/20 overflow-hidden"
            >
              {/* The whole card opens the live site */}
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${project.name}, the live site, in a new tab`}
                className="absolute inset-0 z-10 rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#708238]"
              />

              {/* Preview in a small browser frame */}
              <div className="p-4 pb-0">
                <div className="rounded-t-xl overflow-hidden border border-b-0 border-[#708238]/25 bg-[#0d0d14]">
                  <div className="flex items-center gap-1.5 px-3 py-2 border-b border-[#708238]/20">
                    <span className="size-2.5 rounded-full bg-[#708238]/50" />
                    <span className="size-2.5 rounded-full bg-[#708238]/35" />
                    <span className="size-2.5 rounded-full bg-[#708238]/20" />
                    <span className="ml-2 truncate font-mono text-xs text-[#a3b97a]/70">
                      {project.url.replace('https://', '')}
                    </span>
                  </div>
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={project.image}
                      alt={`${project.name} home screen`}
                      loading="lazy"
                      className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 className="text-[#b9cc8f] text-2xl font-bold mb-1">{project.name}</h3>
                    <p className="text-[#a3b97a] text-sm">{project.kind}</p>
                  </div>
                  <span className="shrink-0 p-2 rounded-full bg-[#708238]/10 text-[#708238] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                    <ArrowUpRight size={20} />
                  </span>
                </div>

                <p className="text-[#eaf2d8] text-sm leading-relaxed">{project.description}</p>
                {project.note && <p className="mt-2 text-[#a3b97a]/70 text-xs leading-relaxed">{project.note}</p>}

                <ul className="mt-4 flex flex-wrap gap-2" aria-label="Built with">
                  {project.tech.map((t) => (
                    <li key={t} className="rounded-full border border-[#708238]/25 px-3 py-1 text-xs text-[#a3b97a]">
                      {t}
                    </li>
                  ))}
                </ul>

                {/* Sits above the card link so the code can be opened separately */}
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-20 mt-5 inline-flex items-center gap-2 text-sm text-[#a3b97a] underline-offset-4 hover:underline"
                >
                  <Github size={16} /> View the code
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
