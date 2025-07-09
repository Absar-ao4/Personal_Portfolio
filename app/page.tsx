"use client"

import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Experience } from "@/components/experience"
import { Skills } from "@/components/skills"
import { CompetitiveProgramming } from "@/components/competitive-programming"
import { Projects } from "@/components/projects"
import { Contact } from "@/components/contact"
import { Navigation } from "@/components/navigation"
import { ThemeProvider } from "@/components/theme-provider"
import { BackgroundAnimation } from "@/components/background-animation"
import { ScrollProgress } from "@/components/scroll-progress"
import { useTheme } from "@/components/theme-provider"

function AppContent() {
  const { theme } = useTheme()

  return (
    <div className="min-h-screen bg-black transition-all duration-500">
      <BackgroundAnimation />
      <ScrollProgress />
      <Navigation />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <CompetitiveProgramming />
        <Projects />
        <Contact />
      </main>
    </div>
  )
}

export default function Home() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}
