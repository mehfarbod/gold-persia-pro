"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import { getFeaturedProducts } from "@/lib/data/products";
import { getGoldPrice } from "@/lib/data/gold-prices";

export default function FeaturedProducts() {
  const featured = getFeaturedProducts();
  const goldPrice = getGoldPrice();

  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
            محصولات ویژه
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            منتخبی از بهترین محصولات ما
          </p>
        </div>
        <Link
          href="/shop"
          className="inline-flex items-center gap-1 text-sm font-medium text-gold hover:text-gold-dark transition-colors"
        >
          مشاهده همه
          <ArrowLeft className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {featured.slice(0, 8).map((product) => (
          <ProductCard key={product.id} product={product} goldPrice={goldPrice} />
        ))}
      </div>
    </section>
  );
}
