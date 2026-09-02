"use client";

import React from "react";
import Link from "next/link";
import { Heart, ShoppingBag, Package } from "lucide-react";
import { Product, GoldPrice } from "@/lib/types";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { calculateProductPrice } from "@/lib/services/pricing";
import { formatPrice, cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  goldPrice: GoldPrice;
}

export default function ProductCard({ product, goldPrice }: ProductCardProps) {
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const price = calculateProductPrice(product, goldPrice);
  const inWishlist = isInWishlist(product.id);
  const isAvailable = product.availability === "in_stock" && product.stock > 0;

  return (
    <div className="group relative bg-card rounded-xl border border-border overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-border/60">
      {/* Image */}
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-square bg-secondary/50 overflow-hidden">
          {/* Placeholder image */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Package className="w-12 h-12 text-muted-foreground/30" />
          </div>

          {/* Badges */}
          <div className="absolute top-3 start-3 flex flex-col gap-1.5">
            {product.isNew && (
              <span className="px-2 py-0.5 bg-gold text-white text-[10px] font-bold rounded-full">
                جدید
              </span>
            )}
            {!isAvailable && (
              <span className="px-2 py-0.5 bg-destructive text-white text-[10px] font-bold rounded-full">
                ناموجود
              </span>
            )}
          </div>

          {/* Wishlist button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={cn(
              "absolute top-3 end-3 w-8 h-8 rounded-full flex items-center justify-center transition-all",
              inWishlist
                ? "bg-destructive/10 text-destructive"
                : "bg-white/80 text-muted-foreground opacity-0 group-hover:opacity-100",
            )}
            aria-label={inWishlist ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
          >
            <Heart className={cn("w-4 h-4", inWishlist && "fill-current")} />
          </button>
        </div>
      </Link>

      {/* Info */}
      <div className="p-4">
        <Link href={`/product/${product.slug}`}>
          <h3 className="text-sm font-semibold text-foreground line-clamp-1 hover:text-gold transition-colors">
            {product.title}
          </h3>
        </Link>

        <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
          <span>{product.weight} گرم</span>
          <span>•</span>
          <span>عیار {product.purity}</span>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div>
            <p className="text-lg font-bold text-foreground">{formatPrice(price)}</p>
            <p className="text-[10px] text-muted-foreground">تومان</p>
          </div>

          {isAvailable ? (
            <button
              onClick={() => addItem(product, price)}
              className="w-9 h-9 rounded-lg bg-charcoal text-white flex items-center justify-center hover:bg-gold transition-colors"
              aria-label="افزودن به سبد خرید"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          ) : (
            <span className="text-xs text-muted-foreground px-3 py-1.5 bg-muted rounded-lg">
              ناموجود
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
