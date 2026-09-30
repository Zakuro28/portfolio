import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { ArrowRight, Award, DraftingCompass, GraduationCap, Headset, MapPin, Monitor, Rocket, Trophy, Zap } from 'lucide-react'
import Section from './Section'
import { CountUp, DrawIcon, ScrollWords, Spotlight, Tilt } from './fx'
import { EDUCATION, JOBS, PERSON, PROJECTS } from '../content'

const ease = [0.16, 1, 0.3, 1] as const

/** Little stickers that float around the photo */
const STICKERS = [
  { text: 'Best Trainee & Best Nestee', icon: Trophy, className: '-right-4 top-[58%] -rotate-2 bg-amber text-ink sm:-right-10', delay: 3 },
  { text: 'Graduated with honors', icon: GraduationCap, className: '-left-4 top-8 -rotate-6 bg-amber text-ink sm:-left-10', delay: 0 },
  { text: 'Best Research Paper', icon: Award, className: '-right-3 bottom-16 rotate-3 bg-ink text-paper sm:-right-8', delay: 1.2 },
  { text: 'EIM', icon: Zap, className: '-right-4 top-20 rotate-6 bg-olive text-paper sm:-right-7', delay: 0.6 },
  { text: 'IT', icon: Monitor, className: '-left-4 top-[45%] -rotate-3 bg-paper text-ink ring-1 ring-line sm:-left-7', delay: 1.8 },
  { text: 'AutoCAD', icon: DraftingCompass, className: '-left-3 bottom-6 -rotate-2 bg-[#d8745b] text-paper sm:-left-6', delay: 2.4 },
]

