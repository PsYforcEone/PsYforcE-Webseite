"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { ExternalLink, Tv } from "lucide-react"
import { motion } from "framer-motion"

interface TwitchStatusProps {
  username: string
}

export function TwitchStatus({ username }: TwitchStatusProps) {
  const [isLive, setIsLive] = React.useState<boolean | null>(null)
  const [streamInfo, setStreamInfo] = React.useState<any>(null)
  const [isLoading, setIsLoading] = React.useState(true)

  // In einer echten Anwendung würde hier die Twitch API verwendet werden
  // Für diese Demo simulieren wir den Status
  React.useEffect(() => {
    const checkStatus = () => {
      setIsLoading(true)

      // Zufällig live oder offline für Demo-Zwecke
      const randomLive = Math.random() > 0.5
      setIsLive(randomLive)

      if (randomLive) {
        setStreamInfo({
          title: "PsYforcE Live Stream - Neue Musik & Gaming",
          game: "Just Chatting",
          viewers: Math.floor(Math.random() * 100) + 20,
          thumbnail: "/placeholder.svg?height=720&width=1280",
        })
      } else {
        setStreamInfo({
          lastStream: "Vor 2 Tagen",
          nextStream: "Morgen um 20:00 Uhr",
          thumbnail: "/placeholder.svg?height=720&width=1280",
        })
      }

      setIsLoading(false)
    }

    checkStatus()

    // Aktualisiere den Status alle 60 Sekunden (nur für Demo-Zwecke)
    const interval = setInterval(checkStatus, 60000)
    return () => clearInterval(interval)
  }, [username])

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      {isLive ? (
        // Live Stream Ansicht
        <motion.div
          className="flex-1 flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg mb-4">
            <img
              src={streamInfo.thumbnail || "/placeholder.svg"}
              alt="Live Stream Vorschau"
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
            <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded flex items-center">
              <span className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></span>
              LIVE
            </div>
            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
              {streamInfo.viewers} Zuschauer
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black&#x2F;60 via-transparent to-transparent"></div>
          </div>

          <motion.h3
            className="font-bold text-lg line-clamp-1 gradient-text"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            {streamInfo.title}
          </motion.h3>
          <motion.p
            className="text-sm text-gray-400 mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            {streamInfo.game}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            className="mt-auto"
          >
            <Button
              className="w-full gradient-button"
              onClick={() => window.open(`https://www.twitch.tv/${username}`, "_blank")}
            >
              <Tv className="mr-2 h-4 w-4" />
              Jetzt Live ansehen
            </Button>
          </motion.div>
        </motion.div>
      ) : (
        // Offline Ansicht
        <motion.div
          className="flex-1 flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg mb-4 bg-zinc-800">
            <img
              src={streamInfo.thumbnail || "/placeholder.svg"}
              alt="Kanal Vorschau"
              className="absolute top-0 left-0 w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center glass-card px-6 py-4 rounded-lg">
                <h3 className="font-bold text-lg mb-1 gradient-text">Gerade offline</h3>
                <p className="text-sm text-gray-400">Letzter Stream: {streamInfo.lastStream}</p>
              </div>
            </div>
          </div>

          <motion.p
            className="text-sm mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <span className="text-gray-400">Nächster geplanter Stream:</span>
            <br />
            <span className="font-medium gradient-text">{streamInfo.nextStream}</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className="mt-auto"
          >
            <Button
              variant="outline"
              className="w-full border-white/10 hover:bg-gradient-to-r hover:from-primary/20 hover:to-secondary/20 transition-all"
              onClick={() => window.open(`https://www.twitch.tv/${username}`, "_blank")}
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Kanal besuchen
            </Button>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

