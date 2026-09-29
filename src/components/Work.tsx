import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { Magnetic, Tilt } from './fx'
import Section from './Section'
import { GithubIcon } from './BrandIcons'
import { PROJECTS } from '../content'

export default function Work() {
  return (
    <Section id="work" title="Things I’ve built" intro="Every one of these is live. Open them, click around, try to break them.">
      <ul className="space-y-20 sm:space-y-24">
        {PROJECTS.map((p, i) => (
          <motion.li
            key={p.name}
            className="grid items-center gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-14"
            initial={{ opacity: 0, x: i % 2 ? 60 : -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '0px 0px -15% 0px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <Tilt className="rounded-2xl">
            {/* Screenshot in a browser frame; the whole frame opens the live site */}
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${p.name} in a new tab`}
              className="group block overflow-hidden rounded-2xl bg-paper shadow-[0_24px_50px_-28px_rgba(27,42,31,0.55)] ring-1 ring-ink/10"
            >
              <span className="flex items-center gap-1.5 border-b border-line bg-sage px-4 py-2.5">
                <span className="size-2.5 rounded-full bg-[#d8745b]" />
                <span className="size-2.5 rounded-full bg-amber" />
                <span className="size-2.5 rounded-full bg-olive" />
                <span className="ml-3 truncate text-xs text-muted">{p.url.replace('https://', '')}</span>
              </span>
              <span className="block overflow-hidden">
                <img src={p.image} alt={`${p.name} home screen`} loading="lazy" className="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
              </span>
            </a>
            </Tilt>

            <div>
              <p className="text-[15px] font-medium text-olive">{p.kind}</p>
              <h3 className="mt-1 font-display text-3xl font-bold tracking-[-0.02em]">{p.name}</h3>
              <p className="mt-4 max-w-[40ch] leading-relaxed text-ink-soft">{p.description}</p>
              {p.note && <p className="mt-3 max-w-[40ch] text-sm text-muted">{p.note}</p>}
              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Built with">
                {p.tech.map((t, k) => (
                  <motion.li
                    key={t}
                    className="rounded-full bg-paper px-3 py-1 text-sm text-ink-soft ring-1 ring-line"
                    initial={{ opacity: 0, scale: 0.7 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 400, damping: 18, delay: 0.4 + k * 0.06 }}
                  >
                    {t}
                  </motion.li>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap items-center gap-2">
                <Magnetic strength={0.25}>
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 font-semibold text-paper transition-colors hover:bg-olive-deep">
                    Open live site
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                  </a>
                </Magnetic>
                <a href={p.repo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full px-4 py-2.5 font-semibold text-ink-soft transition-colors hover:bg-paper hover:text-ink">
                  <GithubIcon className="size-4" aria-hidden /> View code
                </a>
              </div>
            </div>
          </motion.li>
        ))}
      </ul>
    </Section>
  )
}
