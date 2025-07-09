"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Code, Trophy, Lightbulb, Users } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateY: -90 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 relative bg-black" ref={ref}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 -left-20 w-40 h-40 bg-cyan-500/5 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-20 w-60 h-60 bg-purple-500/5 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-white mb-6 relative">
            About Me
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 blur-lg -z-10"
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </motion.h2>
          <motion.p variants={itemVariants} className="text-xl text-white/80 max-w-3xl mx-auto">
            I'm a passionate developer and competitive programmer who loves turning complex problems into elegant
            solutions.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-6 text-center lg:text-left"
          >
            {[
              "As a passionate app developer, I've been building real-world Android applications for over 3 years, specializing in Kotlin, Firebase, and Jetpack Compose. I love creating intuitive and scalable apps that focus on both performance and user experience. My development journey includes everything from crafting clean UI/UX designs to implementing full-stack features. I'm also actively involved in my college tech society and work with the IoT Lab team on interdisciplinary projects that blend design, hardware, and software.",
              "Alongside development, I have a strong background in competitive programming. It's where my journey in tech began — solving algorithmic challenges, participating in contests, and sharpening my problem-solving skills. CP taught me to think critically, which now plays a key role in how I approach app architecture and optimization.",
              "When I'm not coding, you can find me participating in programming contests, contributing to open-source projects, or exploring new technologies and frameworks.",
            ].map((text, index) => (
              <motion.p key={index} variants={itemVariants} className="text-lg text-white/80 leading-relaxed">
                {text}
              </motion.p>
            ))}
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-2 gap-6 justify-center"
          >
            {[
              {
                icon: Code,
                title: "Clean Code",
                desc: "Writing maintainable and efficient code",
                color: "text-cyan-400",
                bg: "bg-cyan-500/10",
                border: "border-cyan-500/30",
              },
              {
                icon: Trophy,
                title: "Competitive",
                desc: "Strong algorithmic problem-solving skills",
                color: "text-yellow-400",
                bg: "bg-yellow-500/10",
                border: "border-yellow-500/30",
              },
              {
                icon: Lightbulb,
                title: "Innovation",
                desc: "Always exploring new technologies",
                color: "text-purple-400",
                bg: "bg-purple-500/10",
                border: "border-purple-500/30",
              },
              {
                icon: Users,
                title: "Collaboration",
                desc: "Team player with great communication",
                color: "text-green-400",
                bg: "bg-green-500/10",
                border: "border-green-500/30",
              },
            ].map((item, index) => (
              <motion.div key={index} variants={cardVariants}>
                <Card
                  className={`bg-black/80 dark:bg-black/50 border-white/10 dark:border-gray-800 backdrop-blur-sm hover:${item.bg} transition-all duration-300 group`}
                >
                  <CardContent className="p-6 text-center">
                    <motion.div
                      whileHover={{
                        rotate: 360,
                        scale: 1.2,
                      }}
                      transition={{ duration: 0.5 }}
                      className={`inline-block p-3 rounded-full ${item.bg} ${item.border} border mb-4`}
                    >
                      <item.icon className={`h-8 w-8 ${item.color}`} />
                    </motion.div>
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-white/60 text-sm">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
