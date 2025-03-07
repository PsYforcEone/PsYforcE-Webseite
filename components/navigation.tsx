"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X, Headphones, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"

export function Navigation() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)
  const pathname = usePathname()

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/ueber-mich", label: "Über mich" },
    { href: "/news", label: "News" },
    { href: "/releases", label: "Musik" },
    { href: "/events", label: "Events" },
    { href: "/shop", label: "Shop" },
    { href: "/gaestebuch", label: "Community" },
    { href: "/kontakt", label: "Kontakt" },
  ]

  // Gruppiere die Menüpunkte für die mobile Ansicht
  const mobileNavItems = [
    { href: "/", label: "Home", icon: "🏠" },
    { href: "/ueber-mich", label: "Über mich", icon: "👤" },
    { href: "/news", label: "News", icon: "📰" },
    { href: "/releases", label: "Musik", icon: "🎵" },
    { href: "/events", label: "Events", icon: "🗓️" },
    { href: "/shop", label: "Shop", icon: "🛒" },
    { href: "/gaestebuch", label: "Community", icon: "👥" },
    { href: "/kontakt", label: "Kontakt", icon: "✉️" },
    { href: "/admin", label: "Admin", icon: "⚙️" },
  ]

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-md border-b border-white/10 py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="relative group">
            <span className="graffiti-text" data-text="PsYforcE">
              PsYforcE
              <span className="graffiti-text-small">MUSIC</span>
            </span>
          </Link>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden hover:bg-white/10"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>

          <div className="hidden md:flex items-center">
            <ul className="flex space-x-1 mr-6">
              {navItems.map((item, index) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  className="relative"
                >
                  <Link
                    href={item.href}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all relative group inline-block ${
                      pathname === item.href ? "text-white" : "text-gray-300 hover:text-white"
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-secondary transform origin-left transition-transform duration-300 ${
                        pathname === item.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    ></span>
                  </Link>
                </motion.li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
              className="flex gap-2"
            >
              <Button
                size="sm"
                className="gradient-button text-black font-medium"
                onClick={() => window.open("https://open.spotify.com/intl-de/artist/3OxihRgIlROp3Gkjzscatv", "_blank")}
              >
                <Headphones className="mr-2 h-4 w-4" />
                Jetzt streamen
              </Button>

              <Button
                size="sm"
                variant="outline"
                className="border-white/10 hover:bg-white/5"
                onClick={() => (window.location.href = "/admin")}
              >
                <Settings className="mr-2 h-4 w-4" />
                Admin
              </Button>
            </motion.div>
          </div>
        </nav>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="md:hidden fixed top-16 left-0 w-full h-[calc(100vh-4rem)] glass-card-premium border-t border-white/10 overflow-y-auto"
        >
          <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-3 gap-4">
              {mobileNavItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <Link
                    href={item.href}
                    className={`flex flex-col items-center justify-center p-4 rounded-lg text-center transition-all ${
                      pathname === item.href
                        ? "bg-gradient-to-br from-primary/20 to-secondary/20 text-white"
                        : "hover:bg-white/5"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="text-2xl mb-1">{item.icon}</span>
                    <span className="text-sm font-medium">{item.label}</span>
                    {pathname === item.href && (
                      <span className="w-8 h-0.5 mt-2 bg-gradient-to-r from-primary to-secondary rounded-full"></span>
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.3 }}
              className="mt-8"
            >
              <Button
                className="w-full gradient-button py-6"
                onClick={() => window.open("https://open.spotify.com/intl-de/artist/3OxihRgIlROp3Gkjzscatv", "_blank")}
              >
                <Headphones className="mr-2 h-5 w-5" />
                Jetzt auf Spotify streamen
              </Button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}

