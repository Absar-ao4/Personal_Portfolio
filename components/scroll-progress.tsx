"use client"

import { motion, useScroll, useSpring } from "framer-motion"
import { useState, useEffect } from "react"

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })
  
  // Move useSpring outside of conditional rendering
  const circularScale = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  })

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Main progress bar - always full width */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 transform-gpu z-50"
        style={{ scaleX, transformOrigin: "0%" }}
      />
      
      {/* Side progress indicator when scrolled */}
      {scrolled && (
        <motion.div
          className="fixed top-6 right-6 z-50 bg-black/80 backdrop-blur-md border border-cyan-500/30 rounded-full p-3"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative w-12 h-12">
            <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 48 48">
              <circle
                cx="24"
                cy="24"
                r="20"
                fill="none"
                stroke="rgba(56, 189, 248, 0.2)"
                strokeWidth="3"
              />
              <motion.circle
                cx="24"
                cy="24"
                r="20"
                fill="none"
                stroke="url(#progressGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                style={{
                  pathLength: scrollYProgress,
                  strokeDasharray: "0 1",
                }}
              />
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.span 
                className="text-xs font-semibold text-cyan-400"
                style={{
                  scale: circularScale
                }}
              >
                {Math.round(scrollYProgress.get() * 100)}%
              </motion.span>
            </div>
          </div>
        </motion.div>
      )}
    </>
  )
}
