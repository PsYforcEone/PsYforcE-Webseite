import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import slugify from "slugify"

// Alle Nachrichten abrufen
export async function GET() {
  try {
    const news = await prisma.news.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(news)
  } catch (error) {
    console.error("Fehler beim Abrufen der Nachrichten:", error)
    return NextResponse.json({ error: "Interner Serverfehler" }, { status: 500 })
  }
}

// Neue Nachricht erstellen
export async function POST(request: NextRequest) {
  try {
    const { title, content } = await request.json()

    if (!title || !content) {
      return NextResponse.json({ error: "Titel und Inhalt sind erforderlich" }, { status: 400 })
    }

    // Slug aus dem Titel erstellen
    const slug = slugify(title, { lower: true, strict: true })

    // Prüfen, ob bereits eine Nachricht mit diesem Slug existiert
    const existingNews = await prisma.news.findUnique({
      where: { slug },
    })

    if (existingNews) {
      return NextResponse.json({ error: "Eine Nachricht mit diesem Titel existiert bereits" }, { status: 409 })
    }

    // Neue Nachricht erstellen
    const news = await prisma.news.create({
      data: {
        title,
        content,
        slug,
      },
    })

    return NextResponse.json(news, { status: 201 })
  } catch (error) {
    console.error("Fehler beim Erstellen der Nachricht:", error)
    return NextResponse.json({ error: "Interner Serverfehler" }, { status: 500 })
  }
}

