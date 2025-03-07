"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useRouter } from "next/navigation"

export default function FAQPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/gaestebuch?tab=faq")
  }, [router])

  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("allgemein")

  // FAQ-Kategorien
  const categories = [
    { id: "allgemein", name: "Allgemein" },
    { id: "musik", name: "Musik & Releases" },
    { id: "events", name: "Events & Auftritte" },
    { id: "merch", name: "Merchandise" },
    { id: "kontakt", name: "Kontakt & Booking" },
  ]

  // FAQ-Einträge
  const faqItems = [
    {
      id: "faq-1",
      question: "Wer ist PsYforcE?",
      answer:
        "PsYforcE ist ein aufstrebender deutscher Rapper, der mit authentischen Texten und einzigartigem Sound die deutsche Rap-Szene aufmischt. Seine Musik zeichnet sich durch tiefgründige Texte, kraftvolle Beats und eine unverkennbare Stimme aus.",
      category: "allgemein",
    },
    {
      id: "faq-2",
      question: "Seit wann macht PsYforcE Musik?",
      answer:
        "PsYforcE ist seit 2013 aktiv in der Musikszene. Seine ersten Tracks nahm er in einem selbstgebauten Heimstudio auf und teilte sie auf SoundCloud, wo er sich langsam aber stetig eine treue Fangemeinde aufbaute.",
      category: "allgemein",
    },
    {
      id: "faq-3",
      question: "Wo kann ich die Musik von PsYforcE hören?",
      answer:
        "Die Musik von PsYforcE ist auf allen gängigen Streaming-Plattformen verfügbar, darunter Spotify, Apple Music, Amazon Music, YouTube Music, Deezer und SoundCloud. Ältere Tracks und exklusive Inhalte findest du auf SoundCloud.",
      category: "musik",
    },
    {
      id: "faq-4",
      question: "Wann erscheint das neue Album?",
      answer:
        "Das neue Album 'Psyforce One' erscheint am 15. Juni. Es enthält 12 brandneue Tracks mit spannenden Features. Vorbestellungen sind bereits möglich.",
      category: "musik",
    },
    {
      id: "faq-5",
      question: "Gibt es physische Kopien der Alben zu kaufen?",
      answer:
        "Ja, limitierte physische Kopien, inklusive Vinyl und Special Edition CDs mit Bonusmaterial, sind über den Shop erhältlich. Die Stückzahl ist begrenzt, also sei schnell!",
      category: "musik",
    },
    {
      id: "faq-6",
      question: "Wo finden die nächsten Konzerte statt?",
      answer:
        "Alle aktuellen Tour-Daten und Konzertinformationen findest du auf der Events-Seite. Dort werden regelmäßig neue Termine hinzugefügt. Alternativ kannst du dich für den Newsletter anmelden, um keine Show zu verpassen.",
      category: "events",
    },
    {
      id: "faq-7",
      question: "Wie kann ich Tickets für Konzerte kaufen?",
      answer:
        "Tickets für alle Konzerte sind über die Events-Seite erhältlich. Dort wirst du zu den offiziellen Ticketanbietern weitergeleitet. Für bestimmte Shows gibt es auch VIP-Pakete mit Meet & Greet.",
      category: "events",
    },
    {
      id: "faq-8",
      question: "Gibt es Altersbeschränkungen für die Konzerte?",
      answer:
        "Die Altersbeschränkungen variieren je nach Veranstaltungsort. Diese Information findest du in der jeweiligen Veranstaltungsbeschreibung auf der Events-Seite oder direkt beim Ticketanbieter.",
      category: "events",
    },
    {
      id: "faq-9",
      question: "Wie lange dauert der Versand von Merchandise?",
      answer:
        "Der Versand innerhalb Deutschlands dauert in der Regel 2-4 Werktage. Internationaler Versand kann 5-14 Werktage dauern. Nach deiner Bestellung erhältst du eine Bestätigungs-E-Mail mit einer Sendungsverfolgungsnummer.",
      category: "merch",
    },
    {
      id: "faq-10",
      question: "Kann ich Merchandise zurückgeben oder umtauschen?",
      answer:
        "Ja, ungetragene und unbeschädigte Artikel können innerhalb von 14 Tagen zurückgegeben werden. Bitte kontaktiere uns vor der Rücksendung unter shop@psyforce-music.de für weitere Anweisungen.",
      category: "merch",
    },
    {
      id: "faq-11",
      question: "Gibt es limitierte Merchandise-Artikel?",
      answer:
        "Ja, regelmäßig gibt es limitierte Editionen im Shop. Diese sind oft mit Album-Releases oder besonderen Events verbunden. Melde dich für den Newsletter an, um über neue limitierte Drops informiert zu werden.",
      category: "merch",
    },
    {
      id: "faq-12",
      question: "Wie kann ich PsYforcE für ein Feature oder eine Zusammenarbeit anfragen?",
      answer:
        "Für Feature-Anfragen, Bookings oder andere geschäftliche Anfragen nutze bitte das Kontaktformular auf der Kontakt-Seite oder schreibe direkt an booking@psyforce-music.de.",
      category: "kontakt",
    },
    {
      id: "faq-13",
      question: "Antwortet PsYforcE auf Fan-Nachrichten?",
      answer:
        "PsYforcE versucht, so viele Fan-Nachrichten wie möglich zu lesen und zu beantworten. Aufgrund der hohen Anzahl an Nachrichten ist eine Antwort jedoch nicht immer garantiert. Social Media und das Gästebuch sind gute Wege, um in Kontakt zu treten.",
      category: "kontakt",
    },
  ]

  // Filtern der FAQs basierend auf Kategorie und Suchbegriff
  const filteredFAQs = faqItems.filter((item) => {
    const matchesCategory = activeTab === item.category
    const matchesSearch =
      searchQuery === "" ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesCategory && matchesSearch
  })

  return (
    <div className="flex flex-col gap-16 pt-24 md:pt-32">
      <section className="container mx-auto px-4 max-w-4xl">
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="gradient-text-animated">Häufig gestellte Fragen</span>
        </motion.h1>

        <motion.p
          className="text-xl text-gray-400 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Hier findest du Antworten auf die häufigsten Fragen zu PsYforcE, seiner Musik, Events und mehr.
        </motion.p>

        <motion.div
          className="mb-8 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Suche in den FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-zinc-900/50 border-white/10"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Tabs defaultValue="allgemein" onValueChange={setActiveTab}>
            <TabsList className="w-full flex flex-wrap mb-6 bg-zinc-900/50 p-1 border border-white/10">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/20 data-[state=active]:to-secondary/20"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="space-y-4">
                {filteredFAQs.length > 0 ? (
                  <Accordion type="single" collapsible className="w-full">
                    {filteredFAQs.map((faq, index) => (
                      <AccordionItem key={faq.id} value={faq.id} className="border-white/10 overflow-hidden">
                        <AccordionTrigger className="text-left hover:text-primary transition-colors py-4 px-4 bg-zinc-900/30 hover:bg-zinc-900/50 rounded-t-lg">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="bg-zinc-900/10 p-4 rounded-b-lg">{faq.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                ) : (
                  <div className="text-center py-12 bg-zinc-900/20 rounded-lg">
                    <p className="text-gray-400">Keine Ergebnisse für deine Suche gefunden.</p>
                    <p className="text-sm mt-2">Versuche einen anderen Suchbegriff oder wähle eine andere Kategorie.</p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>

        <motion.div
          className="mt-12 p-6 glass-card-premium rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-xl font-bold mb-4">Deine Frage ist nicht dabei?</h2>
          <p className="text-gray-400 mb-4">
            Wenn du keine Antwort auf deine Frage gefunden hast, kannst du uns gerne direkt kontaktieren. Wir helfen dir
            gerne weiter und fügen häufig gestellte Fragen regelmäßig zu dieser Seite hinzu.
          </p>
          <div className="flex justify-center">
            <a href="/kontakt" className="inline-block px-6 py-3 gradient-button text-black font-medium rounded-lg">
              Kontakt aufnehmen
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

