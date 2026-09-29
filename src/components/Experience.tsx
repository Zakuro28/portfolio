import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import { Award, GraduationCap } from 'lucide-react'
import Section from './Section'
import { EDUCATION, JOBS } from '../content'

const ease = [0.16, 1, 0.3, 1] as const

export default function Experience() {
  const ref = useRef<HTMLOListElement>(null)
  // The timeline draws itself as you scroll past it
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] })
  const draw = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })

  return (
    <Section id="experience" title="Where I’ve worked" intro="Two roles where accuracy, clear writing and response times were measured every day.">
      <ol ref={ref} className="relative space-y-12 pl-8 sm:pl-10">
        <span className="absolute top-0 bottom-0 left-0 w-px bg-line" aria-hidden />
        <motion.span className="absolute top-0 bottom-0 left-0 w-px origin-top bg-olive" style={{ scaleY: draw }} aria-hidden />
        {JOBS.map((j, i) => (
          <motion.li
            key={j.role}
            className="relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -15% 0px' }}
            transition={{ duration: 0.8, delay: i * 0.1, ease }}
          >
            <motion.span
              className="absolute top-2 -left-[calc(2rem+5px)] size-2.5 rounded-full bg-olive ring-4 ring-sage sm:-left-[calc(2.5rem+5px)]"
              initial={{ scale: 0 }}
              whileInView={{ scale: [0, 1.8, 1] }}
              viewport={{ once: true, margin: '0px 0px -15% 0px' }}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              aria-hidden
            />
            <div className="grid gap-4 lg:grid-cols-[18rem_1fr] lg:gap-12">
              <div>
                <h3 className="font-display text-xl font-bold tracking-[-0.01em]">{j.role}</h3>
                <p className="mt-1 text-ink-soft">
                  {j.place}, {j.where}
                </p>
              </div>
              <ul className="space-y-3 text-ink-soft">
                {j.points.map((pt, k) => (
                  <motion.li
                    key={pt}
                    className="flex gap-3 leading-relaxed"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                    transition={{ duration: 0.6, delay: 0.25 + k * 0.1, ease }}
                  >
                    <span className="mt-[0.7em] h-px w-3 shrink-0 bg-olive" aria-hidden />
                    <span className="max-w-[62ch]">{pt}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.li>
        ))}
      </ol>

      {/* Education and recognition */}
      <motion.div
        className="mt-16 grid gap-6 rounded-3xl bg-paper p-6 ring-1 ring-line sm:p-8 lg:grid-cols-[18rem_1fr] lg:gap-12"
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        transition={{ duration: 0.8, ease }}
      >
        <div className="flex items-start gap-3">
          <GraduationCap className="mt-1 size-6 shrink-0 text-olive" aria-hidden />
          <div>
            <h3 className="font-display text-xl font-bold tracking-[-0.01em]">{EDUCATION.degree}</h3>
            <p className="mt-1 text-ink-soft">{EDUCATION.school}</p>
          </div>
        </div>
        <div>
          <ul className="flex flex-wrap gap-2">
            {EDUCATION.honors.map((h, k) => (
              <motion.li
                key={h}
                className="flex items-center gap-2 rounded-full bg-[#f4ecd4] px-3.5 py-1.5 text-sm font-semibold text-[#6b4a00]"
                initial={{ opacity: 0, scale: 0.6, rotate: -6 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 320, damping: 14, delay: 0.3 + k * 0.12 }}
              >
                <Award className="size-4" aria-hidden /> {h}
              </motion.li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted">Before that: {EDUCATION.earlier}.</p>
        </div>
      </motion.div>
    </Section>
  )
}
