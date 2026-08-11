import Image from "next/image"

const actions = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/suis.ri/",
    note: "Pop-up dates, menus and behind the scenes",
    primary: true,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@suis.ri",
    note: "Watch the rolls come together",
    primary: true,
  },
  {
    label: "Leave Feedback",
    href: "https://forms.gle/SueMCejTzGFDgrPLA",
    note: "Tell us what to make next",
    primary: false,
  },
]

export default function ContactSection() {
  return (
    <section id="contact" className="bg-suis-sand">
      <div className="mx-auto grid max-w-6xl items-stretch gap-0 md:grid-cols-2">
        <div className="relative min-h-[280px] md:min-h-[420px]">
          <Image
            src="/space_counter.jpg"
            alt="The Suis counter and dining room"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            loading="lazy"
            className="object-cover"
          />
        </div>

        <div className="px-5 py-12 md:px-12 md:py-16">
          <p className="font-display text-xs uppercase tracking-[0.24em] text-suis-muted">Stay in the loop</p>
          <h2 className="mt-2 font-display text-4xl uppercase tracking-[0.04em] text-suis-blue md:text-5xl">
            Find Us Next
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-[1.85] text-suis-ink">
            We don&apos;t take reservations — we take over rooms. Locations and dates go out on social first, so follow
            along and we&apos;ll tell you where we&apos;re popping up next.
          </p>

          <div className="mt-8 space-y-3">
            {actions.map((action) => (
              <a
                key={action.label}
                href={action.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-between gap-4 rounded-full px-6 py-3.5 transition-opacity hover:opacity-90 ${
                  action.primary ? "bg-suis-blue text-white" : "bg-suis-yellow text-suis-ink"
                }`}
              >
                <span className="font-display text-xs uppercase tracking-[0.14em]">{action.label}</span>
                <span
                  className={`hidden text-[12px] sm:block ${action.primary ? "text-white/75" : "text-suis-ink/65"}`}
                >
                  {action.note}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
