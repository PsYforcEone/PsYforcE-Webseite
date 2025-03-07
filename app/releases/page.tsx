"use client"

import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import { motion } from "framer-motion"

export default function ReleasesPage() {
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
          <span className="gradient-text-animated">Musik</span>
        </motion.h1>

        <div className="space-y-16">
          {/* Spotify Section */}
          <motion.div className="space-y-6" initial="hidden" animate="visible" variants={fadeInUp}>
            <h2 className="text-3xl font-bold">Aktuelle Releases auf Spotify</h2>
            <p className="text-gray-400 max-w-3xl">
              Höre meine neuesten Tracks und Alben direkt auf Spotify. Folge mir, um keine neuen Releases zu verpassen.
            </p>

            <div className="bg-zinc-900/50 border border-white/10 rounded-xl p-6">
              <iframe
                src="https://open.spotify.com/embed/artist/3OxihRgIlROp3Gkjzscatv?utm_source=generator&theme=0"
                width="100%"
                height="352"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded-lg"
                style={{
                  borderRadius: "12px",
                  maxWidth: "100%",
                }}
              ></iframe>
            </div>

            <div className="flex justify-center">
              <Button
                variant="outline"
                size="lg"
                className="mt-4"
                onClick={() => window.open("https://open.spotify.com/intl-de/artist/3OxihRgIlROp3Gkjzscatv", "_blank")}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Auf Spotify öffnen
              </Button>
            </div>
          </motion.div>

          {/* SoundCloud Section */}
          <motion.div className="space-y-6" initial="hidden" animate="visible" variants={fadeInUp}>
            <h2 className="text-3xl font-bold">Ältere Releases auf SoundCloud</h2>
            <p className="text-gray-400 max-w-3xl">
              Entdecke meine früheren Werke und exklusive Tracks auf SoundCloud. Hier findest du auch Remixe und
              Freestyles.
            </p>

            <div className="bg-zinc-900/50 border border-white/10 rounded-xl p-6">
              <iframe
                width="100%"
                height="450"
                scrolling="no"
                allow="autoplay"
                src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/psyforce&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"
                className="rounded-lg"
                style={{
                  borderRadius: "12px",
                  maxWidth: "100%",
                }}
              ></iframe>
            </div>

            <div className="flex justify-center">
              <Button
                variant="outline"
                size="lg"
                className="mt-4"
                onClick={() => window.open("https://soundcloud.com/psyforce", "_blank")}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Auf SoundCloud öffnen
              </Button>
            </div>
          </motion.div>

          {/* Streaming Platforms */}
          <motion.div className="space-y-6" initial="hidden" animate="visible" variants={fadeInUp}>
            <h2 className="text-3xl font-bold">Auf allen Plattformen verfügbar</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: "Spotify", logo: "/placeholder.svg?height=80&width=80" },
                { name: "Apple Music", logo: "/placeholder.svg?height=80&width=80" },
                { name: "YouTube Music", logo: "/placeholder.svg?height=80&width=80" },
                { name: "Amazon Music", logo: "/placeholder.svg?height=80&width=80" },
                { name: "Deezer", logo: "/placeholder.svg?height=80&width=80" },
                { name: "SoundCloud", logo: "/placeholder.svg?height=80&width=80" },
                { name: "Tidal", logo: "/placeholder.svg?height=80&width=80" },
                { name: "TikTok", logo: "/placeholder.svg?height=80&width=80" },
              ].map((platform) => (
                <div
                  key={platform.name}
                  className="bg-zinc-900/30 p-6 rounded-xl flex flex-col items-center justify-center text-center hover:bg-zinc-800/50 transition-colors"
                >
                  <img
                    src={platform.logo || "/placeholder.svg"}
                    alt={platform.name}
                    className="w-12 h-12 mb-3 opacity-70"
                  />
                  <span className="text-sm font-medium">{platform.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

