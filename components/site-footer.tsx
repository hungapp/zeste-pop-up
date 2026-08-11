import Image from "next/image"

const columns = [
  {
    title: "Explore",
    items: [
      { label: "About Us", href: "/#about" },
      { label: "Our Team", href: "/about" },
      { label: "Our Signatures", href: "/#signatures" },
      { label: "Menu", href: "/#menu" },
      { label: "Gallery", href: "/#gallery" },
      { label: "Job Opportunities", href: "/careers" },
    ],
  },
  {
    title: "Follow",
    items: [
      { label: "Instagram", href: "https://www.instagram.com/suis.ri/", external: true },
      { label: "TikTok", href: "https://www.tiktok.com/@suis.ri", external: true },
      { label: "Leave Feedback", href: "https://forms.gle/SueMCejTzGFDgrPLA", external: true },
    ],
  },
]

export default function SiteFooter() {
  return (
    <footer className="border-t border-suis-stone bg-suis-mist">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr_1.2fr] md:px-8">
        <div>
          <Image src="/logo.png" alt="Suis café & bakery" width={180} height={130} className="h-20 w-auto" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-suis-muted">
            Brew. Bake. Brunch. Globally inspired desserts, drinks and brunch, popping up around Providence.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="font-display text-xs uppercase tracking-[0.2em] text-suis-red">{col.title}</h4>
            <ul className="mt-4 space-y-2.5">
              {col.items.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    {...("external" in item && item.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="text-sm text-suis-ink transition-colors hover:text-suis-red"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="font-display text-xs uppercase tracking-[0.2em] text-suis-red">Find Us</h4>
          <p className="mt-4 text-sm leading-relaxed text-suis-ink">
            Providence, Rhode Island
            <br />
            Pop-up locations announced on Instagram
          </p>
        </div>
      </div>

      <div className="border-t border-suis-stone/80">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-5 text-xs text-suis-muted md:flex-row md:items-center md:justify-between md:px-8">
          <span>&copy; {new Date().getFullYear()} Suis. All rights reserved.</span>
          <span>Made with care in Providence, RI</span>
        </div>
      </div>
    </footer>
  )
}
