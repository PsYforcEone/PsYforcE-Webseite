"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, ThumbsUp, MessageSquare, Flag, User, Calendar, RefreshCw, HelpCircle } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import ReCAPTCHA from "react-google-recaptcha"
import Link from "next/link"

export default function CommunityPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [captchaVerified, setCaptchaVerified] = useState(false)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("gaestebuch")
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFaqCategory, setActiveFaqCategory] = useState("allgemein")

  const recaptchaRef = useRef<ReCAPTCHA>(null)

  // Beispiel-Gästebucheinträge
  const guestbookEntries = [
    {
      id: 1,
      name: "Max Mustermann",
      message:
        "Dein Konzert letzte Woche in Berlin war der Hammer! Kann es kaum erwarten, dich wieder live zu sehen. Die neue Single ist auch ein absoluter Banger!",
      date: "15.03.2023",
      likes: 24,
    },
    {
      id: 2,
      name: "Lisa Schmidt",
      message:
        "Ich höre deine Musik jeden Tag auf dem Weg zur Arbeit. Deine Texte haben mir durch einige schwere Zeiten geholfen. Danke dafür und mach weiter so!",
      date: "02.04.2023",
      likes: 18,
    },
    {
      id: 3,
      name: "Tim Wagner",
      message:
        "Das neue Album ist ein Meisterwerk! Besonders der Track 'Nachtflug' hat es mir angetan. Wann kommt das nächste Musikvideo?",
      date: "10.05.2023",
      likes: 12,
    },
    {
      id: 4,
      name: "Sarah Müller",
      message:
        "Bin seit Tag 1 Fan und es ist unglaublich zu sehen, wie du dich als Künstler entwickelt hast. Deine Musik wird immer besser!",
      date: "22.06.2023",
      likes: 31,
    },
  ]

  // FAQ-Kategorien
  const faqCategories = [
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
    const matchesCategory = activeFaqCategory === item.category
    const matchesSearch =
      searchQuery === "" ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesCategory && matchesSearch
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaVerified(!!token)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Einfache Spam-Prüfung
    if (formState.message.includes("http") || formState.message.includes("www")) {
      setError("Links sind im Gästebuch nicht erlaubt.")
      return
    }

    if (!captchaVerified) {
      setError("Bitte bestätige, dass du kein Roboter bist.")
      return
    }

    setIsSubmitting(true)
    setError("")

    // Simuliere API-Anfrage
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormState({ name: "", email: "", message: "" })
    setCaptchaVerified(false)

    // CAPTCHA zurücksetzen
    if (recaptchaRef.current) {
      recaptchaRef.current.reset()
    }
  }

  const [likedEntries, setLikedEntries] = useState<number[]>([])

  const handleLike = (id: number) => {
    if (likedEntries.includes(id)) {
      setLikedEntries(likedEntries.filter((entryId) => entryId !== id))
    } else {
      setLikedEntries([...likedEntries, id])
    }
  }

  return (
    <div className="flex flex-col gap-16 pt-24 md:pt-32">
      <section className="container mx-auto px-4 max-w-5xl">
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="gradient-text-animated">Community</span>
        </motion.h1>

        <motion.p
          className="text-xl text-gray-400 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Werde Teil der PsYforcE-Community! Hier kannst du Fragen stellen, Feedback geben und dich mit anderen Fans
          austauschen.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Tabs defaultValue="gaestebuch" onValueChange={setActiveTab}>
            <TabsList className="w-full grid grid-cols-2 mb-8 bg-zinc-900/50 p-1 border border-white/10">
              <TabsTrigger
                value="gaestebuch"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/20 data-[state=active]:to-secondary/20"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Gästebuch
              </TabsTrigger>
              <TabsTrigger
                value="faq"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/20 data-[state=active]:to-secondary/20"
              >
                <HelpCircle className="h-4 w-4 mr-2" />
                FAQ
              </TabsTrigger>
            </TabsList>

            {/* Gästebuch Tab */}
            <TabsContent value="gaestebuch">
              <div className="grid md:grid-cols-5 gap-8">
                <motion.div
                  className="md:col-span-2 order-2 md:order-1"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <div className="glass-card-premium p-6 rounded-xl sticky top-24">
                    <h2 className="text-2xl font-bold mb-6 flex items-center">
                      <MessageSquare className="mr-2 h-5 w-5 text-primary" />
                      Eintrag hinterlassen
                    </h2>

                    {isSubmitted ? (
                      <div className="text-center py-8 space-y-4">
                        <h3 className="text-xl font-bold text-primary">Danke für deinen Eintrag!</h3>
                        <p className="text-gray-400">
                          Dein Kommentar wurde erfolgreich übermittelt und wird nach einer kurzen Prüfung
                          veröffentlicht.
                        </p>
                        <Button onClick={() => setIsSubmitted(false)}>Neuen Eintrag verfassen</Button>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <label htmlFor="name" className="block mb-2 text-sm font-medium">
                            Name *
                          </label>
                          <Input
                            id="name"
                            name="name"
                            value={formState.name}
                            onChange={handleChange}
                            required
                            className="bg-zinc-800/50 border-white/10"
                          />
                        </div>

                        <div>
                          <label htmlFor="email" className="block mb-2 text-sm font-medium">
                            Email * <span className="text-gray-400 text-xs">(wird nicht veröffentlicht)</span>
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formState.email}
                            onChange={handleChange}
                            required
                            className="bg-zinc-800/50 border-white/10"
                          />
                        </div>

                        <div>
                          <label htmlFor="message" className="block mb-2 text-sm font-medium">
                            Nachricht *
                          </label>
                          <Textarea
                            id="message"
                            name="message"
                            value={formState.message}
                            onChange={handleChange}
                            required
                            rows={5}
                            className="bg-zinc-800/50 border-white/10"
                            maxLength={500}
                          />
                          <p className="text-xs text-gray-400 mt-1">Max. 500 Zeichen. Links sind nicht erlaubt.</p>
                        </div>

                        <div className="flex justify-center my-4">
                          <ReCAPTCHA
                            ref={recaptchaRef}
                            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" // Demo-Key für Testzwecke
                            onChange={handleCaptchaChange}
                            theme="dark"
                          />
                        </div>

                        {error && (
                          <div className="bg-red-900/20 border border-red-900/50 text-red-400 p-3 rounded-lg flex items-start">
                            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                            <p>{error}</p>
                          </div>
                        )}

                        <Button
                          type="submit"
                          className="w-full gradient-button"
                          disabled={isSubmitting || !captchaVerified}
                        >
                          {isSubmitting ? (
                            <>
                              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                              Wird gesendet...
                            </>
                          ) : (
                            "Eintrag absenden"
                          )}
                        </Button>

                        <p className="text-xs text-gray-400 text-center mt-4">
                          Alle Einträge werden vor der Veröffentlichung geprüft, um Spam zu vermeiden. Bitte beachte
                          unsere Community-Richtlinien.
                        </p>
                      </form>
                    )}
                  </div>
                </motion.div>

                <motion.div
                  className="md:col-span-3 order-1 md:order-2"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <h2 className="text-2xl font-bold mb-6 flex items-center">
                    <User className="mr-2 h-5 w-5 text-primary" />
                    Einträge
                  </h2>

                  <div className="space-y-6">
                    {guestbookEntries.map((entry, index) => (
                      <motion.div
                        key={entry.id}
                        className="glass-card p-6 rounded-xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-black font-bold">
                              {entry.name.charAt(0)}
                            </div>
                            <div className="ml-3">
                              <h3 className="font-bold">{entry.name}</h3>
                              <div className="flex items-center text-xs text-gray-400">
                                <Calendar className="h-3 w-3 mr-1" />
                                {entry.date}
                              </div>
                            </div>
                          </div>
                          <button
                            className="text-gray-400 hover:text-gray-300 transition-colors"
                            title="Eintrag melden"
                          >
                            <Flag className="h-4 w-4" />
                          </button>
                        </div>

                        <p className="text-gray-300 mb-4">{entry.message}</p>

                        <div className="flex justify-between items-center">
                          <button
                            className={`flex items-center text-sm transition-colors ${
                              likedEntries.includes(entry.id) ? "text-primary" : "text-gray-400 hover:text-gray-300"
                            }`}
                            onClick={() => handleLike(entry.id)}
                          >
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            {likedEntries.includes(entry.id) ? entry.likes + 1 : entry.likes}
                          </button>

                          <span className="text-xs text-gray-500">ID: #{entry.id}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-8 text-center">
                    <Button variant="outline" className="border-white/10 hover:bg-white/5">
                      Ältere Einträge laden
                    </Button>
                  </div>
                </motion.div>
              </div>
            </TabsContent>

            {/* FAQ Tab */}
            <TabsContent value="faq">
              <div className="space-y-8">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Suche in den FAQs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-zinc-900/50 border-white/10"
                  />
                  <HelpCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>

                <Tabs defaultValue="allgemein" onValueChange={setActiveFaqCategory}>
                  <TabsList className="w-full flex flex-wrap mb-6 bg-zinc-900/50 p-1 border border-white/10">
                    {faqCategories.map((category) => (
                      <TabsTrigger
                        key={category.id}
                        value={category.id}
                        className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/20 data-[state=active]:to-secondary/20"
                      >
                        {category.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {faqCategories.map((category) => (
                    <TabsContent key={category.id} value={category.id} className="space-y-4">
                      {filteredFAQs.length > 0 ? (
                        <Accordion type="single" collapsible className="w-full">
                          {filteredFAQs.map((faq, index) => (
                            <AccordionItem key={faq.id} value={faq.id} className="border-white/10 overflow-hidden">
                              <AccordionTrigger className="text-left hover:text-primary transition-colors py-4 px-4 bg-zinc-900/30 hover:bg-zinc-900/50 rounded-t-lg">
                                {faq.question}
                              </AccordionTrigger>
                              <AccordionContent className="bg-zinc-900/10 p-4 rounded-b-lg">
                                {faq.answer}
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      ) : (
                        <div className="text-center py-12 bg-zinc-900/20 rounded-lg">
                          <p className="text-gray-400">Keine Ergebnisse für deine Suche gefunden.</p>
                          <p className="text-sm mt-2">
                            Versuche einen anderen Suchbegriff oder wähle eine andere Kategorie.
                          </p>
                        </div>
                      )}
                    </TabsContent>
                  ))}
                </Tabs>

                <div className="mt-12 p-6 glass-card-premium rounded-xl">
                  <h2 className="text-xl font-bold mb-4">Deine Frage ist nicht dabei?</h2>
                  <p className="text-gray-400 mb-4">
                    Wenn du keine Antwort auf deine Frage gefunden hast, kannst du uns gerne direkt kontaktieren. Wir
                    helfen dir gerne weiter und fügen häufig gestellte Fragen regelmäßig zu dieser Seite hinzu.
                  </p>
                  <div className="flex justify-center">
                    <Link
                      href="/kontakt"
                      className="inline-block px-6 py-3 gradient-button text-black font-medium rounded-lg"
                    >
                      Kontakt aufnehmen
                    </Link>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </section>
    </div>
  )
}

