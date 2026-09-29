import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { ClipboardList, Code2, Rocket, TestTubeDiagonal } from 'lucide-react'
import Section from './Section'

const STEPS = [
  { title: 'Plan', icon: ClipboardList, text: 'Start from what people need to do, sketch the screens, and agree on what “done” means before any code.' },
  { title: 'Build', icon: Code2, text: 'Write it in small, reusable pieces with React, TypeScript or Laravel, so changes stay quick later.' },
  { title: 'Test', icon: TestTubeDiagonal, text: 'Click every path on phones and desktops, try the edge cases, and fix what breaks. The step most people skip.' },
  { title: 'Ship', icon: Rocket, text: 'Put it live on Vercel or Render, check it again in the real world, and keep improving it.' },
]

/** The four steps light up in order as you scroll through them */
export default function Process() {
  const ref = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 55%'] })
  const line = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <Section id="process" title="How I work" intro="The same four steps behind every project above.">
      <ol ref={ref} className="relative grid gap-10 md:grid-cols-4 md:gap-6">
        {/* The rail fills as you scroll */}
        <span className="absolute top-6 right-[12%] left-[12%] hidden h-0.5 rounded-full bg-line md:block" aria-hidden>
          <motion.span className="block h-full rounded-full bg-olive" style={{ width: line }} />
        </span>
        {STEPS.map((s, i) => (
          <motion.li
            key={s.title}
            className="relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -15% 0px' }}
            transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.span
              className="relative z-10 grid size-12 place-items-center rounded-2xl bg-ink text-[#d7e3a8] shadow-[0_10px_24px_-12px_rgba(27,42,31,0.7)] md:mx-auto"
              initial={{ scale: 0.4, rotate: -20 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true, margin: '0px 0px -15% 0px' }}
              transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.15 + i * 0.15 }}
            >
              <s.icon className="size-5.5" aria-hidden />
            </motion.span>
            <h3 className="mt-5 font-display text-2xl font-bold md:text-center">
              <span className="mr-2 text-base text-olive">{i + 1}.</span>
              {s.title}
            </h3>
            <p className="mt-2 leading-relaxed text-ink-soft md:text-center">{s.text}</p>
          </motion.li>
        ))}
      </ol>
    </Section>
  )
}
