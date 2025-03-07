"use client"

import { Button } from "@/components/ui/button"
import { PlayCircle, Calendar, ArrowRight, ChevronDown, Headphones, ExternalLink } from "lucide-react"
import Link from "next/link"
import { YouTubeTabs } from "@/components/youtube-tabs"
import { TwitchStatus } from "@/components/twitch-status"
import { SocialFeed } from "@/components/social-feed"
import { motion } from "framer-motion"
import { useEffect, useState, useRef } from "react"

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  return (
    <div className="flex flex-col gap-20 pt-16 relative">
      {/* Grid background */}
      <div className="fixed inset-0 grid-bg opacity-20 pointer-events-none"></div>

      {/* Noise overlay */}
      <div className="fixed inset-0 bg-noise opacity-5 pointer-events-none"></div>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent opacity-70"
          style={{
            transform: `translate(${mousePosition.x / 50}px, ${mousePosition.y / 50}px)`,
            transition: "transform 0.2s ease-out",
          }}
        ></div>

        <div
          className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl"
          style={{
            transform: `translate(${mousePosition.x / 100}px, ${mousePosition.y / 100}px)`,
            transition: "transform 0.3s ease-out",
          }}
        ></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="grid md:grid-cols-2 gap-12 items-center"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div className="space-y-8" variants={fadeInUp}>
              <div>
                <motion.h2
                  className="text-primary font-medium mb-2 tracking-wider"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  DEUTSCHER RAPPER
                </motion.h2>
                <motion.h1
                  className="text-5xl md:text-7xl font-bold leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <span className="gradient-text-animated">Deutscher Rap</span>
                  <br />
                  <span className="relative">
                    mit Attitude
                    <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></span>
                  </span>
                </motion.h1>
              </div>
              <motion.p
                className="text-xl text-gray-300 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Authentischer Sound, ehrliche Texte, pure Energie. PsYforcE bringt den echten Straßen-Rap zurück.
              </motion.p>
              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <Button size="lg" className="gradient-button text-black font-medium">
                  <PlayCircle className="mr-2 h-5 w-5" />
                  Jetzt hören
                </Button>
                <Button variant="outline" size="lg" className="border-white/20 hover:bg-white/5 backdrop-blur-sm">
                  <Calendar className="mr-2 h-5 w-5" />
                  Tourdaten
                </Button>
              </motion.div>
            </motion.div>
            <motion.div className="relative aspect-square card-3d" variants={fadeInUp}>
              <div className="card-3d-inner">
                <div className="absolute inset-0 rounded-2xl overflow-hidden card-3d-front">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/5 rounded-2xl"></div>
                  <img
                    src="/placeholder.svg?height=600&width=600"
                    alt="PsYforcE"
                    className="rounded-2xl object-cover w-full h-full transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>
              </div>
              <div className="absolute -bottom-5 -right-5 w-32 h-32 bg-primary/20 rounded-full blur-2xl"></div>

              {/* Floating music platforms */}
              <motion.div
                className="absolute -right-4 top-1/4 glass-card p-2 rounded-full shadow-lg"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                <Headphones className="h-6 w-6 text-primary" />
              </motion.div>

              <motion.div
                className="absolute -left-4 top-2/3 glass-card p-2 rounded-full shadow-lg"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
              >
                <PlayCircle className="h-6 w-6 text-secondary" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <ChevronDown className="h-8 w-8 text-white/50" />
        </motion.div>
      </section>

      {/* Kurzbiografie */}
      <motion.section
        className="container mx-auto px-4 relative"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-64 bg-gradient-radial from-primary/5 via-secondary/5 to-transparent rounded-full blur-3xl -z-10"></div>
        <div className="max-w-4xl mx-auto text-center space-y-8 relative">
          <h2 className="text-3xl font-bold inline-block relative">
            <span className="gradient-text-animated">Über PsYforcE</span>
            <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></span>
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            PsYforcE ist ein aufstrebender deutscher Rapper, der mit authentischen Texten und einzigartigem Sound die
            deutsche Rap-Szene aufmischt. Seine Musik zeichnet sich durch tiefgründige Texte, kraftvolle Beats und eine
            unverkennbare Stimme aus. Er bewegt sich zwischen klassischem Boom-Bap, modernem Trap und experimentellen
            Sounds, ohne sich in eine Schublade stecken zu lassen.
          </p>
          <Link
            href="/ueber-mich"
            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors group relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center">
              Mehr erfahren
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300"></span>
          </Link>
        </div>
      </motion.section>

      {/* Releases Section */}
      <motion.section
        className="container mx-auto px-4 relative"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute top-1/2 left-1/4 w-1/2 h-1/2 bg-gradient-radial from-primary/5 via-transparent to-transparent rounded-full blur-3xl -z-10"></div>

        <h2 className="text-3xl font-bold mb-2 inline-block relative">
          <span className="gradient-text-animated">Releases</span>
          <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-transparent"></span>
        </h2>
        <p className="text-gray-400 mb-8 max-w-2xl">
          Entdecke meine neuesten Tracks auf Spotify und höre dir meine älteren Werke auf SoundCloud an.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Aktuelle Releases - Spotify */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold flex items-center">
              <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
              Aktuelle Releases
            </h3>
            <div className="rotating-border hover-glow transition-all">
              <iframe
                src="https://open.spotify.com/embed/artist/3OxihRgIlROp3Gkjzscatv?utm_source=generator&theme=0"
                width="100%"
                height="400"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded-lg"
                style={{
                  borderRadius: "12px",
                  maxWidth: "100%",
                }}
              ></iframe>
            </div>
          </motion.div>

          {/* Ältere Releases - SoundCloud */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-xl font-bold flex items-center">
              <span className="w-2 h-2 bg-secondary rounded-full mr-2"></span>
              Ältere Releases
            </h3>
            <div className="rotating-border hover-glow transition-all">
              <iframe
                width="100%"
                height="400"
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
          </motion.div>
        </div>
      </motion.section>

      {/* Videos & Live Streaming Section */}
      <motion.section
        id="videos"
        className="container mx-auto px-4 relative"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute top-1/2 right-1/4 w-1/2 h-1/2 bg-gradient-radial from-secondary/5 via-transparent to-transparent rounded-full blur-3xl -z-10"></div>

        <h2 className="text-3xl font-bold mb-2 inline-block relative">
          <span className="gradient-text-animated">Videos & Live Streaming</span>
          <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-transparent"></span>
        </h2>
        <p className="text-gray-400 mb-8 max-w-2xl">
          Schau dir meine neuesten Videos an und verfolge meine Live-Streams auf Twitch.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* YouTube Tabs */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold flex items-center">
              <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
              YouTube
            </h3>
            <div className="glass-card-premium p-4 hover-glow transition-all">
              <YouTubeTabs
                channels={[
                  {
                    id: "PsYforcEMusic",
                    name: "PsYforcE Music",
                    url: "https://www.youtube.com/@PsYforcEMusic",
                    videos: [
                      {
                        id: "music-1",
                        title: "PsYforcE - Musikvideo 1",
                        url: "https://www.youtube.com/watch?v=KtTmBXFddlY",
                      },
                      {
                        id: "music-2",
                        title: "PsYforcE - Musikvideo 2",
                        url: "https://www.youtube.com/watch?v=DWkAGC77GuI",
                      },
                    ],
                  },
                  {
                    id: "PsYforcEGaming",
                    name: "PsYforcE Gaming",
                    url: "https://www.youtube.com/@PsYforcEone",
                    videos: [
                      {
                        id: "gaming-1",
                        title: "PsYforcE Gaming - Video 1",
                        url: "https://www.youtube.com/watch?v=n7yGv3vB_UM",
                      },
                      {
                        id: "gaming-2",
                        title: "PsYforcE Gaming - Video 2",
                        url: "https://www.youtube.com/watch?v=T7RZgAEFzwo",
                      },
                    ],
                  },
                ]}
              />
            </div>
          </motion.div>

          {/* Twitch */}
          <motion.div
            id="live"
            className="space-y-4"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-xl font-bold flex items-center">
              <span className="w-2 h-2 bg-secondary rounded-full mr-2"></span>
              Live Streaming
            </h3>
            <div className="glass-card-premium p-4 h-[450px] hover-glow transition-all">
              <TwitchStatus username="psyforceone" />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Social Media Feed Section */}
      <motion.section
        className="container mx-auto px-4 relative"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-64 bg-gradient-radial from-primary/5 via-secondary/5 to-transparent rounded-full blur-3xl -z-10"></div>

        <h2 className="text-3xl font-bold mb-2 inline-block relative">
          <span className="gradient-text-animated">Social Media</span>
          <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-transparent"></span>
        </h2>
        <p className="text-gray-400 mb-8 max-w-2xl">
          Bleibe auf dem Laufenden mit meinen neuesten Posts auf Social Media.
        </p>

        <div className="glass-card-premium p-6 rounded-xl">
          <SocialFeed />
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        className="container mx-auto px-4 py-20 relative"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent -z-10"></div>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          {[
            { value: "500K+", label: "Monatliche Hörer" },
            { value: "50+", label: "Konzerte" },
            { value: "10+", label: "Jahre Erfahrung" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="glass-card-premium p-8 hover-glow transition-all"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 * index }}
            >
              <h3 className="text-5xl font-bold gradient-text-animated neon-glow">{stat.value}</h3>
              <div className="w-12 h-1 bg-gradient-to-r from-primary via-secondary to-accent mx-auto my-4"></div>
              <p className="text-gray-300">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        className="container mx-auto px-4 py-16 relative"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="glass-card-premium p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 animate-gradient-x"></div>
          <motion.h2
            className="text-4xl font-bold mb-6 gradient-text-animated"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Folge mir auf Social Media
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Bleibe auf dem Laufenden über neue Releases, Tour-Daten und exklusive Inhalte.
          </motion.p>
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button size="lg" className="gradient-button">
              <ExternalLink className="mr-2 h-5 w-5" />
              Instagram
            </Button>
            <Button size="lg" className="gradient-button">
              <ExternalLink className="mr-2 h-5 w-5" />
              YouTube
            </Button>
            <Button size="lg" className="gradient-button">
              <ExternalLink className="mr-2 h-5 w-5" />
              Spotify
            </Button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}

