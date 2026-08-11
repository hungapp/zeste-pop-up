import Image from "next/image"

export default function HeroSection() {
  return (
    <section id="top" className="bg-suis-cream pb-4 pt-2 md:pb-0 md:pt-4">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        {/* Eyebrow strip, echoing the reference's thin utility bar */}
        <div className="mb-4 hidden items-center justify-between border-b border-suis-stone pb-3 text-[11px] uppercase tracking-[0.18em] text-suis-muted md:flex">
          <span>Caf&eacute; &amp; bakery</span>
          <span>286 Brook St, Providence RI</span>
          <span>Pop-up dates on Instagram</span>
        </div>

        <div className="relative">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl md:aspect-[16/8]">
            <Image
              src="/space_counter.jpg"
              alt="The Suis counter and open kitchen, with communal tables in the foreground"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1152px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
          </div>

          {/* Overlapping info cards */}
          <div className="relative z-10 -mt-10 grid gap-px overflow-hidden rounded-3xl bg-suis-stone shadow-[0_16px_50px_rgba(114,28,39,0.12)] sm:grid-cols-2 md:-mt-16 md:mx-auto md:w-[86%]">
            <div className="bg-suis-cream px-6 py-7 md:px-8 md:py-9">
              <h1 className="font-display text-2xl uppercase tracking-[0.06em] text-suis-red md:text-3xl">
                Brew. Bake. Brunch.
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-suis-ink">
                Globally inspired desserts and drinks, handmade for pop-up events around the Providence food scene.
              </p>
              <a
                href="#menu"
                className="mt-5 inline-block rounded-full bg-suis-red px-6 py-2.5 font-display text-xs uppercase tracking-[0.14em] text-suis-cream transition-opacity hover:opacity-90"
              >
                See the Menu
              </a>
            </div>

            <div className="bg-suis-cream px-6 py-7 md:px-8 md:py-9">
              <h2 className="font-display text-2xl uppercase tracking-[0.06em] text-suis-red md:text-3xl">
                It&apos;s Suis Time
              </h2>
              <dl className="mt-4 space-y-2 text-sm text-suis-ink">
                <div className="flex items-baseline gap-3">
                  <dt className="w-24 shrink-0 text-suis-muted">Next pop-up</dt>
                  <dd className="flex-1 border-b border-dotted border-suis-stone" />
                  <dd className="font-medium">Announced weekly</dd>
                </div>
                <div className="flex items-baseline gap-3">
                  <dt className="w-24 shrink-0 text-suis-muted">Shop</dt>
                  <dd className="flex-1 border-b border-dotted border-suis-stone" />
                  <dd className="font-medium">286 Brook St</dd>
                </div>
                <div className="flex items-baseline gap-3">
                  <dt className="w-24 shrink-0 text-suis-muted">Pre-orders</dt>
                  <dd className="flex-1 border-b border-dotted border-suis-stone" />
                  <dd className="font-medium">Via Instagram DM</dd>
                </div>
              </dl>
              <a
                href="https://www.instagram.com/suis.ri/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-block rounded-full bg-suis-blue px-6 py-2.5 font-display text-xs uppercase tracking-[0.14em] text-suis-red transition-opacity hover:opacity-90"
              >
                Find Us Next
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
