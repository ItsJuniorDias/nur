"use client";

import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { pageTransition } from "@/lib/motion";

/**
 * template.tsx roda A CADA rota — diferente de layout.tsx que persiste.
 * Isso permite AnimatePresence rastrear enter/exit entre páginas.
 *
 * Key no pathname garante remount limpo quando a rota muda.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial="hidden"
      animate="visible"
      variants={pageTransition}
      className="will-change-[opacity,transform]"
    >
      {children}
    </motion.div>
  );
}
