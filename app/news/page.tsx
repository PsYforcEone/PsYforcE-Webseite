"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, User, Tag } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useState } from "react"

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState("all")

  const categories = [
    { id: "all", name: "Alle News" },
    { id: "releases", name: "Releases" },
    { id: "events", name: "Events" },
    { id: "media", name: "Media" },
  ]

  const newsItems = [
    {
      id: 1,
      title: "Neues Album 'Psyforce One' erscheint am 15. Juni",
      excerpt:
        "Nach langer Arbeit im Studio freue ich mich, euch mein neues Album 'Psyforce One' präsentieren zu können. Es enthält 12 brandneue Tracks mit spannenden Features.",
      image: "/placeholder.svg?height=600&width=1200",
      date: "05.03.2023",
      author: "PsYforcE",
      category: "releases",
      tags: ["Album", "Release", "Musik"],
    },
    {
      id: 2,
      title: "Deutschland-Tour 2023 angekündigt",
      excerpt:
        "Diesen Herbst gehe ich auf große Deutschland-Tour! Tickets sind ab sofort im Vorverkauf erhältlich. Ich kann es kaum erwarten, euch alle live zu sehen!",
      image: "/placeholder.svg?height=600&width=1200",
      date: "20.04.2023",
      author: "PsYforcE",
      category: "events",
      tags: ["Tour", "Konzerte", "Live"],
    },
    {
      id: 3,
      title: "Neues Musikvideo zu 'Nachtflug' jetzt online",
      excerpt:
        "Das offizielle Musikvideo zu meiner neuen Single 'Nachtflug' ist jetzt auf YouTube verfügbar. Gedreht haben wir in den Straßen von Berlin bei Nacht.",
      image: "/placeholder.svg?height=600&width=1200",
      date: "15.05.2023",
      author: "PsYforcE",
      category: "media",
      tags: ["Video", "Single", "YouTube"],
    },
    {
      id: 4,
      title: "Interview im Hip-Hop Magazin",
      excerpt:
        "Im aktuellen Hip-Hop Magazin findet ihr ein ausführliches Interview mit mir über meinen musikalischen Werdegang, Einflüsse und zukünftige Projekte.",
      image: "/placeholder.svg?height=600&width=1200",
      date: "02.06.2023",
      author: "Hip-Hop Magazin",
      category: "media",
      tags: ["Interview", "Magazin", "Presse"],
    },
    {
      id: 5,
      title: "Neue Merchandise-Kollektion im Shop",
      excerpt:
        "Ab sofort ist meine neue Merchandise-Kollektion im Shop erhältlich. Von T-Shirts über Hoodies bis hin zu limitierten Accessoires ist alles dabei.",
      image: "/placeholder.svg?height=600&width=1200",
      date: "10.07.2023",
      author: "PsYforcE Team",
      category: "releases",
      tags: ["Merch", "Shop", "Fashion"],
    },
    {
      id: 6,
      title: "Festival-Auftritte im Sommer 2023",
      excerpt:
        "Ich freue mich, euch mitteilen zu können, dass ich diesen Sommer auf mehreren großen Festivals in Deutschland auftreten werde. Alle Termine findet ihr hier.",
      image: "/placeholder.svg?height=600&width=1200",
      date: "25.07.2023",
      author: "PsYforcE",
      category: "events",
      tags: ["Festival", "Sommer", "Live"],
    },
  ]

  const filteredNews =
    activeCategory === "all" ? newsItems : newsItems.filter((item) => item.category === activeCategory)

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
          <span className="gradient-text-animated">News</span>
        </motion.h1>

        <motion.div
          className="mb-12"
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((newsItem, index) => (
            <motion.article
              key={newsItem.id}
              className="glass-card-premium overflow-hidden rounded-xl flex flex-col h-full"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, delay: index * 0.1 },
                },
              }}
            >
              <div className="relative">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={newsItem.image || "/placeholder.svg"}
                    alt={newsItem.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-2 right-2 bg-black/70 text-xs px-2 py-1 rounded-full flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  {newsItem.date}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center text-xs text-gray-400 mb-3">
                  <span className="flex items-center">
                    <User className="h-3 w-3 mr-1" />
                    {newsItem.author}
                  </span>
                  <span className="mx-2">•</span>
                  <span className="px-2 py-1 bg-primary/20 text-primary rounded-full">{newsItem.category}</span>
                </div>

                <h2 className="text-xl font-bold mb-3 line-clamp-2 hover:text-primary transition-colors">
                  {newsItem.title}
                </h2>

                <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-1">{newsItem.excerpt}</p>

                <div className="mt-auto">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {newsItem.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-1 bg-zinc-800 rounded-full flex items-center">
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/news/${newsItem.id}`}
                    className="inline-flex items-center text-primary hover:text-primary/80 transition-colors group"
                  >
                    Weiterlesen
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Button size="lg" variant="outline" className="border-white/10 hover:bg-white/5">
            Ältere Beiträge laden
          </Button>
        </motion.div>
      </section>
    </div>
  )
}

