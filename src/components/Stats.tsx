import { Atom, Braces, Bug, Database, GitBranch, Paintbrush, ServerCog, TestTubeDiagonal, Zap } from 'lucide-react'
import { CountUp, VelocityMarquee } from './fx'
import { PROJECTS, SKILLS } from '../content'

const TOOLS = [
  { name: 'React', icon: Atom },
  { name: 'TypeScript', icon: Braces },
  { name: 'Tailwind CSS', icon: Paintbrush },
  { name: 'Laravel', icon: ServerCog },
  { name: 'MySQL', icon: Database },
  { name: 'Git & GitHub', icon: GitBranch },
  { name: 'Vite', icon: Zap },
  { name: 'Manual testing', icon: TestTubeDiagonal },
  { name: 'Bug reporting', icon: Bug },
]

/** Numbers that count up, then a strip of tools that moves with the scroll */
export default function Stats() {
  const toolCount = SKILLS.reduce((n, g) => n + g.items.length, 0)
  const stats = [
    { value: PROJECTS.length, label: 'live projects you can open today' },
    { value: 2, label: 'roles where accuracy was measured daily' },
    { value: toolCount, suffix: '+', label: 'tools, languages and practices' },
  ]
  return (
    <section aria-label="At a glance" className="border-y border-line bg-paper/60">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:grid-cols-3 sm:px-8">
        {stats.map((s) => (
          <p key={s.label} className="flex items-baseline gap-3 sm:block">
            <CountUp to={s.value} suffix={s.suffix} className="font-display text-5xl font-bold tracking-[-0.04em] text-olive-deep sm:text-6xl" />
            <span className="text-ink-soft sm:mt-2 sm:block">{s.label}</span>
          </p>
        ))}
      </div>
      <VelocityMarquee className="border-t border-line py-5">
        {TOOLS.map((t) => (
          <span key={t.name} className="flex items-center gap-3 pr-12 font-display text-2xl font-bold tracking-[-0.02em] text-ink/80 sm:text-3xl">
            <t.icon className="size-6 text-olive" aria-hidden />
            {t.name}
          </span>
        ))}
      </VelocityMarquee>
    </section>
  )
}
