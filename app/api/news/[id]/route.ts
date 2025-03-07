import { requireAuth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { type NextRequest, NextResponse } from "next/server"
import slugify from "slugify"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Authentifizierung prüfen
    const user = await requireAuth()

    if (!user) {
      return NextResponse.json({ message: "Nicht autorisiert" }, { status: 401 })
    }

    // News-Artikel abrufen
    const newsItem = await prisma.news.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!newsItem) {
      return NextResponse.json({ message: "News-Artikel nicht gefunden" }, { status: 404 })
    }

    return NextResponse.json(newsItem, { status: 200 })
  } catch (error) {
    console.error("Error fetching news item:", error)
    return NextResponse.json({ message: "Ein Fehler ist aufgetreten" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
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

    // Prüfen, ob News-Artikel existiert
    const existingNews = await prisma.news.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!existingNews) {
      return NextResponse.json({ message: "News-Artikel nicht gefunden" }, { status: 404 })
    }

    // Slug generieren
    const slug = slugify(title, { lower: true, strict: true })

    // News-Artikel aktualisieren
    const updatedNews = await prisma.news.update({
      where: {
        id: params.id,
      },
      data: {
        title,
        slug,
        content,
        excerpt: excerpt || "",
        category: category || "releases",
        published: published || false,
      },
    })

    return NextResponse.json({ message: "News-Artikel erfolgreich aktualisiert", news: updatedNews }, { status: 200 })
  } catch (error) {
    console.error("Error updating news item:", error)
    return NextResponse.json({ message: "Ein Fehler ist aufgetreten" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Authentifizierung prüfen
    const user = await requireAuth()

    if (!user) {
      return NextResponse.json({ message: "Nicht autorisiert" }, { status: 401 })
    }

    // Prüfen, ob News-Artikel existiert
    const existingNews = await prisma.news.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!existingNews) {
      return NextResponse.json({ message: "News-Artikel nicht gefunden" }, { status: 404 })
    }

    // News-Artikel löschen
    await prisma.news.delete({
      where: {
        id: params.id,
      },
    })

    return NextResponse.json({ message: "News-Artikel erfolgreich gelöscht" }, { status: 200 })
  } catch (error) {
    console.error("Error deleting news item:", error)
    return NextResponse.json({ message: "Ein Fehler ist aufgetreten" }, { status: 500 })
  }
}

