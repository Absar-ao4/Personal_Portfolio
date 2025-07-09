"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown, Github, ExternalLink, Zap, Sword } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { useTheme } from "@/components/theme-provider"

export function Hero() {
  const ref = useRef(null)
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [glitchDelay, setGlitchDelay] = useState(5)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  useEffect(() => {
    setMounted(true)
    setGlitchDelay(Math.random() * 3 + 2)
  }, [])

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  const getThemeColors = () => {
    if (theme === "starwars") {
      return {
        primary: "text-yellow-400",
        secondary: "text-orange-400",
        accent: "text-blue-400",
        gradient: "from-yellow-400 via-orange-400 to-red-400",
        buttonGradient: "from-yellow-500 to-orange-500",
        buttonHover: "from-yellow-600 to-orange-600",
        glowColor: "#ffd700",
        icon: Sword,
        stats: [
          { number: "600+", label: "Problems Solved", color: "text-yellow-400", glow: "shadow-yellow-500/50" },
          { number: "7+", label: "Projects Built", color: "text-orange-400", glow: "shadow-orange-500/50" },
          { number: "2+", label: "Years Experience", color: "text-blue-400", glow: "shadow-blue-500/50" },
        ],
      }
    }
    return {
      primary: "text-cyan-400",
      secondary: "text-purple-400",
      accent: "text-pink-400",
      gradient: "from-cyan-400 via-purple-400 to-pink-400",
      buttonGradient: "from-cyan-500 to-purple-500",
      buttonHover: "from-cyan-600 to-purple-600",
      glowColor: "#00ffff",
      icon: Zap,
      stats: [
        { number: "600+", label: "Problems Solved", color: "text-cyan-400", glow: "shadow-cyan-500/50" },
        { number: "7+", label: "Projects Built", color: "text-purple-400", glow: "shadow-purple-500/50" },
        { number: "2+", label: "Years Experience", color: "text-green-400", glow: "shadow-green-500/50" },
      ],
    }
  }

  const colors = getThemeColors()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
      <motion.div style={{ y, opacity }} className="w-full">
        {/* Theme-specific Background */}
        {theme === "starwars" ? (
          // Death Star-like circles
          <div className="absolute inset-0">
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border-2 border-yellow-400/20"
                style={{
                  width: 300 + i * 150,
                  height: 300 + i * 150,
                  left: "50%",
                  top: "50%",
                  marginLeft: -(150 + i * 75),
                  marginTop: -(150 + i * 75),
                }}
                animate={{
                  rotate: 360,
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  rotate: {
                    duration: 30 + i * 10,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  },
                  scale: {
                    duration: 4 + i,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  },
                }}
              />
            ))}
          </div>
        ) : (
          // Cyberpunk grid and circles
          <div className="absolute inset-0">
            <motion.div
              className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.1)_1px,transparent_1px)] bg-[size:100px_100px] opacity-20"
              animate={{
                backgroundPosition: ["0px 0px", "100px 100px"],
              }}
              transition={{
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border-2 border-cyan-400/20"
                style={{
                  width: 200 + i * 100,
                  height: 200 + i * 100,
                  left: "50%",
                  top: "50%",
                  marginLeft: -(100 + i * 50),
                  marginTop: -(100 + i * 50),
                }}
                animate={{
                  rotate: 360,
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  rotate: {
                    duration: 20 + i * 5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  },
                  scale: {
                    duration: 3 + i,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  },
                }}
              />
            ))}
          </div>
        )}

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <motion.div variants={itemVariants} className="relative">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 relative">
                Hi, I'm{" "}
                <span className="relative">
                  <span className={`bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent`}>Absar Ali</span>
                  {theme === "cyberpunk" && mounted && (
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 bg-clip-text text-transparent"
                      style={{ clipPath: "inset(0 0 95% 0)" }}
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{
                        duration: 0.1,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatDelay: glitchDelay,
                      }}
                    >
                      Absar Ali
                    </motion.span>
                  )}
                </span>
                <motion.div
                  className="absolute -top-2 -right-2"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  <colors.icon className={`h-8 w-8 ${colors.primary}`} />
                </motion.div>
              </h1>
            </motion.div>

            <motion.p variants={itemVariants} className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto">
              21-year-old{" "}
              <motion.span
                className={`${colors.primary} font-semibold`}
                animate={{
                  textShadow: [
                    `0 0 5px ${colors.glowColor}`,
                    `0 0 20px ${colors.glowColor}`,
                    `0 0 5px ${colors.glowColor}`,
                  ],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                Competitive Programmer
              </motion.span>{" "}
              &{" "}
              <motion.span
                className={`${colors.secondary} font-semibold`}
                animate={{
                  textShadow: [
                    `0 0 5px ${theme === "starwars" ? "#ff6b35" : "#a855f7"}`,
                    `0 0 20px ${theme === "starwars" ? "#ff6b35" : "#a855f7"}`,
                    `0 0 5px ${theme === "starwars" ? "#ff6b35" : "#a855f7"}`,
                  ],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
              >
                Full-Stack Developer
              </motion.span>{" "}
              passionate about solving complex problems and building innovative solutions.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <motion.div
                whileHover={{
                  scale: 1.05,
                  boxShadow: `0 0 30px ${theme === "starwars" ? "rgba(255, 215, 0, 0.8)" : "rgba(0, 255, 255, 0.8)"}`,
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className={`bg-gradient-to-r ${colors.buttonGradient} hover:${colors.buttonHover} text-black font-bold px-8 py-3 border-2 border-current shadow-lg`}
                  onClick={() => {
                    const element = document.querySelector("#projects")
                    if (element) {
                      const offsetTop = element.offsetTop - 80
                      window.scrollTo({ top: offsetTop, behavior: "smooth" })
                    }
                  }}
                >
                  <Github className="mr-2 h-5 w-5" />
                  View My Work
                </Button>
              </motion.div>

              <motion.div
                whileHover={{
                  scale: 1.05,
                  boxShadow: `0 0 30px ${theme === "starwars" ? "rgba(255, 107, 53, 0.8)" : "rgba(168, 85, 247, 0.8)"}`,
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className={`border-2 border-current ${colors.secondary} hover:bg-current/10 px-8 py-3 bg-transparent backdrop-blur-sm font-bold`}
                  onClick={() => {
                    const element = document.querySelector("#contact")
                    if (element) {
                      const offsetTop = element.offsetTop - 80
                      window.scrollTo({ top: offsetTop, behavior: "smooth" })
                    }
                  }}
                >
                  <ExternalLink className="mr-2 h-5 w-5" />
                  Get In Touch
                </Button>
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {colors.stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: `0 0 40px ${stat.color === "text-cyan-400" ? "rgba(0, 255, 255, 0.6)" : stat.color === "text-purple-400" ? "rgba(168, 85, 247, 0.6)" : stat.color === "text-yellow-400" ? "rgba(255, 215, 0, 0.6)" : stat.color === "text-orange-400" ? "rgba(255, 107, 53, 0.6)" : stat.color === "text-blue-400" ? "rgba(59, 130, 246, 0.6)" : "rgba(34, 197, 94, 0.6)"}`,
                  }}
                  className={`bg-black/80 backdrop-blur-sm rounded-lg p-6 border-2 border-white/10 ${stat.glow} shadow-xl`}
                >
                  <motion.h3
                    className={`text-2xl font-bold ${stat.color} mb-2`}
                    animate={{
                      textShadow: [
                        `0 0 10px ${stat.color === "text-cyan-400" ? "#00ffff" : stat.color === "text-purple-400" ? "#a855f7" : stat.color === "text-yellow-400" ? "#ffd700" : stat.color === "text-orange-400" ? "#ff6b35" : stat.color === "text-blue-400" ? "#3b82f6" : "#22c55e"}`,
                        `0 0 30px ${stat.color === "text-cyan-400" ? "#00ffff" : stat.color === "text-purple-400" ? "#a855f7" : stat.color === "text-yellow-400" ? "#ffd700" : stat.color === "text-orange-400" ? "#ff6b35" : stat.color === "text-blue-400" ? "#3b82f6" : "#22c55e"}`,
                        `0 0 10px ${stat.color === "text-cyan-400" ? "#00ffff" : stat.color === "text-purple-400" ? "#a855f7" : stat.color === "text-yellow-400" ? "#ffd700" : stat.color === "text-orange-400" ? "#ff6b35" : stat.color === "text-blue-400" ? "#3b82f6" : "#22c55e"}`,
                      ],
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.5 }}
                  >
                    {stat.number}
                  </motion.h3>
                  <p className="text-white/80">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{
              y: [0, 10, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <ArrowDown className={`h-6 w-6 ${colors.primary}`} />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
