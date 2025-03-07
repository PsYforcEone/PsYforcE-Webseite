import { PrismaClient } from "@prisma/client"

// PrismaClient ist an Node.js gebunden und sollte nicht im Browser verwendet werden.
// Siehe: https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/instantiate-prisma-client

let prisma: PrismaClient

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient()
} else {
  // Während der Entwicklung vermeiden wir mehrere Instanzen des PrismaClient
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }
  prisma = global.prisma
}

export default prisma

