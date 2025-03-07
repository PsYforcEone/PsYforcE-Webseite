import { compare, hash } from "bcryptjs"
import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { prisma } from "./prisma"

// Secret für JWT
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "default_secret_please_change_in_production")

// Benutzer erstellen
export async function createUser(name: string, email: string, password: string, role: "admin" | "editor" = "editor") {
  const hashedPassword = await hash(password, 10)

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    })
    return { success: true, user }
  } catch (error) {
    console.error("Error creating user:", error)
    return { success: false, error }
  }
}

// Benutzer authentifizieren
export async function authenticate(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user) {
    return null
  }

  const isPasswordValid = await compare(password, user.password)

  if (!isPasswordValid) {
    return null
  }

  // JWT erstellen
  const token = await new SignJWT({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(JWT_SECRET)

  // Token in Cookie speichern
  cookies().set("auth-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24, // 24 Stunden
    path: "/",
  })

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  }
}

// Aktuellen Benutzer abrufen
export async function getCurrentUser() {
  const token = cookies().get("auth-token")?.value

  if (!token) {
    return null
  }

  try {
    const verified = await jwtVerify(token, JWT_SECRET)
    return verified.payload as {
      id: string
      name: string
      email: string
      role: "admin" | "editor"
    }
  } catch (error) {
    console.error("Error verifying token:", error)
    return null
  }
}

// Abmelden
export async function logout() {
  cookies().delete("auth-token")
}

// Middleware für geschützte Routen
export async function requireAuth() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/admin/login")
  }

  return user
}

// Middleware für Admin-Routen
export async function requireAdmin() {
  const user = await getCurrentUser()

  if (!user || user.role !== "admin") {
    redirect("/admin/login")
  }

  return user
}

