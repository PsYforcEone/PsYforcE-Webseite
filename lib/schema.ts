import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"
import { sql } from "drizzle-orm"

// Benutzer für Admin-Zugriff
export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: text("role", { enum: ["admin", "editor"] }).default("editor"),
  createdAt: integer("created_at").default(sql`(unixepoch())`),
})

// Allgemeine Seiteneinstellungen
export const settings = sqliteTable("settings", {
  id: text("id").primaryKey(),
  siteName: text("site_name").default("PsYforcE Music"),
  siteDescription: text("site_description"),
  contactEmail: text("contact_email"),
  contactPhone: text("contact_phone"),
  contactAddress: text("contact_address"),
  spotifyUrl: text("spotify_url"),
  youtubeUrl: text("youtube_url"),
  instagramUrl: text("instagram_url"),
  twitterUrl: text("twitter_url"),
  twitchUrl: text("twitch_url"),
  soundcloudUrl: text("soundcloud_url"),
  updatedAt: integer("updated_at").default(sql`(unixepoch())`),
})

// News/Blog-Einträge
export const news = sqliteTable("news", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  image: text("image"),
  category: text("category", { enum: ["releases", "events", "media"] }).default("releases"),
  published: integer("published", { mode: "boolean" }).default(false),
  createdAt: integer("created_at").default(sql`(unixepoch())`),
  updatedAt: integer("updated_at").default(sql`(unixepoch())`),
  authorId: text("author_id").references(() => users.id),
})

// Musik-Releases
export const releases = sqliteTable("releases", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  type: text("type", { enum: ["album", "single", "ep"] }).default("single"),
  releaseDate: text("release_date").notNull(),
  coverImage: text("cover_image"),
  spotifyId: text("spotify_id"),
  soundcloudUrl: text("soundcloud_url"),
  description: text("description"),
  featured: integer("featured", { mode: "boolean" }).default(false),
  createdAt: integer("created_at").default(sql`(unixepoch())`),
})

// Events und Konzerte
export const events = sqliteTable("events", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  date: text("date").notNull(),
  time: text("time"),
  location: text("location").notNull(),
  description: text("description"),
  ticketUrl: text("ticket_url"),
  image: text("image"),
  isSoldOut: integer("is_sold_out", { mode: "boolean" }).default(false),
  createdAt: integer("created_at").default(sql`(unixepoch())`),
})

// Videos
export const videos = sqliteTable("videos", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  youtubeId: text("youtube_id"),
  category: text("category", { enum: ["music", "live", "behind"] }).default("music"),
  description: text("description"),
  publishDate: text("publish_date"),
  featured: integer("featured", { mode: "boolean" }).default(false),
  createdAt: integer("created_at").default(sql`(unixepoch())`),
})

// Gästebucheinträge
export const guestbook = sqliteTable("guestbook", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  approved: integer("approved", { mode: "boolean" }).default(false),
  createdAt: integer("created_at").default(sql`(unixepoch())`),
})

// FAQ-Einträge
export const faqs = sqliteTable("faqs", {
  id: text("id").primaryKey(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  category: text("category", { enum: ["allgemein", "musik", "events", "merch", "kontakt"] }).default("allgemein"),
  sortOrder: integer("sort_order").default(0),
  createdAt: integer("created_at").default(sql`(unixepoch())`),
})

// Shop-Produkte
export const products = sqliteTable("products", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  price: text("price").notNull(),
  description: text("description"),
  image: text("image"),
  category: text("category", { enum: ["merch", "music", "limited"] }).default("merch"),
  inStock: integer("in_stock", { mode: "boolean" }).default(true),
  isNew: integer("is_new", { mode: "boolean" }).default(false),
  isLimited: integer("is_limited", { mode: "boolean" }).default(false),
  createdAt: integer("created_at").default(sql`(unixepoch())`),
})

// Über mich Seite
export const aboutContent = sqliteTable("about_content", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  image: text("image"),
  updatedAt: integer("updated_at").default(sql`(unixepoch())`),
})

// Social Media Posts
export const socialPosts = sqliteTable("social_posts", {
  id: text("id").primaryKey(),
  platform: text("platform", { enum: ["instagram", "twitter"] }).notNull(),
  content: text("content").notNull(),
  image: text("image"),
  postDate: text("post_date").notNull(),
  likes: integer("likes").default(0),
  comments: integer("comments").default(0),
  retweets: integer("retweets"),
  url: text("url"),
  createdAt: integer("created_at").default(sql`(unixepoch())`),
})

