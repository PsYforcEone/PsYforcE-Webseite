import { prisma } from "./prisma"
import { hash } from "bcryptjs"

async function seed() {
  console.log("🌱 Seeding database...")

  try {
    // Admin-Benutzer erstellen
    const hashedPassword = await hash("admin123", 10)

    const admin = await prisma.user.upsert({
      where: { email: "admin@psyforce-music.de" },
      update: {},
      create: {
        name: "Admin",
        email: "admin@psyforce-music.de",
        password: hashedPassword,
        role: "admin",
      },
    })

    console.log("✅ Admin user created")

    // News-Artikel erstellen
    await prisma.news.createMany({
      skipDuplicates: true,
      data: [
        {
          title: 'Neues Album "Psyforce One" erscheint am 15. Juni',
          slug: "neues-album-psyforce-one",
          content:
            'Nach langer Arbeit im Studio freue ich mich, euch mein neues Album "Psyforce One" präsentieren zu können. Es enthält 12 brandneue Tracks mit spannenden Features.',
          excerpt:
            'Nach langer Arbeit im Studio freue ich mich, euch mein neues Album "Psyforce One" präsentieren zu können.',
          category: "releases",
          published: true,
          authorId: admin.id,
        },
        {
          title: "Deutschland-Tour 2023 angekündigt",
          slug: "deutschland-tour-2023",
          content:
            "Diesen Herbst gehe ich auf große Deutschland-Tour! Tickets sind ab sofort im Vorverkauf erhältlich. Ich kann es kaum erwarten, euch alle live zu sehen!",
          excerpt:
            "Diesen Herbst gehe ich auf große Deutschland-Tour! Tickets sind ab sofort im Vorverkauf erhältlich.",
          category: "events",
          published: true,
          authorId: admin.id,
        },
      ],
    })

    console.log("✅ News articles created")

    // Events erstellen
    await prisma.event.createMany({
      skipDuplicates: true,
      data: [
        {
          title: "PsYforcE Live in Berlin",
          date: "2023-09-15",
          time: "20:00 Uhr",
          location: "Club XYZ, Berlin",
          description: "Live-Auftritt in Berlin mit DJ Support",
          ticketUrl: "https://tickets.example.com/psyforce-berlin",
          isSoldOut: false,
        },
        {
          title: "Album Release Party",
          date: "2023-06-15",
          time: "21:00 Uhr",
          location: "Music Hall, Hamburg",
          description: 'Feier zur Veröffentlichung des neuen Albums "Psyforce One"',
          ticketUrl: "https://tickets.example.com/psyforce-release",
          isSoldOut: false,
        },
      ],
    })

    console.log("✅ Events created")

    // Gästebucheinträge erstellen
    await prisma.guestbookEntry.createMany({
      skipDuplicates: true,
      data: [
        {
          name: "Max Mustermann",
          email: "max@example.com",
          message:
            "Dein Konzert letzte Woche in Berlin war der Hammer! Kann es kaum erwarten, dich wieder live zu sehen.",
          approved: true,
        },
        {
          name: "Lisa Schmidt",
          email: "lisa@example.com",
          message:
            "Ich höre deine Musik jeden Tag auf dem Weg zur Arbeit. Deine Texte haben mir durch einige schwere Zeiten geholfen.",
          approved: true,
        },
      ],
    })

    console.log("✅ Guestbook entries created")

    // FAQ-Einträge erstellen
    await prisma.faq.createMany({
      skipDuplicates: true,
      data: [
        {
          question: "Wer ist PsYforcE?",
          answer:
            "PsYforcE ist ein aufstrebender deutscher Rapper, der mit authentischen Texten und einzigartigem Sound die deutsche Rap-Szene aufmischt.",
          category: "allgemein",
          sortOrder: 1,
        },
        {
          question: "Wo kann ich die Musik von PsYforcE hören?",
          answer:
            "Die Musik von PsYforcE ist auf allen gängigen Streaming-Plattformen verfügbar, darunter Spotify, Apple Music, Amazon Music, YouTube Music, Deezer und SoundCloud.",
          category: "musik",
          sortOrder: 1,
        },
      ],
    })

    console.log("✅ FAQ entries created")

    console.log("✅ Database seeded successfully")
  } catch (error) {
    console.error("Error seeding database:", error)
  } finally {
    await prisma.$disconnect()
  }
}

// Seed-Funktion ausführen
seed()

