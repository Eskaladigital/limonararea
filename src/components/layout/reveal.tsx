"use client";

/**
 * Reveal - Animación de entrada al scroll (estilo pruebas_html)
 * opacity 0 + translateY(20px) → visible al entrar en viewport
 */

import { useEffect, useRef, useState, ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Delay en ms entre elementos (para stagger) */
  delay?: number;
  /** Retraso de este elemento */
  index?: number;
  className?: string;
}

export function Reveal({ children, delay = 0, index = 0, className = "" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let timeoutId: ReturnType<typeof setTimeout>;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            timeoutId = setTimeout(() => setVisible(true), delay + index * 40);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.08 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, [delay, index]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-500 ease-out ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-5"
      } ${className}`}
    >
      {children}
    </div>
  );
}
