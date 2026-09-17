"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { FEATURED_ALBUM } from "@/lib/data";

export default function AlbumShowcase() {
  const [activeTrackIndex, setActiveTrackIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleTrack = (index: number) => {
    if (activeTrackIndex === index) {
      if (isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
      } else {
        audioRef.current?.play();
        setIsPlaying(true);
      }
    } else {
      setActiveTrackIndex(index);
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current.src = FEATURED_ALBUM.tracks[index].audioSrc;
        audioRef.current.play().catch(() => setIsPlaying(false));
      }
    }
  };

  return (
    <section className="w-full bg-[#111111]/90 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md shadow-2xl p-6 sm:p-10 mb-16">
      {/* Audio Engine */}
      <audio
        ref={audioRef}
        onEnded={() => {
          if (activeTrackIndex !== null && activeTrackIndex < FEATURED_ALBUM.tracks.length - 1) {
            toggleTrack(activeTrackIndex + 1);
          } else {
            setIsPlaying(false);
          }
        }}
      />

      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12">
        {/* Album Artwork with Direct Link to /voice */}
        <div className="flex flex-col items-center flex-shrink-0">
          <a
            href="/voice"
            className="relative w-64 sm:w-72 aspect-square rounded-lg overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.8)] border border-[#d4af37]/40 group block cursor-pointer"
          >
            <Image
              src={FEATURED_ALBUM.coverImage}
              alt={FEATURED_ALBUM.title}
              fill
              sizes="(max-width: 640px) 256px, 288px"
              priority
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Ambient Gold Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity" />

            {/* Play Badge */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
              <span className="bg-black/70 backdrop-blur-md px-2.5 py-1 rounded border border-white/10 text-[10px] uppercase tracking-wider text-[#d4af37] font-semibold">
                Official EP
              </span>
              <span className="text-[11px] text-zinc-300 font-medium">
                {FEATURED_ALBUM.tracks.length} Tracks
              </span>
            </div>
          </a>

          <a
            href="/voice"
            className="mt-4 text-xs font-bold uppercase tracking-[0.25em] text-[#d4af37] hover:underline text-center"
          >
            {FEATURED_ALBUM.title} →
          </a>
        </div>

        {/* Album Info & Tracklist */}
        <div className="flex-1 w-full flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800/80 pb-4 mb-4">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-[#d4af37] font-semibold">
                  Featured Release
                </span>
                <h2 className="font-serif-heading text-2xl sm:text-3xl font-bold text-white mt-0.5">
                  <a href="/voice" className="hover:text-[#d4af37] transition-colors">
                    {FEATURED_ALBUM.title}
                  </a>
                </h2>
                <p className="text-xs text-zinc-400 mt-0.5">
                  By <span className="text-zinc-200">{FEATURED_ALBUM.subtitle}</span> • Released {FEATURED_ALBUM.releaseYear}
                </p>
              </div>

              {/* Streaming & Player Buttons */}
              <div className="flex items-center gap-2">
                <a
                  href="/voice"
                  className="px-3.5 py-1.5 bg-[#d4af37] hover:bg-[#dfbc7a] text-black text-[10.5px] font-bold uppercase tracking-wider rounded transition-transform hover:scale-105 active:scale-95"
                >
                  Open Player
                </a>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
              {FEATURED_ALBUM.description}
            </p>
          </div>

          {/* Interactive Tracklist */}
          <div className="flex flex-col gap-2">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400 mb-1">
              Tracklist (Click to Listen)
            </h3>

            {FEATURED_ALBUM.tracks.map((t, idx) => {
              const isCurrent = activeTrackIndex === idx;
              return (
                <div
                  key={t.number}
                  onClick={() => toggleTrack(idx)}
                  className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-200 cursor-pointer ${
                    isCurrent && isPlaying
                      ? "bg-[#d4af37]/15 border-[#d4af37]/60 text-white shadow-[0_0_15px_rgba(212,175,55,0.15)]"
                      : "bg-zinc-900/60 border-white/5 hover:bg-zinc-900 hover:border-white/15 text-zinc-300"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <button
                      type="button"
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-transform ${
                        isCurrent && isPlaying
                          ? "bg-[#d4af37] text-black scale-105"
                          : "bg-zinc-800 text-zinc-300 hover:text-white"
                      }`}
                    >
                      {isCurrent && isPlaying ? "⏸" : "▶"}
                    </button>
                    <div>
                      <p className={`text-xs sm:text-sm font-medium ${isCurrent ? "text-[#d4af37]" : "text-white"}`}>
                        {t.number}. {t.title}
                      </p>
                      <p className="text-[10px] text-zinc-400">
                        {t.credits}
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-mono text-zinc-400">
                    {t.duration}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

