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
            alt="Zesté logo"
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
            At the heart of Zesté is a passionate and experienced team, united by a shared vision: to bring a fresh and
            globally inspired brunch and dessert experience to the vibrant Providence food scene.
          </p>
        </div>

        {/* Team Photos */}
        <div className="space-y-16 md:space-y-24">
          {/* First Photo */}
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="flex-1 max-w-md">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src="/hung_trang.jpg"
                  alt="Hung and Trang celebrating with birthday cake and flowers"
                  width={500}
                  height={600}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
            <div className="flex-1 text-center md:text-left space-y-4">
              <h3 className="text-2xl md:text-3xl font-bold text-[#2144c0]">Hung & Trang</h3>
              <p className="text-lg text-[#2f2f2f] leading-relaxed">
                The creative duo behind Zesté's innovative dessert concepts. Their passion for combining traditional
                techniques with modern flavors brings you unique creations like our signature Japanese rolls with globally
                inspired fillings.
              </p>
            </div>
          </div>

          {/* Second Photo */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12">
            <div className="flex-1 max-w-md">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src="/phan_ritu.jpg"
                  alt="Phan, Ritu and their baby celebrating with birthday cake"
                  width={500}
                  height={600}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
            <div className="flex-1 text-center md:text-left space-y-4">
              <h3 className="text-2xl md:text-3xl font-bold text-[#2144c0]">Phan, Ritu & Family</h3>
              <p className="text-lg text-[#2f2f2f] leading-relaxed">
                The heart of our operations team, bringing warmth and hospitality to every pop-up event. Their
                dedication to quality and customer experience ensures that every visit to Zesté feels like a celebration
                with family.
              </p>
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="text-center mt-16 pt-12 border-t border-[#2144c0]/10">
          <h3 className="text-2xl md:text-3xl font-bold text-[#2144c0] mb-6">Our Mission</h3>
          <p className="text-lg leading-relaxed max-w-3xl mx-auto text-[#2f2f2f] mb-8">
            We believe that great food brings people together. Every dessert we create, every drink we serve, and every
            pop-up event we host is designed to create moments of joy and connection in our community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
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
