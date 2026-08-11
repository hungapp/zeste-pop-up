export default function QuoteSection() {
  return (
    <section className="bg-suis-cream py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-5 text-center md:px-8">
        <span className="font-display text-6xl leading-none text-suis-stone">&ldquo;</span>
        <blockquote className="mt-2 text-lg leading-[1.9] text-suis-ink md:text-xl">
          Great food brings people together. Every dessert we make, every drink we pour, and every pop-up we host is
          built to create a small moment of joy in this community.
        </blockquote>
        <p className="mt-6 font-display text-xs uppercase tracking-[0.2em] text-suis-muted">
          The Zesties &mdash; Ritu, Trang, Hung &amp; Phan Anh
        </p>
      </div>
    </section>
  )
}
