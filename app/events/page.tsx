"use client"

import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Clock, Ticket, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"

export default function EventsPage() {
  const events = [
    {
      id: 1,
      title: "PsYforcE Live in Berlin",
      date: "15.04.2023",
      time: "20:00 Uhr",
      location: "Club XYZ, Berlin",
      image: "/placeholder.svg?height=600&width=1200",
      ticketLink: "#",
      isSoldOut: false,
    },
    {
      id: 2,
      title: "Album Release Party",
      date: "30.05.2023",
      time: "21:00 Uhr",
      location: "Music Hall, Hamburg",
      image: "/placeholder.svg?height=600&width=1200",
      ticketLink: "#",
      isSoldOut: false,
    },
    {
      id: 3,
      title: "Festival Auftritt",
      date: "22.07.2023",
      time: "18:30 Uhr",
      location: "Open Air Gelände, München",
      image: "/placeholder.svg?height=600&width=1200",
      ticketLink: "#",
      isSoldOut: true,
    },
    {
      id: 4,
      title: "Club Tour 2023",
      date: "15.09.2023",
      time: "20:00 Uhr",
      location: "Musik Bunker, Köln",
      image: "/placeholder.svg?height=600&width=1200",
      ticketLink: "#",
      isSoldOut: false,
    },
  ]

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
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
          <span className="gradient-text-animated">Events & Tour</span>
        </motion.h1>

        <motion.p
          className="text-xl text-gray-400 mb-12 max-w-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Erlebe PsYforcE live auf der Bühne! Hier findest du alle kommenden Konzerte, Festival-Auftritte und Events.
        </motion.p>

        <motion.div
          className="space-y-12"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          {events.map((event) => (
            <motion.div key={event.id} className="glass-card-premium overflow-hidden rounded-xl" variants={fadeInUp}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative overflow-hidden">
                  <img
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  {event.isSoldOut && (
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                      <span className="text-white font-bold text-2xl transform rotate-12 border-2 border-white px-6 py-2">
                        AUSVERKAUFT
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col">
                  <h2 className="text-2xl font-bold mb-4 gradient-text">{event.title}</h2>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-primary mr-3" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-primary mr-3" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-primary mr-3" />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  <div className="mt-auto">
                    <Button
                      className={`w-full ${event.isSoldOut ? "bg-zinc-700" : "gradient-button"}`}
                      disabled={event.isSoldOut}
                    >
                      {event.isSoldOut ? (
                        <span>Ausverkauft</span>
                      ) : (
                        <>
                          <Ticket className="mr-2 h-5 w-5" />
                          Tickets kaufen
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-gray-400 mb-4">
            Weitere Tour-Daten werden in Kürze bekannt gegeben. Folge mir auf Social Media, um keine Updates zu
            verpassen.
          </p>
          <Button variant="outline" size="lg" className="border-white/10 hover:bg-white/5">
            <ExternalLink className="mr-2 h-5 w-5" />
            Alle Tickets auf Eventim
          </Button>
        </motion.div>
      </section>
    </div>
  )
}

