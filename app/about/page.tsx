import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import SiteNav from "@/components/site-nav"
import SiteFooter from "@/components/site-footer"

export const metadata: Metadata = {
  title: "Meet the Zesties | Suis",
  description: "The team behind Suis and the story of our Providence pop-ups.",
}

const team = [
  {
    name: "Ritu & Trang",
    body: "The creative duo behind Suis's dessert concepts. Their passion for pairing traditional technique with modern flavour is where the signature rolls come from.",
  },
  {
    name: "Hung & Phan Anh",
    body: "The heart of operations, bringing warmth and hospitality to every pop-up. They make sure a visit to Suis feels like a celebration with family.",
  },
]

export default function AboutPage() {
  return (
    <>
      <SiteNav />
      <main className="bg-suis-cream text-suis-ink">
        <section className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-display text-xs uppercase tracking-[0.24em] text-suis-muted">The team</p>
            <h1 className="mt-2 font-display text-4xl uppercase tracking-[0.04em] text-suis-blue md:text-5xl">
              Who Are the Zesties?
            </h1>
            <p className="mt-4 text-[15px] leading-[1.85] text-suis-ink">
              At the heart of Suis is a small, experienced team united by one vision: bring a fresh, globally inspired
              brunch and dessert experience to the Providence food scene.
            </p>
          </div>

          <div className="mt-14 grid items-center gap-10 md:grid-cols-[minmax(0,420px)_1fr] md:gap-16">
            <div className="relative mx-auto w-full max-w-[340px]">
              <div className="absolute -left-3 -top-3 h-full w-full rounded-full border border-suis-blue/25" />
              <div className="relative aspect-square overflow-hidden rounded-full">
                <Image
                  src="/trang_ritu.jpg"
                  alt="Trang and Ritu celebrating the second pop-up"
                  fill
                  sizes="(max-width: 768px) 320px, 380px"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="space-y-8">
              {team.map((member) => (
                <div key={member.name}>
                  <h2 className="font-display text-2xl uppercase tracking-[0.04em] text-suis-blue">{member.name}</h2>
                  <p className="mt-3 max-w-xl text-[15px] leading-[1.85] text-suis-ink">{member.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/young_friends.jpeg"
                alt="Friends at a Suis pop-up"
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/old_friends.jpeg"
                alt="Guests gathered at a Suis pop-up"
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="mt-16 border-t border-suis-stone pt-12 text-center">
            <h2 className="font-display text-3xl uppercase tracking-[0.04em] text-suis-blue md:text-4xl">
              Our Mission
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-[1.85] text-suis-ink">
              We believe great food brings people together. Every dessert we create, every drink we serve, and every
              pop-up we host is designed to create moments of joy and connection in our community.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/"
                className="rounded-full bg-suis-blue px-7 py-3 font-display text-xs uppercase tracking-[0.14em] text-white transition-opacity hover:opacity-90"
              >
                Back to Home
              </Link>
              <Link
                href="/menu"
                className="rounded-full bg-suis-yellow px-7 py-3 font-display text-xs uppercase tracking-[0.14em] text-suis-ink transition-opacity hover:opacity-90"
              >
                View Our Menu
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
