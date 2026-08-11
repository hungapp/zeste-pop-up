import Image from "next/image"
import { Sofa, ChefHat, Sparkles, HeartHandshake } from "lucide-react"

const features = [
  {
    icon: Sofa,
    title: "Warm Ambiance",
    body: "A bright, easy room with communal tables and a window bar made for lingering.",
  },
  {
    icon: ChefHat,
    title: "Handmade Rolls",
    body: "Japanese-style sponge rolls, folded to order with globally inspired fillings.",
  },
  {
    icon: Sparkles,
    title: "Fresh Delights",
    body: "Small batches, made the morning of, so nothing sits around waiting for you.",
  },
  {
    icon: HeartHandshake,
    title: "Friendly Service",
    body: "Every pop-up runs on hospitality first. Come hungry, leave a regular.",
  },
]

const strip = [
  { src: "/roll_dubai.jpg", alt: "Pistachio cream roll with kataifi filling" },
  { src: "/roll_matcha.jpg", alt: "Matcha cream roll with matcha pudding" },
  { src: "/roll_strawberry.jpg", alt: "Strawberry cream roll topped with fresh strawberries" },
]

export default function AboutSection() {
  return (
    <section id="about" className="bg-suis-cream py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid items-center gap-10 md:grid-cols-[minmax(0,420px)_1fr] md:gap-16">
          {/* Circular portrait with offset ring, echoing the reference */}
          <div className="relative mx-auto w-full max-w-[320px] md:max-w-[380px]">
            <div className="absolute -left-3 -top-3 h-full w-full rounded-full border border-suis-blue/25" />
            <div className="relative aspect-square overflow-hidden rounded-full">
              <Image
                src="/trang_ritu.jpg"
                alt="Ritu and Trang at a Suis pop-up"
                fill
                sizes="(max-width: 768px) 320px, 380px"
                className="object-cover"
              />
            </div>
          </div>

          <div>
            <p className="font-display text-xs uppercase tracking-[0.24em] text-suis-muted">Who we are</p>
            <h2 className="mt-2 font-display text-4xl uppercase tracking-[0.04em] text-suis-blue md:text-5xl">
              About Us
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-[1.85] text-suis-ink">
              At the heart of <strong className="font-semibold">Suis</strong> is a small team with one shared idea:
              bring a fresh, globally inspired dessert and drink experience to Providence. What started as a weekend
              pop-up has grown into a rotating menu of handmade rolls, seasonal fillings, and drinks worth showing up
              for.
            </p>
            <p className="mt-4 max-w-xl text-[15px] leading-[1.85] text-suis-ink">
              We&apos;re Ritu, Trang, Hung and Phan Anh — the Zesties. Every pop-up is our chance to feed the
              neighbourhood something it hasn&apos;t tried yet.
            </p>
            <a
              href="#rolls"
              className="mt-7 inline-block rounded-full bg-suis-yellow px-7 py-3 font-display text-xs uppercase tracking-[0.14em] text-suis-ink transition-opacity hover:opacity-90"
            >
              Meet the Rolls
            </a>
          </div>
        </div>

        {/* Feature row */}
        <div className="mt-16 grid gap-10 border-t border-suis-stone pt-12 sm:grid-cols-2 md:mt-20 md:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="text-center">
              <f.icon className="mx-auto h-7 w-7 text-suis-blue" strokeWidth={1.4} />
              <h3 className="mt-4 font-display text-base uppercase tracking-[0.1em] text-suis-ink">{f.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-suis-muted">{f.body}</p>
            </div>
          ))}
        </div>

        {/* Three-up image strip */}
        <div className="mt-14 grid gap-4 sm:grid-cols-3 md:mt-16">
          {strip.map((img) => (
            <div key={img.src} className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
