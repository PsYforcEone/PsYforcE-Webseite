import { compare, hash } from "bcryptjs"
import prisma from "./prisma"

// Passwort-Hashing
export async function hashPassword(password: string): Promise<string> {
  return await hash(password, 12)
}

// Passwort-Vergleich
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await compare(password, hashedPassword)
}

// Benutzer nach E-Mail finden
export async function findUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: { email },
  })
}

// Benutzer erstellen
export async function createUser(email: string, password: string, name?: string) {
  const hashedPassword = await hashPassword(password)

  return await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  })
}

