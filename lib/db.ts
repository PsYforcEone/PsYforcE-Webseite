import { drizzle } from "drizzle-orm/better-sqlite3"
import { migrate } from "drizzle-orm/better-sqlite3/migrator"
import Database from "better-sqlite3"
import { join } from "path"

// Initialisiere die SQLite-Datenbank
const sqlite = new Database(join(process.cwd(), "psyforce.db"))
export const db = drizzle(sqlite)

// Führe Migrationen aus, wenn nötig
try {
  migrate(db, { migrationsFolder: join(process.cwd(), "drizzle") })
  console.log("Migrations completed successfully")
} catch (error) {
  console.error("Error during migrations:", error)
}

