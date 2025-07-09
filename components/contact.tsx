"use client"

import type React from "react"
import { useState, type FormEvent } from "react"
import { motion } from "framer-motion"
import { MailIcon, PhoneIcon, MapPinIcon, SendIcon, CheckIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
// Import EmailJS
import emailjs from "@emailjs/browser"

// Environment variables
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL;
const CONTACT_NAME = process.env.NEXT_PUBLIC_CONTACT_NAME;

export function Contact() {
  // Debug environment variables
  console.log('Environment check:', {
    EMAILJS_SERVICE_ID: EMAILJS_SERVICE_ID ? 'SET' : 'MISSING',
    EMAILJS_TEMPLATE_ID: EMAILJS_TEMPLATE_ID ? 'SET' : 'MISSING',
    EMAILJS_PUBLIC_KEY: EMAILJS_PUBLIC_KEY ? 'SET' : 'MISSING',
    CONTACT_EMAIL: CONTACT_EMAIL ? 'SET' : 'MISSING',
    CONTACT_NAME: CONTACT_NAME ? 'SET' : 'MISSING'
  })

  // Form state
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  // Handle form submit
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage(null)
    setIsSubmitted(false)

    try {
      // Validate form data
      if (!formState.name || !formState.email || !formState.message) {
        throw new Error("All fields are required");
      }

      // Check environment configuration
      if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
        const missingVars = [];
        if (!EMAILJS_SERVICE_ID) missingVars.push('EMAILJS_SERVICE_ID');
        if (!EMAILJS_TEMPLATE_ID) missingVars.push('EMAILJS_TEMPLATE_ID');
        if (!EMAILJS_PUBLIC_KEY) missingVars.push('EMAILJS_PUBLIC_KEY');
        throw new Error(`Missing EmailJS configuration: ${missingVars.join(', ')}`);
      }

      const templateParams = {
        to_name: CONTACT_NAME || 'Portfolio Owner',
        to_email: CONTACT_EMAIL || 'ABSARALIOFF@GMAIL.COM',
        from_name: formState.name,
        user_email: formState.email,
        message: formState.message,
        reply_to: formState.email,
      }
      
      console.log('Template params:', templateParams)
      
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      )
      setIsSubmitted(true)
      setFormState({ name: "", email: "", message: "" })
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    } catch (error: any) {
      console.error("EmailJS Error:", error)
      
      let errorMsg = "Failed to send message. Please try again later."
      if (error?.message) {
        errorMsg = error.message
      } else if (error?.text) {
        errorMsg = error.text
      } else if (error?.status) {
        errorMsg = `EmailJS Error: ${error.status}`
      }
      
      setErrorMessage(errorMsg)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 relative">Get In Touch</h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">Let's discuss your project or opportunities</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <MailIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Email</h4>
                  <p className="text-white/80">{CONTACT_EMAIL || 'ABSARALIOFF@GMAIL.COM'}</p>
                  <p className="text-sm text-white/60 mt-1">Feel free to reach out anytime</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <PhoneIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Phone</h4>
                  <p className="text-white/80">Available on request</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <MapPinIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Location</h4>
                  <p className="text-white/80">Available for remote work</p>
                  <p className="text-sm text-white/60 mt-1">Open to remote and relocation opportunities</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="text-white font-semibold mb-3">Connect with me</h4>
              <div className="flex gap-4">
                {/* GitHub Link */}
                <a
                  href="https://github.com/Absar-ao4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-card p-3 rounded-full hover:bg-primary/20 transition-colors"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/watching-absar-ali"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-card p-3 rounded-full hover:bg-primary/20 transition-colors"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-black/80 dark:bg-black/50 border-2 border-white/10 dark:border-gray-800 backdrop-blur-sm rounded-lg p-6 shadow-md"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Send Me a Message</h3>

            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  <CheckIcon className="h-8 w-8 text-primary" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Message Sent!</h4>
                <p className="text-center text-white/70">
                  Thanks for reaching out! I'll get back to you as soon as possible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && (
                  <p className="text-red-500 bg-red-100 p-2 rounded-md">
                    {errorMessage}
                  </p>
                )}

                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1 text-white/80">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="bg-black/60 dark:bg-gray-800/50 border-2 border-white/20 dark:border-gray-700 text-white placeholder:text-white/60 focus:border-cyan-400 transition-colors duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1 text-white/80">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    required
                    className="bg-black/60 dark:bg-gray-800/50 border-2 border-white/20 dark:border-gray-700 text-white placeholder:text-white/60 focus:border-cyan-400 transition-colors duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1 text-white/80">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or opportunity..."
                    rows={5}
                    required
                    className="bg-black/60 dark:bg-gray-800/50 border-2 border-white/20 dark:border-gray-700 text-white placeholder:text-white/60 resize-none focus:border-cyan-400 transition-colors duration-200"
                  />
                </div>

                <Button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white border border-cyan-400/50 shadow-lg shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="animate-spin h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <SendIcon className="h-4 w-4" />
                      Send Message
                    </span>
                  )}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
