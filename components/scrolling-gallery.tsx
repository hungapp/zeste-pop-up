"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

interface DessertItem {
  id: number
  src: string
  alt: string
  title: string
}

const desserts: DessertItem[] = [
  {
    id: 2,
    src: "/roll_yuzu.jpg",
    alt: "Yuzu cream roll with yuzu pudding filling",
    title: "Yuzu Roll",
  },
  {
    id: 3,
    src: "/roll_matcha.jpg",
    alt: "Matcha cream roll with matcha pudding filling",
    title: "Matcha Roll",
  },
  {
    id: 4,
    src: "/roll_mocha.jpg",
    alt: "Mocha cream roll with chocolate pudding filling",
    title: "Mocha Roll",
  },
  {
    id: 5,
    src: "/roll_strawberry.jpg",
    alt: "Strawberry cream roll with vanilla pudding filling",
    title: "Strawberry Roll",
  },
  {
    id: 1,
    src: "/roll_dubai.jpg",
    alt: "Pistachio cream roll with kataifi pistachio filling",
    title: "Dubai Roll",
  },
]

export default function ScrollingGallery() {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())
  const observerRef = useRef<IntersectionObserver | null>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = Number.parseInt(entry.target.getAttribute("data-id") || "0")
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set([...prev, id]))
          }
        })
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px",
      },
    )

    itemRefs.current.forEach((ref) => {
      if (ref && observerRef.current) {
        observerRef.current.observe(ref)
      }
    })

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  return (
    <section className="w-full bg-gradient-to-b from-[#fefdf9] to-[#f8f7f3] py-8 md:py-16">
      <div className="md:max-w-4xl md:mx-auto md:px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-[#2144c0] text-center mb-4 px-4 md:px-0">
          Our Signature Rolls
        </h2>
        <p className="text-lg text-[#2f2f2f] text-center mb-8 md:mb-16 max-w-2xl mx-auto px-4 md:px-0">
          Handcrafted with premium ingredients and artisanal techniques, each roll is a perfect blend of flavors and
          textures.
        </p>

        <div className="space-y-8 md:space-y-32">
          {desserts.map((dessert, index) => (
            <div
              key={dessert.id}
              ref={(el) => {
                itemRefs.current[index] = el
              }}
              data-id={dessert.id}
              className={`transition-all duration-1000 ease-out ${
                visibleItems.has(dessert.id) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
              }`}
            >
              {/* Mobile: Full screen image */}
              <div className="md:hidden w-full h-screen relative">
                <Image
                  src={dessert.src || "/placeholder.svg"}
                  alt={dessert.alt}
                  fill
                  className="object-cover"
                  loading="lazy"
                />
                <div className="absolute bottom-8 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white drop-shadow-lg mb-2">{dessert.title}</h3>
                </div>
              </div>

              {/* Desktop: Side-by-side layout with descriptions */}
              <div className={`hidden md:flex items-center gap-8 ${index % 2 === 1 ? "flex-row-reverse" : ""}`}>
                <div className="flex-1 max-w-md">
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-white p-4">
                    <Image
                      src={dessert.src || "/placeholder.svg"}
                      alt={dessert.alt}
                      width={400}
                      height={600}
                      className="w-full h-auto object-cover rounded-xl"
                      loading="lazy"
                    />
                  </div>
                </div>

                <div className="flex-1 text-center md:text-left space-y-4">
                  <h3 className="text-2xl md:text-3xl font-bold text-[#2144c0]">{dessert.title}</h3>
                  <p className="text-lg text-[#2f2f2f] leading-relaxed">{getDescription(dessert.id)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 md:mt-20 pt-8 md:pt-16 border-t border-[#2144c0]/10 px-4 md:px-0">
          <h3 className="text-2xl font-bold text-[#2144c0] mb-4">Ready to taste these amazing creations?</h3>
          <p className="text-lg text-[#2f2f2f] mb-8">Follow us on social media to find out where we'll be next!</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <a
              href="https://www.instagram.com/suis.ri/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 px-6 bg-[#2144c0] text-white font-semibold rounded-full shadow-md hover:opacity-90 transition-opacity duration-200 text-center"
            >
              Follow on Instagram
            </a>
            <a
              href="https://www.tiktok.com/@suis.ri"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 px-6 bg-[#f5c84d] text-[#2f2f2f] font-semibold rounded-full shadow-md hover:opacity-90 transition-opacity duration-200 text-center"
            >
              Watch on TikTok
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function getDescription(id: number): string {
  const descriptions = {
    1: "Rich chocolate sponge wrapped around creamy pistachio filling with crunchy kataifi texture. Topped with a fresh cherry for the perfect finish.",
    2: "Light and airy yuzu-infused sponge cake filled with tangy yuzu cream and silky yuzu pudding. A citrus lover's dream dessert.",
    3: "Premium matcha sponge cake with authentic Japanese matcha cream and smooth matcha pudding. Garnished with a fresh blueberry.",
    4: "Decadent mocha sponge cake filled with rich coffee cream and velvety chocolate pudding. Finished with an elegant chocolate decoration.",
    5: "Classic vanilla sponge cake with fresh strawberry cream and creamy vanilla pudding. Topped with fresh strawberries and whipped cream.",
  }
  return descriptions[id as keyof typeof descriptions] || ""
}
