import { useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'motion/react'
import { Check, ClipboardList, Code2, Rocket, TestTubeDiagonal } from 'lucide-react'
import Section from './Section'
import { DrawIcon, Spotlight } from './fx'

const STEPS = [
  { title: 'Plan', icon: ClipboardList, text: 'Start from what people need to do, sketch the screens, and agree on what “done” means before any code.' },
  { title: 'Build', icon: Code2, text: 'Write it in small, reusable pieces with React, TypeScript or Laravel, so changes stay quick later.' },
  { title: 'Test', icon: TestTubeDiagonal, text: 'Click every path on phones and desktops, try the edge cases, and fix what breaks. The step most people skip.' },
  { title: 'Ship', icon: Rocket, text: 'Put it live on Vercel or Render, check it again in the real world, and keep improving it.' },
]

const ease = [0.16, 1, 0.3, 1] as const

/** The four steps zigzag left and right down a rail that fills as you scroll; each step lights up when the rail reaches it */
export default function Process() {
  const ref = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 55%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })
  const [reached, setReached] = useState(-1)
  // A step counts as reached once the rail passes its node, which sits in the middle of its row
  useMotionValueEvent(fill, 'change', (v) => setReached(Math.floor(v * STEPS.length + 0.5) - 1))

  return (
    <Section id="process" title="How I work" intro="The same four steps behind every project above.">
      <ol ref={ref} className="relative mx-auto max-w-5xl">
        {/* The rail: grey track with a gradient that fills downward */}
        <span className="absolute top-0 bottom-0 left-8 w-1 -translate-x-1/2 rounded-full bg-line md:left-1/2" aria-hidden />
        <motion.span className="absolute top-0 bottom-0 left-8 w-1 origin-top -translate-x-1/2 rounded-full bg-linear-to-b from-olive via-amber to-olive md:left-1/2" style={{ scaleY: fill }} aria-hidden />

        {STEPS.map((s, i) => {
          const left = i % 2 === 0
          const on = reached >= i
          return (
            <li key={s.title} className="relative grid grid-cols-[4rem_1fr] items-center gap-5 py-5 md:grid-cols-[1fr_7rem_1fr] md:gap-6 md:py-6">
              {/* Node on the rail */}
              <div className="col-start-1 row-start-1 flex justify-center md:col-start-2">
                <motion.span
                  className={`relative z-10 grid size-16 place-items-center rounded-[1.4rem] shadow-[0_14px_30px_-14px_rgba(27,42,31,0.8)] ring-4 ring-sage transition-colors duration-500 md:size-20 md:rounded-3xl ${on ? 'bg-olive text-paper' : 'bg-ink text-[#d7e3a8]'}`}
                  initial={{ scale: 0.3, rotate: left ? -30 : 30 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true, margin: '0px 0px -15% 0px' }}
                  transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.1 }}
                >
                  <DrawIcon>
                    <s.icon className="size-7 md:size-8" aria-hidden />
                  </DrawIcon>
                  <AnimatePresence>
                    {on && (
                      <motion.span
                        className="absolute -top-2 -right-2 grid size-7 place-items-center rounded-full bg-amber text-ink ring-4 ring-sage"
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 16 }}
                        aria-hidden
                      >
                        <Check className="size-4" strokeWidth={3} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.span>
              </div>

              {/* The step card slides in from its own side */}
              <motion.div
                className={`col-start-2 row-start-1 ${left ? 'md:col-start-1' : 'md:col-start-3'}`}
                initial={{ opacity: 0, x: left ? -90 : 90, rotate: left ? -2.5 : 2.5 }}
                whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                viewport={{ once: true, margin: '0px 0px -15% 0px' }}
                transition={{ duration: 0.9, ease }}
              >
                <Spotlight
                  className={`relative overflow-hidden rounded-3xl bg-paper p-6 ring-1 transition-[box-shadow,transform] duration-500 sm:p-8 ${left ? 'md:text-right' : ''} ${on ? 'shadow-[0_28px_50px_-34px_rgba(27,42,31,0.7)] ring-olive/40' : 'ring-line'}`}
                >
                  <span
                    className={`outline-num pointer-events-none absolute -top-4 font-display text-[6.5rem] leading-none font-bold select-none sm:text-[8rem] ${left ? 'right-4 md:right-auto md:left-4' : 'right-4'}`}
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="relative text-sm font-semibold tracking-wide text-olive">Step {i + 1}</p>
                  <h3 className="relative mt-1 font-display text-3xl font-bold tracking-[-0.02em] sm:text-4xl">{s.title}</h3>
                  <p className={`relative mt-3 max-w-[36ch] text-lg leading-relaxed text-ink-soft ${left ? 'md:ml-auto' : ''}`}>{s.text}</p>
                </Spotlight>
              </motion.div>
            </li>
          )
        })}
      </ol>
    </Section>
  )
}
