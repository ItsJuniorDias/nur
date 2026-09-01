"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartLine = {
  productSlug: string;
  variantId: string;
  quantity: number;
};

type CartStore = {
  lines: CartLine[];
  isOpen: boolean;
  add: (productSlug: string, variantId: string, quantity?: number) => void;
  remove: (productSlug: string, variantId: string) => void;
  setQuantity: (productSlug: string, variantId: string, quantity: number) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

export const useCart = create<CartStore>()(
  persist(
    (set) => ({
      lines: [],
      isOpen: false,

      add: (productSlug, variantId, quantity = 1) =>
        set((state) => {
          const existing = state.lines.find(
            (l) => l.productSlug === productSlug && l.variantId === variantId
          );
          if (existing) {
            return {
              lines: state.lines.map((l) =>
                l.productSlug === productSlug && l.variantId === variantId
                  ? { ...l, quantity: l.quantity + quantity }
                  : l
              ),
              isOpen: true,
            };
          }
          return {
            lines: [...state.lines, { productSlug, variantId, quantity }],
            isOpen: true,
          };
        }),

      remove: (productSlug, variantId) =>
        set((state) => ({
          lines: state.lines.filter(
            (l) => !(l.productSlug === productSlug && l.variantId === variantId)
          ),
        })),

      setQuantity: (productSlug, variantId, quantity) =>
        set((state) => ({
          lines: state.lines
            .map((l) =>
              l.productSlug === productSlug && l.variantId === variantId
                ? { ...l, quantity }
                : l
            )
            .filter((l) => l.quantity > 0),
        })),

      clear: () => set({ lines: [], isOpen: false }),

      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set((state) => ({ isOpen: !state.isOpen })),
    }),
    {
      name: "nur-cart",
      partialize: (state) => ({ lines: state.lines }), // não persiste isOpen
    }
  )
);

/**
 * Contador total de items — usado no badge do cart icon.
 */
export function useCartCount(): number {
  return useCart((s) => s.lines.reduce((sum, l) => sum + l.quantity, 0));
}
