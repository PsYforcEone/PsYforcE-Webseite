"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart,
  Calendar,
  FileText,
  Home,
  MessageSquare,
  Music,
  Package,
  Settings,
  ShoppingBag,
  User,
  Video,
} from "lucide-react"

export default function AdminNav() {
  const pathname = usePathname()

  const navItems = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: <BarChart className="h-5 w-5" />,
    },
    {
      title: "News",
      href: "/admin/news",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: "Musik",
      href: "/admin/releases",
      icon: <Music className="h-5 w-5" />,
    },
    {
      title: "Events",
      href: "/admin/events",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      title: "Shop",
      href: "/admin/shop",
      icon: <ShoppingBag className="h-5 w-5" />,
    },
    {
      title: "Community",
      href: "/admin/community",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      title: "Videos",
      href: "/admin/videos",
      icon: <Video className="h-5 w-5" />,
    },
    {
      title: "Über mich",
      href: "/admin/about",
      icon: <User className="h-5 w-5" />,
    },
    {
      title: "Website",
      href: "/",
      icon: <Home className="h-5 w-5" />,
    },
    {
      title: "Einstellungen",
      href: "/admin/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  return (
    <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 flex-col border-r border-white/10 bg-black/80 backdrop-blur-md sm:flex">
      <div className="flex h-16 items-center border-b border-white/10 px-6">
        <Link href="/admin" className="flex items-center gap-2 font-semibold">
          <Package className="h-6 w-6 text-primary" />
          <span className="gradient-text">PsYforcE Admin</span>
        </Link>
      </div>
      <nav className="flex-1 overflow-auto py-6 px-3">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                  pathname === item.href
                    ? "bg-gradient-to-r from-primary/20 to-secondary/20 text-white"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                {item.icon}
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="border-t border-white/10 p-4">
        <div className="rounded-lg bg-primary/10 p-3">
          <h3 className="font-medium text-primary">Admin-Bereich</h3>
          <p className="mt-1 text-xs text-gray-400">Hier kannst du alle Inhalte deiner Website verwalten.</p>
        </div>
      </div>
    </aside>
  )
}

