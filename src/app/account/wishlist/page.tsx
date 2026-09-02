"use client";

import React from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/product/ProductCard";
import { useWishlist } from "@/contexts/WishlistContext";
import { products } from "@/lib/data/products";
import { getGoldPrice } from "@/lib/data/gold-prices";

export default function WishlistPage() {
  const { items } = useWishlist();
  const goldPrice = getGoldPrice();

  const wishlistProducts = products.filter((p) =>
    items.some((item) => item.productId === p.id),
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
          <h1 className="text-2xl font-bold text-foreground mb-6">
            علاقه‌مندی‌ها
          </h1>

          {wishlistProducts.length === 0 ? (
            <div className="py-20 text-center">
              <Heart className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-lg font-semibold">لیست علاقه‌مندی‌ها خالی است</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                محصولات مورد علاقه خود را ذخیره کنید
              </p>
              <Link
                href="/shop"
                className="inline-block mt-4 px-5 py-2.5 bg-charcoal text-white rounded-lg text-sm font-medium hover:bg-gold transition-colors"
              >
                مشاهده فروشگاه
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {wishlistProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  goldPrice={goldPrice}
                />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
