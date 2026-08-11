"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

interface Signature {
  id: number
  src: string
  alt: string
  title: string
  kicker: string
  description: string
}

const boxCakes: Signature[] = [
  {
    id: 6,
    src: "/box_mango.jpg",
    alt: "Mango mini box cake with vanilla chiffon, coconut chantilly and fresh mango",
    title: "Mango Box Cake",
    kicker: "Mini Cake Box",
    description:
      "Vanilla chiffon soaked in mango-infused condensed milk, layered with coconut chantilly and crowned with fresh mangoes.",
  },
  {
    id: 7,
    src: "/box_thaitea.jpg",
    alt: "Thai tea mandarin mini box cake with coconut chantilly and mandarin segments",
    title: "Thai Tea Mandarin",
    kicker: "Mini Cake Box",
    description:
      "Thai tea chiffon and steeped tea cream under a cloud of coconut chantilly, finished with bright mandarin segments.",
  },
  {
    id: 8,
    src: "/box_ube.jpg",
    alt: "Ube mini box cake with ube halaya, coconut chantilly and toasted coconut",
    title: "Ube Box Cake",
    kicker: "Mini Cake Box",
    description:
      "Ube chiffon and rich ube halaya piped with coconut chantilly, scattered with toasted coconut.",
  },
]

const rolls: Signature[] = [
  {
    id: 2,
    src: "/roll_yuzu.jpg",
    alt: "Yuzu cream roll with yuzu pudding filling",
    title: "Yuzu Roll",
    kicker: "Japanese Swiss Roll",
    description:
      "Light, airy yuzu-infused sponge filled with tangy yuzu cream and silky yuzu pudding. A citrus lover's dream.",
  },
  {
    id: 3,
    src: "/roll_matcha.jpg",
    alt: "Matcha cream roll with matcha pudding filling",
    title: "Matcha Roll",
    kicker: "Japanese Swiss Roll",
    description:
      "Premium matcha sponge with authentic Japanese matcha cream and smooth matcha pudding. Finished with a fresh blueberry.",
  },
  {
    id: 4,
    src: "/roll_mocha.jpg",
    alt: "Mocha cream roll with chocolate pudding filling",
    title: "Mocha Roll",
    kicker: "Japanese Swiss Roll",
    description:
      "Decadent mocha sponge filled with rich coffee cream and velvety chocolate pudding, finished with a chocolate curl.",
  },
  {
    id: 5,
    src: "/roll_strawberry.jpg",
    alt: "Strawberry cream roll with vanilla pudding filling",
    title: "Strawberry Roll",
    kicker: "Japanese Swiss Roll",
    description:
      "Classic vanilla sponge with fresh strawberry cream and creamy vanilla pudding. Topped with strawberries and whipped cream.",
  },
]

const saltBreads = [
  { id: 9, src: "/bread_plain.jpg", alt: "Plain salt bread" },
  { id: 10, src: "/bread_garlic.jpg", alt: "Garlic cream cheese salt bread" },
  { id: 11, src: "/bread_applepie.jpg", alt: "Apple pie salt bread" },
]

export default function SignatureShowcase() {
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
    <section id="signatures" className="bg-suis-cream py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-xs uppercase tracking-[0.24em] text-suis-muted">What we&apos;re known for</p>
          <h2 className="mt-2 font-display text-4xl uppercase tracking-[0.04em] text-suis-red md:text-5xl">
            Our Signatures
          </h2>
          <p className="mt-4 text-[15px] leading-[1.85] text-suis-ink">
            Three things we make, all in small batches: mini cake boxes, Korean salt bread and Japanese Swiss rolls.
            The line-up rotates with the season.
          </p>
        </div>

        {/* Mini cake boxes — alternating full-width rows */}
        <div className="mt-14 md:mt-20">
          <div className="flex items-baseline gap-4">
            <h3 className="font-display text-2xl uppercase tracking-[0.06em] text-suis-red md:text-3xl">
              Mini Cake Box
            </h3>
            <span className="flex-1 border-b border-dotted border-suis-stone" />
            <span className="font-display text-xs uppercase tracking-[0.16em] text-suis-muted">
              {boxCakes.length} flavours
            </span>
          </div>
        </div>

        <div className="mt-10 space-y-14 md:mt-14 md:space-y-24">
          {boxCakes.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => {
                itemRefs.current[index] = el
              }}
              data-id={item.id}
              className={`grid items-center gap-6 transition-all duration-700 ease-out md:grid-cols-2 md:gap-14 ${
                visible.has(item.id) ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
            >
              <div className={`relative aspect-[4/5] overflow-hidden ${index % 2 === 1 ? "md:order-2" : ""}`}>
                <Image
                  src={item.src}
                  alt={item.alt}
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
                <p className="mt-3 font-display text-[11px] uppercase tracking-[0.2em] text-suis-muted">
                  {item.kicker}
                </p>
                <h3 className="mt-1.5 font-display text-3xl uppercase tracking-[0.04em] text-suis-red md:text-4xl">
                  {item.title}
                </h3>
                <p className="mt-4 max-w-md text-[15px] leading-[1.85] text-suis-ink md:inline-block">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Salt breads — three-up grid, names live in the artwork */}
        <div className="mt-16 border-t border-suis-stone pt-12 md:mt-24 md:pt-16">
          <div className="flex items-baseline gap-4">
            <h3 className="font-display text-2xl uppercase tracking-[0.06em] text-suis-red md:text-3xl">
              Korean Salt Bread
            </h3>
            <span className="flex-1 border-b border-dotted border-suis-stone" />
            <span className="font-display text-xs uppercase tracking-[0.16em] text-suis-muted">
              {saltBreads.length} kinds
            </span>
          </div>

          <p className="mt-4 max-w-xl text-[15px] leading-[1.85] text-suis-ink">
            Buttery, salt-flecked rolls baked fresh through the day — served plain, or split and filled.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3 md:gap-6">
            {saltBreads.map((item, index) => (
              <div
                key={item.id}
                ref={(el) => {
                  itemRefs.current[boxCakes.length + index] = el
                }}
                data-id={item.id}
                className={`relative aspect-[9/10] overflow-hidden transition-all duration-700 ease-out ${
                  visible.has(item.id) ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  loading="lazy"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Japanese Swiss rolls — compact two-up grid */}
        <div className="mt-16 border-t border-suis-stone pt-12 md:mt-24 md:pt-16">
          <div className="flex items-baseline gap-4">
            <h3 className="font-display text-2xl uppercase tracking-[0.06em] text-suis-red md:text-3xl">
              Japanese Swiss Rolls
            </h3>
            <span className="flex-1 border-b border-dotted border-suis-stone" />
            <span className="font-display text-xs uppercase tracking-[0.16em] text-suis-muted">
              {rolls.length} flavours
            </span>
          </div>

          <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2">
            {rolls.map((item, index) => (
              <div
                key={item.id}
                ref={(el) => {
                  itemRefs.current[boxCakes.length + saltBreads.length + index] = el
                }}
                data-id={item.id}
                className={`transition-all duration-700 ease-out ${
                  visible.has(item.id) ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    loading="lazy"
                    className="object-cover"
                  />
                </div>
                <h4 className="mt-4 font-display text-xl uppercase tracking-[0.04em] text-suis-red">{item.title}</h4>
                <p className="mt-2 text-[14px] leading-[1.75] text-suis-ink">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
