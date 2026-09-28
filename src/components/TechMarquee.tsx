import { useEffect, useRef } from 'react';
import {
  Atom,
  Braces,
  Code2,
  Coffee,
  Database,
  FileCode2,
  GitBranch,
  Paintbrush,
  ServerCog,
  ShieldCheck,
  Webhook,
  Zap,
} from 'lucide-react';

const TECH = [
  { name: 'React', icon: Atom },
  { name: 'TypeScript', icon: Braces },
  { name: 'Tailwind CSS', icon: Paintbrush },
  { name: 'Laravel', icon: ServerCog },
  { name: 'PHP', icon: FileCode2 },
  { name: 'JavaScript', icon: Code2 },
  { name: 'MySQL', icon: Database },
  { name: 'Git & GitHub', icon: GitBranch },
  { name: 'Vite', icon: Zap },
  { name: 'Java', icon: Coffee },
  { name: 'Web & API Development', icon: Webhook },
  { name: 'QA Testing', icon: ShieldCheck },
];

/**
 * A strip of the tools I use that drifts on its own and speeds up with scrolling,
 * changing direction with the scroll (after React Bits' Scroll Velocity).
 */
const TechMarquee = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let x = 0;
    let lastY = window.scrollY;
    let boost = 0;
    let dir = -1;
    let frame = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(now - last, 50) / 1000;
      last = now;
      const y = window.scrollY;
      const dy = y - lastY;
      lastY = y;
      if (dy !== 0) dir = dy > 0 ? -1 : 1;
      // Scroll speed adds a boost that eases back to the resting drift
      boost = boost * 0.9 + Math.min(Math.abs(dy), 120) * 0.35;
      x += dir * (40 + boost * 6) * dt;
      const half = track.scrollWidth / 2;
      if (half > 0) {
        if (x <= -half) x += half;
        if (x > 0) x -= half;
      }
      track.style.transform = `translate3d(${x}px, 0, 0) skewX(${Math.max(-8, Math.min(8, -dy * 0.15))}deg)`;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  const row = [...TECH, ...TECH];

  return (
    <section aria-label="Tools and technologies I work with" className="tech-marquee relative overflow-hidden py-6 border-y border-[#708238]/15">
      <div ref={trackRef} className="flex w-max items-center gap-10 will-change-transform">
        {row.map((t, i) => (
          <span key={`${t.name}-${i}`} className="flex shrink-0 items-center gap-3" aria-hidden={i >= TECH.length}>
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#708238]/12 border border-[#708238]/25 text-[#9fbe66]">
              <t.icon size={20} />
            </span>
            <span className="tech-name whitespace-nowrap font-bold tracking-tight text-[#a3b97a]">{t.name}</span>
            <span className="ml-7 h-1.5 w-1.5 rounded-full bg-[#708238]/60" />
          </span>
        ))}
      </div>
    </section>
  );
};

export default TechMarquee;
