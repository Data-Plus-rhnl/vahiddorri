import Image from "next/image";
import { SITE_CONFIG } from "@/lib/data";
import SocialLinks from "@/components/ui/SocialLinks";

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/5 bg-black/60 backdrop-blur-sm py-6 px-6 sm:px-12 z-20">
      <div className="max-w-7xl mx-auto flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
        {/* Left: Copyright & Developer Attribution */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-xs tracking-wider text-zinc-400 text-center sm:text-left">
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
              <span className="relative w-4 h-4 rounded-[4px] overflow-hidden inline-flex items-center justify-center bg-white shadow-xs border border-white/20 shrink-0 transition-transform group-hover:scale-110">
                <Image
                  src="/images/qf-logo-avatar.png"
                  alt="Quantum Flow Logo"
                  width={16}
                  height={16}
                  className="w-full h-full object-contain p-[1px]"
                />
              </span>
              <span className="group-hover:underline underline-offset-2">Quantum Flow</span>
            </a>
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex items-center">
          <SocialLinks iconSize={26} />
        </div>
      </div>
    </footer>
  );
}
