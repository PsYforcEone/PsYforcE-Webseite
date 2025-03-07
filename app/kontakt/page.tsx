"use client"

import type React from "react"
import { motion } from "framer-motion"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Instagram, Twitter, Youtube, Mail, MapPin, Phone } from "lucide-react"

export default function KontaktPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simuliere API-Anfrage
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormState({ name: "", email: "", message: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="flex flex-col gap-16 pt-24 md:pt-32">
      <section className="container mx-auto px-4">
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="gradient-text-animated">Kontakt</span>
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <p className="text-lg text-gray-400">
              Hast du Fragen, Booking-Anfragen oder möchtest du einfach in Kontakt treten? Fülle das Formular aus oder
              nutze einen der anderen Kontaktwege.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="bg-primary/20 p-3 rounded-full">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-gray-400">kontakt@psyforce-music.de</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-primary/20 p-3 rounded-full">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Telefon</h3>
                  <p className="text-gray-400">+49 123 456789</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-primary/20 p-3 rounded-full">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Standort</h3>
                  <p className="text-gray-400">Berlin, Deutschland</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Social Media</h3>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="bg-zinc-900 p-3 rounded-full hover:bg-primary/20 hover:text-primary transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="bg-zinc-900 p-3 rounded-full hover:bg-primary/20 hover:text-primary transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="bg-zinc-900 p-3 rounded-full hover:bg-primary/20 hover:text-primary transition-colors"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900/50 p-6 rounded-xl border border-white/10">
            {isSubmitted ? (
              <div className="text-center py-8 space-y-4">
                <h3 className="text-xl font-bold">Nachricht gesendet!</h3>
                <p className="text-gray-400">
                  Vielen Dank für deine Nachricht. Ich werde mich so schnell wie möglich bei dir melden.
                </p>
                <Button onClick={() => setIsSubmitted(false)}>Neue Nachricht</Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="bg-zinc-800/50 border-white/10"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="bg-zinc-800/50 border-white/10"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block mb-2 text-sm font-medium">
                    Nachricht
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="bg-zinc-800/50 border-white/10"
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Wird gesendet..." : "Nachricht senden"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

