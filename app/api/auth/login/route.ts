import { type NextRequest, NextResponse } from "next/server"
import { findUserByEmail, verifyPassword } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "E-Mail und Passwort sind erforderlich" }, { status: 400 })
    }

    const user = await findUserByEmail(email)

    if (!user) {
      return NextResponse.json({ error: "Benutzer nicht gefunden" }, { status: 404 })
    }

    const isValid = await verifyPassword(password, user.password)

    if (!isValid) {
      return NextResponse.json({ error: "Ungültiges Passwort" }, { status: 401 })
    }

    // Hier könnten Sie ein JWT-Token erstellen oder eine Session starten
    // Für dieses Beispiel geben wir einfach den Benutzer zurück (ohne Passwort)
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      user: userWithoutPassword,
      message: "Erfolgreich angemeldet",
    })
  } catch (error) {
    console.error("Login-Fehler:", error)
    return NextResponse.json({ error: "Interner Serverfehler" }, { status: 500 })
  }
}

