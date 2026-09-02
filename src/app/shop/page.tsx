"use client";

import React, { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/product/ProductCard";
import { products } from "@/lib/data/products";
import { categories } from "@/lib/data/categories";
import { getGoldPrice } from "@/lib/data/gold-prices";
import { cn } from "@/lib/utils";

const sortOptions = [
  { value: "newest", label: "جدیدترین" },
  { value: "cheapest", label: "ارزان‌ترین" },
  { value: "expensive", label: "گران‌ترین" },
  { value: "popular", label: "محبوب‌ترین" },
];

export default function ShopPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "";
  const initialSearch = searchParams.get("search") || "";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState("newest");
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [showFilters, setShowFilters] = useState(false);

  const goldPrice = getGoldPrice();

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q),
      );
    }

    // Sort
    switch (sortBy) {
      case "cheapest":
        result.sort((a, b) => a.finalPrice - b.finalPrice);
        break;
      case "expensive":
        result.sort((a, b) => b.finalPrice - a.finalPrice);
        break;
      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        break;
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
          {/* Page header */}
          <div className="mb-8">
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
              فروشگاه
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {filteredProducts.length} محصول یافت شد
            </p>
          </div>

          {/* Search & Filters bar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute end-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="جستجو در محصولات..."
                className="w-full h-10 ps-4 pe-10 bg-card border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all"
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                "inline-flex items-center gap-2 px-4 h-10 border border-border rounded-xl text-sm transition-colors",
                showFilters
                  ? "bg-charcoal text-white"
                  : "bg-card text-muted-foreground hover:border-gold/30",
              )}
            >
              <SlidersHorizontal className="w-4 h-4" />
              فیلتر
            </button>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-10 px-4 bg-card border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Filters panel */}
          {showFilters && (
            <div className="mb-6 p-4 bg-card border border-border rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold">دسته‌بندی</h3>
                {selectedCategory && (
                  <button
                    onClick={() => setSelectedCategory("")}
                    className="text-xs text-gold hover:text-gold-dark flex items-center gap-1"
                  >
                    <X className="w-3 h-3" />
                    پاک کردن
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory("")}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-medium transition-colors border",
                    !selectedCategory
                      ? "bg-charcoal text-white border-charcoal"
                      : "bg-card text-muted-foreground border-border hover:border-gold/30",
                  )}
                >
                  همه
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-xs font-medium transition-colors border",
                      selectedCategory === cat.slug
                        ? "bg-charcoal text-white border-charcoal"
                        : "bg-card text-muted-foreground border-border hover:border-gold/30",
                    )}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Active category chips (mobile) */}
          {selectedCategory && !showFilters && (
            <div className="flex items-center gap-2 mb-4 lg:hidden">
              <span className="text-xs text-muted-foreground">دسته:</span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gold/10 text-gold text-xs rounded-full">
                {categories.find((c) => c.slug === selectedCategory)?.name}
                <button onClick={() => setSelectedCategory("")}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            </div>
          )}

          {/* Product grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  goldPrice={goldPrice}
                />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-secondary flex items-center justify-center mb-4">
                <Search className="w-6 h-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                محصولی یافت نشد
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                فیلترها را تغییر دهید یا عبارت جستجو را بررسی کنید
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
