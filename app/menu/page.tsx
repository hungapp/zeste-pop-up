import Image from "next/image"
import Link from "next/link"

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-[#fefdf9] text-[#2f2f2f]">
      {/* Header */}
      <header className="text-center pt-8 pb-4 px-4">
        <Link href="/">
          <Image
            src="/logo.jpg"
            alt="Suis logo"
            width={140}
            height={84}
            className="mx-auto max-w-[140px] w-full h-auto"
          />
        </Link>
        <h1 className="mt-4 text-3xl md:text-4xl font-semibold text-[#2144c0]">Our Pop‑Up Menu</h1>
      </header>

      {/* Menu Images */}
      <section className="w-[90%] max-w-[600px] md:max-w-[1080px] mx-auto px-0 py-4 pb-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start md:gap-8 items-center">
          <div className="w-full md:max-w-[480px] mb-6 md:mb-0">
            <Image
              src="/dessert_menu.jpg"
              alt="Dessert Menu"
              width={480}
              height={640}
              className="w-full h-auto rounded-xl shadow-lg"
            />
          </div>
          <div className="w-full md:max-w-[480px]">
            <Image
              src="/drink_menu.jpg"
              alt="Drink Menu"
              width={480}
              height={640}
              className="w-full h-auto rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Back Link */}
      <div className="text-center pb-8">
        <Link
          href="/"
          className="inline-block py-2.5 px-6 bg-[#2144c0] text-white font-medium rounded-full shadow-md hover:opacity-90 transition-opacity duration-200"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}
