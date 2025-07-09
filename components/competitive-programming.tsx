"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Target, Clock, Award } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export function CompetitiveProgramming() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const platforms = [
    {
      name: "Codeforces",
      rating: "1100+",
      problems: "350+",
      rank: "newbie",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30",
    },
    {
      name: "CodeChef",
      rating: "1450+",
      problems: "60+",
      rank: "2 Star",
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/30",
    },
  ]

  const achievements = [

    {
      title: "CodeChef starters",
      description: "Top 1000 finish multiple times",
      icon: Target,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Codeforces Round",
      description: "Consistent performance in contests",
      icon: Clock,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
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
    <section id="cp" className="py-20 px-4 sm:px-6 lg:px-8 relative" ref={ref}>
      {/* Animated Algorithm Visualization */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full"
          animate={{
            x: [0, 100, 200, 100, 0],
            y: [0, -50, 0, 50, 0],
            scale: [1, 1.5, 1, 1.5, 1],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-purple-400 rounded-full"
          animate={{
            x: [0, -150, -300, -150, 0],
            y: [0, 75, 0, -75, 0],
            scale: [1, 2, 1, 2, 1],
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
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 relative">
            Competitive Programming
            <motion.div
              className="absolute -inset-2 bg-gradient-to-r from-yellow-400/10 via-red-400/10 to-blue-400/10 blur-xl -z-10"
              animate={{
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Sharpening problem-solving skills through algorithmic challenges and programming contests.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Platform Stats */}
          <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
            <motion.h3 variants={itemVariants} className="text-2xl font-bold text-white mb-8">
              Platform Statistics
            </motion.h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {platforms.map((platform, index) => (
                <motion.div key={index} variants={cardVariants}>
                  <Card
                    className={`bg-black/80 dark:bg-black/50 border-white/10 border-2 dark:border-gray-800 backdrop-blur-sm hover:${platform.bgColor} transition-all duration-300 group hover:shadow-lg hover:shadow-cyan-500/20`}
                  >
                    <CardHeader className="pb-3">
                      <CardTitle
                        className={`text-lg ${platform.color} group-hover:text-cyan-400 transition-colors duration-300`}
                      >
                        {platform.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-white/60">Rating:</span>
                        <motion.span className="text-white font-semibold" whileHover={{ scale: 1.1, color: "#00ffff" }}>
                          {platform.rating}
                        </motion.span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Problems:</span>
                        <motion.span className="text-white font-semibold" whileHover={{ scale: 1.1, color: "#a855f7" }}>
                          {platform.problems}
                        </motion.span>
                      </div>
                      <div className="pt-2">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Badge
                            variant="outline"
                            className={`${platform.color} ${platform.borderColor} border-current`}
                          >
                            {platform.rank}
                          </Badge>
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
            <motion.h3 variants={itemVariants} className="text-2xl font-bold text-white mb-8">
              Key Achievements
            </motion.h3>
            <div className="space-y-6">
              {achievements.map((achievement, index) => (
                <motion.div key={index} variants={cardVariants}>
                  <Card
                    className={`bg-black/80 dark:bg-black/50 border-white/10 border-2 dark:border-gray-800 backdrop-blur-sm hover:${achievement.bgColor} transition-all duration-300 group hover:shadow-lg hover:shadow-cyan-500/20`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <motion.div
                          className={`p-2 rounded-lg bg-slate-700/50 dark:bg-gray-800/50 group-hover:${achievement.bgColor} transition-all duration-300`}
                          whileHover={{
                            rotate: 360,
                            scale: 1.2,
                          }}
                          transition={{ duration: 0.5 }}
                        >
                          <achievement.icon className={`h-6 w-6 ${achievement.color}`} />
                        </motion.div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-white mb-1 group-hover:text-cyan-400 transition-colors duration-300">
                            {achievement.title}
                          </h4>
                          <p className="text-white/60">{achievement.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Skills Highlight */}
        <motion.div
          className="mt-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
        </motion.div>
      </div>
    </section>
  )
}
