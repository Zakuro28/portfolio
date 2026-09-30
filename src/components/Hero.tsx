import { useRef } from 'react'
import { motion } from 'motion/react'
import { ArrowDown, Mail } from 'lucide-react'
import ProjectDeck from './ProjectDeck'
import { Magnetic, RotatingWord, SplitReveal } from './fx'
import { PERSON, PROJECTS } from '../content'

const ease = [0.16, 1, 0.3, 1] as const

const BUILDS = ['websites', 'web apps', 'dashboards', 'portals']

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  // The warm light in the background drifts toward the mouse
  const follow = (e: React.PointerEvent) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r || e.pointerType !== 'mouse') return
    ref.current!.style.setProperty('--mx', `${e.clientX - r.left}px`)
    ref.current!.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  return (
    <section id="top" ref={ref} onPointerMove={follow} className="relative overflow-hidden pt-28 pb-20 sm:pt-32 lg:pb-28">
      <div className="aurora" aria-hidden />
      <div className="hero-spot" aria-hidden />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.2fr_1fr] lg:gap-10">
        <div>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }} className="flex items-center gap-2 text-[15px] font-medium text-ink-soft">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-olive opacity-50 motion-reduce:hidden" />
              <span className="relative inline-flex size-2.5 rounded-full bg-olive" />
            </span>
            Open to web development and QA roles
          </motion.p>

          <SplitReveal
            as="h1"
            delay={0.1}
            text="I build {slot} and test them until they hold up."
            slot={<RotatingWord words={BUILDS} className="text-olive" />}
            label="I build websites, web apps, dashboards and portals, and test them until they hold up."
            className="mt-5 font-display text-[clamp(2.1rem,4.3vw,3.55rem)] leading-[1.02] font-bold tracking-[-0.035em]"
          />

          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.55, ease }} className="mt-6 max-w-[34rem] text-lg leading-relaxed text-ink-soft">
            I’m {PERSON.name}, a Computer Science graduate from the {PERSON.location}. {PROJECTS.length} of my projects are live right now, and I’ve spent my working years in customer support and medical claims, where getting the details right is the job.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7, ease }} className="mt-8 flex flex-wrap items-center gap-3">
            <Magnetic>
              <a href="#work" className="group flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 font-semibold text-paper transition-colors hover:bg-olive-deep">
                See my work
                <ArrowDown className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden />
              </a>
            </Magnetic>
            <Magnetic strength={0.2}>
              <a href={`mailto:${PERSON.email}`} className="flex items-center gap-2 rounded-full px-5 py-3.5 font-semibold text-ink ring-1 ring-ink/15 transition-colors hover:bg-paper hover:ring-ink/30">
                <Mail className="size-4" aria-hidden /> Email me
              </a>
            </Magnetic>
          </motion.div>
        </div>

        <div>
          <ProjectDeck />
          <p className="mt-2 text-center text-sm text-muted">Hover a card, then open the live site.</p>
        </div>
      </div>
      <motion.a
        href="#work"
        className="relative mx-auto mt-14 hidden w-fit flex-col items-center gap-2 text-xs font-medium tracking-wide text-muted transition-colors hover:text-ink lg:flex"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <span className="scroll-cue" aria-hidden />
        Scroll to see my work
      </motion.a>
    </section>
  )
}
