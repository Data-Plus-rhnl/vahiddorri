"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/lib/data";
import SocialLinks from "@/components/ui/SocialLinks";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close menu on route change or Escape key
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 bg-black/50 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-10 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="/"
          className="font-serif-heading text-sm sm:text-base md:text-lg font-bold tracking-[0.22em] sm:tracking-[0.25em] text-white hover:text-[#d4af37] transition-colors duration-300 uppercase"
        >
          Vahid Dorri
        </a>

        {/* Tablet & Desktop Navigation */}
        <nav className="hidden sm:flex items-center gap-6 md:gap-8" aria-label="Main Navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <a
                key={item.id}
                href={item.href}
                className={`text-xs tracking-[0.2em] uppercase font-medium transition-all duration-200 relative py-1 ${
                  isActive
                    ? "text-[#d4af37] font-semibold"
                    : "text-zinc-300 hover:text-white"
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#d4af37] shadow-[0_0_8px_rgba(212,175,55,0.6)]" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="sm:hidden p-2.5 -mr-2 text-zinc-300 hover:text-white focus:outline-none"
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
        >
          <div className="w-5 h-4 flex flex-col justify-between">
            <span
              className={`h-0.5 w-full bg-current transition-transform duration-300 ${
                isOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            />
            <span
              className={`h-0.5 w-full bg-current transition-opacity duration-300 ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`h-0.5 w-full bg-current transition-transform duration-300 ${
                isOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Drawer Backdrop & Menu */}
      {isOpen && (
        <>
          <div
            onClick={() => setIsOpen(false)}
            className="sm:hidden fixed inset-0 top-16 bg-black/60 backdrop-blur-sm z-40 animate-in fade-in duration-200"
            aria-hidden="true"
          />
          <div className="sm:hidden fixed top-16 left-0 right-0 z-50 bg-[#0c0c0c]/98 border-b border-zinc-800/80 px-6 py-8 shadow-2xl backdrop-blur-xl animate-in slide-in-from-top-4 duration-200">
            <nav className="flex flex-col gap-5">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    className={`text-sm tracking-[0.22em] uppercase font-medium py-2 border-b border-white/5 transition-colors ${
                      isActive ? "text-[#d4af37] font-semibold" : "text-zinc-300 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>

            {/* Mobile Social Links in Drawer */}
            <div className="mt-8 pt-6 border-t border-white/5 flex flex-col items-center gap-3">
              <span className="text-[9px] uppercase tracking-[0.25em] text-zinc-500 font-medium">
                Connect With Vahid
              </span>
              <SocialLinks iconSize={22} className="flex items-center gap-4" itemClassName="hover:scale-110 transition-transform duration-200" />
            </div>
          </div>
        </>
      )}
    </header>
  );
}
