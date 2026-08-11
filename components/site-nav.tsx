"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X, Instagram } from "lucide-react"

const links = [
  { label: "Home", href: "/#top" },
  { label: "About", href: "/#about" },
  { label: "Rolls", href: "/#rolls" },
  { label: "Menu", href: "/#menu" },
  { label: "Space", href: "/#space" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Careers", href: "/careers", route: true },
  { label: "Contact", href: "/#contact" },
]

export default function SiteNav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-suis-cream/95 backdrop-blur transition-shadow duration-300 ${
        scrolled ? "shadow-[0_1px_12px_rgba(33,68,192,0.08)]" : ""
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 md:px-8">
        <Link href="/" className="flex shrink-0 items-center" aria-label="Suis home">
          <Image src="/logo.png" alt="Suis" width={120} height={48} className="h-9 w-auto md:h-11" priority />
        </Link>

        <nav className="hidden items-center gap-6 md:flex lg:gap-8">
          {links.map((link) =>
            "route" in link && link.route ? (
              <Link
                key={link.href}
                href={link.href}
                className="font-display text-sm uppercase tracking-[0.16em] text-suis-ink transition-colors duration-200 hover:text-suis-blue"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="font-display text-sm uppercase tracking-[0.16em] text-suis-ink transition-colors duration-200 hover:text-suis-blue"
              >
                {link.label}
              </a>
            ),
          )}
          <a
            href="https://www.instagram.com/suis.ri/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Suis on Instagram"
            className="text-suis-blue transition-opacity hover:opacity-70"
          >
            <Instagram className="h-5 w-5" />
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="rounded-full p-2 text-suis-blue md:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-suis-stone bg-suis-cream px-5 pb-5 pt-2 md:hidden">
          {links.map((link) =>
            "route" in link && link.route ? (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block border-b border-suis-stone/60 py-3 font-display text-sm uppercase tracking-[0.16em] text-suis-ink last:border-0"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block border-b border-suis-stone/60 py-3 font-display text-sm uppercase tracking-[0.16em] text-suis-ink last:border-0"
              >
                {link.label}
              </a>
            ),
          )}
        </nav>
      )}
    </header>
  )
}
