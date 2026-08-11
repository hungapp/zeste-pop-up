import Image from "next/image"
import Link from "next/link"
import { getMenuConfig } from "@/lib/menu-store"

export default async function MenuSection() {
  const menuConfig = await getMenuConfig()

  return (
    <section id="menu" className="bg-suis-mist py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-xs uppercase tracking-[0.24em] text-suis-muted">Fresh every pop-up</p>
          <h2 className="mt-2 font-display text-4xl uppercase tracking-[0.04em] text-suis-red md:text-5xl">
            The Menu
          </h2>
          <p className="mt-4 text-[15px] leading-[1.85] text-suis-ink">
            Desserts on the left, drinks on the right. The board changes as the season does — this is always the
            current one.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-2 md:gap-10">
          <figure>
            <figcaption className="mb-3 flex items-baseline gap-3">
              <span className="font-display text-sm uppercase tracking-[0.18em] text-suis-red">Desserts</span>
              <span className="flex-1 border-b border-dotted border-suis-stone" />
            </figcaption>
            <div className="overflow-hidden bg-white p-3 shadow-[0_10px_30px_rgba(114,28,39,0.08)]">
              <Image
                src={menuConfig.dessertMenu}
                alt="Suis dessert menu"
                width={480}
                height={640}
                className="h-auto w-full"
                unoptimized
              />
            </div>
          </figure>

          <figure>
            <figcaption className="mb-3 flex items-baseline gap-3">
              <span className="font-display text-sm uppercase tracking-[0.18em] text-suis-red">Drinks</span>
              <span className="flex-1 border-b border-dotted border-suis-stone" />
            </figcaption>
            <div className="overflow-hidden bg-white p-3 shadow-[0_10px_30px_rgba(114,28,39,0.08)]">
              <Image
                src={menuConfig.drinkMenu}
                alt="Suis drink menu"
                width={480}
                height={640}
                className="h-auto w-full"
                unoptimized
              />
            </div>
          </figure>
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/menu"
            className="inline-block rounded-full bg-suis-red px-7 py-3 font-display text-xs uppercase tracking-[0.14em] text-suis-cream transition-opacity hover:opacity-90"
          >
            Open Full Menu
          </Link>
        </div>
      </div>
    </section>
  )
}
