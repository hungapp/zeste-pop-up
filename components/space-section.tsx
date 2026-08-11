import Image from "next/image"

export default function SpaceSection() {
  return (
    <section id="space" className="bg-suis-sand py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-14">
          <div className="relative aspect-[4/3] overflow-hidden md:aspect-[4/3]">
            <Image
              src="/space_dining.jpg"
              alt="The Suis dining room with a long communal table and a window bar"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div>
            <p className="font-display text-xs uppercase tracking-[0.24em] text-suis-muted">Coming soon</p>
            <h2 className="mt-2 font-display text-4xl uppercase tracking-[0.04em] text-suis-blue md:text-5xl">
              The Space
            </h2>
            <p className="mt-5 max-w-lg text-[15px] leading-[1.85] text-suis-ink">
              A permanent home for the pop-up: terracotta tile underfoot, pale wood throughout, and a long communal
              table at the centre of the room. An open counter so you can watch the rolls come together, a window bar
              for a quick coffee, and enough light to make a weekday afternoon feel like a weekend.
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
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:mt-10 md:grid-cols-2">
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src="/space_service.jpg"
              alt="Pastry case and service counter under a curved red soffit"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[16/10] overflow-hidden">
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
