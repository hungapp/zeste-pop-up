import SiteNav from "@/components/site-nav"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import SignatureRolls from "@/components/signature-rolls"
import SpaceSection from "@/components/space-section"
import MenuSection from "@/components/menu-section"
import QuoteSection from "@/components/quote-section"
import GalleryGrid from "@/components/gallery-grid"
import ContactSection from "@/components/contact-section"
import SiteFooter from "@/components/site-footer"

export const revalidate = 60

export default function HomePage() {
  return (
    <>
      <SiteNav />
      <main className="bg-suis-cream text-suis-ink">
        <HeroSection />
        <AboutSection />
        <SignatureRolls />
        <SpaceSection />
        <MenuSection />
        <QuoteSection />
        <GalleryGrid />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  )
}
