"use client"

import { Button } from "@/components/ui/button"
import { ShoppingBag, ShoppingCart } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("all")

  const categories = [
    { id: "all", name: "Alle Produkte" },
    { id: "merch", name: "Merchandise" },
    { id: "music", name: "Musik" },
    { id: "limited", name: "Limited Edition" },
  ]

  const products = [
    {
      id: 1,
      title: "PsYforcE T-Shirt",
      image: "/placeholder.svg?height=500&width=500",
      category: "merch",
      price: "29,99 €",
      isNew: true,
      isLimited: false,
    },
    {
      id: 2,
      title: "Album Vinyl - Limited Edition",
      image: "/placeholder.svg?height=500&width=500",
      category: "limited",
      price: "39,99 €",
      isNew: false,
      isLimited: true,
    },
    {
      id: 3,
      title: "PsYforcE Hoodie",
      image: "/placeholder.svg?height=500&width=500",
      category: "merch",
      price: "49,99 €",
      isNew: true,
      isLimited: false,
    },
    {
      id: 4,
      title: "Signierte CD",
      image: "/placeholder.svg?height=500&width=500",
      category: "music",
      price: "19,99 €",
      isNew: false,
      isLimited: false,
    },
    {
      id: 5,
      title: "PsYforcE Cap",
      image: "/placeholder.svg?height=500&width=500",
      category: "merch",
      price: "24,99 €",
      isNew: false,
      isLimited: false,
    },
    {
      id: 6,
      title: "Limited Box Set",
      image: "/placeholder.svg?height=500&width=500",
      category: "limited",
      price: "79,99 €",
      isNew: true,
      isLimited: true,
    },
  ]

  const filteredProducts =
    activeCategory === "all" ? products : products.filter((product) => product.category === activeCategory)

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <div className="flex flex-col gap-16 pt-24 md:pt-32">
      <section className="container mx-auto px-4">
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="gradient-text-animated">Shop</span>
        </motion.h1>

        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category.id
                    ? "bg-gradient-to-r from-primary to-secondary text-black"
                    : "bg-zinc-900/50 hover:bg-zinc-800/70"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              className="group glass-card-premium overflow-hidden rounded-xl"
              variants={fadeInUp}
            >
              <div className="relative">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                {product.isNew && (
                  <div className="absolute top-2 left-2 bg-primary text-black text-xs font-bold px-2 py-1 rounded">
                    NEU
                  </div>
                )}
                {product.isLimited && (
                  <div className="absolute top-2 right-2 bg-secondary text-white text-xs font-bold px-2 py-1 rounded">
                    LIMITED
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{product.title}</h3>
                <div className="flex justify-between items-center mt-2">
                  <span className="font-bold text-xl">{product.price}</span>
                  <Button size="sm" className="gradient-button">
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    In den Warenkorb
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-gray-400 mb-4">
            Alle Bestellungen werden innerhalb von 3-5 Werktagen versendet. Versandkostenfrei ab 50€.
          </p>
          <Button size="lg" className="gradient-button">
            <ShoppingBag className="mr-2 h-5 w-5" />
            Zum Warenkorb
          </Button>
        </motion.div>
      </section>
    </div>
  )
}

