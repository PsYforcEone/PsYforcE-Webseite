import { requireAuth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { type NextRequest, NextResponse } from "next/server"
import slugify from "slugify"

export async function POST(request: NextRequest) {
  try {
    // Authentifizierung prüfen
    const user = await requireAuth()

    if (!user) {
      return NextResponse.json({ message: "Nicht autorisiert" }, { status: 401 })
    }

    const { title, content, excerpt, category, published } = await request.json()

    if (!title || !content) {
      return NextResponse.json({ message: "Titel und Inhalt sind erforderlich" }, { status: 400 })
    }

    // Slug generieren
    const slug = slugify(title, { lower: true, strict: true })

    // News-Artikel erstellen
    const newsItem = await prisma.news.create({
      data: {
        title,
        slug,
        content,
        excerpt: excerpt || "",
        category: category || "releases",
        published: published || false,
        author: {
          connect: {
            id: user.id,
          },
        },
      },
    })

    return NextResponse.json({ message: "News-Artikel erfolgreich erstellt", news: newsItem }, { status: 201 })
  } catch (error) {
    console.error("Error creating news:", error)
    return NextResponse.json({ message: "Ein Fehler ist aufgetreten" }, { status: 500 })
  }
}

export async function GET() {
  try {
    // Authentifizierung prüfen
    const user = await requireAuth()

    if (!user) {
      return NextResponse.json({ message: "Nicht autorisiert" }, { status: 401 })
    }

    // News-Artikel abrufen
    const newsItems = await prisma.news.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(newsItems, { status: 200 })
  } catch (error) {
    console.error("Error fetching news:", error)
    return NextResponse.json({ message: "Ein Fehler ist aufgetreten" }, { status: 500 })
  }
}

