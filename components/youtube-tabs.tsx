"use client"

import * as React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ExternalLink, Play } from "lucide-react"
import { motion } from "framer-motion"

interface Video {
  id: string
  title: string
  url: string
}

interface Channel {
  id: string
  name: string
  url: string
  videos: Video[]
}

interface YouTubeTabsProps {
  channels: Channel[]
}

export function YouTubeTabs({ channels }: YouTubeTabsProps) {
  const [activeChannel, setActiveChannel] = React.useState(channels[0].id)

  // Extrahiere die Video-ID aus einer YouTube-URL
  const getVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
  }

  return (
    <Tabs defaultValue={channels[0].id} onValueChange={setActiveChannel}>
      <TabsList className="w-full grid grid-cols-2 mb-4 bg-black/50 backdrop-blur-sm border border-white/10">
        {channels.map((channel) => (
          <TabsTrigger
            key={channel.id}
            value={channel.id}
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/20 data-[state=active]:to-secondary/20 data-[state=active]:text-white"
          >
            {channel.name}
          </TabsTrigger>
        ))}
      </TabsList>

      {channels.map((channel) => {
        const featuredVideoId = getVideoId(channel.videos[0].url)

        return (
          <TabsContent key={channel.id} value={channel.id} className="space-y-4">
            {/* Hauptvideo */}
            <div className="space-y-2">
              <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg glass-card-premium">
                <iframe
                  src={`https://www.youtube.com/embed/${featuredVideoId}`}
                  title={channel.videos[0].title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                ></iframe>
              </div>
              <h4 className="font-medium gradient-text">{channel.videos[0].title}</h4>
            </div>

            {/* Weitere Videos */}
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              {channel.videos.slice(1).map((video, index) => {
                const videoId = getVideoId(video.url)

                return (
                  <motion.a
                    key={video.id}
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex gap-4 glass-card p-2 hover-glow transition-all"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <div className="relative w-32 h-20 flex-shrink-0 overflow-hidden rounded-md">
                      <img
                        src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
                        alt={video.title}
                        className="w-full h-full object-cover rounded-md transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Play className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                        {video.title}
                      </h4>
                      <p className="text-xs text-gray-400 mt-1">{channel.name}</p>
                    </div>
                  </motion.a>
                )
              })}
            </div>

            {/* Link zum Kanal */}
            <div className="text-center mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(channel.url, "_blank")}
                className="border-white/10 hover:bg-gradient-to-r hover:from-primary/20 hover:to-secondary/20 transition-all"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Alle Videos auf YouTube ansehen
              </Button>
            </div>
          </TabsContent>
        )
      })}
    </Tabs>
  )
}

