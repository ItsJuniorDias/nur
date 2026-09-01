"use client";

import { motion } from "motion/react";
import type { Locale } from "@/lib/config";
import { SafeImage } from "./SafeImage";
import type { ImageId } from "./SafeImage";
import { Reveal } from "./Reveal";
import { fadeUp, silk, springGentle, staggerContainer } from "@/lib/motion";

type Item = {
  imageId: ImageId;
  name: string;
  origin: string;
};

type Props = {
  locale: Locale;
  eyebrow: string;
  heading: string;
  body: string;
  items: Item[];
};

export function IngredientsClient({
  locale,
  eyebrow,
  heading,
  body,
  items,
}: Props) {
  return (
    <section id="ingredients" className="py-32 md:py-48 lg:py-56 bg-sand-soft">
      <div className="container-luxe">
        {/* Header — mantém Reveal (fade CSS já suficiente aqui) */}
        <div className="grid md:grid-cols-12 gap-10 md:gap-16 mb-20 md:mb-28">
          <Reveal as="p" className="eyebrow text-emerald md:col-span-3 md:pt-3">
            {eyebrow}
          </Reveal>
          <div className="md:col-span-9 flex flex-col gap-8">
            <Reveal as="h2" delay={1} className="display-xl">
              {heading}
            </Reveal>
            <Reveal as="p" delay={2} className="body-lg text-ink/75 max-w-2xl">
              {body}
            </Reveal>
          </div>
        </div>

        {/* Grid com scroll-triggered stagger — só entra quando 20% aparece */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          variants={staggerContainer}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {items.map((item) => (
            <motion.article
              key={item.imageId}
              variants={fadeUp}
              whileHover={{ y: -6, transition: springGentle }}
              className="group cursor-pointer"
            >
              <div className="safe-zone safe-zone-overlay-bottom aspect-square-luxe bg-sand-deep overflow-hidden">
                <motion.div
                  className="absolute inset-0"
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 1.2, ease: silk }}
                >
                  <SafeImage
                    id={item.imageId}
                    locale={locale}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </motion.div>

                <div className="absolute bottom-3 left-3 right-3 z-10 blur-overlay-emerald px-4 py-3 rounded-xl">
                  <p className="text-sand/95 text-[13px] tracking-[0.02em] font-light leading-tight">
                    {item.name}
                  </p>
                  <p className="text-sand/55 text-[10px] tracking-[0.24em] uppercase mt-1">
                    {item.origin}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
