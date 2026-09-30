import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { ArrowUpRight, TrendingUp } from 'lucide-react'
import { CountUp, Magnetic, Tilt } from './fx'
import Section from './Section'
import { GithubIcon } from './BrandIcons'
import { PROJECTS, PROJECTS_EARNED, type Project } from '../content'

export default function Work() {
  const list = useRef<HTMLUListElement>(null)
  // Drives the stack: earlier cards shrink back as later ones slide over them
  const { scrollYProgress } = useScroll({ target: list, offset: ['start start', 'end end'] })
  return (
    <Section id="work" title="Things I’ve built" intro="Every one of these is live. Open them, click around, try to break them.">
      <ul ref={list} className="space-y-10 sm:space-y-14">
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.name} p={p} i={i} total={PROJECTS.length} progress={scrollYProgress} />
        ))}
      </ul>
      <Earned amount={PROJECTS_EARNED.amount} label={PROJECTS_EARNED.label} />
    </Section>
  )
}

/** One project as a card. On big screens the cards stick and pile up like a deck as you scroll. */
function ProjectCard({ p, i, total, progress }: { p: Project; i: number; total: number; progress: MotionValue<number> }) {
  const scale = useTransform(progress, [i / total, 1], [1, 1 - (total - 1 - i) * 0.03])
  return (
    <li className="[@media(min-width:1024px)_and_(min-height:760px)]:sticky" style={{ top: `calc(5.5rem + ${i * 14}px)` }}>
      <motion.article
        style={{ scale }}
        className="relative grid origin-top items-center gap-8 overflow-hidden rounded-[2rem] bg-paper p-5 shadow-[0_30px_60px_-40px_rgba(27,42,31,0.6)] ring-1 ring-line sm:p-8 lg:grid-cols-[1.3fr_1fr] lg:gap-12"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '0px 0px -12% 0px' }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        <motion.span
          aria-hidden
          className="outline-num pointer-events-none absolute -top-5 right-3 font-display text-[7rem] leading-none font-bold select-none sm:-top-8 sm:text-[10rem]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease: EASE }}
        >
          {String(i + 1).padStart(2, '0')}
        </motion.span>

        <Tilt className="rounded-2xl">
          {/* Screenshot in a browser frame; the whole frame opens the live site */}
          <a
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${p.name} in a new tab`}
            data-cursor="Open ↗"
            className="group block overflow-hidden rounded-2xl bg-paper shadow-[0_24px_50px_-28px_rgba(27,42,31,0.55)] ring-1 ring-ink/10"
          >
            <span className="flex items-center gap-1.5 border-b border-line bg-sage px-4 py-2.5">
              <span className="size-2.5 rounded-full bg-[#d8745b]" />
              <span className="size-2.5 rounded-full bg-amber" />
              <span className="size-2.5 rounded-full bg-olive" />
              <span className="ml-3 truncate text-xs text-muted">{p.url.replace('https://', '')}</span>
            </span>
            <span className="block overflow-hidden">
              <img src={p.image} alt={`${p.name} home screen`} loading="lazy" className="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
            </span>
          </a>
        </Tilt>

        <div className="relative">
          <p className="text-[15px] font-medium text-olive">{p.kind}</p>
          <h3 className="mt-1 font-display text-3xl font-bold tracking-[-0.02em]">{p.name}</h3>
          <p className="mt-4 max-w-[42ch] leading-relaxed text-ink-soft">{p.description}</p>
          {p.note && <p className="mt-3 max-w-[42ch] text-sm text-muted">{p.note}</p>}
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Built with">
            {p.tech.map((t, k) => (
              <motion.li
                key={t}
                className="rounded-full bg-sage px-3 py-1 text-sm text-ink-soft ring-1 ring-line transition-colors hover:bg-ink hover:text-paper"
                initial={{ opacity: 0, scale: 0.6, y: 8 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 400, damping: 16, delay: 0.35 + k * 0.07 }}
              >
                {t}
              </motion.li>
            ))}
          </ul>
          <div className="mt-7 flex flex-wrap items-center gap-2">
            <Magnetic strength={0.25}>
              <a href={p.url} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 font-semibold text-paper transition-colors hover:bg-olive-deep">
                Open live site
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
              </a>
            </Magnetic>
            {p.repo && (
              <a href={p.repo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full px-4 py-2.5 font-semibold text-ink-soft transition-colors hover:bg-sage hover:text-ink">
                <GithubIcon className="size-4" aria-hidden /> View code
              </a>
            )}
          </div>
        </div>
      </motion.article>
    </li>
  )
}

const EASE = [0.16, 1, 0.3, 1] as const
const BARS = [0.34, 0.5, 0.42, 0.68, 1]

/** The projects' combined result: the number counts up while a small chart grows and a shine sweeps across */
function Earned({ amount, label }: { amount: number; label: string }) {
  return (
    <div className="glow-border mt-20 rounded-3xl sm:mt-24">
    <motion.div
      className="relative overflow-hidden rounded-3xl bg-ink px-6 py-8 text-paper sm:px-10 sm:py-11"
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
    >
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-linear-to-r from-transparent via-white/15 to-transparent"
        initial={{ x: '0%' }}
        whileInView={{ x: '420%' }}
        viewport={{ once: true }}
        transition={{ duration: 1.3, ease: EASE, delay: 1.1 }}
      />
      <div className="relative flex items-end justify-between gap-5">
        <div>
          <p className="flex items-center gap-2 text-sm font-medium text-amber">
            <motion.span
              className="grid size-6 place-items-center rounded-full bg-amber/15"
              initial={{ scale: 0, rotate: -45 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 380, damping: 14, delay: 0.45 }}
            >
              <TrendingUp className="size-3.5" aria-hidden />
            </motion.span>
            Earned by these projects
          </p>
          <CountUp to={amount} prefix="₱" className="mt-2 block font-display text-5xl font-bold tracking-[-0.04em] sm:text-7xl" />
          <p className="mt-2 text-paper/70">{label}</p>
        </div>
        <div aria-hidden className="flex h-20 shrink-0 items-end gap-2 sm:h-28 sm:gap-2.5">
          {BARS.map((h, i) => (
            <motion.span
              key={i}
              className="w-2.5 origin-bottom rounded-full sm:w-4 bg-linear-to-t from-olive to-amber"
              style={{ height: h * 100 + '%' }}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 260, damping: 15, delay: 0.5 + i * 0.09 }}
            />
          ))}
        </div>
      </div>
    </motion.div>
    </div>
  )
}
