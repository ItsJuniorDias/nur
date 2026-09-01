"use client";

import { useEffect, useRef, type ReactNode } from "react";

type RevealProps = {
  children?: ReactNode;
  delay?: 0 | 1 | 2 | 3 | 4;
  as?: "div" | "section" | "h1" | "h2" | "p" | "span" | "article";
  className?: string;
};

/**
 * Envolve conteúdo em fade-in ao entrar no viewport (Apple-like).
 * Use `delay` pra stagger em uma sequência de elementos.
 */
export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      node.classList.add("is-visible");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -80px 0px" }
    );

    io.observe(node);
    return () => io.disconnect();
  }, []);

  const delayClass = delay ? `reveal-delay-${delay}` : "";

  return (
    // @ts-expect-error - dynamic tag
    <Tag ref={ref} className={`reveal ${delayClass} ${className}`.trim()}>
      {children}
    </Tag>
  );
}
