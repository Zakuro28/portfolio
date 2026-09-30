import { useState, type KeyboardEvent } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Award, BriefcaseBusiness, Check, GraduationCap, MapPin, Sparkles } from 'lucide-react'
import Section from './Section'
import { DrawIcon } from './fx'
import { EDUCATION, JOBS } from '../content'

const ease = [0.16, 1, 0.3, 1] as const

type Stop = { id: string; tab: string; mono: string; kind: 'job' | 'school'; title: string; org: string; where: string; points: string[]; badges?: string[]; skills?: string[] }

// Both jobs, then the degree, as one list of stops
const STOPS: Stop[] = [
  ...JOBS.map((j) => ({
    id: j.place.toLowerCase().replace(/[^a-z]/g, ''),
    tab: j.place,
    mono: j.place.replace(/[^A-Z]/g, '').slice(0, 2),
    kind: 'job' as const,
    title: j.role,
    org: j.place,
    where: j.where,
    points: j.points,
    badges: j.awards,
  })),
  {
    id: 'wmsu',
    tab: 'WMSU',
    mono: 'CS',
    kind: 'school',
    title: EDUCATION.degree,
    org: EDUCATION.school.split(',')[0],
    where: EDUCATION.school.split(',').slice(1).join(',').trim(),
    points: [`Before that: ${EDUCATION.earlier}.`],
    badges: EDUCATION.honors.map((h) => (h === 'Best Research Paper award' ? 'Best Research Paper' : h)),
    skills: EDUCATION.proficiency,
  },
]

