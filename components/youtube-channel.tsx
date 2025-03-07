"use client"

import * as React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

interface Channel {
  id: string
  name: string
  url: string
}

interface YouTubeTabsProps {
  channels: Channel[]
}

export function YouTubeChannel({ channels }: YouTubeTabsProps) {
  const [activeChannel, setActiveChannel] = React.useState(channels[0].id)

  return (
    <Tabs defaultValue={channels[0].id} onValueChange={setActiveChannel}>
      <TabsList className="w-full grid grid-cols-2 mb-4">
        {channels.map((channel) => (
          <TabsTrigger key={channel.id} value={channel.id}>
            {channel.name}
          </TabsTrigger>
        ))}
      </TabsList>

      {channels.map((channel) => (
        <TabsContent key={channel.id} value={channel.id} className="space-y-4">
          <div className="bg-zinc-800/50 rounded-lg p-6 text-center">
            <img
              src="/placeholder.svg?height=120&width=120"
              alt={`${channel.name} Logo`}
              className="w-20 h-20 mx-auto mb-4 rounded-full"
            />
            <h3 className="text-xl font-bold mb-2">{channel.name}</h3>
            <p className="text-gray-400 mb-6">
              {channel.id === "PsYforcEone"
                ? "Mein Hauptkanal mit Vlogs, Behind-the-Scenes und mehr"
                : "Offizieller Musikkanal mit allen Releases und Musikvideos"}
            </p>
            <Button onClick={() => window.open(channel.url, "_blank")} className="bg-red-600 hover:bg-red-700">
              <ExternalLink className="mr-2 h-4 w-4" />
              Auf YouTube ansehen
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <div key={i} className="bg-zinc-800/30 rounded-lg overflow-hidden group">
                <div className="relative pb-[56.25%]">
                  <img
                    src="/placeholder.svg?height=720&width=1280"
                    alt={`Video ${i}`}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                <div className="p-3">
                  <h4 className="font-medium text-sm line-clamp-2">
                    {channel.id === "PsYforcEone"
                      ? `Vlog #${i} - Behind the Scenes`
                      : `Neues Musikvideo ${i} - PsYforcE`}
                  </h4>
                  <p className="text-xs text-gray-400">Vor {i} Wochen</p>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}

