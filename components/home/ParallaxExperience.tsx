"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/data";
import SocialLinks from "@/components/ui/SocialLinks";
import TextReveal from "@/components/ui/TextReveal";

export default function ParallaxExperience() {
  const [scrollY, setScrollY] = useState(0);
  const [windowHeight, setWindowHeight] = useState(800);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    let ticking = false;
    const updateDimensions = () => {
      setWindowHeight(window.innerHeight);
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setScrollY(window.scrollY);
      }
    };

    updateDimensions();

    const handleScroll = () => {
      // On mobile, bypass scroll state updates completely for 100% steady native scrolling
      if (window.innerWidth < 768) return;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          // When scrolled past the hero section on PC, bail out of re-renders
          const cutoff = (window.innerHeight || 800) * 1.1;
          setScrollY((prev) => {
            if (prev >= cutoff && currentY >= cutoff) {
              return prev;
            }
            return currentY;
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleResize = () => {
      updateDimensions();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmedEmail) {
      setStatus("error");
      setErrorMessage("Please enter your email address.");
      return;
    }

    if (!emailRegex.test(trimmedEmail)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 600);
  };

  // Parallax calculations based on viewport height (vh) - active on PC only
  const progress = isMobile ? 0 : Math.min(1, Math.max(0, scrollY / (windowHeight || 800)));

  // On mobile touch devices, keep background scale, translation, and opacity rock-solid (steady)
  const heroOpacity = isMobile ? 1 : Math.max(0, 1 - progress * 1.5);
  const heroTranslateY = isMobile ? 0 : progress * -60;
  const heroBgDim = isMobile ? 0 : progress * 0.4;

  const isCovered = scrollY > (windowHeight || 800) * 0.95;

  return (
    <div className="relative w-full">
      {/* SECTION 1: FIXED HERO (Street Portrait) - Pinned rock-solid on mobile and desktop */}
      <section
        className={`fixed inset-0 h-[100svh] sm:h-screen w-full flex flex-col justify-between items-center overflow-hidden z-10 ${
          isCovered ? "pointer-events-none opacity-0 md:opacity-100" : ""
        }`}
      >
        {/* Background Image with steady positioning (no zooming on scroll) */}
        <div
          className="absolute inset-0 -z-10 origin-center"
          style={{
            transform: isMobile ? "none" : "translateZ(0)",
            WebkitTransform: isMobile ? "none" : "translateZ(0)",
          }}
        >
          <Image
            src="/images/vahid-main.jpg"
            alt="Vahid Dorri - Tenor Singer"
            fill
            sizes="100vw"
            priority
            quality={85}
            className="object-cover object-[28%_center] sm:object-[30%_center] lg:object-center"
          />
          {/* Dark tint that increases as you scroll (PC only) */}
          <div
            className="absolute inset-0 bg-black"
            style={{ opacity: 0.2 + heroBgDim }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/85" />
          <div className="absolute inset-0 bg-radial from-black/30 via-transparent to-black/60 md:hidden" />
        </div>

        {/* Top Spacer */}
        <div className="h-16 sm:h-20" />

        {/* Center Hero Content (Fades & drifts upward on PC, steady on mobile) */}
        <div
          className={`flex flex-col items-center text-center max-w-2xl mx-auto px-4 my-auto select-none z-10 ${isMobile ? "" : "will-change-[transform,opacity]"}`}
          style={{
            opacity: heroOpacity,
            transform: isMobile ? "none" : `translateY(${heroTranslateY}px) translateZ(0)`,
            WebkitTransform: isMobile ? "none" : `translateY(${heroTranslateY}px) translateZ(0)`,
          }}
        >
          {/* Top Diamond Ornament */}
          <div className="relative w-9 sm:w-11 h-2.5 sm:h-3 mb-2 sm:mb-2.5 opacity-90 transition-transform duration-300 hover:scale-110">
            <Image
              src="/images/icon_divider3.png"
              alt="Decorative top icon"
              fill
              sizes="(max-width: 640px) 36px, 44px"
              className="object-contain"
            />
          </div>

          {/* Artist Name */}
          <TextReveal
            text={SITE_CONFIG.name}
            as="h1"
            className="font-serif-heading text-3xl sm:text-5xl md:text-6xl font-normal tracking-wide text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]"
          />

          {/* Bottom Divider */}
          <div className="relative w-4 sm:w-5 h-[1px] my-2 sm:my-2.5 opacity-70">
            <Image
              src="/images/divider_bottom3.jpg"
              alt="Decorative bottom divider"
              fill
              sizes="(max-width: 640px) 16px, 20px"
              className="object-contain"
            />
          </div>

          {/* Subtitle */}
          <div className="mt-0.5">
            <Link
              href="/music"
              className="inline-block text-[9px] sm:text-[10.5px] md:text-xs font-bold tracking-[0.24em] sm:tracking-[0.32em] uppercase text-zinc-300 hover:text-[#d4af37] transition-all duration-300 py-1"
            >
              {SITE_CONFIG.tagline}
            </Link>
          </div>
        </div>

        {/* Hero Bottom Bar */}
        <div
          className={`w-full px-4 sm:px-8 md:px-10 pb-4 sm:pb-6 relative z-10 pointer-events-none ${isMobile ? "" : "will-change-opacity"}`}
          style={{ opacity: heroOpacity }}
        >
          {/* Tablet & Desktop Layout (sm and up): Left spacer, center scroll-down, right social links */}
          <div className="hidden sm:flex items-center justify-between">
            <div className="w-28 md:w-36 pointer-events-none" />

            {/* True Centered Scroll Down */}
            <div
              onClick={() => {
                window.scrollTo({
                  top: window.innerHeight,
                  behavior: "smooth",
                });
              }}
              className="flex flex-col items-center opacity-70 hover:opacity-100 transition-all cursor-pointer animate-bounce pointer-events-auto group"
            >
              <span className="text-[9.5px] uppercase tracking-[0.28em] text-white/75 group-hover:text-[#d4af37] transition-colors mb-1 font-medium">
                Scroll Down
              </span>
              <svg
                className="w-3.5 h-3.5 text-white/85 group-hover:text-[#d4af37] transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>

            {/* Social Links on Desktop/Tablet */}
            <div className="pointer-events-auto">
              <SocialLinks iconSize={22} className="flex items-center gap-3" itemClassName="hover:scale-110 transition-transform duration-200" />
            </div>
          </div>

          {/* Mobile-Only Layout (< sm): Perfectly centered and balanced */}
          <div className="sm:hidden flex flex-col items-center gap-3">
            {/* Animated Scroll Down Indicator */}
            <div
              onClick={() => {
                window.scrollTo({
                  top: window.innerHeight,
                  behavior: "smooth",
                });
              }}
              className="flex flex-col items-center opacity-70 active:opacity-100 transition-all cursor-pointer animate-bounce pointer-events-auto group"
            >
              <span className="text-[8.5px] uppercase tracking-[0.22em] text-white/80 group-hover:text-[#d4af37] transition-colors mb-0.5 font-medium">
                Scroll Down
              </span>
              <svg
                className="w-3 h-3 text-white/80 group-hover:text-[#d4af37] transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>

            {/* Mobile Centered Social Links */}
            <div className="pointer-events-auto">
              <SocialLinks iconSize={20} className="flex items-center gap-3" itemClassName="hover:scale-110 transition-transform duration-200" />
            </div>
          </div>
        </div>
      </section>

      {/* Spacer to provide exactly 1 viewport of scrollable travel before Section 2 curtain */}
      <div className="w-full h-[100svh] sm:h-screen pointer-events-none" aria-hidden="true" />

      {/* SECTION 2: PIANO THEATER CURTAIN REVEAL (Slides up over fixed Hero) */}
      <section
        className="relative z-20 min-h-[100svh] sm:min-h-screen w-full flex flex-col justify-between items-center shadow-[0_-35px_80px_rgba(0,0,0,0.95)] border-t border-white/10 bg-black overflow-hidden pt-20 sm:pt-24 pb-4 sm:pb-6 will-change-transform"
        style={{ transform: "translate3d(0, 0, 0)", WebkitTransform: "translate3d(0, 0, 0)" }}
      >
        {/* Background Piano Image */}
        <div
          className="absolute inset-0 -z-10 will-change-transform"
          style={{ transform: "translate3d(0, 0, 0)", WebkitTransform: "translate3d(0, 0, 0)" }}
        >
          <Image
            src="/images/new-pianos.jpg"
            alt="Piano keys"
            fill
            sizes="100vw"
            quality={85}
            className="object-cover object-[65%_center] sm:object-center"
          />
          {/* Subtle multi-layer ambient dark overlay */}
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/60" />
        </div>

        {/* Centered Newsletter Glassmorphic Card (Rock-Steady & Responsive) */}
        <div className="w-full max-w-md mx-auto px-4 z-10 my-auto py-4">
          <div
            className="relative group bg-[#161616]/95 border border-white/15 hover:border-[#d4af37]/40 px-5 py-7 sm:px-10 sm:py-9 shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-md transition-colors duration-200 text-center rounded-sm will-change-transform"
            style={{ transform: "translate3d(0, 0, 0)", WebkitTransform: "translate3d(0, 0, 0)" }}
          >
            {/* Subtle corner golden accent glow - pointer-events-none without -z-10 */}
            <div className="pointer-events-none absolute inset-0 rounded-sm bg-gradient-to-b from-[#d4af37]/20 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />

            <div className="relative z-10 flex flex-col items-center">
              <h2 className="text-white text-xs sm:text-base font-bold tracking-[0.18em] sm:tracking-[0.2em] uppercase mb-3 drop-shadow">
                SIGN UP FOR FREE SONGS!
              </h2>

              {status === "success" ? (
                <div className="bg-zinc-900 border border-[#d4af37]/40 p-5 text-zinc-200 text-xs animate-in fade-in zoom-in-95 duration-300">
                  <p className="font-semibold text-white tracking-wide">Thank you for subscribing!</p>
                  <p className="text-[11px] text-zinc-400 mt-1">
                    Your complimentary songs and updates will arrive in your inbox.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-3 inline-block text-[10px] uppercase tracking-widest text-[#d4af37] hover:underline cursor-pointer"
                  >
                    Sign up another email →
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col items-center w-full" noValidate>
                  <label
                    htmlFor="piano-email-input"
                    className="text-zinc-300 text-xs font-normal mb-2.5 tracking-wide"
                  >
                    Enter email for free songs*
                  </label>

                  <div className="w-full max-w-sm">
                    <input
                      type="email"
                      id="piano-email-input"
                      name="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (status === "error") setStatus("idle");
                      }}
                      placeholder="Email Address"
                      required
                      className="w-full bg-white text-black text-center text-sm sm:text-xs py-2.5 px-3 outline-none border border-transparent focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/30 placeholder:text-zinc-400 placeholder:text-center transition-all"
                    />

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full mt-2.5 bg-[#0d0d0d] hover:bg-[#1f1f1f] text-white hover:text-[#d4af37] text-xs sm:text-[10.5px] font-bold tracking-[0.22em] sm:tracking-[0.25em] uppercase py-3 border border-zinc-700 hover:border-[#d4af37] transition-colors duration-200 cursor-pointer disabled:opacity-50"
                    >
                      {status === "loading" ? "SUBSCRIBING..." : "SUBSCRIBE"}
                    </button>
                  </div>

                  {status === "error" && (
                    <p className="text-[11px] text-rose-400 mt-2 font-medium">{errorMessage}</p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Section 2 Footer Bar */}
        <div className="w-full px-5 sm:px-10 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 z-10 bg-black/80 backdrop-blur-md sm:bg-black/40 border-t border-white/5 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-[10.5px] sm:text-[11px] tracking-wide text-zinc-400 text-center sm:text-left font-normal">
            <p>{SITE_CONFIG.copyright}</p>
            <span className="hidden sm:inline text-white/20">•</span>
            <p className="flex items-center gap-1.5 text-zinc-400">
              <span>Developed by</span>
              <a
                href="https://quantumflowit.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-bold text-zinc-200 hover:text-[#4FD1FF] transition-all group"
              >
                <span className="relative w-3.5 h-3.5 rounded-[3px] overflow-hidden inline-flex items-center justify-center bg-white shadow-xs border border-white/20 shrink-0 transition-transform group-hover:scale-110">
                  <Image
                    src="/images/qf-logo-avatar.png"
                    alt="Quantum Flow Logo"
                    width={14}
                    height={14}
                    className="w-full h-full object-contain p-[1px]"
                  />
                </span>
                <span className="group-hover:underline underline-offset-2">Quantum Flow</span>
              </a>
            </p>
          </div>

          <div className="flex items-center">
            <SocialLinks iconSize={20} className="flex items-center gap-3" itemClassName="hover:scale-110 transition-transform duration-200" />
          </div>
        </div>
      </section>
    </div>
  );
}