export default function About() {
  const photo = useRef<HTMLElement>(null)
  // The photo drifts a little slower than the page, and its backing card turns
  const { scrollYProgress } = useScroll({ target: photo, offset: ['start end', 'end start'] })
  const drift = useTransform(scrollYProgress, [0, 1], [40, -40])
  const back = useTransform(scrollYProgress, [0, 1], [-8, 6])

  const facts = [
    { icon: MapPin, big: PERSON.location, small: 'Where I’m based', tint: 'bg-[#e6ecd9]' },
    { icon: GraduationCap, big: 'BS Computer Science', small: `${EDUCATION.school.split(',')[0]}, with honors`, tint: 'bg-[#f4ecd4]' },
    { icon: Headset, count: JOBS.length, big: 'front-line roles', small: JOBS.map((j) => j.place).join(' and '), tint: 'bg-[#e3eeee]' },
    { icon: Rocket, count: PROJECTS.length, big: 'projects live', small: 'Open, click around, try to break them', tint: 'bg-[#f6e3dc]' },
  ]

  return (
    <Section id="about" title="A bit about me">
      <div className="grid items-center gap-12 md:grid-cols-[minmax(0,21rem)_1fr] md:gap-16">
        <motion.figure
          ref={photo}
          className="relative mx-auto w-full max-w-xs md:mx-0"
          initial={{ opacity: 0, rotate: -6, y: 40 }}
          whileInView={{ opacity: 1, rotate: 0, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -15% 0px' }}
          transition={{ type: 'spring', stiffness: 120, damping: 16 }}
        >
          <div className="relative">
            <motion.div className="absolute -inset-3 -z-10 rounded-[2rem] bg-linear-to-br from-[#dde6c4] to-[#f0dcae]" style={{ rotate: back }} aria-hidden />
            <motion.div style={{ y: drift }}>
              <Tilt className="rounded-[1.6rem]" max={10}>
                <img src="/zacc.jpg" alt={PERSON.name} className="aspect-[4/5] w-full rounded-[1.6rem] object-cover object-[50%_30%] shadow-[0_24px_50px_-28px_rgba(27,42,31,0.6)]" />
              </Tilt>
            </motion.div>
            {STICKERS.map((s, i) => (
              <motion.span
                key={s.text}
                className={`absolute z-10 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold shadow-[0_12px_24px_-12px_rgba(27,42,31,0.6)] ${s.className}`}
                initial={{ opacity: 0, scale: 0.4 }}
                whileInView={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
                viewport={{ once: true }}
                transition={{
                  opacity: { delay: 0.4 + i * 0.2 },
                  scale: { type: 'spring', stiffness: 380, damping: 14, delay: 0.4 + i * 0.2 },
                  y: { duration: 3.4, repeat: Infinity, ease: 'easeInOut', delay: s.delay },
                }}
              >
                <s.icon className="size-3.5" aria-hidden /> {s.text}
              </motion.span>
            ))}
          </div>
          <figcaption className="mt-5 text-center text-sm text-muted md:text-left">{PERSON.fullName}, but everyone calls me Zacc.</figcaption>
        </motion.figure>

        <div>
          {/* The one line that sums me up: each word lights up as it scrolls by */}
          <ScrollWords
            text="Small details decide whether something works for the person on the other end."
            className="font-display text-[clamp(1.7rem,3.3vw,2.7rem)] leading-[1.12] font-bold tracking-[-0.03em]"
          />
          <motion.div
            className="mt-7 max-w-[60ch] space-y-4 text-lg leading-relaxed text-ink-soft"
            initial="hidden"
            whileInView="shown"
            viewport={{ once: true, margin: '0px 0px -15% 0px' }}
            transition={{ staggerChildren: 0.15 }}
          >
            {[
              'I studied Computer Science at Western Mindanao State University, graduated with honors, and received a Best Research Paper award.',
              'Then I worked the front lines: answering live chats at SupportZebra and processing medical claims at Med-Metrix. Both jobs taught me that lesson above.',
              'So that’s how I build. I plan the screens around what people actually need to do, write the code, then test on phones and desktops until nothing breaks.',
            ].map((p) => (
              <motion.p key={p} variants={{ hidden: { opacity: 0, y: 20 }, shown: { opacity: 1, y: 0 } }} transition={{ duration: 0.7, ease }}>
                {p}
              </motion.p>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Quick facts */}
      <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {facts.map((f, i) => (
          <motion.li
            key={f.big}
            initial={{ opacity: 0, y: 40, rotate: i % 2 ? 3 : -3 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ type: 'spring', stiffness: 160, damping: 17, delay: i * 0.1 }}
          >
            <Spotlight className="group h-full rounded-3xl bg-paper p-6 ring-1 ring-line transition-transform duration-500 hover:-translate-y-1.5">
              <DrawIcon className={`grid size-12 place-items-center rounded-2xl text-ink transition-transform duration-500 group-hover:rotate-[-8deg] ${f.tint}`}>
                <f.icon className="size-6" aria-hidden />
              </DrawIcon>
              <p className="mt-5 font-display text-2xl leading-tight font-bold tracking-[-0.02em]">
                {f.count !== undefined && <CountUp to={f.count} className="mr-1.5 text-olive" />}
                {f.big}
              </p>
              <p className="mt-1.5 text-sm text-muted">{f.small}</p>
            </Spotlight>
          </motion.li>
        ))}
      </ul>

      {/* Open to work */}
      <motion.a
        href="#contact"
        className="group mt-4 flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-ink px-6 py-6 text-paper sm:px-8"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        transition={{ duration: 0.8, ease, delay: 0.3 }}
      >
        <span className="flex items-center gap-3 font-display text-xl font-bold sm:text-2xl">
          <span className="relative flex size-3">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#c9d98a] opacity-60 motion-reduce:hidden" />
            <span className="relative inline-flex size-3 rounded-full bg-[#c9d98a]" />
          </span>
          Open to web development and QA roles
        </span>
        <span className="flex items-center gap-2 rounded-full bg-amber px-5 py-2.5 font-semibold text-ink transition-transform duration-300 group-hover:translate-x-1">
          Let’s talk <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
        </span>
      </motion.a>
    </Section>
  )
}
