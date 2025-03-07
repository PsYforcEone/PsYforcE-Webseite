import { authenticate } from "@/lib/auth"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ message: "Email und Passwort sind erforderlich" }, { status: 400 })
    }

    const user = await authenticate(email, password)

    if (!user) {
      return NextResponse.json({ message: "Ungültige Anmeldedaten" }, { status: 401 })
    }

    return NextResponse.json(
      {
        message: "Erfolgreich angemeldet",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ message: "Ein Fehler ist aufgetreten" }, { status: 500 })
  }
}

