"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Figma } from "lucide-react"

export function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [mounted, setMounted] = useState(false)
  const [symbolPositions, setSymbolPositions] = useState<Array<{left: number, top: number}>>([])

  useEffect(() => {
    setMounted(true)
    const positions = ["</>", "{}", "[]", "()", "&&", "||"].map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
    }))
    setSymbolPositions(positions)
  }, [])

  const skillCategories = [
    {
      title: "App Development ",
      skills: ["Kotlin", "Jetpack Compose", "Firebase" , "Retrofit API" , { name: "Figma", icon: Figma } ],
      color: "bg-purple-500/20 text-purple-300 border-purple-500/30",
      glowColor: "shadow-purple-500/25",
    },
    {
      title: "Tools & Technologies",
      skills: ["Git", "Docker", "AWS", "Vercel", "Linux", "VS Code"],
      color: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
      glowColor: "shadow-yellow-500/25",
    },
    {
      title: "Competitive Programming",
      skills: [
        "Data Structures",
        "Algorithms",
        "Dynamic Programming",
        "Graph Theory",
        "Number Theory",
        "Combinatorics",
      ],
      color: "bg-red-500/20 text-red-300 border-red-500/30",
      glowColor: "shadow-red-500/25",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -90 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 relative" ref={ref}>
      {/* Floating Code Symbols */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {mounted && ["</>", "{}", "[]", "()", "&&", "||"].map((symbol, index) => (
          <motion.div
            key={index}
            className="absolute text-6xl font-mono text-cyan-400/10 dark:text-cyan-300/5"
            style={{
              left: `${symbolPositions[index]?.left || 50}%`,
              top: `${symbolPositions[index]?.top || 50}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 4 + (index * 0.5),
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: index * 0.5,
            }}
          >
            {symbol}
          </motion.div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 relative">
            Skills & Technologies
            <motion.div
              className="absolute -inset-2 bg-gradient-to-r from-cyan-400/10 via-purple-400/10 to-pink-400/10 blur-xl -z-10"
              animate={{
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            A comprehensive toolkit built through years of competitive programming and full-stack development.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skillCategories.map((category, index) => (
            <motion.div key={index} variants={cardVariants}>
              <Card
                className={`bg-black/80 dark:bg-black/80 border-white/10 dark:border-white/10 backdrop-blur-sm hover:bg-black/80 dark:hover:bg-black/80 transition-all duration-300 group border-2 ${category.glowColor} hover:shadow-lg hover:shadow-white/50`}
              >
                <CardHeader>
                  <CardTitle className="text-white text-xl group-hover:text-cyan-400 transition-colors duration-300">
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <motion.div
                    className="flex flex-wrap gap-2"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                  >
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skillIndex}
                        variants={badgeVariants}
                        whileHover={{
                          scale: 1.1,
                          boxShadow: `0 0 15px ${
                            category.color.includes("cyan")
                              ? "rgba(0, 255, 255, 0.5)"
                              : category.color.includes("purple")
                                ? "rgba(168, 85, 247, 0.5)"
                                : category.color.includes("green")
                                  ? "rgba(34, 197, 94, 0.5)"
                                  : category.color.includes("yellow")
                                    ? "rgba(234, 179, 8, 0.5)"
                                    : "rgba(239, 68, 68, 0.5)"
                          }`,
                        }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Badge
                          variant="outline"
                          className={`${category.color} hover:scale-105 transition-transform duration-200 cursor-pointer flex items-center gap-2`}
                        >
                          {typeof skill === 'object' && skill.icon ? (
                            <>
                              <skill.icon size={16} />
                              {skill.name}
                            </>
                          ) : (
                            skill
                          )}
                        </Badge>
                      </motion.div>
                    ))}
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
