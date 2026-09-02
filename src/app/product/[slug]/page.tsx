"use client";

import React, { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Heart,
  ShoppingBag,
  Package,
  ChevronLeft,
  Shield,
  FileText,
  Truck,
  Minus,
  Plus,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getProductBySlug } from "@/lib/data/products";
import { getGoldPrice } from "@/lib/data/gold-prices";
import { calculateProductPrice, getPriceBreakdown } from "@/lib/services/pricing";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { formatPrice, cn } from "@/lib/utils";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const product = getProductBySlug(slug);
  const goldPrice = getGoldPrice();
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [quantity, setQuantity] = React.useState(1);

  if (!product) {
    notFound();
  }

  const price = calculateProductPrice(product, goldPrice);
  const breakdown = getPriceBreakdown(product, goldPrice);
  const inWishlist = isInWishlist(product.id);
  const isAvailable = product.availability === "in_stock" && product.stock > 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-6 lg:py-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
            <Link href="/" className="hover:text-gold transition-colors">
              خانه
            </Link>
            <ChevronLeft className="w-3 h-3" />
            <Link href="/shop" className="hover:text-gold transition-colors">
              فروشگاه
            </Link>
            <ChevronLeft className="w-3 h-3" />
            <span className="text-foreground">{product.title}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Gallery */}
            <div className="space-y-4">
              <div className="aspect-square bg-secondary/50 rounded-2xl border border-border flex items-center justify-center">
                <Package className="w-24 h-24 text-muted-foreground/20" />
              </div>
              {/* Thumbnail strip */}
              <div className="flex gap-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-16 h-16 lg:w-20 lg:h-20 rounded-lg bg-secondary/50 border border-border flex items-center justify-center"
                  >
                    <Package className="w-5 h-5 text-muted-foreground/20" />
                  </div>
                ))}
              </div>
            </div>

            {/* Details */}
            <div>
              {/* Badges */}
              <div className="flex items-center gap-2 mb-3">
                {product.isNew && (
                  <span className="px-2.5 py-0.5 bg-gold text-white text-xs font-medium rounded-full">
                    جدید
                  </span>
                )}
                <span
                  className={cn(
                    "px-2.5 py-0.5 text-xs font-medium rounded-full",
                    isAvailable
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-red-50 text-red-700",
                  )}
                >
                  {isAvailable ? "موجود" : "ناموجود"}
                </span>
              </div>

              <h1 className="text-xl lg:text-2xl font-bold text-foreground">
                {product.title}
              </h1>

              {/* Specs */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="bg-secondary/30 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">وزن</p>
                  <p className="text-sm font-semibold mt-0.5">{product.weight} گرم</p>
                </div>
                <div className="bg-secondary/30 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">عیار</p>
                  <p className="text-sm font-semibold mt-0.5">{product.purity} عیار</p>
                </div>
                <div className="bg-secondary/30 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">وضعیت</p>
                  <p className="text-sm font-semibold mt-0.5">
                    {isAvailable ? `${product.stock} عدد موجود` : "ناموجود"}
                  </p>
                </div>
                <div className="bg-secondary/30 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">کد محصول</p>
                  <p className="text-sm font-semibold mt-0.5">{product.sku}</p>
                </div>
              </div>

              {/* Price breakdown */}
              <div className="mt-6 bg-card border border-border rounded-xl p-5">
                <h3 className="text-sm font-semibold mb-3">جزئیات قیمت</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">ارزش طلا</span>
                    <span>{formatPrice(breakdown.goldValue)} تومان</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {breakdown.makingChargeLabel}
                    </span>
                    <span>{formatPrice(breakdown.makingCharge)} تومان</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">سود فروشنده</span>
                    <span>{formatPrice(breakdown.profit)} تومان</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">مالیات ({product.taxPercentage}٪)</span>
                    <span>{formatPrice(breakdown.tax)} تومان</span>
                  </div>
                  <div className="border-t border-border pt-2 mt-2 flex justify-between font-bold text-foreground">
                    <span>قیمت نهایی</span>
                    <span className="text-lg">{formatPrice(price)} تومان</span>
                  </div>
                </div>
                <p className="mt-2 text-[10px] text-muted-foreground">
                  قیمت بر اساس نرخ لحظه‌ای طلا محاسبه شده است
                </p>
              </div>

              {/* Quantity & Add to cart */}
              {isAvailable && (
                <div className="mt-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">تعداد:</span>
                    <div className="flex items-center border border-border rounded-lg">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-9 h-9 flex items-center justify-center hover:bg-secondary transition-colors"
                        disabled={quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-10 text-center text-sm font-medium">
                        {quantity}
                      </span>
                      <button
                        onClick={() =>
                          setQuantity(Math.min(product.stock, quantity + 1))
                        }
                        className="w-9 h-9 flex items-center justify-center hover:bg-secondary transition-colors"
                        disabled={quantity >= product.stock}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        for (let i = 0; i < quantity; i++) {
                          addItem(product, price);
                        }
                      }}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-charcoal text-white rounded-xl font-medium text-sm hover:bg-gold transition-colors"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      افزودن به سبد خرید
                    </button>
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className={cn(
                        "w-12 rounded-xl border flex items-center justify-center transition-colors",
                        inWishlist
                          ? "bg-destructive/10 border-destructive/20 text-destructive"
                          : "border-border hover:border-gold/30",
                      )}
                      aria-label="علاقه‌مندی‌ها"
                    >
                      <Heart
                        className={cn("w-5 h-5", inWishlist && "fill-current")}
                      />
                    </button>
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="mt-8">
                <h3 className="text-sm font-semibold mb-2">توضیحات</h3>
                <p className="text-sm text-muted-foreground leading-7">
                  {product.description}
                </p>
              </div>

              {/* Trust features */}
              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Shield className="w-4 h-4 text-gold shrink-0" />
                  <span>ضمانت اصالت</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <FileText className="w-4 h-4 text-gold shrink-0" />
                  <span>فاکتور معتبر</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Truck className="w-4 h-4 text-gold shrink-0" />
                  <span>ارسال رایگان</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
