"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu, X, Github, Linkedin, Mail, Zap, Sword } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isScrollingUp, setIsScrollingUp] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [showNav, setShowNav] = useState(true)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Check if scrolling up or down
      const scrollingUp = currentScrollY < lastScrollY
      setIsScrollingUp(scrollingUp)
      
      // Keep nav always visible - remove hide logic
      setShowNav(true)
      
      setScrolled(currentScrollY > 50)
      setLastScrollY(currentScrollY)
    }
    
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const navItems = [
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#skills", label: "Skills" },
    { href: "#cp", label: "Competitive Programming" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ]

  const handleNavClick = (href: string) => {
    setIsOpen(false)
    const element = document.querySelector(href)
    if (element) {
      const offsetTop = element.offsetTop - 80
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  }

  const getThemeColors = () => {
    if (theme === "starwars") {
      return {
        primary: "text-yellow-400",
        secondary: "text-orange-400",
        accent: "text-blue-400",
        hover: "hover:text-yellow-300",
        bg: "hover:bg-yellow-400/10",
        border: "border-yellow-500/30",
        gradient: "from-yellow-500 to-orange-500",
      }
    }
    return {
      primary: "text-cyan-400",
      secondary: "text-purple-400",
      accent: "text-pink-400",
      hover: "hover:text-cyan-300",
      bg: "hover:bg-cyan-400/10",
      border: "border-cyan-500/30",
      gradient: "from-cyan-500 to-purple-500",
    }
  }

  const colors = getThemeColors()

  return (
    <motion.nav
      initial={{ opacity: 0, y: -100 }}
      animate={{ 
        opacity: showNav ? 1 : 0, 
        y: showNav ? 0 : -100 
      }}
      transition={{ 
        duration: showNav ? 0.3 : 0.1,
        ease: "easeInOut" 
      }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? `bg-black/95 backdrop-blur-md border-b ${colors.border}` : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center py-4 transition-all duration-500 ${
          scrolled ? 'justify-between' : 'justify-between'
        }`}>
          <motion.div
            className={`text-2xl font-bold bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent transition-all duration-500`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              x: scrolled ? 0 : 0,
              scale: scrolled ? 0.9 : 1
            }}
          >
            Absar Ali
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div 
            className="hidden md:flex items-center space-x-8"
            animate={{
              opacity: 1,
              x: 0
            }}
            transition={{ duration: 0.3 }}
            style={{ pointerEvents: 'auto' }}
          >
            {navItems.map((item, index) => (
              <motion.button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className={`text-white/80 ${colors.hover} transition-colors duration-200 relative group`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                {item.label}
                <motion.div
                  className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r ${colors.gradient} group-hover:w-full transition-all duration-300`}
                />
              </motion.button>
            ))}

            <div className="flex items-center space-x-4 ml-8">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "cyberpunk" ? "starwars" : "cyberpunk")}
                  className={`${colors.primary} ${colors.hover} ${colors.bg} border ${colors.border}`}
                >
                  {theme === "cyberpunk" ? <Sword className="h-5 w-5" /> : <Zap className="h-5 w-5" />}
                </Button>
              </motion.div>

              {[
                { icon: Github, href: "https://github.com/Absar-ao4" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/watching-absar-ali/" },
                { icon: Mail, href: "#contact", onClick: () => handleNavClick("#contact") },
              ].map((social, index) => (
                <motion.div key={index} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`${colors.primary} ${colors.hover} ${colors.bg} border ${colors.border}`}
                    onClick={social.onClick}
                    asChild={!social.onClick}
                  >
                    {social.onClick ? (
                      <social.icon className="h-5 w-5" />
                    ) : (
                      <a href={social.href} target="_blank" rel="noopener noreferrer">
                        <social.icon className="h-5 w-5" />
                      </a>
                    )}
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Mobile menu button */}
          <motion.div 
            whileTap={{ scale: 0.9 }}
            animate={{
              opacity: 1,
              x: 0
            }}
            transition={{ duration: 0.3 }}
            style={{ pointerEvents: 'auto' }}
          >
            <Button
              variant="ghost"
              size="icon"
              className={`md:hidden ${colors.primary} border ${colors.border}`}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </motion.div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={`md:hidden bg-black/98 backdrop-blur-md border-t ${colors.border}`}
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.href}
                    onClick={() => handleNavClick(item.href)}
                    className={`block w-full text-left px-3 py-2 text-white/80 ${colors.hover} transition-colors duration-200`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
