import { requireAuth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Edit, MoreHorizontal, Plus, Trash } from "lucide-react"
import Link from "next/link"
import AdminHeader from "@/components/admin/admin-header"
import AdminNav from "@/components/admin/admin-nav"

export default async function NewsAdmin() {
  // Authentifizierung prüfen
  const user = await requireAuth()

  // News abrufen
  const newsItems = await prisma.news.findMany({
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="flex min-h-screen bg-black">
      <AdminNav />

      <div className="flex-1">
        <AdminHeader user={user} title="News verwalten" />

        <main className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">News-Artikel</h1>
            <Link href="/admin/news/new">
              <Button className="gradient-button">
                <Plus className="mr-2 h-4 w-4" />
                Neuen Artikel erstellen
              </Button>
            </Link>
          </div>

          <div className="glass-card-premium border-white/10 rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-white/5">
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Titel</TableHead>
                  <TableHead>Kategorie</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Datum</TableHead>
                  <TableHead className="text-right">Aktionen</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {newsItems.length > 0 ? (
                  newsItems.map((item) => (
                    <TableRow key={item.id} className="border-white/10 hover:bg-white/5">
                      <TableCell className="font-mono text-xs">{item.id.substring(0, 8)}</TableCell>
                      <TableCell className="font-medium">{item.title}</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 rounded-full text-xs bg-primary/20 text-primary">
                          {item.category}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            item.published ? "bg-green-900/20 text-green-400" : "bg-yellow-900/20 text-yellow-400"
                          }`}
                        >
                          {item.published ? "Veröffentlicht" : "Entwurf"}
                        </span>
                      </TableCell>
                      <TableCell>{item.createdAt.toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Menü öffnen</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="glass-card-premium border-white/10">
                            <DropdownMenuLabel>Aktionen</DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-white/10" />
                            <DropdownMenuItem className="flex items-center">
                              <Edit className="mr-2 h-4 w-4" />
                              <span>Bearbeiten</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center text-red-500">
                              <Trash className="mr-2 h-4 w-4" />
                              <span>Löschen</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-400">
                      Keine News-Artikel vorhanden
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </main>
      </div>
    </div>
  )
}

