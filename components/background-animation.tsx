"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useTheme } from "@/components/theme-provider"

export function BackgroundAnimation() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number }>>([])
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    setMounted(true)
    const generateParticles = () => {
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
        y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
        size: Math.random() * 4 + 1,
      }))
      setParticles(newParticles)
    }

    generateParticles()
    if (typeof window !== 'undefined') {
      window.addEventListener("resize", generateParticles)
      return () => window.removeEventListener("resize", generateParticles)
    }
  }, [])

  const getThemeColors = () => {
    if (theme === "starwars") {
      return {
        primary: "bg-yellow-400/30",
        secondary: "bg-orange-400/20",
        grid: "rgba(255,215,0,0.1)",
        lines: "from-transparent via-yellow-400 to-transparent",
        hexagon: "border-yellow-400",
      }
    }
    return {
      primary: "bg-cyan-400/30",
      secondary: "bg-purple-400/20",
      grid: "rgba(0,255,255,0.1)",
      lines: "from-transparent via-cyan-400 to-transparent",
      hexagon: "border-cyan-400",
    }
  }

  const colors = getThemeColors()

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Minimal static background while mounting */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(${colors.grid} 1px, transparent 1px), linear-gradient(90deg, ${colors.grid} 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Animated Grid */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(${colors.grid} 1px, transparent 1px), linear-gradient(90deg, ${colors.grid} 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
          animate={{
            backgroundPosition: ["0px 0px", "50px 50px"],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>

      {/* Floating Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute rounded-full ${colors.primary}`}
          style={{
            width: particle.size,
            height: particle.size,
            left: particle.x,
            top: particle.y,
          }}
          animate={{
            y: [particle.y, particle.y - 100, particle.y],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Theme-specific Effects */}
      {theme === "starwars" ? (
        // Star Wars: Moving stars
        <div className="absolute inset-0">
          {Array.from({ length: 100 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 1,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      ) : (
        // Cyberpunk: Glitch lines
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.1, 0] }}
          transition={{ duration: 0.1, repeat: Number.POSITIVE_INFINITY, repeatDelay: Math.random() * 5 }}
        >
          <div className={`absolute top-1/4 left-0 w-full h-px bg-gradient-to-r ${colors.lines}`} />
          <div className={`absolute top-3/4 left-0 w-full h-px bg-gradient-to-r ${colors.lines}`} />
        </motion.div>
      )}

      {/* Geometric Shapes */}
      <div className="absolute inset-0 opacity-5">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-20 h-20 border ${colors.hexagon} transform rotate-45`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              rotate: [45, 405],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </div>
    </div>
  )
}
