import { motion } from 'motion/react'
import { Code2, Database, Rocket, ShieldCheck, Users } from 'lucide-react'
import Section from './Section'
import { SKILLS } from '../content'

const ICONS = [Code2, Database, ShieldCheck, Rocket, Users]

export default function Skills() {
  return (
    <Section id="skills" title="What I work with" intro="The languages, tools and habits behind the projects above.">
      <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {SKILLS.map((group, i) => {
          const Icon = ICONS[i % ICONS.length]
          return (
            <motion.div
              key={group.area}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className="flex items-center gap-2.5 border-b border-line pb-3 font-display text-lg font-bold">
                <Icon className="size-5 text-olive" aria-hidden />
                {group.area}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item, k) => (
                  <motion.li
                    key={item}
                    className="cursor-default rounded-full bg-paper px-3 py-1.5 text-sm text-ink-soft ring-1 ring-line transition-colors hover:bg-ink hover:text-paper hover:ring-ink"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.25 + k * 0.035 }}
                    whileHover={{ y: -3, transition: { duration: 0.15 } }}
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )
        })}
      </div>
    </Section>
  )
}
