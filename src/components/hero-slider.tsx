"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface HeroSliderProps {
  images: string[];
  autoPlayInterval?: number;
  /** Optional MP4 video — when set, replaces the image slider */
  videoSrc?: string;
}

export function HeroSlider({
  images,
  autoPlayInterval = 8000,
  videoSrc,
}: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (videoSrc) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, autoPlayInterval);
    return () => clearInterval(timer);
  }, [currentIndex, autoPlayInterval, images.length, videoSrc]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {videoSrc ? (
        /* ── Video background ── */
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={images[0]}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : (
        /* ── Image slider with Ken Burns ── */
        <div className="relative w-full h-full">
          {images.map((image, index) => {
            const isActive = index === currentIndex;
            return (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-[1.8s] ease-in-out ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={image}
                  alt={`Eco Area Limonar ${index + 1}`}
                  fill
                  priority={index < 2}
                  loading={index < 2 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : "low"}
                  className={`object-cover transition-transform duration-[10s] ease-out ${
                    isActive ? "scale-110" : "scale-100"
                  }`}
                  quality={55}
                  sizes="100vw"
                />
              </div>
            );
          })}
        </div>
      )}

      {/* Cinematic overlay — deep blue mediterranean tint */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(
            180deg,
            rgba(6,74,110,0.10) 0%,
            rgba(6,74,110,0.30) 40%,
            rgba(4,55,82,0.75) 100%
          )`,
        }}
      />

      {/* Minimal progress dots — only on desktop */}
      {!videoSrc && images.length > 1 && (
        <div className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-10 gap-1.5">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1 rounded-full transition-all duration-500 ${
                index === currentIndex
                  ? "bg-white w-8"
                  : "bg-white/30 w-4 hover:bg-white/50"
              }`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
