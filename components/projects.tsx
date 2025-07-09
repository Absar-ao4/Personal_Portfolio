"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Github, ExternalLink, Code, Database, Globe, Figma } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "Full-stack e-commerce solution with Kotlin , jetpack compose, and firebase . Features include user authentication, payment integration, and admin dashboard.",
      image: "/placeholder.png?height=200&width=400",
      technologies: ["Kotlin","FireBase", "Razorpay"],
      github: "https://github.com/Absar-ao4/Ecommerce-app",
      category: "Full-Stack",
      icon: Globe,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
    },
    {
      title: "Portfolio Website",
      description:
        "Responsive portfolio website showcasing projects and skills with modern design and smooth animations.",
      image: "/portfoliolanding.png?height=200&width=400",
      technologies: ["Next.js", "Tailwind CSS", "Framer Motion"],
      category: "Frontend",
      icon: Code,
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/10",
    },
    {
      title: "Nike Landing Page",
      description:
        "A visually striking landing page designed entirely in Figma, showcasing Nike’s signature branding and modern aesthetics.",
      image: "/placeholder1.png?height=200&width=400",
      technologies: [{ name: "Figma", icon: Figma }, "Ui","Ux", "Responsive"],
      github: "https://www.figma.com/design/1r4W4tPbt6t75O9IIDDeLA/NIKE--Community-?node-id=0-1&t=feK7DXUx5I7AmbFE-1",
      category: "Frontend",
      icon: Code,
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/10",
    }
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Full-Stack":
        return "bg-purple-500/20 text-purple-300 border-purple-500/30"
      case "Frontend":
        return "bg-cyan-500/20 text-cyan-300 border-cyan-500/30"
      case "Backend":
        return "bg-green-500/20 text-green-300 border-green-500/30"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
    }
  }

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

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 relative" ref={ref}>
      {/* Floating Project Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[Code, Database, Globe].map((Icon, index) => (
          <motion.div
            key={index}
            className="absolute"
            style={{
              left: `${20 + index * 30}%`,
              top: `${20 + index * 20}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 10, -10, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 6 + index,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: index * 2,
            }}
          >
            <Icon className="h-16 w-16 text-cyan-400/20 dark:text-cyan-300/10" />
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
            Featured Projects
            <motion.div
              className="absolute -inset-2 bg-gradient-to-r from-purple-400/10 via-cyan-400/10 to-green-400/10 blur-xl -z-10"
              animate={{
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.1, 1],
                rotate: [0, -5, 5, 0],
              }}
              transition={{
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            A collection of projects showcasing my skills in full-stack development, algorithms, and modern web
            technologies.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div key={index} variants={cardVariants}>
              <Card
                className={`bg-black/80 dark:bg-black/50 border-white/10 dark:border-gray-800 border-2 backdrop-blur-sm hover:${project.bgColor} transition-all duration-300 group hover:shadow-lg overflow-hidden`}
              >
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden">
                    <motion.img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      whileHover={{ scale: 1.05 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                    <div className="absolute top-4 right-4">
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Badge variant="outline" className={getCategoryColor(project.category)}>
                          {project.category}
                        </Badge>
                      </motion.div>
                    </div>
                    <motion.div
                      className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <project.icon className={`h-6 w-6 ${project.color}`} />
                    </motion.div>
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  <div className="flex items-center mb-3">
                    <motion.div whileHover={{ rotate: 360, scale: 1.2 }} transition={{ duration: 0.5 }}>
                      <project.icon className={`h-5 w-5 ${project.color} mr-2`} />
                    </motion.div>
                    <CardTitle className="text-white text-lg group-hover:text-cyan-400 transition-colors duration-300">
                      {project.title}
                    </CardTitle>
                  </div>

                  <p className="text-white/80 text-sm mb-4 line-clamp-3">{project.description}</p>

                  <motion.div
                    className="flex flex-wrap gap-2 mb-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                  >
                    {project.technologies.map((tech, techIndex) => (
                      <motion.div key={techIndex} whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }}>
                        <Badge
                          variant="outline"
                          className="text-xs bg-black/60 dark:bg-gray-800/50 text-white/80 border-white/10 dark:border-gray-700 border-2 hover:border-cyan-400/50 transition-colors duration-200 flex items-center gap-1"
                        >
                          {typeof tech === 'object' && tech.icon ? (
                            <>
                              <tech.icon size={12} />
                              {tech.name}
                            </>
                          ) : (
                            tech
                          )}
                        </Badge>
                      </motion.div>
                    ))}
                  </motion.div>

                  <div className="flex gap-2">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full border-white/10 dark:border-gray-700 text-white/80 hover:bg-slate-700 dark:hover:bg-gray-800 bg-transparent hover:border-cyan-400/50 transition-all duration-200 border-2"
                        asChild
                      >
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          {project.title === "Nike Landing Page" ? <ExternalLink className="h-4 w-4 mr-2" /> : <Github className="h-4 w-4 mr-2" />}
                          {project.title === "Nike Landing Page" ? "Open" : "Code"}
                        </a>
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.div>
            <Button
              variant="outline"
              size="lg"
              className="border-white/10 dark:border-gray-700 text-white/80 hover:bg-slate-800 dark:hover:bg-gray-800 bg-transparent hover:border-cyan-400/50 transition-all duration-300 border-2 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,255,255,0.3)]"
              asChild
            >
              <a href="https://github.com/Absar-ao4" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-5 w-5" />
                <span>View All Projects on GitHub</span>
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
