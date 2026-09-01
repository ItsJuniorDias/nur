"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useAnimationControls } from "motion/react";
import { useCart, useCartCount } from "@/lib/cart";
import { springSnappy } from "@/lib/motion";

/**
 * Cart icon com contador.
 * - Bump quando count aumenta (spring snappy)
 * - Badge com number morph (fade + slide up/down)
 * - Suppress SSR (zustand persist hidrata só no client)
 */
export function CartToggle({ label }: { label: string }) {
  const toggle = useCart((s) => s.toggle);
  const count = useCartCount();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Bump animation quando count aumenta
  const controls = useAnimationControls();
  const prevCount = useRef(count);
  useEffect(() => {
    if (!mounted) return;
    if (count > prevCount.current) {
      controls.start({
        scale: [1, 1.15, 1],
        transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }, // back-out
      });
    }
    prevCount.current = count;
  }, [count, controls, mounted]);

  return (
    <motion.button
      onClick={toggle}
      aria-label={label}
      animate={controls}
      whileTap={{ scale: 0.92 }}
      className="relative flex items-center gap-2 text-ink/75 hover:text-emerald transition-colors duration-500"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        aria-hidden="true"
      >
        <path d="M4 6 L4 17 A1 1 0 0 0 5 18 L15 18 A1 1 0 0 0 16 17 L16 6 Z" />
        <path d="M7 6 L7 4.5 A3 3 0 0 1 13 4.5 L13 6" />
      </svg>

      <AnimatePresence mode="popLayout">
        {mounted && count > 0 && (
          <motion.span
            key={count}
            initial={{ opacity: 0, y: -8, scale: 0.6 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.6 }}
            transition={springSnappy}
            className="absolute -top-1.5 -right-2 min-w-[16px] h-[16px] px-1 rounded-full bg-emerald text-sand text-[10px] font-medium tabular-nums flex items-center justify-center"
          >
            {count}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
