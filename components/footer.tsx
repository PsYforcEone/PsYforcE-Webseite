import { Instagram, Twitter, Youtube, Music, Mail, MapPin, Phone, AirplayIcon as Spotify, Twitch } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="relative mt-20 border-t border-white/10 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-gradient-radial from-primary/5 via-transparent to-transparent rounded-full blur-3xl -z-10"></div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <span className="graffiti-text" data-text="PsYforcE">
                PsYforcE
                <span className="graffiti-text-small">MUSIC</span>
              </span>
            </Link>
            <p className="text-gray-400">Deutscher Rap mit Attitude</p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="bg-zinc-900/80 p-2 rounded-full hover:bg-primary/20 hover:text-primary transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="bg-zinc-900/80 p-2 rounded-full hover:bg-primary/20 hover:text-primary transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="bg-zinc-900/80 p-2 rounded-full hover:bg-primary/20 hover:text-primary transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="bg-zinc-900/80 p-2 rounded-full hover:bg-primary/20 hover:text-primary transition-colors"
              >
                <Spotify className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="bg-zinc-900/80 p-2 rounded-full hover:bg-primary/20 hover:text-primary transition-colors"
              >
                <Twitch className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-6 text-lg relative inline-block">
              <span className="gradient-text">Links</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-secondary"></span>
            </h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <Link href="/musik" className="hover:text-white transition-colors flex items-center group">
                  <Music className="w-4 h-4 mr-2 text-primary/70 group-hover:text-primary transition-colors" />
                  <span className="relative">
                    Musik
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/videos" className="hover:text-white transition-colors flex items-center group">
                  <Youtube className="w-4 h-4 mr-2 text-primary/70 group-hover:text-primary transition-colors" />
                  <span className="relative">
                    Videos
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/tour" className="hover:text-white transition-colors flex items-center group">
                  <Music className="w-4 h-4 mr-2 text-primary/70 group-hover:text-primary transition-colors" />
                  <span className="relative">
                    Tour
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="hover:text-white transition-colors flex items-center group">
                  <Mail className="w-4 h-4 mr-2 text-primary/70 group-hover:text-primary transition-colors" />
                  <span className="relative">
                    Kontakt
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-6 text-lg relative inline-block">
              <span className="gradient-text">Rechtliches</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-secondary"></span>
            </h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <Link href="/impressum" className="hover:text-white transition-colors group">
                  <span className="relative">
                    Impressum
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/datenschutz" className="hover:text-white transition-colors group">
                  <span className="relative">
                    Datenschutz
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/agb" className="hover:text-white transition-colors group">
                  <span className="relative">
                    AGB
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-6 text-lg relative inline-block">
              <span className="gradient-text">Kontakt</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-secondary"></span>
            </h3>
            <div className="space-y-4 text-gray-400">
              <div className="flex items-start group">
                <Mail className="w-5 h-5 mr-3 text-primary/70 group-hover:text-primary transition-colors flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-white">Email</p>
                  <p className="group-hover:text-white transition-colors">kontakt@psyforce-music.de</p>
                </div>
              </div>
              <div className="flex items-start group">
                <Phone className="w-5 h-5 mr-3 text-primary/70 group-hover:text-primary transition-colors flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-white">Telefon</p>
                  <p className="group-hover:text-white transition-colors">+49 123 456789</p>
                </div>
              </div>
              <div className="flex items-start group">
                <MapPin className="w-5 h-5 mr-3 text-primary/70 group-hover:text-primary transition-colors flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-white">Standort</p>
                  <p className="group-hover:text-white transition-colors">Berlin, Deutschland</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 text-center text-gray-400 relative">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          <p>&copy; {new Date().getFullYear()} PsYforcE Music. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  )
}

