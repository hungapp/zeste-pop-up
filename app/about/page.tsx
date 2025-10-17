import Image from "next/image"
import Link from "next/link"

export default function AboutPage() {
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
        <h1 className="mt-4 text-3xl md:text-4xl font-bold text-[#2144c0]">Who are the Zesties?</h1>
      </header>

      {/* Content Section */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        {/* Introduction Text */}
        <div className="text-center mb-12">
          <p className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto text-[#2f2f2f]">
            At the heart of Suis is a passionate and experienced team, united by a shared vision: to bring a fresh and
            globally inspired brunch and dessert experience to the vibrant Providence food scene.
          </p>
        </div>

        {/* Team Photos */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 justify-center mb-12">
          <div className="relative overflow-hidden rounded-2xl shadow-2xl">
            <Image
              src="trang_ritu.jpg"
              alt="Trang and Ritu celebrating the second pop-up"
              width={400}
              height={480}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Team Descriptions */}
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-xl md:text-2xl font-bold text-[#2144c0] mb-2">Ritu & Trang</h3>
            <p className="text-base text-[#2f2f2f] leading-relaxed max-w-2xl mx-auto">
              The creative duo behind Suis's innovative dessert concepts. Their passion for combining traditional
              techniques with modern flavors brings you unique creations like our signature Japanese rolls with globally
              inspired fillings.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-xl md:text-2xl font-bold text-[#2144c0] mb-2">Hung & Phan Anh</h3>
            <p className="text-base text-[#2f2f2f] leading-relaxed max-w-2xl mx-auto">
              The heart of our operations team, bringing warmth and hospitality to every pop-up event. Their
              dedication to quality and customer experience ensures that every visit to Suis feels like a celebration
              with family.
            </p>
          </div>
        </div>

        {/* Friends Photos */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 justify-center mt-16 mb-12">
          <div className="relative overflow-hidden rounded-2xl shadow-2xl">
            <Image
              src="/young_friends.jpeg"
              alt="Young friends"
              width={400}
              height={480}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Mission Statement */}
        <div className="text-center pt-12 border-t border-[#2144c0]/10">
          <h3 className="text-2xl md:text-3xl font-bold text-[#2144c0] mb-6">Our Mission</h3>
          <p className="text-lg leading-relaxed max-w-3xl mx-auto text-[#2f2f2f] mb-8">
            We believe that great food brings people together. Every dessert we create, every drink we serve, and every
            pop-up event we host is designed to create moments of joy and connection in our community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto mt-8">
            <Link
              href="/"
              className="flex-1 py-3 px-6 bg-[#2144c0] text-white font-semibold rounded-full shadow-md hover:opacity-90 transition-opacity duration-200 text-center"
            >
              Back to Home
            </Link>
            <Link
              href="/menu"
              className="flex-1 py-3 px-6 bg-[#f5c84d] text-[#2f2f2f] font-semibold rounded-full shadow-md hover:opacity-90 transition-opacity duration-200 text-center"
            >
              View Our Menu
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
