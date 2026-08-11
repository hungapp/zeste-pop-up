import Image from "next/image"

export default function SpaceSection() {
  return (
    <section id="space" className="bg-suis-mist py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-14">
          <div className="relative overflow-hidden rounded-2xl aspect-[4/3] md:aspect-[4/3]">
            <Image
              src="/space_dining.jpg"
              alt="The Suis dining room with a long communal table and a window bar"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div>
            <p className="font-display text-xs uppercase tracking-[0.24em] text-suis-muted">
              Coming soon &mdash; 286 Brook St
            </p>
            <h2 className="mt-2 font-display text-4xl uppercase tracking-[0.04em] text-suis-red md:text-5xl">
              The Space
            </h2>
            <p className="mt-5 max-w-lg text-[15px] leading-[1.85] text-suis-ink">
              A permanent home for the pop-up: deep red fluted counters, pale wood tables, and navy-and-brass globe
              pendants over a room framed in red steel windows. An open counter so you can watch the rolls come
              together, a window bar for a quick coffee, and skylights that make a weekday afternoon feel like a
              weekend.
            </p>
            <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
              {[
                ["Seats", "Communal + window bar"],
                ["Counter", "Open pastry & espresso"],
                ["Light", "Skylights all day"],
                ["Vibe", "Come as you are"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="font-display text-[11px] uppercase tracking-[0.16em] text-suis-muted">{k}</dt>
                  <dd className="mt-1 text-suis-ink">{v}</dd>
                </div>
              ))}
            </dl>

            <a
              href="https://maps.google.com/?q=286+Brook+St,+Providence,+RI+02906"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-block rounded-full bg-suis-red px-7 py-3 font-display text-xs uppercase tracking-[0.14em] text-suis-cream transition-opacity hover:opacity-90"
            >
              286 Brook St, Providence
            </a>
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:mt-10 md:grid-cols-2">
          <div className="relative overflow-hidden rounded-2xl aspect-[16/10]">
            <Image
              src="/space_service.jpg"
              alt="Pastry case and service counter under a curved red soffit"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="relative overflow-hidden rounded-2xl aspect-[16/10]">
            <Image
              src="/space_kitchen.jpg"
              alt="Open kitchen line with terrazzo counter and banquette seating"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
