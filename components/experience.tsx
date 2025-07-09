"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Calendar, MapPin, Building2 } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export function Experience() {
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
    hidden: { opacity: 0, scale: 0.8, x: -50 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  const experiences = [
    {
      title: "Android App Developer Intern",
      company: "Catalift",
      period: " June 2025 - Present",
      location: "Remote",
      description: [
        "Built real-world Android applications using Kotlin, Firebase, and Jetpack Compose",
        "Specialized in creating intuitive and scalable apps with focus on performance and user experience",
        "Implemented full-stack features from UI/UX design to backend integration",
      ],
      color: "from-cyan-400 to-blue-500",
    },
    {
      title: "Graphic Designer",
      company: "Coach Vikram",
      period: " May 2024 - Present",
      location: "Remote",
      description: [
        "Designed compelling visual content for business consultancy programs for CXOs and business heads",
        "Created social media graphics, promotional materials, and brand assets",
        "Collaborated with content team to develop consistent brand identity",
        "Produced high-quality designs for client engagement and marketing campaigns"
      ],
      color: "from-purple-400 to-pink-500",
    },
    {
      title: "Tech Society Member",
      company: "IOT Lab , GDSC and GFG",
      period: "2023 - Present",
      location: "College Campus",
      description: [
        "Part of the competitive programming club @IOTLab",
        "UI/UX designer @GDSC KIIT  ",
        "UI/UX designer @GFG KIIT ",
      ],
      color: "from-green-400 to-teal-500",
    },
  ]

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 relative bg-black" ref={ref}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/3 -left-20 w-40 h-40 bg-cyan-500/5 rounded-full blur-3xl"
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
          className="absolute bottom-1/3 -right-20 w-60 h-60 bg-purple-500/5 rounded-full blur-3xl"
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
        {/* Centered Title */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-white mb-6 relative">
            Experience
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
            My journey in software development and competitive programming
          </motion.p>
        </motion.div>

        {/* Experience Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-8"
        >
          {experiences.map((exp, index) => (
            <motion.div key={index} variants={cardVariants}>
              <Card className="bg-black/80 border-white/10 backdrop-blur-sm hover:bg-white/5 transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Building2 className="h-5 w-5 text-cyan-400" />
                        <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                          {exp.title}
                        </h3>
                      </div>
                      <div className="flex flex-wrap gap-4 mb-4 text-white/60">
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4" />
                          <span>{exp.company}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{exp.period}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                      <ul className="space-y-2">
                        {exp.description.map((item, i) => (
                          <li key={i} className="text-white/80 flex items-start gap-2">
                            <span className="text-cyan-400 mt-1">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="w-1 h-24 bg-gradient-to-b from-transparent via-cyan-400/50 to-transparent hidden md:block"></div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
