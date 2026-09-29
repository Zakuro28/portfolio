import { motion } from 'motion/react'
import Section from './Section'
import { Tilt } from './fx'
import { PERSON } from '../content'

export default function About() {
  return (
    <Section id="about" title="A bit about me">
      <div className="grid items-center gap-10 md:grid-cols-[minmax(0,20rem)_1fr] md:gap-16">
        <motion.figure
          className="relative mx-auto w-full max-w-xs md:mx-0"
          initial={{ opacity: 0, rotate: -6, y: 40 }}
          whileInView={{ opacity: 1, rotate: 0, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -15% 0px' }}
          transition={{ type: 'spring', stiffness: 120, damping: 16 }}
        >
          <div className="relative">
            <div className="absolute -inset-3 -z-10 rotate-[-3deg] rounded-[2rem] bg-[#dde6c4]" aria-hidden />
            <Tilt className="rounded-[1.6rem]" max={10}>
              <img src="/zacc.jpg" alt={`${PERSON.name}`} className="aspect-[4/5] w-full rounded-[1.6rem] object-cover object-[50%_30%] shadow-[0_24px_50px_-28px_rgba(27,42,31,0.6)]" />
            </Tilt>
          </div>
          <figcaption className="mt-4 text-center text-sm text-muted md:text-left">{PERSON.fullName}, but everyone calls me Zacc.</figcaption>
        </motion.figure>

        <motion.div
          className="max-w-[62ch] space-y-5 text-lg leading-relaxed text-ink-soft"
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, margin: '0px 0px -15% 0px' }}
          transition={{ staggerChildren: 0.15 }}
        >
          <motion.p variants={{ hidden: { opacity: 0, y: 20 }, shown: { opacity: 1, y: 0 } }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
            I studied Computer Science at Western Mindanao State University, graduated with honors, and received a Best Research Paper award.
          </motion.p>
          <motion.p variants={{ hidden: { opacity: 0, y: 20 }, shown: { opacity: 1, y: 0 } }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
            Since then I’ve worked the front lines: answering live chats at SupportZebra and processing medical claims at Med-Metrix. Both jobs taught me the same thing. Small details decide whether something works for the person on the other end.
          </motion.p>
          <motion.p variants={{ hidden: { opacity: 0, y: 20 }, shown: { opacity: 1, y: 0 } }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
            That’s how I build. I plan the screens around what people actually need to do, write the code, then test on phones and desktops until nothing breaks. Five of those projects are live above.
          </motion.p>
        </motion.div>
      </div>
    </Section>
  )
}
