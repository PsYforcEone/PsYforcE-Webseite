import type React from "react"
import { GeistSans } from "geist/font/sans"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import "./globals.css"

export const metadata = {
  title: "PsYforcE Music",
  description: "Offizieller Webauftritt von PsYforcE - Deutscher Rap mit Attitude",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" className={GeistSans.className}>
      <body className="min-h-screen bg-black text-white">
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}



import './globals.css'