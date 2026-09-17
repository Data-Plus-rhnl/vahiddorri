"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { FEATURED_ALBUM } from "@/lib/data";

export default function VoicePlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.85);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  const currentTrack = FEATURED_ALBUM.tracks[currentTrackIndex];

  // Sync audio play/pause
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex, volume]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleTrackEnded = () => {
    handleNext();
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSelectTrack = (index: number) => {
    if (currentTrackIndex === index) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrackIndex(index);
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % FEATURED_ALBUM.tracks.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) =>
      prev === 0 ? FEATURED_ALBUM.tracks.length - 1 : prev - 1
    );
    setIsPlaying(true);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressBarRef.current && audioRef.current && duration > 0) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const progressRatio = Math.max(0, Math.min(1, clickX / rect.width));
      const newTime = progressRatio * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time) || time === 0) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="w-full luxury-card rounded-2xl p-6 sm:p-10">
      {/* Hidden Native Audio Element */}
      <audio
        ref={audioRef}
        src={currentTrack.audioSrc}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleTrackEnded}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column: Album Art & Available Platforms */}
        <div className="lg:col-span-5 flex flex-col items-center lg:items-start">
          <h2 className="font-serif-heading text-2xl sm:text-3xl font-bold text-white mb-4">
            {FEATURED_ALBUM.title}
          </h2>

          <div className="relative w-full max-w-[320px] aspect-square rounded-lg overflow-hidden border border-[#d4af37]/40 shadow-[0_15px_40px_rgba(0,0,0,0.8)] group">
            <Image
              src={FEATURED_ALBUM.coverImage}
              alt={FEATURED_ALBUM.title}
              fill
              sizes="(max-width: 640px) 300px, 320px"
              priority
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>

          {/* Available Now Platforms */}
          <div className="mt-6 w-full max-w-[320px]">
            <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-zinc-400 mb-3 text-center lg:text-left">
              AVAILABLE NOW ON:
            </h3>
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <a
                href="https://spotify.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-zinc-900 hover:bg-[#1DB954] hover:text-black text-zinc-200 text-xs font-semibold uppercase tracking-wider rounded border border-zinc-700 transition-all duration-200"
              >
                Spotify
              </a>
              <a
                href="https://apple.com/itunes"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-zinc-900 hover:bg-zinc-100 hover:text-black text-zinc-200 text-xs font-semibold uppercase tracking-wider rounded border border-zinc-700 transition-all duration-200"
              >
                iTunes
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Player & Songs List */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div>
            {/* Active Track Banner */}
            <div className="bg-zinc-900/80 border border-zinc-800 p-4 rounded-xl mb-4">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#d4af37] font-bold">
                  Now Playing Track {currentTrack.number} of {FEATURED_ALBUM.tracks.length}
                </span>
                <span className="text-xs font-mono text-zinc-400">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>
              <h3 className="font-serif-heading text-xl sm:text-2xl font-bold text-white">
                {currentTrack.title}
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                {currentTrack.credits}
              </p>

              {/* Progress / Seek Bar */}
              <div
                ref={progressBarRef}
                onClick={handleSeek}
                className="relative w-full h-2.5 bg-zinc-800 rounded-full mt-4 cursor-pointer overflow-hidden group"
              >
                <div
                  className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-[#c5a059] to-[#dfbc7a] transition-all duration-100"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* Player Control Buttons */}
              <div className="flex items-center justify-center gap-6 mt-4 pt-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="text-zinc-400 hover:text-white transition-colors p-2 cursor-pointer text-lg"
                  aria-label="Previous track"
                >
                  ⏮
                </button>
                <button
                  type="button"
                  onClick={handlePlayPause}
                  data-cursor="play"
                  className="w-12 h-12 rounded-full bg-[#d4af37] text-black hover:bg-[#dfbc7a] flex items-center justify-center text-lg font-bold shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-transform hover:scale-105 active:scale-95 cursor-pointer pl-0.5"
                  aria-label={isPlaying ? "Pause track" : "Play track"}
                >
                  {isPlaying ? "⏸" : "▶"}
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="text-zinc-400 hover:text-white transition-colors p-2 cursor-pointer text-lg"
                  aria-label="Next track"
                >
                  ⏭
                </button>
              </div>
            </div>

            {/* SONGS PLAYLIST */}
            <div className="mt-6">
              <h4 className="text-xs uppercase tracking-[0.25em] font-bold text-zinc-400 mb-3 pb-2 border-b border-zinc-800">
                SONGS
              </h4>
              <div className="flex flex-col gap-2">
                {FEATURED_ALBUM.tracks.map((track, idx) => {
                  const isActive = currentTrackIndex === idx;
                  return (
                    <div
                      key={track.number}
                      data-cursor="play"
                      onClick={() => handleSelectTrack(idx)}
                      className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-200 cursor-pointer ${
                        isActive
                          ? "bg-[#d4af37]/15 border-[#d4af37]/60 text-white shadow-[0_0_15px_rgba(212,175,55,0.15)]"
                          : "bg-zinc-900/50 border-white/5 hover:bg-zinc-900 hover:border-white/15 text-zinc-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            isActive && isPlaying
                              ? "bg-[#d4af37] text-black"
                              : "bg-zinc-800 text-zinc-400"
                          }`}
                        >
                          {isActive && isPlaying ? "⏸" : "▶"}
                        </span>
                        <div>
                          <p className={`text-xs sm:text-sm font-semibold ${isActive ? "text-[#d4af37]" : "text-white"}`}>
                            {track.number}. {track.title}
                          </p>
                          <p className="text-[11px] text-zinc-400">
                            {track.credits}
                          </p>
                        </div>
                      </div>

                      <span className="text-xs font-mono text-zinc-400">
                        {track.duration}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Album Credits and Buy Section */}
            <div className="mt-8 pt-6 border-t border-zinc-800">
              <div className="text-xs text-zinc-400 space-y-1">
                {FEATURED_ALBUM.credits.map((c, i) => (
                  <p key={i}>{c}</p>
                ))}
              </div>

              {/* Price & Buy Now */}
              <div className="mt-5 flex items-center justify-between flex-wrap gap-4 bg-zinc-900/80 p-4 rounded-xl border border-zinc-800">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-zinc-400 block">Digital Version</span>
                  <span className="text-xl font-bold text-white">{FEATURED_ALBUM.price}</span>
                </div>

                <a
                  href="https://www.paypal.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 bg-[#d4af37] hover:bg-[#dfbc7a] text-black text-xs font-bold uppercase tracking-widest rounded-md shadow-lg transition-transform hover:scale-105 active:scale-95"
                >
                  Buy Now
                </a>
              </div>
            </div>
          </div>

          {/* Back to Music Link */}
          <div className="mt-8 pt-4 border-t border-zinc-900 flex justify-between items-center">
            <a
              href="/music"
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#d4af37] hover:underline font-semibold"
            >
              ← Back to Music
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
