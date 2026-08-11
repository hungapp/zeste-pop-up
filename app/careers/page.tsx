import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { FileText } from "lucide-react"
import SiteNav from "@/components/site-nav"
import SiteFooter from "@/components/site-footer"

export const metadata: Metadata = {
  title: "Job Opportunities | Suis",
  description: "Open roles at Suis — barista, baker, cook, prep cook and dishwasher positions in Providence, RI.",
}

// TODO: replace placeholder hrefs with links to the real job descriptions
const roles = [
  {
    title: "Barista",
    type: "Full-time / Part-time",
    summary: "Pull espresso, build our drink menu and set the tone at the counter.",
    href: "#",
  },
  {
    title: "Baker",
    type: "Full-time",
    summary: "Early mornings on sponge, cream and lamination. Our rolls start with you.",
    href: "#",
  },
  {
    title: "Cook",
    type: "Full-time",
    summary: "Run the line for brunch service and help shape the savoury menu.",
    href: "#",
  },
  {
    title: "Prep Cook",
    type: "Full-time / Part-time",
    summary: "Mise en place, fillings and daily prep that keeps service moving.",
    href: "#",
  },
  {
    title: "Dishwasher / Busser",
    type: "Part-time",
    summary: "Keep the room and the kitchen turning over. The backbone of the shift.",
    href: "#",
  },
]

const APPLY_URL = "https://forms.gle/QcqYH8WLnAqdxY236"

export default function CareersPage() {
  return (
    <>
      <SiteNav />
      <main className="bg-suis-cream text-suis-ink">
        {/* Header */}
        <section className="mx-auto max-w-6xl px-5 pt-12 md:px-8 md:pt-16">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-display text-xs uppercase tracking-[0.24em] text-suis-muted">Join the team</p>
            <h1 className="mt-2 font-display text-4xl uppercase tracking-[0.04em] text-suis-red md:text-5xl">
              Job Opportunities
            </h1>
            <p className="mt-4 text-[15px] leading-[1.85] text-suis-ink">
              We&apos;re building the team for our first permanent space in Providence. If you care about hospitality
              and want a hand in shaping a new room from day one, we&apos;d like to meet you.
            </p>
            <a
              href={APPLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-block rounded-full bg-suis-red px-8 py-3.5 font-display text-xs uppercase tracking-[0.14em] text-suis-cream transition-opacity hover:opacity-90"
            >
              Apply Here
            </a>
          </div>

          <div className="relative mt-12 aspect-[16/9] overflow-hidden md:aspect-[16/7]">
            <Image
              src="/space_kitchen.jpg"
              alt="The Suis kitchen line and counter"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1152px"
              className="object-cover"
            />
          </div>
        </section>

        {/* Open roles */}
        <section className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
          <div className="flex items-baseline gap-4">
            <h2 className="font-display text-2xl uppercase tracking-[0.06em] text-suis-red md:text-3xl">
              Open Roles
            </h2>
            <span className="flex-1 border-b border-dotted border-suis-stone" />
            <span className="font-display text-xs uppercase tracking-[0.16em] text-suis-muted">
              {roles.length} positions
            </span>
          </div>

          <ul className="mt-8 border-t border-suis-stone">
            {roles.map((role) => (
              <li key={role.title} className="border-b border-suis-stone">
                <div className="flex flex-col gap-4 py-6 md:flex-row md:items-center md:gap-8">
                  <div className="md:w-64 md:shrink-0">
                    <h3 className="font-display text-xl uppercase tracking-[0.04em] text-suis-ink">{role.title}</h3>
                    <p className="mt-1 text-[12px] uppercase tracking-[0.14em] text-suis-muted">{role.type}</p>
                  </div>

                  <p className="flex-1 text-[15px] leading-relaxed text-suis-ink">{role.summary}</p>

                  <div className="flex shrink-0 flex-wrap items-center gap-3">
                    <a
                      href={role.href}
                      className="inline-flex items-center gap-2 rounded-full border border-suis-red/30 px-5 py-2.5 font-display text-[11px] uppercase tracking-[0.14em] text-suis-red transition-colors hover:bg-suis-red hover:text-suis-cream"
                    >
                      <FileText className="h-3.5 w-3.5" strokeWidth={1.6} />
                      {role.title} JD
                    </a>
                    <a
                      href={APPLY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-suis-blue px-5 py-2.5 font-display text-[11px] uppercase tracking-[0.14em] text-suis-red transition-opacity hover:opacity-90"
                    >
                      Apply
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Closing CTA */}
        <section className="bg-suis-mist">
          <div className="mx-auto grid max-w-6xl items-stretch md:grid-cols-2">
            <div className="relative min-h-[260px] md:min-h-[400px]">
              <Image
                src="/space_dining.jpg"
                alt="The Suis dining room"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="lazy"
                className="object-cover"
              />
            </div>
            <div className="px-5 py-12 md:px-12 md:py-16">
              <p className="font-display text-xs uppercase tracking-[0.24em] text-suis-muted">Don&apos;t see a fit?</p>
              <h2 className="mt-2 font-display text-3xl uppercase tracking-[0.04em] text-suis-red md:text-4xl">
                Tell Us Anyway
              </h2>
              <p className="mt-4 max-w-md text-[15px] leading-[1.85] text-suis-ink">
                We hire for attitude as much as experience. Send us a note about what you&apos;d bring to the room and
                we&apos;ll keep you in mind as we grow.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={APPLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-suis-red px-7 py-3 text-center font-display text-xs uppercase tracking-[0.14em] text-suis-cream transition-opacity hover:opacity-90"
                >
                  Apply Here
                </a>
                <Link
                  href="/"
                  className="rounded-full bg-suis-blue px-7 py-3 text-center font-display text-xs uppercase tracking-[0.14em] text-suis-red transition-opacity hover:opacity-90"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
