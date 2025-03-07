import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import slugify from "slugify"

// Nachricht nach ID oder Slug abrufen
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // Prüfen, ob es sich um eine UUID oder einen Slug handelt
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)

    let news
    if (isUUID) {
      news = await prisma.news.findUnique({
        where: { id },
      })
    } else {
      news = await prisma.news.findUnique({
        where: { slug: id },
      })
    }

    if (!news) {
      return NextResponse.json({ error: "Nachricht nicht gefunden" }, { status: 404 })
    }

    return NextResponse.json(news)
  } catch (error) {
    console.error("Fehler beim Abrufen der Nachricht:", error)
    return NextResponse.json({ error: "Interner Serverfehler" }, { status: 500 })
  }
}

// Nachricht aktualisieren
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const { title, content } = await request.json()

    if (!title && !content) {
      return NextResponse.json({ error: "Mindestens ein Feld muss aktualisiert werden" }, { status: 400 })
    }

    // Prüfen, ob die Nachricht existiert
    const existingNews = await prisma.news.findUnique({
      where: { id },
    })

    if (!existingNews) {
      return NextResponse.json({ error: "Nachricht nicht gefunden" }, { status: 404 })
    }

    // Daten für die Aktualisierung vorbereiten
    const updateData: any = {}
    if (title) {
      updateData.title = title
      updateData.slug = slugify(title, { lower: true, strict: true })
    }
    if (content) {
      updateData.content = content
    }

    // Nachricht aktualisieren
    const updatedNews = await prisma.news.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json(updatedNews)
  } catch (error) {
    console.error("Fehler beim Aktualisieren der Nachricht:", error)
    return NextResponse.json({ error: "Interner Serverfehler" }, { status: 500 })
  }
}

// Nachricht löschen
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // Prüfen, ob die Nachricht existiert
    const existingNews = await prisma.news.findUnique({
      where: { id },
    })

    if (!existingNews) {
      return NextResponse.json({ error: "Nachricht nicht gefunden" }, { status: 404 })
    }

    // Nachricht löschen
    await prisma.news.delete({
      where: { id },
    })

    return NextResponse.json({ message: "Nachricht erfolgreich gelöscht" }, { status: 200 })
  } catch (error) {
    console.error("Fehler beim Löschen der Nachricht:", error)
    return NextResponse.json({ error: "Interner Serverfehler" }, { status: 500 })
  }
}

