"use client";

import React from "react";
import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Package } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

export default function CartPage() {
  const { items, total, itemCount, removeItem, updateQuantity, clearCart } =
    useCart();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 py-8 lg:py-12">
          <h1 className="text-2xl font-bold text-foreground mb-2">سبد خرید</h1>
          <p className="text-sm text-muted-foreground mb-8">
            {itemCount > 0
              ? `${itemCount} محصول در سبد خرید شما`
              : "سبد خرید شما خالی است"}
          </p>

          {items.length === 0 ? (
            <div className="py-20 text-center">
              <div className="w-20 h-20 mx-auto rounded-full bg-secondary flex items-center justify-center mb-4">
                <ShoppingBag className="w-8 h-8 text-muted-foreground" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">
                سبد خرید شما خالی است
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                محصولات مورد علاقه خود را به سبد اضافه کنید
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-charcoal text-white rounded-xl font-medium text-sm hover:bg-gold transition-colors"
              >
                مشاهده فروشگاه
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Items */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-semibold">محصولات</h2>
                  <button
                    onClick={clearCart}
                    className="text-xs text-destructive hover:text-destructive/80 transition-colors"
                  >
                    خالی کردن سبد
                  </button>
                </div>

                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-4 p-4 bg-card border border-border rounded-xl"
                  >
                    {/* Image */}
                    <div className="w-20 h-20 lg:w-24 lg:h-24 shrink-0 bg-secondary/50 rounded-lg flex items-center justify-center">
                      <Package className="w-8 h-8 text-muted-foreground/20" />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/product/${item.product.slug}`}
                        className="text-sm font-semibold text-foreground hover:text-gold transition-colors line-clamp-1"
                      >
                        {item.product.title}
                      </Link>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {item.product.weight} گرم • عیار {item.product.purity}
                      </p>
                      <p className="text-sm font-bold text-foreground mt-2">
                        {formatPrice(item.priceAtAddition)} تومان
                      </p>

                      <div className="flex items-center justify-between mt-3">
                        {/* Quantity */}
                        <div className="flex items-center border border-border rounded-lg">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.quantity - 1,
                              )
                            }
                            className="w-7 h-7 flex items-center justify-center hover:bg-secondary transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-xs font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.quantity + 1,
                              )
                            }
                            className="w-7 h-7 flex items-center justify-center hover:bg-secondary transition-colors"
                            disabled={item.quantity >= item.product.stock}
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Subtotal & Remove */}
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-semibold">
                            {formatPrice(item.priceAtAddition * item.quantity)} تومان
                          </span>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 bg-card border border-border rounded-xl p-5">
                  <h3 className="text-sm font-semibold mb-4">خلاصه سفارش</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">تعداد اقلام</span>
                      <span>{itemCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">جمع کل</span>
                      <span>{formatPrice(total)} تومان</span>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>هزینه ارسال</span>
                      <span>
                        {total >= 50_000_000 ? (
                          <span className="text-emerald-600">رایگان</span>
                        ) : (
                          "۵۰۰,۰۰۰ تومان"
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="border-t border-border mt-4 pt-4 flex justify-between font-bold">
                    <span>قابل پرداخت</span>
                    <span>
                      {formatPrice(
                        total + (total >= 50_000_000 ? 0 : 500_000),
                      )}{" "}
                      تومان
                    </span>
                  </div>
                  <Link
                    href="/checkout"
                    className="mt-4 w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-charcoal text-white rounded-xl font-medium text-sm hover:bg-gold transition-colors"
                  >
                    تکمیل خرید
                    <ArrowLeft className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/shop"
                    className="mt-2 w-full inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    بازگشت به فروشگاه
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