/** Pick a stop on the left; its story slides in on the right. Until someone picks one, it moves on by itself every 10 seconds. */
export default function Experience() {
  const [active, setActive] = useState(0)
  const [auto, setAuto] = useState(true)
  const reduce = useReducedMotion()
  const stop = STOPS[active]
  const autoOn = auto ? !reduce : false
  const pick = (i: number) => {
    setAuto(false)
    setActive(i)
  }

  // Arrow keys move between tabs, like a native tab list
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const next = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key]
    if (!next) return
    e.preventDefault()
    const i = (active + next + STOPS.length) % STOPS.length
    pick(i)
    document.getElementById(`exp-tab-${STOPS[i].id}`)?.focus()
  }

  return (
    <Section id="experience" title="Where I’ve worked" intro="Two roles where accuracy, clear writing and response times were measured every day, and the degree before them.">
      <motion.div
        className="grid gap-5 lg:grid-cols-[17rem_1fr] lg:gap-8"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '0px 0px -12% 0px' }}
        transition={{ duration: 0.9, ease }}
      >
        {/* Tabs: a column on desktop, a swipeable row on phones */}
        <div role="tablist" aria-label="Jobs and education" aria-orientation="vertical" onKeyDown={onKey} className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0">
          {STOPS.map((s, i) => {
            const on = i === active
            return (
              <button
                key={s.id}
                id={`exp-tab-${s.id}`}
                role="tab"
                type="button"
                aria-selected={on}
                aria-controls="exp-panel"
                tabIndex={on ? 0 : -1}
                onClick={() => pick(i)}
                className={`group relative isolate flex shrink-0 items-center gap-3 rounded-2xl px-3 py-3 text-left transition-colors lg:w-full ${on ? 'text-paper' : 'text-ink-soft hover:bg-paper hover:text-ink'}`}
              >
                {on && <motion.span layoutId="exp-tab" className="absolute inset-0 -z-10 rounded-2xl bg-ink shadow-[0_16px_30px_-18px_rgba(27,42,31,0.9)]" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                <span className={`grid size-10 shrink-0 place-items-center rounded-xl font-display text-sm font-bold transition-[background-color,color,transform] duration-300 group-hover:rotate-[-6deg] ${on ? 'bg-amber text-ink' : 'bg-sage-deep text-olive-deep'}`}>{s.mono}</span>
                <span className="grid">
                  <span className="font-display font-bold whitespace-nowrap">{s.tab}</span>
                  <span className={`text-xs whitespace-nowrap ${on ? 'text-paper/65' : 'text-muted'}`}>{s.kind === 'job' ? s.title : 'Degree'}</span>
                </span>
                {/* Countdown to the next stop; gone once the visitor picks one */}
                {on && autoOn && (
                  <span className="absolute inset-x-3 bottom-1.5 h-0.5 overflow-hidden rounded-full bg-paper/15" aria-hidden>
                    <span
                      key={active}
                      className="tab-timer block h-full origin-left rounded-full bg-amber"
                      onAnimationEnd={() => setActive((active + 1) % STOPS.length)}
                    />
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* The story of the chosen stop */}
        <div id="exp-panel" role="tabpanel" aria-labelledby={`exp-tab-${stop.id}`} className="relative isolate min-h-[23rem] overflow-hidden rounded-[2rem] bg-ink p-6 text-paper sm:p-10">
          <div className="aurora-dark opacity-80" aria-hidden />
          <AnimatePresence mode="wait">
            <motion.div
              key={stop.id}
              className="relative"
              initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -16, filter: 'blur(6px)' }}
              transition={{ duration: 0.45, ease }}
            >
              <motion.span
                className="pointer-events-none absolute -top-6 -right-2 font-display text-[7rem] leading-none font-bold text-transparent select-none [-webkit-text-stroke:1.5px_rgba(248,250,245,0.12)] sm:-top-10 sm:text-[11rem]"
                initial={{ x: 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease, delay: 0.1 }}
                aria-hidden
              >
                {stop.mono}
              </motion.span>

              <p className="flex items-center gap-2 text-sm font-medium text-amber">
                {stop.kind === 'job' ? <BriefcaseBusiness className="size-4" aria-hidden /> : <GraduationCap className="size-4" aria-hidden />}
                {stop.kind === 'job' ? 'Work' : 'Education'}
              </p>
              <h3 className="mt-2 max-w-[20ch] font-display text-3xl font-bold tracking-[-0.02em] sm:text-4xl">{stop.title}</h3>
              <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-paper/70">
                <span className="font-semibold text-paper">{stop.org}</span>
                <span className="flex items-center gap-1">
                  <MapPin className="size-4 text-[#c9d98a]" aria-hidden /> {stop.where}
                </span>
              </p>

              {stop.badges && (
                <ul className="mt-6 flex flex-wrap gap-2">
                  {stop.badges.map((b, k) => (
                    <motion.li
                      key={b}
                      className="flex items-center gap-2 rounded-full bg-amber px-3.5 py-1.5 text-sm font-semibold text-ink"
                      initial={{ opacity: 0, scale: 0.5, rotate: -8 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 360, damping: 14, delay: 0.25 + k * 0.12 }}
                    >
                      <Award className="size-4" aria-hidden /> {b}
                    </motion.li>
                  ))}
                </ul>
              )}

              {stop.skills && (
                <div className="mt-6">
                  <p className="flex items-center gap-2 text-sm font-medium text-paper/60">
                    <Sparkles className="size-4 text-amber" aria-hidden /> Proficient in
                  </p>
                  <ul className="mt-2.5 flex flex-wrap gap-2">
                    {stop.skills.map((sk, k) => (
                      <motion.li
                        key={sk}
                        className="rounded-xl bg-paper/10 px-4 py-2 font-display text-lg font-bold ring-1 ring-paper/20"
                        initial={{ opacity: 0, y: 14, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ type: 'spring', stiffness: 380, damping: 16, delay: 0.4 + k * 0.1 }}
                      >
                        {sk}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}

              <ul className="mt-7 space-y-4">
                {stop.points.map((pt, k) => (
                  <motion.li
                    key={pt}
                    className="flex gap-3.5 leading-relaxed text-paper/85"
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.55, ease, delay: 0.2 + k * 0.1 }}
                  >
                    <DrawIcon className="mt-0.5 size-6 shrink-0 rounded-full bg-olive/40 text-[#c9d98a]">
                      <Check className="size-3.5" strokeWidth={3} aria-hidden />
                    </DrawIcon>
                    <span className="max-w-[62ch]">{pt}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </Section>
  )
}
