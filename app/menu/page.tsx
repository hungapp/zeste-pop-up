import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import SiteNav from "@/components/site-nav"
import SiteFooter from "@/components/site-footer"
import { getMenuConfig } from "@/lib/menu-store"

export const metadata: Metadata = {
  title: "Menu | Suis",
  description: "The current Suis dessert and drink menu, updated every pop-up.",
}

export const revalidate = 60

export default async function MenuPage() {
  const menuConfig = await getMenuConfig()

  return (
    <>
      <SiteNav />
      <main className="bg-suis-cream text-suis-ink">
        <section className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-display text-xs uppercase tracking-[0.24em] text-suis-muted">Fresh every pop-up</p>
            <h1 className="mt-2 font-display text-4xl uppercase tracking-[0.04em] text-suis-blue md:text-5xl">
              Our Pop-Up Menu
            </h1>
            <p className="mt-4 text-[15px] leading-[1.85] text-suis-ink">
              The board changes as the season does — this is always the current one.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-2 md:gap-10">
            <figure>
              <figcaption className="mb-3 flex items-baseline gap-3">
                <span className="font-display text-sm uppercase tracking-[0.18em] text-suis-blue">Desserts</span>
                <span className="flex-1 border-b border-dotted border-suis-stone" />
              </figcaption>
              <div className="overflow-hidden bg-white p-3 shadow-[0_10px_30px_rgba(33,68,192,0.08)]">
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
                <span className="font-display text-sm uppercase tracking-[0.18em] text-suis-blue">Drinks</span>
                <span className="flex-1 border-b border-dotted border-suis-stone" />
              </figcaption>
              <div className="overflow-hidden bg-white p-3 shadow-[0_10px_30px_rgba(33,68,192,0.08)]">
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

          <div className="mt-12 text-center">
            <Link
              href="/"
              className="inline-block rounded-full bg-suis-blue px-7 py-3 font-display text-xs uppercase tracking-[0.14em] text-white transition-opacity hover:opacity-90"
            >
              Back to Home
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
