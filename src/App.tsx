import { MotionConfig } from 'motion/react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Work from './components/Work'
import Process from './components/Process'
import Experience from './components/Experience'
import Skills from './components/Skills'
import About from './components/About'
import Contact from './components/Contact'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a href="#work" className="sr-only z-[60] rounded-full bg-ink px-4 py-2 text-paper focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
        Skip to my work
      </a>
      <Nav />
      <main>
        <Hero />
        <Stats />
        <Work />
        <Process />
        <Experience />
        <Skills />
        <About />
        <Contact />
      </main>
    </MotionConfig>
  )
}
