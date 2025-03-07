import { db } from "../lib/db"
import { sql } from "drizzle-orm"

async function initDb() {
  console.log("🔧 Initializing database...")

  try {
    // Prüfen, ob die Datenbank existiert
    const result = await db.select({ count: sql`count(*)` }).from(sql`sqlite_master WHERE type='table'`)

    console.log(`Found ${result[0].count} tables in database`)

    if (Number(result[0].count) === 0) {
      console.log("No tables found, running migrations...")

      // Migrationen ausführen
      const { migrate } = await import("drizzle-orm/better-sqlite3/migrator")
      migrate(db, { migrationsFolder: "./drizzle" })

      console.log("✅ Migrations completed successfully")

      // Seed-Daten einfügen
      const { default: seed } = await import("../lib/seed")
      await seed()
    } else {
      console.log("Database already initialized")
    }

    console.log("✅ Database initialization completed")
  } catch (error) {
    console.error("Error initializing database:", error)
  }
}

// Initialisierungsfunktion ausführen
initDb()

