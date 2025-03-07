"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ExternalLink, Radio, Tv } from "lucide-react"
import { motion } from "framer-motion"
import { TwitchStatus } from "@/components/twitch-status"

export default function LivePage() {
  const router = useRouter()
  useEffect(() => {
    router.replace("/#live")
  }, [router])

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
          <span className="gradient-text-animated">Live Streaming</span>
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Twitch Section */}
          <motion.div className="space-y-6" initial="hidden" animate="visible" variants={fadeInUp}>
            <h2 className="text-3xl font-bold flex items-center">
              <Tv className="mr-3 h-6 w-6 text-primary" />
              Twitch Stream
            </h2>
            <p className="text-gray-400">
              Verfolge meine regelmäßigen Live-Streams auf Twitch. Hier kannst du mich beim Gaming, bei Studio-Sessions
              oder einfach beim Chillen erleben.
            </p>

            <div className="glass-card-premium p-6 h-[500px]">
              <TwitchStatus username="psyforceone" />
            </div>

            <div className="flex justify-center">
              <Button
                size="lg"
                className="gradient-button"
                onClick={() => window.open("https://www.twitch.tv/psyforceone", "_blank")}
              >
                <ExternalLink className="mr-2 h-5 w-5" />
                Twitch Kanal besuchen
              </Button>
            </div>
          </motion.div>

          {/* Schedule Section */}
          <motion.div className="space-y-6" initial="hidden" animate="visible" variants={fadeInUp}>
            <h2 className="text-3xl font-bold flex items-center">
              <Radio className="mr-3 h-6 w-6 text-primary" />
              Stream Schedule
            </h2>
            <p className="text-gray-400">
              Hier findest du meinen aktuellen Streaming-Plan. Folge mir auf Twitch, um keine Benachrichtigung zu
              verpassen.
            </p>

            <div className="glass-card-premium p-6 space-y-4">
              {[
                { day: "Montag", time: "20:00 - 22:00", title: "Gaming Session" },
                { day: "Mittwoch", time: "19:00 - 21:00", title: "Studio Session / Musik" },
                { day: "Freitag", time: "21:00 - 23:00", title: "Freestyle Friday" },
                { day: "Sonntag", time: "18:00 - 20:00", title: "Q&A und Chill" },
              ].map((stream, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-4 bg-black/30 rounded-lg hover:bg-black/50 transition-colors"
                >
                  <div>
                    <h3 className="font-bold">{stream.day}</h3>
                    <p className="text-sm text-gray-400">{stream.title}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-primary font-medium">{stream.time}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="glass-card-premium p-6 mt-8">
              <h3 className="text-xl font-bold mb-4">Special Events</h3>
              <div className="space-y-4">
                {[
                  { date: "15.04.2023", title: "Album Release Stream", time: "20:00 - 23:00" },
                  { date: "30.05.2023", title: "Collab mit DJ XYZ", time: "21:00 - 00:00" },
                ].map((event, index) => (
                  <div
                    key={index}
                    className="p-4 border border-primary/30 rounded-lg bg-gradient-to-r from-primary/10 to-transparent"
                  >
                    <div className="flex justify-between">
                      <h4 className="font-bold">{event.title}</h4>
                      <span className="text-primary">{event.date}</span>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">{event.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

