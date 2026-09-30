import { useState, type CSSProperties } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import Section from './Section'
import { SKILLS } from '../content'

const ease = [0.16, 1, 0.3, 1] as const

// The tools I reach for every day, with their real logos (svgl.app)
const CORE = [
  { name: 'React', logo: '/brands/react.svg', use: 'Interfaces', tint: '97,218,251' },
  { name: 'TypeScript', logo: '/brands/typescript.svg', use: 'Safer code', tint: '49,120,198' },
  { name: 'Tailwind CSS', logo: '/brands/tailwind.svg', use: 'Styling', tint: '56,189,248' },
  { name: 'Laravel', logo: '/brands/laravel.svg', use: 'Back ends', tint: '255,45,32' },
  { name: 'PHP', logo: '/brands/php.svg', use: 'Server code', tint: '119,123,179' },
  { name: 'MySQL', logo: '/brands/mysql.svg', use: 'Databases', tint: '0,117,143' },
  { name: 'Vite', logo: '/brands/vite.svg', use: 'Builds', tint: '100,108,255' },
  { name: 'Git', logo: '/brands/git.svg', use: 'Version control', tint: '240,80,50' },
  { name: 'Playwright', logo: '/brands/playwright.svg', use: 'Testing', tint: '46,173,51' },
]

// One color per area, so every chip shows where it belongs
const AREA_COLORS = ['#6b7d2a', '#e0a83a', '#4f8a8b', '#d8745b', '#8a6fb0']
const ALL = SKILLS.flatMap((g, i) => g.items.map((item) => ({ item, area: g.area, color: AREA_COLORS[i % AREA_COLORS.length] })))

export default function Skills() {
  const [area, setArea] = useState<string | null>(null)
  const shown = area ? ALL.filter((s) => s.area === area) : ALL
  const filters = [{ area: null, label: 'Everything', count: ALL.length, color: '#1b2a1f' }, ...SKILLS.map((g, i) => ({ area: g.area, label: g.area, count: g.items.length, color: AREA_COLORS[i % AREA_COLORS.length] }))]

  return (
    <Section id="skills" title="What I work with" intro="The languages, tools and habits behind the projects above.">
      {/* Everyday stack: logo tiles that pop in and glow in each brand's color */}
      <p className="text-sm font-semibold tracking-wide text-olive">Everyday stack</p>
      <ul className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-5 sm:gap-4 lg:grid-cols-9">
        {CORE.map((t, i) => (
          <motion.li
            key={t.name}
            initial={{ opacity: 0, y: 40, rotate: i % 2 ? 8 : -8, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ type: 'spring', stiffness: 220, damping: 16, delay: i * 0.06 }}
          >
            <div
              className="group relative grid aspect-square cursor-default place-items-center overflow-hidden rounded-3xl bg-paper ring-1 ring-line transition-[transform,box-shadow] duration-500 hover:-translate-y-2 hover:shadow-[0_24px_40px_-24px_rgba(var(--tint),0.9)]"
              style={{ '--tint': t.tint } as CSSProperties}
            >
              <span className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(var(--tint),0.22),transparent_65%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden />
              <div className="relative flex flex-col items-center gap-2 px-2 text-center">
                <img src={t.logo} alt="" className="size-10 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-115 group-hover:-rotate-12 sm:size-11" />
                <span className="text-sm leading-tight font-semibold">{t.name}</span>
                <span className="-mt-1 text-[11px] leading-tight text-muted">{t.use}</span>
              </div>
            </div>
          </motion.li>
        ))}
      </ul>

      {/* Everything else, sortable by area */}
      <motion.div
        className="mt-14 rounded-[2rem] bg-paper/70 p-5 ring-1 ring-line sm:p-8"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        transition={{ duration: 0.9, ease }}
      >
        <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0" role="group" aria-label="Show skills by area">
          {filters.map((f) => {
            const on = area === f.area
            return (
              <button
                key={f.label}
                type="button"
                aria-pressed={on}
                onClick={() => setArea(f.area)}
                className={`relative isolate flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors ${on ? 'text-paper' : 'text-ink-soft ring-1 ring-line hover:text-ink'}`}
              >
                {on && <motion.span layoutId="skill-filter" className="absolute inset-0 -z-10 rounded-full bg-ink" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                <span className="size-2 rounded-full" style={{ background: on ? '#e0a83a' : f.color }} aria-hidden />
                {f.label}
                <span className={`rounded-full px-1.5 text-xs ${on ? 'bg-paper/15' : 'bg-sage'}`}>{f.count}</span>
              </button>
            )
          })}
        </div>

        <motion.ul layout className="mt-6 flex flex-wrap gap-2.5" aria-live="polite">
          <AnimatePresence mode="popLayout" initial={false}>
            {shown.map((s, k) => (
              <motion.li
                layout
                key={s.item}
                initial={{ opacity: 0, scale: 0.6, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ type: 'spring', stiffness: 420, damping: 30, delay: Math.min(k, 20) * 0.015 }}
                whileHover={{ y: -4, rotate: k % 2 ? 2 : -2 }}
                className="flex cursor-default items-center gap-2 rounded-full bg-sage px-3.5 py-2 text-[15px] text-ink-soft ring-1 ring-line transition-colors hover:bg-ink hover:text-paper hover:ring-ink"
              >
                <span className="size-1.5 rounded-full" style={{ background: s.color }} aria-hidden />
                {s.item}
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </motion.div>
    </Section>
  )
}
