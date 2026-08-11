import Image from "next/image"

const tiles = [
  { src: "/roll_dubai.jpg", alt: "Dubai pistachio roll" },
  { src: "/space_dining.jpg", alt: "Communal table in the dining room" },
  { src: "/roll_matcha.jpg", alt: "Matcha roll" },
  { src: "/old_friends.jpeg", alt: "Friends at a Suis pop-up" },
  { src: "/roll_mocha.jpg", alt: "Mocha roll" },
  { src: "/space_service.jpg", alt: "Pastry case and service counter" },
  { src: "/roll_strawberry.jpg", alt: "Strawberry roll" },
  { src: "/young_friends.jpeg", alt: "Guests at a Suis pop-up" },
  { src: "/roll_yuzu.jpg", alt: "Yuzu roll" },
  { src: "/space_kitchen.jpg", alt: "Open kitchen line" },
]

export default function GalleryGrid() {
  return (
    <section id="gallery" className="bg-suis-cream pb-16 pt-4 md:pb-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
          <p className="font-display text-xs uppercase tracking-[0.24em] text-suis-muted">From our pop-ups</p>
          <h2 className="mt-2 font-display text-4xl uppercase tracking-[0.04em] text-suis-blue md:text-5xl">
            Gallery
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5 md:gap-3">
          {tiles.map((tile) => (
            <div key={tile.src} className="group relative aspect-square overflow-hidden">
              <Image
                src={tile.src}
                alt={tile.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
                loading="lazy"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-suis-blue/0 transition-colors duration-500 group-hover:bg-suis-blue/15" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
