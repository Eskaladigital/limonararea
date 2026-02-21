/**
 * SectionHeader - Patrón de cabecera de sección estilo pruebas_html V5 mediterránea
 * s-tag (label) → s-ttl (título) → s-dsc (descripción)
 */

interface SectionHeaderProps {
  /** Etiqueta pequeña superior (ej. "Servicios", "Tarifas") */
  tag?: string;
  /** Título principal */
  title: string;
  /** Descripción opcional */
  description?: string;
  /** Centrado (s-hd--c) */
  centered?: boolean;
  /** Variante oscura (para secciones earth-deep) */
  dark?: boolean;
  className?: string;
}

export function SectionHeader({
  tag,
  title,
  description,
  centered = true,
  dark = false,
  className = "",
}: SectionHeaderProps) {
  const tagClass = dark
    ? "text-clay-lt text-xs font-bold uppercase tracking-[0.14em] mb-2"
    : "text-clay text-xs font-bold uppercase tracking-[0.14em] mb-2";
  const titleClass = dark
    ? "font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight mb-2"
    : "font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-earth leading-tight mb-2";
  const descClass = dark
    ? "text-sm md:text-base text-white/50 font-light max-w-xl leading-relaxed"
    : "text-sm md:text-base text-gray-600 font-light max-w-xl leading-relaxed";

  return (
    <div
      className={`mb-10 md:mb-12 ${centered ? "text-center" : ""} ${className}`}
    >
      {tag && (
        <div className={`inline-flex items-center gap-2 ${tagClass}`}>
          <span className="w-3 h-0.5 rounded-full bg-current" aria-hidden />
          {tag}
        </div>
      )}
      <h2 className={titleClass}>{title}</h2>
      {description && (
        <p className={`${descClass} ${centered ? "mx-auto" : ""}`}>
          {description}
        </p>
      )}
    </div>
  );
}
