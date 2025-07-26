import Image from "next/image"
import Link from "next/link"
import ScrollingGallery from "@/components/scrolling-gallery"

export default function HomePage() {
  return (
    <main className="flex flex-col items-center min-h-screen bg-[#fefdf9]">
      <div className="w-[90%] max-w-4xl text-center px-4 py-12">
        {/* Logo */}
        <div className="mb-6">
          <Image
            src="/logo.jpg"
            alt="Zesté logo"
            width={200}
            height={120}
            className="mx-auto max-w-[200px] w-full h-auto"
            priority
          />
        </div>

        {/* Tagline */}
        <h1 className="text-3xl md:text-4xl font-bold text-[#2144c0] mb-4">Sip & Savour</h1>

        {/* Description */}
        <p className="text-base md:text-lg leading-relaxed mb-8 max-w-[600px] mx-auto text-[#2f2f2f]">
          Welcome to <strong>Zesté</strong> – your destination for delightful desserts and refreshing drinks at local
          pop‑up events. Join us as we bring sweet indulgence and vibrant flavours to the Providence food scene. Follow
          along and we'll let you know where we're popping up next!
        </p>

        {/* Buttons */}
        <div className="flex flex-col items-center gap-4 mx-auto w-full max-w-[300px]">
          <a
            href="https://www.instagram.com/zeste.ri/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-block text-center py-3 px-6 bg-[#2144c0] text-white font-semibold rounded-full shadow-md hover:opacity-90 transition-opacity duration-200"
          >
            Instagram
          </a>

          <a
            href="https://www.tiktok.com/@zeste.ri"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-block text-center py-3 px-6 bg-[#2144c0] text-white font-semibold rounded-full shadow-md hover:opacity-90 transition-opacity duration-200"
          >
            TikTok
          </a>

          <Link
            href="/menu"
            className="w-full inline-block text-center py-3 px-6 bg-[#f5c84d] text-[#2f2f2f] font-semibold rounded-full shadow-md hover:opacity-90 transition-opacity duration-200"
          >
            View Menu
          </Link>

          <a
            href="https://forms.gle/3pUiwCZ4qBbgZSLw5"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-block text-center py-3 px-6 bg-[#f5c84d] text-[#2f2f2f] font-semibold rounded-full shadow-md hover:opacity-90 transition-opacity duration-200"
          >
            Leave Feedback
          </a>

          <Link
            href="/about"
            className="w-full inline-block text-center py-3 px-6 bg-[#f5c84d] text-[#2f2f2f] font-semibold rounded-full shadow-md hover:opacity-90 transition-opacity duration-200"
          >
            Meet the Zesties
          </Link>
        </div>
      </div>

      {/* Scrolling Gallery Section */}
      <ScrollingGallery />
    </main>
  )
}
