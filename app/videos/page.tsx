"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ExternalLink, Play } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

export default function VideosPage() {
  const router = useRouter()
  const [activeCategory, setActiveCategory] = useState("all")

  useEffect(() => {
    router.replace("/#videos")
  }, [router])

  const categories = [
    { id: "all", name: "Alle Videos" },
    { id: "music", name: "Musikvideos" },
    { id: "live", name: "Live-Auftritte" },
    { id: "behind", name: "Behind the Scenes" },
  ]

  const videos = [
    {
      id: 1,
      title: "PsYforcE - Musikvideo 1",
      thumbnail: "/placeholder.svg?height=720&width=1280",
      category: "music",
      date: "15.03.2023",
      views: "125K",
      url: "https://www.youtube.com/watch?v=KtTmBXFddlY",
    },
    {
      id: 2,
      title: "PsYforcE - Musikvideo 2",
      thumbnail: "/placeholder.svg?height=720&width=1280",
      category: "music",
      date: "02.05.2023",
      views: "98K",
      url: "https://www.youtube.com/watch?v=DWkAGC77GuI",
    },
    {
      id: 3,
      title: "Live-Auftritt Festival 2023",
      thumbnail: "/placeholder.svg?height=720&width=1280",
      category: "live",
      date: "22.07.2023",
      views: "45K",
      url: "https://www.youtube.com/watch?v=n7yGv3vB_UM",
    },
    {
      id: 4,
      title: "Studio Session - Making of Album",
      thumbnail: "/placeholder.svg?height=720&width=1280",
      category: "behind",
      date: "10.09.2023",
      views: "32K",
      url: "https://www.youtube.com/watch?v=T7RZgAEFzwo",
    },
    {
      id: 5,
      title: "PsYforcE - Musikvideo 3",
      thumbnail: "/placeholder.svg?height=720&width=1280",
      category: "music",
      date: "05.11.2023",
      views: "112K",
      url: "https://www.youtube.com/watch?v=KtTmBXFddlY",
    },
    {
      id: 6,
      title: "Tour Vlog 2023",
      thumbnail: "/placeholder.svg?height=720&width=1280",
      category: "behind",
      date: "20.12.2023",
      views: "28K",
      url: "https://www.youtube.com/watch?v=DWkAGC77GuI",
    },
  ]

  const filteredVideos = activeCategory === "all" ? videos : videos.filter((video) => video.category === activeCategory)

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
          <span className="gradient-text-animated">Videos</span>
        </motion.h1>

        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category.id
                    ? "bg-gradient-to-r from-primary to-secondary text-black"
                    : "bg-zinc-900/50 hover:bg-zinc-800/70"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {filteredVideos.map((video, index) => (
            <motion.div
              key={video.id}
              className="group glass-card-premium overflow-hidden rounded-xl"
              variants={fadeInUp}
            >
              <div className="relative">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={video.thumbnail || "/placeholder.svg"}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button
                    size="icon"
                    className="rounded-full w-16 h-16 gradient-button"
                    onClick={() => window.open(video.url, "_blank")}
                  >
                    <Play className="h-8 w-8 text-black" />
                  </Button>
                </div>
                <div className="absolute top-2 right-2 bg-black/70 text-xs px-2 py-1 rounded">{video.views} Views</div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                  {video.title}
                </h3>
                <p className="text-sm text-gray-400">{video.date}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Button
            size="lg"
            variant="outline"
            className="border-white/10 hover:bg-white/5"
            onClick={() => window.open("https://www.youtube.com/@PsYforcEMusic", "_blank")}
          >
            <ExternalLink className="mr-2 h-5 w-5" />
            Alle Videos auf YouTube ansehen
          </Button>
        </motion.div>
      </section>
    </div>
  )
}

