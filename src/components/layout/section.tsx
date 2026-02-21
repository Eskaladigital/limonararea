/**
 * Section - Contenedor de sección estilo pruebas_html V5 mediterránea
 * Padding consistente (clamp 4rem-6rem), variantes de fondo
 */

import { ReactNode } from "react";

type SectionVariant = "cream" | "sand" | "white" | "earth" | "default";

interface SectionProps {
  children: ReactNode;
  /** Variante de fondo */
  variant?: SectionVariant;
  /** ID para anclas */
  id?: string;
  /** Clases adicionales */
  className?: string;
}

const variantClasses: Record<SectionVariant, string> = {
  cream: "bg-cream",
  sand: "bg-sand-lt",
  white: "bg-white",
  earth: "bg-earth-deep text-white",
  default: "bg-cream",
};

export function Section({
  children,
  variant = "default",
  id,
  className = "",
}: SectionProps) {
  return (
    <section
      id={id}
      className={`py-16 md:py-20 lg:py-24 ${variantClasses[variant]} ${className}`}
    >
      <div className="container mx-auto px-4">{children}</div>
    </section>
  );
}
