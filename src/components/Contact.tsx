import { useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Check, Copy, Mail, Phone, Send } from 'lucide-react'
import { FacebookIcon, GithubIcon, LinkedinIcon } from './BrandIcons'
import { Magnetic, SplitReveal } from './fx'
import { PERSON } from '../content'

const YEAR = new Date().getFullYear()
const field = 'mt-1.5 w-full rounded-xl bg-paper px-4 py-3 text-ink ring-1 ring-line outline-none transition-shadow placeholder:text-muted/70 focus:ring-2 focus:ring-olive'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState('')

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSON.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard blocked: the mailto link still works */
    }
  }

  // No server: the form opens the visitor's email app with the message filled in
  const send = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()
    if (!name || !message) return setError('Add your name and a message, then send again.')
    setError('')
    const subject = encodeURIComponent(`Hello from ${name}`)
    const body = encodeURIComponent(message)
    window.location.href = `mailto:${PERSON.email}?subject=${subject}&body=${body}`
  }

  const links = [
    { label: 'LinkedIn', value: 'Zcsalweemnharr Bandahala', href: PERSON.linkedin, icon: LinkedinIcon },
    { label: 'GitHub', value: 'Zakuro28', href: PERSON.github, icon: GithubIcon },
    { label: 'Facebook', value: 'whyzzky.engkoh', href: PERSON.facebook, icon: FacebookIcon },
  ]

  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-ink py-20 text-paper sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <SplitReveal id="contact-title" text="Have a role or a project in mind? Let’s talk." className="font-display text-[clamp(2rem,4vw,3.2rem)] leading-[1.04] font-bold tracking-[-0.03em]" />
          <p className="mt-4 max-w-md text-lg leading-relaxed text-paper/70">I reply to every message, usually within a day.</p>

          <div className="mt-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <a href={`mailto:${PERSON.email}`} className="flex items-center gap-3 rounded-2xl bg-paper/8 px-4 py-3 text-lg font-semibold ring-1 ring-paper/15 transition-colors hover:bg-paper/14">
                <Mail className="size-5 text-[#c9d98a]" aria-hidden /> {PERSON.email}
              </a>
              <button type="button" onClick={copyEmail} className="flex items-center gap-2 rounded-2xl px-3.5 py-3 text-sm font-semibold text-paper/75 ring-1 ring-paper/15 transition-colors hover:bg-paper/10 hover:text-paper">
                {copied ? <Check className="size-4 text-[#c9d98a]" aria-hidden /> : <Copy className="size-4" aria-hidden />}
                <span aria-live="polite">{copied ? 'Copied' : 'Copy email'}</span>
              </button>
            </div>
            <a href={PERSON.phoneHref} className="flex w-fit items-center gap-3 rounded-2xl bg-paper/8 px-4 py-3 text-lg font-semibold ring-1 ring-paper/15 transition-colors hover:bg-paper/14">
              <Phone className="size-5 text-[#c9d98a]" aria-hidden /> {PERSON.phone}
            </a>
          </div>

          <ul className="mt-8 flex flex-wrap gap-2">
            {links.map((l) => (
              <li key={l.label}>
                <a href={l.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-paper/80 ring-1 ring-paper/15 transition-colors hover:bg-paper/10 hover:text-paper">
                  <l.icon className="size-4" aria-hidden /> {l.label}
                  <span className="sr-only">: {l.value}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <motion.form
          onSubmit={send}
          noValidate
          className="rounded-3xl bg-paper p-6 text-ink sm:p-8"
          initial={{ opacity: 0, y: 40, rotate: 1.5 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, margin: '0px 0px -15% 0px' }}
          transition={{ type: 'spring', stiffness: 110, damping: 16 }}
        >
          <h3 className="font-display text-xl font-bold">Send a message</h3>
          <p className="mt-1 text-sm text-muted">This opens your email app with your message ready to send.</p>
          <label className="mt-6 block">
            <span className="text-sm font-medium text-ink-soft">Your name</span>
            <input name="name" autoComplete="name" placeholder="Maria Santos" className={field} />
          </label>
          <label className="mt-4 block">
            <span className="text-sm font-medium text-ink-soft">Message</span>
            <textarea name="message" rows={5} placeholder="Tell me about the role or the project." className={`${field} resize-y`} />
          </label>
          <AnimatePresence>
            {error && (
              <motion.p role="alert" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-3 text-sm font-medium text-[#b3401f]">
                {error}
              </motion.p>
            )}
          </AnimatePresence>
          <Magnetic strength={0.12} className="mt-6 block w-full">
            <button type="submit" className="group flex w-full items-center justify-center gap-2 rounded-full bg-ink py-3.5 font-semibold text-paper transition-colors hover:bg-olive-deep">
              Send message
              <Send className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden />
            </button>
          </Magnetic>
        </motion.form>
      </div>

      <footer className="mx-auto mt-20 flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-paper/15 px-5 pt-8 text-sm text-paper/55 sm:flex-row sm:px-8">
        <p className="flex items-center gap-2">
          <img src="/pteranodon-sm.png" alt="" className="h-5 w-auto" /> © {YEAR} {PERSON.name}
        </p>
        <a href="#top" className="hover:text-paper">
          Back to top
        </a>
      </footer>
    </section>
  )
}
