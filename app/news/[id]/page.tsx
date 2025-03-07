"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, User, Tag, Share2, Heart } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useState } from "react"

export default function NewsDetailPage({ params }: { params: { id: string } }) {
  const [liked, setLiked] = useState(false)

  // In einer echten Anwendung würden diese Daten von einer API oder Datenbank kommen
  const newsItem = {
    id: params.id,
    title: "Neues Album 'Psyforce One' erscheint am 15. Juni",
    content: `
      <p>Nach langer Arbeit im Studio freue ich mich, euch mein neues Album 'Psyforce One' präsentieren zu können. Es enthält 12 brandneue Tracks mit spannenden Features.</p>
      
      <p>Die letzten Monate waren intensiv. Ich habe mit verschiedenen Produzenten zusammengearbeitet, um einen Sound zu kreieren, der meine künstlerische Entwicklung widerspiegelt, aber dennoch meinen Wurzeln treu bleibt.</p>
      
      <p>Das Album behandelt Themen wie persönliches Wachstum, Herausforderungen im Leben und die Kraft der Musik. Jeder Track erzählt eine eigene Geschichte und zusammen ergeben sie ein Gesamtbild meiner Reise als Künstler.</p>
      
      <h2>Features & Kollaborationen</h2>
      
      <p>Auf 'Psyforce One' könnt ihr euch auf Kollaborationen mit einigen der talentiertesten Künstler der deutschen Rap-Szene freuen. Besonders stolz bin ich auf den Track 'Nachtflug', eine Zusammenarbeit mit dem aufstrebenden Talent XYZ.</p>
      
      <p>Die Produktion wurde hauptsächlich von meinem langjährigen Produzenten BeatMaster übernommen, mit zusätzlichen Beats von SoundGenius und WaveMaker.</p>
      
      <h2>Release-Infos</h2>
      
      <p>Das Album erscheint am 15. Juni digital auf allen Streaming-Plattformen. Limitierte physische Kopien, inklusive Vinyl und Special Edition CDs mit Bonusmaterial, werden über meinen Shop erhältlich sein.</p>
      
      <p>Vorbestellungen starten nächste Woche - haltet die Augen offen für exklusive Bundles und Merchandise!</p>
      
      <h2>Release-Party & Tour</h2>
      
      <p>Zur Feier des Album-Releases wird es eine exklusive Release-Party in Berlin geben. Details dazu folgen in Kürze.</p>
      
      <p>Außerdem freue ich mich, ankündigen zu können, dass ich diesen Herbst auf Deutschland-Tour gehen werde, um das Album live zu präsentieren. Tickets sind ab sofort im Vorverkauf erhältlich.</p>
      
      <p>Ich kann es kaum erwarten, euch die neuen Songs zu präsentieren und mit euch gemeinsam zu feiern!</p>
      
      <p>Bleibt dran für weitere Updates und exklusive Einblicke hinter die Kulissen.</p>
      
      <p>Euer PsYforcE</p>
    `,
    image: "/placeholder.svg?height=600&width=1200",
    date: "05.03.2023",
    author: "PsYforcE",
    category: "releases",
    tags: ["Album", "Release", "Musik"],
    relatedPosts: [
      { id: 2, title: "Deutschland-Tour 2023 angekündigt", image: "/placeholder.svg?height=300&width=500" },
      { id: 3, title: "Neues Musikvideo zu 'Nachtflug' jetzt online", image: "/placeholder.svg?height=300&width=500" },
    ],
  }

  return (
    <div className="flex flex-col gap-16 pt-24 md:pt-32">
      <article className="container mx-auto px-4 max-w-4xl">
        <Link href="/news" className="inline-flex items-center text-primary hover:underline mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Zurück zur News-Übersicht
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="mb-8">
            <div className="relative rounded-xl overflow-hidden mb-6">
              <img src={newsItem.image || "/placeholder.svg"} alt={newsItem.title} className="w-full h-auto" />
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-4">
              <span className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {newsItem.date}
              </span>
              <span className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                {newsItem.author}
              </span>
              <span className="px-2 py-1 bg-primary/20 text-primary rounded-full">{newsItem.category}</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-6 gradient-text-animated">{newsItem.title}</h1>

            <div className="flex justify-between items-center mb-8">
              <div className="flex flex-wrap gap-2">
                {newsItem.tags.map((tag) => (
                  <span key={tag} className="text-xs px-3 py-1 bg-zinc-800 rounded-full flex items-center">
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="hover:bg-white/5" onClick={() => setLiked(!liked)}>
                  <Heart className={`h-5 w-5 mr-1 ${liked ? "fill-primary text-primary" : ""}`} />
                  <span>{liked ? "Gefällt dir" : "Gefällt mir"}</span>
                </Button>
                <Button variant="ghost" size="sm" className="hover:bg-white/5">
                  <Share2 className="h-5 w-5 mr-1" />
                  Teilen
                </Button>
              </div>
            </div>
          </div>

          <div className="prose prose-invert max-w-none mb-12">
            <div dangerouslySetInnerHTML={{ __html: newsItem.content }} />
          </div>

          <div className="border-t border-white/10 pt-12">
            <h2 className="text-2xl font-bold mb-6">Verwandte Artikel</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {newsItem.relatedPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/news/${post.id}`}
                  className="group glass-card-premium overflow-hidden rounded-xl flex items-center"
                >
                  <div className="w-1/3 aspect-square overflow-hidden">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-4 w-2/3">
                    <h3 className="font-bold group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </article>
    </div>
  )
}

