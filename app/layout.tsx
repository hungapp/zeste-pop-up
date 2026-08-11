import type React from "react"
import type { Metadata } from "next"
import { Poppins, Oswald } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-body",
})

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-display",
})

export const metadata: Metadata = {
  title: "Suis café & bakery | Brew. Bake. Brunch.",
  description:
    "Brew. Bake. Brunch. Globally inspired desserts, drinks and brunch, popping up around Providence.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${poppins.variable} ${oswald.variable} font-body antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
