/**
 * Motion primitives — configs compartilhadas de spring e easing.
 *
 * Regra de bolso:
 *   - `silk` / `easeOut` → transições de opacity, cor, backdrop-filter
 *   - `gentle` (spring) → entradas de conteúdo, layout shifts, hovers
 *   - `snappy` (spring) → feedback imediato (add to bag, cart bump)
 *   - `firm` (spring) → drawer, modais, elementos que "encostam"
 */

import type { Transition } from "motion/react";

// ─────────── Easings ───────────
export const silk = [0.25, 1, 0.5, 1] as const; // ease-out-quart (bate com o CSS existente)
export const inOutQuart = [0.76, 0, 0.24, 1] as const;

// ─────────── Springs ───────────
export const springGentle: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 24,
  mass: 0.8,
};

export const springSnappy: Transition = {
  type: "spring",
  stiffness: 320,
  damping: 26,
  mass: 0.6,
};

export const springFirm: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 32,
  mass: 0.9,
};

// ─────────── Durations pra tweens ───────────
export const durSilk = 0.9;
export const durMedium = 0.6;
export const durQuick = 0.35;

// ─────────── Variants reutilizáveis ───────────

/** Container que faz stagger dos filhos */
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

export const staggerContainerSlow = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.2,
    },
  },
};

/** Item que sobe suave — casa com o fade do CSS Reveal */
export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: durSilk, ease: silk },
  },
};

export const fadeUpSubtle = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: durMedium, ease: silk },
  },
};

/** Wordmark do hero — scale sutil + fade */
export const heroWordmark = {
  hidden: { opacity: 0, scale: 0.96, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { ...springGentle, delay: 0.1 },
  },
};

/** Page transitions — entre rotas */
export const pageTransition = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: durMedium, ease: silk },
  },
  exit: {
    opacity: 0,
    transition: { duration: durQuick, ease: silk },
  },
};
