import { requireAuth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MessageSquare, Music, Package, ShoppingBag, Video } from "lucide-react"
import Link from "next/link"
import AdminHeader from "@/components/admin/admin-header"
import AdminNav from "@/components/admin/admin-nav"

export default async function AdminDashboard() {
  // Authentifizierung prüfen
  const user = await requireAuth()

  // Statistiken abrufen
  const newsCount = await prisma.news.count()
  const eventsCount = await prisma.event.count()
  const guestbookCount = await prisma.guestbookEntry.count()
  const productsCount = await prisma.product.count()
  const releasesCount = await prisma.release.count()
  const videosCount = await prisma.video.count()

  // Neueste Gästebucheinträge
  const latestGuestbookEntries = await prisma.guestbookEntry.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  })

  // Bevorstehende Events
  const upcomingEvents = await prisma.event.findMany({
    orderBy: { date: "asc" },
    take: 5,
  })

  return (
    <div className="flex min-h-screen bg-black">
      <AdminNav />

      <div className="flex-1">
        <AdminHeader user={user} title="Dashboard" />

        <main className="p-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="glass-card-premium border-white/10">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">News</CardTitle>
                <Music className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{newsCount}</div>
                <p className="text-xs text-gray-400">Artikel insgesamt</p>
                <div className="mt-4">
                  <Link href="/admin/news" className="text-primary text-sm hover:underline">
                    Verwalten →
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card-premium border-white/10">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Events</CardTitle>
                <Calendar className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{eventsCount}</div>
                <p className="text-xs text-gray-400">Veranstaltungen insgesamt</p>
                <div className="mt-4">
                  <Link href="/admin/events" className="text-primary text-sm hover:underline">
                    Verwalten →
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card-premium border-white/10">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Gästebuch</CardTitle>
                <MessageSquare className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{guestbookCount}</div>
                <p className="text-xs text-gray-400">Einträge insgesamt</p>
                <div className="mt-4">
                  <Link href="/admin/guestbook" className="text-primary text-sm hover:underline">
                    Verwalten →
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card-premium border-white/10">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Shop</CardTitle>
                <ShoppingBag className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{productsCount}</div>
                <p className="text-xs text-gray-400">Produkte insgesamt</p>
                <div className="mt-4">
                  <Link href="/admin/shop" className="text-primary text-sm hover:underline">
                    Verwalten →
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card-premium border-white/10">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Musik</CardTitle>
                <Package className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{releasesCount}</div>
                <p className="text-xs text-gray-400">Releases insgesamt</p>
                <div className="mt-4">
                  <Link href="/admin/releases" className="text-primary text-sm hover:underline">
                    Verwalten →
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card-premium border-white/10">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Videos</CardTitle>
                <Video className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{videosCount}</div>
                <p className="text-xs text-gray-400">Videos insgesamt</p>
                <div className="mt-4">
                  <Link href="/admin/videos" className="text-primary text-sm hover:underline">
                    Verwalten →
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <Tabs defaultValue="guestbook">
              <TabsList className="w-full grid grid-cols-2 mb-4 bg-zinc-900/50 p-1 border border-white/10">
                <TabsTrigger
                  value="guestbook"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/20 data-[state=active]:to-secondary/20"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Neueste Gästebucheinträge
                </TabsTrigger>
                <TabsTrigger
                  value="events"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/20 data-[state=active]:to-secondary/20"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Bevorstehende Events
                </TabsTrigger>
              </TabsList>

              <TabsContent value="guestbook">
                <Card className="glass-card-premium border-white/10">
                  <CardHeader>
                    <CardTitle>Neueste Gästebucheinträge</CardTitle>
                    <CardDescription>Die neuesten Einträge im Gästebuch, die auf Moderation warten</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {latestGuestbookEntries.length > 0 ? (
                      <div className="space-y-4">
                        {latestGuestbookEntries.map((entry) => (
                          <div key={entry.id} className="border-b border-white/10 pb-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium">{entry.name}</h3>
                                <p className="text-sm text-gray-400">{entry.createdAt.toLocaleDateString()}</p>
                              </div>
                              <div
                                className={`px-2 py-1 rounded text-xs ${
                                  entry.approved ? "bg-green-900/20 text-green-400" : "bg-yellow-900/20 text-yellow-400"
                                }`}
                              >
                                {entry.approved ? "Genehmigt" : "Ausstehend"}
                              </div>
                            </div>
                            <p className="mt-2 text-sm">{entry.message}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-400">Keine Gästebucheinträge vorhanden</p>
                    )}

                    <div className="mt-4">
                      <Link href="/admin/guestbook" className="text-primary hover:underline">
                        Alle Einträge anzeigen →
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="events">
                <Card className="glass-card-premium border-white/10">
                  <CardHeader>
                    <CardTitle>Bevorstehende Events</CardTitle>
                    <CardDescription>Die nächsten anstehenden Veranstaltungen und Konzerte</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {upcomingEvents.length > 0 ? (
                      <div className="space-y-4">
                        {upcomingEvents.map((event) => (
                          <div key={event.id} className="border-b border-white/10 pb-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium">{event.title}</h3>
                                <p className="text-sm text-gray-400">
                                  {event.date} {event.time && `• ${event.time}`}
                                </p>
                              </div>
                              <div
                                className={`px-2 py-1 rounded text-xs ${
                                  event.isSoldOut ? "bg-red-900/20 text-red-400" : "bg-green-900/20 text-green-400"
                                }`}
                              >
                                {event.isSoldOut ? "Ausverkauft" : "Verfügbar"}
                              </div>
                            </div>
                            <p className="mt-2 text-sm">{event.location}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-400">Keine bevorstehenden Events</p>
                    )}

                    <div className="mt-4">
                      <Link href="/admin/events" className="text-primary hover:underline">
                        Alle Events anzeigen →
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}

