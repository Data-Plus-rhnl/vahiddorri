import Image from "next/image";
import { AlbumItem } from "@/types";

interface AlbumCardProps {
  album: AlbumItem;
}

export default function AlbumCard({ album }: AlbumCardProps) {
  const targetHref = album.href || `/voice`;

  return (
    <div className="group relative luxury-card rounded-2xl overflow-hidden shadow-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 sm:gap-10">
      {/* Album Artwork */}
      <a
        href={targetHref}
        data-cursor="play"
        className="relative w-56 sm:w-64 aspect-square rounded-xl overflow-hidden border border-[#d4af37]/40 shadow-[0_10px_30px_rgba(0,0,0,0.8)] flex-shrink-0 cursor-pointer block"
      >
        <Image
          src={album.coverImage}
          alt={album.title}
          fill
          sizes="(max-width: 640px) 224px, 256px"
          priority
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 group-hover:opacity-30 transition-opacity" />

        {/* Hover Overlay Play Icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-14 h-14 rounded-full bg-[#d4af37] text-black flex items-center justify-center text-xl font-bold shadow-2xl pl-1">
            ▶
          </div>
        </div>

        {/* Bottom Tag */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
          <span className="bg-black/70 backdrop-blur-md px-2.5 py-1 rounded border border-white/10 text-[10px] uppercase tracking-wider text-[#d4af37] font-semibold">
            {album.releaseYear}
          </span>
          <span className="text-[11px] text-zinc-300 font-medium">
            {album.tracks.length} Tracks
          </span>
        </div>
      </a>

      {/* Album Overview & Metadata */}
      <div className="flex-1 flex flex-col justify-between w-full text-center md:text-left">
        <div>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#d4af37] font-bold">
              Featured Discography
            </span>
            <span className="text-zinc-600 hidden md:inline">•</span>
            <span className="text-xs text-zinc-400">
              Released {album.releaseYear}
            </span>
          </div>

          <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-white tracking-wide group-hover:text-[#d4af37] transition-colors">
            <a href={targetHref} data-cursor="play">{album.title}</a>
          </h2>

          <p className="text-xs uppercase tracking-widest text-zinc-400 mt-1 font-medium">
            By <span className="text-zinc-200">{album.subtitle}</span> • {album.price}
          </p>

          <p className="text-sm text-zinc-300 leading-relaxed mt-4 max-w-xl">
            {album.description}
          </p>

          {/* Quick Track Preview Titles */}
          <div className="mt-4 flex flex-wrap items-center justify-center md:justify-start gap-2 text-xs text-zinc-400">
            <span className="text-zinc-400 font-semibold">Includes:</span>
            {album.tracks.map((t) => (
              <span key={t.number} className="bg-zinc-900/80 px-2.5 py-1 rounded border border-white/5 text-[11px] text-zinc-300">
                {t.number}. {t.title}
              </span>
            ))}
          </div>
        </div>

        {/* Action Button to Open Player Page */}
        <div className="mt-8 pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <a
            href={targetHref}
            data-cursor="play"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#d4af37] hover:bg-[#dfbc7a] text-black font-bold text-xs uppercase tracking-[0.2em] rounded-md shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>Listen & Open Player</span>
          </a>

          <span className="text-xs uppercase tracking-wider text-zinc-400 font-medium">
            Digital Version Available
          </span>
        </div>
      </div>
    </div>
  );
}
