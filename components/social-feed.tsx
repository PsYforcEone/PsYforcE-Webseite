"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Instagram, Twitter, Heart, MessageCircle, Repeat, ExternalLink } from "lucide-react"

interface SocialPost {
  id: string
  platform: "instagram" | "twitter"
  content: string
  image?: string
  date: string
  likes: number
  comments: number
  retweets?: number
  url: string
}

export function SocialFeed() {
  const [activeTab, setActiveTab] = useState<string>("all")
  const [isLoading, setIsLoading] = useState(true)

  // Simulierte Social Media Posts
  const socialPosts: SocialPost[] = [
    {
      id: "insta1",
      platform: "instagram",
      content:
        "Heute im Studio an neuer Musik gearbeitet. Kann es kaum erwarten, euch die neuen Tracks zu präsentieren! 🎵 #NewMusic #Studio #ComingSoon",
      image: "/placeholder.svg?height=600&width=600",
      date: "Vor 2 Tagen",
      likes: 1243,
      comments: 87,
      url: "https://instagram.com",
    },
    {
      id: "twitter1",
      platform: "twitter",
      content:
        "Das Konzert gestern in Berlin war der absolute Wahnsinn! Danke an alle, die dabei waren und die Halle zum Beben gebracht haben! 🔥 #LiveShow #Berlin #ThankYou",
      date: "Vor 5 Tagen",
      likes: 532,
      comments: 48,
      retweets: 126,
      url: "https://twitter.com",
    },
    {
      id: "insta2",
      platform: "instagram",
      content:
        "Behind the scenes vom Videodreh zu 'Nachtflug'. Das wird episch! 📽️ #MusicVideo #BehindTheScenes #Nachtflug",
      image: "/placeholder.svg?height=600&width=600",
      date: "Vor 1 Woche",
      likes: 2156,
      comments: 134,
      url: "https://instagram.com",
    },
    {
      id: "twitter2",
      platform: "twitter",
      content:
        "Tickets für die Herbsttour sind jetzt im Vorverkauf! Sichert euch eure Tickets, bevor sie weg sind! Link in der Bio. 🎫 #Tour2023 #LiveMusic",
      date: "Vor 1 Woche",
      likes: 421,
      comments: 63,
      retweets: 215,
      url: "https://twitter.com",
    },
    {
      id: "insta3",
      platform: "instagram",
      content:
        "Neue Merch-Kollektion ist online! Limitierte Stückzahl, also seid schnell! 👕 #Merch #Fashion #LimitedEdition",
      image: "/placeholder.svg?height=600&width=600",
      date: "Vor 2 Wochen",
      likes: 1876,
      comments: 92,
      url: "https://instagram.com",
    },
    {
      id: "twitter3",
      platform: "twitter",
      content: "Danke für 500K monatliche Hörer auf Spotify! Ihr seid die Besten! ❤️ #ThankYou #Milestone #Spotify",
      date: "Vor 3 Wochen",
      likes: 1024,
      comments: 156,
      retweets: 342,
      url: "https://twitter.com",
    },
  ]

  // Filtern der Posts basierend auf dem aktiven Tab
  const filteredPosts = activeTab === "all" ? socialPosts : socialPosts.filter((post) => post.platform === activeTab)

  // Simuliere Ladezeit
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Formatiere große Zahlen (z.B. 1500 -> 1.5K)
  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K"
    }
    return num.toString()
  }

  return (
    <div className="w-full">
      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <TabsList className="w-full grid grid-cols-3 mb-6 bg-zinc-900/50 p-1 border border-white/10">
          <TabsTrigger
            value="all"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/20 data-[state=active]:to-secondary/20"
          >
            Alle Beiträge
          </TabsTrigger>
          <TabsTrigger
            value="instagram"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/20 data-[state=active]:to-secondary/20"
          >
            <Instagram className="h-4 w-4 mr-2" />
            Instagram
          </TabsTrigger>
          <TabsTrigger
            value="twitter"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/20 data-[state=active]:to-secondary/20"
          >
            <Twitter className="h-4 w-4 mr-2" />
            Twitter
          </TabsTrigger>
        </TabsList>

        <div className="relative min-h-[400px]">
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  className="glass-card-premium rounded-xl overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="p-4 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-black">
                      {post.platform === "instagram" ? (
                        <Instagram className="h-5 w-5" />
                      ) : (
                        <Twitter className="h-5 w-5" />
                      )}
                    </div>
                    <div className="ml-3">
                      <h3 className="font-bold">PsYforcE</h3>
                      <p className="text-xs text-gray-400">{post.date}</p>
                    </div>
                    <div className="ml-auto">
                      {post.platform === "instagram" ? (
                        <Instagram className="h-5 w-5 text-pink-500" />
                      ) : (
                        <Twitter className="h-5 w-5 text-blue-400" />
                      )}
                    </div>
                  </div>

                  {post.image && (
                    <div className="aspect-square">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt="Social Media Post"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div className="p-4">
                    <p className="text-sm mb-4">{post.content}</p>

                    <div className="flex justify-between text-sm text-gray-400">
                      <div className="flex items-center">
                        <button className="flex items-center mr-4 hover:text-primary transition-colors">
                          <Heart className="h-4 w-4 mr-1" />
                          {formatNumber(post.likes)}
                        </button>
                        <button className="flex items-center hover:text-primary transition-colors">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          {formatNumber(post.comments)}
                        </button>
                        {post.retweets !== undefined && (
                          <button className="flex items-center ml-4 hover:text-primary transition-colors">
                            <Repeat className="h-4 w-4 mr-1" />
                            {formatNumber(post.retweets)}
                          </button>
                        )}
                      </div>

                      <a
                        href={post.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </Tabs>

      <div className="mt-8 text-center">
        <Button
          variant="outline"
          className="border-white/10 hover:bg-white/5"
          onClick={() => window.open("https://instagram.com/psyforce", "_blank")}
        >
          <Instagram className="mr-2 h-5 w-5" />
          Folge mir auf Instagram
        </Button>
        <Button
          variant="outline"
          className="border-white/10 hover:bg-white/5 ml-4"
          onClick={() => window.open("https://twitter.com/psyforce", "_blank")}
        >
          <Twitter className="mr-2 h-5 w-5" />
          Folge mir auf Twitter
        </Button>
      </div>
    </div>
  )
}

