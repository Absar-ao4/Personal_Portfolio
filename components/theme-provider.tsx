"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

type Theme = "cyberpunk" | "starwars"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "cyberpunk",
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "cyberpunk",
  storageKey = "portfolio-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)
  const [mounted, setMounted] = useState(false)

  // Initialize theme from localStorage after hydration
  useEffect(() => {
    setMounted(true)
    const storedTheme = localStorage.getItem(storageKey) as Theme
    if (storedTheme && (storedTheme === "cyberpunk" || storedTheme === "starwars")) {
      setTheme(storedTheme)
    }
  }, [])

  useEffect(() => {
    if (!mounted) return
    
    const root = window.document.documentElement
    const body = window.document.body

    // Remove existing theme classes
    root.classList.remove("theme-cyberpunk", "theme-starwars")
    body.classList.remove("theme-cyberpunk", "theme-starwars")

    // Add current theme classes
    root.classList.add(`theme-${theme}`)
    body.classList.add(`theme-${theme}`)

    // Always keep dark mode
    root.classList.add("dark")
  }, [theme, mounted])

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      if (mounted) {
        localStorage.setItem(storageKey, theme)
      }
      setTheme(theme)
    },
  }

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <ThemeProviderContext.Provider {...props} value={value}>
        {children}
      </ThemeProviderContext.Provider>
    )
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
