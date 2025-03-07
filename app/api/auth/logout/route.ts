import { logout } from "@/lib/auth"
import { NextResponse } from "next/server"

export async function POST() {
  try {
    await logout()
    return NextResponse.json({ message: "Erfolgreich abgemeldet" }, { status: 200 })
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json({ message: "Ein Fehler ist aufgetreten" }, { status: 500 })
  }
}

