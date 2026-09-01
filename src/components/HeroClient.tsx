"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import type { Locale } from "@/lib/config";
import { SafeImage } from "./SafeImage";
import {
  fadeUp,
  heroWordmark,
  springGentle,
  staggerContainerSlow,
} from "@/lib/motion";

type Props = {
  locale: Locale;
  wordmark: string;
  eyebrow: string;
  tagline: string;
  ctaScroll: string;
};

export function HeroClient({
  locale,
  wordmark,
  eyebrow,
  tagline,
  ctaScroll,
}: Props) {
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll parallax: quando o hero sai da view, a imagem sobe mais devagar que o texto
  // Isso cria sensação de profundidade sem gimmick
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Imagem sobe 15% (parallax lento)
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  // Escala levemente (dá sensação de zoom-out ao sair)
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  // Texto sobe mais rápido que a imagem = parallax
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  // Fade out do texto ao rolar
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="safe-zone safe-zone-overlay-center relative min-h-screen flex flex-col justify-between overflow-hidden pt-32 pb-14"
    >
      {/* Background image com parallax e ken-burns */}
      <motion.div
        style={{ y: imageY, scale: imageScale }}
        className="absolute inset-0 z-0 will-change-transform"
      >
        <SafeImage
          id="hero-bg"
          locale={locale}
          priority
          fill
          sizes="100vw"
          className="ken-burns"
        />
      </motion.div>

      {/* Conteúdo com parallax mais rápido */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="safe-zone-content justify-between will-change-transform"
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainerSlow}
          className="container-luxe flex-1 flex flex-col items-center justify-center text-center gap-10"
        >
          <motion.p variants={fadeUp} className="eyebrow text-emerald">
            {eyebrow}
          </motion.p>

          <motion.h1
            variants={heroWordmark}
            className="display-mega text-ink"
          >
            {wordmark}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="body-lg text-ink/85 max-w-2xl whitespace-pre-line"
          >
            {tagline}
          </motion.p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springGentle, delay: 1.2 }}
          className="container-luxe flex justify-center"
        >
          <a
            href="#manifesto"
            className="group flex flex-col items-center gap-3 text-ink/55 hover:text-emerald transition-colors duration-700"
            aria-label={ctaScroll}
          >
            <span className="text-[11px] tracking-[0.32em] uppercase">
              {ctaScroll}
            </span>
            <span
              aria-hidden
              className="block w-px h-16 bg-current opacity-40 group-hover:opacity-100 transition-opacity duration-700"
            />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
