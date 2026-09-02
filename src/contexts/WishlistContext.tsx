"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { WishlistItem } from "@/lib/types";
import { toast } from "sonner";

interface WishlistContextValue {
  items: WishlistItem[];
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("goldstone-wishlist");
      if (saved) setItems(JSON.parse(saved));
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("goldstone-wishlist", JSON.stringify(items));
  }, [items]);

  const isInWishlist = useCallback(
    (productId: string) => items.some((item) => item.productId === productId),
    [items],
  );

  const toggleWishlist = useCallback(
    (productId: string) => {
      setItems((prev) => {
        const exists = prev.some((item) => item.productId === productId);
        if (exists) {
          toast.success("از علاقه‌مندی‌ها حذف شد");
          return prev.filter((item) => item.productId !== productId);
        }
        toast.success("به علاقه‌مندی‌ها اضافه شد");
        return [...prev, { productId, addedAt: new Date().toISOString() }];
      });
    },
    [],
  );

  const removeFromWishlist = useCallback((productId: string) => {
    setItems((prev) => prev.filter((item) => item.productId !== productId));
    toast.success("از علاقه‌مندی‌ها حذف شد");
  }, []);

  return (
    <WishlistContext.Provider
      value={{ items, isInWishlist, toggleWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context)
    throw new Error("useWishlist must be used within a WishlistProvider");
  return context;
}
