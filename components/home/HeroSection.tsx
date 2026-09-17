import Image from "next/image";
import { SITE_CONFIG } from "@/lib/data";
import SocialLinks from "@/components/ui/SocialLinks";

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen min-h-[600px] flex flex-col justify-center items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/vahid-main.jpg"
          alt="Vahid Dorri - Tenor Singer"
          fill
          sizes="100vw"
          priority
          quality={95}
          className="object-cover object-center"
        />
        {/* Subtle dark tint */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Main Center Branding */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto px-4 z-10 select-none">
        {/* Top Ornament (A bit smaller) */}
        <div className="relative w-10 sm:w-11 h-3 mb-2 opacity-90 transition-transform duration-300 hover:scale-110">
          <Image
            src="/images/icon_divider3.png"
            alt="Ornament divider top"
            fill
            sizes="44px"
            className="object-contain"
          />
        </div>

        {/* Heading */}
        <h1 className="font-serif-heading text-4xl sm:text-5xl md:text-6xl font-normal tracking-wide text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
          {SITE_CONFIG.name}
        </h1>

        {/* Bottom Line Ornament (Smaller accent dash) */}
        <div className="relative w-4 sm:w-5 h-[1px] my-2 opacity-70">
          <Image
            src="/images/divider_bottom3.jpg"
            alt="Ornament divider bottom"
            fill
            sizes="20px"
            className="object-contain"
          />
        </div>

        {/* Subtitle / Role */}
        <div className="mt-1">
          <a
            href="/music"
            className="inline-block text-[11px] sm:text-xs font-bold tracking-[0.25em] uppercase text-zinc-200 hover:text-[#d4af37] transition-all duration-300"
          >
            {SITE_CONFIG.tagline}
          </a>
        </div>
      </div>

      {/* Bottom Bar on Hero Section */}
      <div className="absolute bottom-5 left-0 right-0 px-6 sm:px-12 flex items-center justify-between pointer-events-none">
        <div className="w-10" />

        {/* Scroll Indicator */}
        <div className="flex flex-col items-center opacity-60 hover:opacity-100 transition-opacity cursor-pointer animate-bounce pointer-events-auto">
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/70 mb-1">Scroll</span>
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>

        {/* Social Icons Bottom Right */}
        <div className="pointer-events-auto">
          <SocialLinks iconSize={28} itemClassName="hover:scale-110 transition-transform duration-200" />
        </div>
      </div>
    </section>
  );
}

