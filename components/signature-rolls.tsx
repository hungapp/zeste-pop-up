"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

interface Roll {
  id: number
  src: string
  alt: string
  title: string
  description: string
}

const rolls: Roll[] = [
  {
    id: 2,
    src: "/roll_yuzu.jpg",
    alt: "Yuzu cream roll with yuzu pudding filling",
    title: "Yuzu Roll",
    description:
      "Light, airy yuzu-infused sponge filled with tangy yuzu cream and silky yuzu pudding. A citrus lover's dream.",
  },
  {
    id: 3,
    src: "/roll_matcha.jpg",
    alt: "Matcha cream roll with matcha pudding filling",
    title: "Matcha Roll",
    description:
      "Premium matcha sponge with authentic Japanese matcha cream and smooth matcha pudding. Finished with a fresh blueberry.",
  },
  {
    id: 4,
    src: "/roll_mocha.jpg",
    alt: "Mocha cream roll with chocolate pudding filling",
    title: "Mocha Roll",
    description:
      "Decadent mocha sponge filled with rich coffee cream and velvety chocolate pudding, finished with a chocolate curl.",
  },
  {
    id: 5,
    src: "/roll_strawberry.jpg",
    alt: "Strawberry cream roll with vanilla pudding filling",
    title: "Strawberry Roll",
    description:
      "Classic vanilla sponge with fresh strawberry cream and creamy vanilla pudding. Topped with strawberries and whipped cream.",
  },
  {
    id: 1,
    src: "/roll_dubai.jpg",
    alt: "Pistachio cream roll with kataifi pistachio filling",
    title: "Dubai Roll",
    description:
      "Rich chocolate sponge wrapped around creamy pistachio filling with crunchy kataifi. Topped with a fresh cherry.",
  },
]

export default function SignatureRolls() {
  const [visible, setVisible] = useState<Set<number>>(new Set())
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = Number.parseInt(entry.target.getAttribute("data-id") || "0")
            setVisible((prev) => new Set([...prev, id]))
          }
        })
      },
      { threshold: 0.15, rootMargin: "0px 0px -80px 0px" },
    )

    itemRefs.current.forEach((ref) => ref && observer.observe(ref))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="rolls" className="bg-suis-cream py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-xs uppercase tracking-[0.24em] text-suis-muted">What we&apos;re known for</p>
          <h2 className="mt-2 font-display text-4xl uppercase tracking-[0.04em] text-suis-red md:text-5xl">
            Signature Rolls
          </h2>
          <p className="mt-4 text-[15px] leading-[1.85] text-suis-ink">
            Handcrafted with premium ingredients and a lot of patience. Each roll is a balance of sponge, cream and
            texture — and the line-up rotates with the season.
          </p>
        </div>

        <div className="mt-14 space-y-14 md:mt-20 md:space-y-24">
          {rolls.map((roll, index) => (
            <div
              key={roll.id}
              ref={(el) => {
                itemRefs.current[index] = el
              }}
              data-id={roll.id}
              className={`grid items-center gap-6 transition-all duration-700 ease-out md:grid-cols-2 md:gap-14 ${
                visible.has(roll.id) ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
            >
              <div className={`relative aspect-[4/5] overflow-hidden ${index % 2 === 1 ? "md:order-2" : ""}`}>
                <Image
                  src={roll.src}
                  alt={roll.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                  className="object-cover"
                />
              </div>

              <div className={index % 2 === 1 ? "md:order-1 md:text-right" : ""}>
                <span className="font-display text-5xl leading-none text-suis-stone md:text-6xl">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-3xl uppercase tracking-[0.04em] text-suis-red md:text-4xl">
                  {roll.title}
                </h3>
                <p className="mt-4 max-w-md text-[15px] leading-[1.85] text-suis-ink md:inline-block">
                  {roll.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
