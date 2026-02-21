import Image from "next/image";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  tag?: string;
  children?: React.ReactNode;
  className?: string;
  /** Background image path — makes the hero photographic instead of flat */
  backgroundImage?: string;
  /** Extra dark overlay on top of the image (0–1). Defaults to 0.55 */
  overlayOpacity?: number;
}

export function PageHero({
  title,
  subtitle,
  tag,
  children,
  className = "",
  backgroundImage,
  overlayOpacity = 0.55,
}: PageHeroProps) {
  return (
    <section
      className={`relative min-h-[45vh] md:min-h-[50vh] flex flex-col justify-end overflow-hidden ${className}`}
    >
      {/* Background: photo or gradient fallback */}
      {backgroundImage ? (
        <>
          <Image
            src={backgroundImage}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
            quality={60}
          />
          {/* Cinematic gradient overlay — dark bottom for text readability */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(
                to bottom,
                rgba(6,74,110,0.15) 0%,
                rgba(6,74,110,${overlayOpacity * 0.5}) 50%,
                rgba(6,74,110,${overlayOpacity}) 100%
              )`,
            }}
          />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-earth via-earth-deep to-[#032A3E]" />
      )}

      {/* Content — pushed to the bottom of the hero */}
      <div className="relative z-10 container mx-auto px-4 pb-10 md:pb-14 pt-32 md:pt-40 text-center">
        {tag && (
          <div className="inline-flex items-center gap-2 text-xs md:text-sm font-extrabold uppercase tracking-[0.18em] text-white/80 mb-4 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/15">
            {tag}
          </div>
        )}
        <h1
          className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-extrabold text-white mb-3 md:mb-4 leading-[1.1] tracking-tight drop-shadow-lg"
        >
          {title}
        </h1>
        {subtitle && (
          <p className="text-base md:text-lg lg:text-xl text-white/70 max-w-xl mx-auto font-light leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {children && (
        <div className="container mx-auto px-4 relative z-20 -mb-8">
          {children}
        </div>
      )}
    </section>
  );
}
