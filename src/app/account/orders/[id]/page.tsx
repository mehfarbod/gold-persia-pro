"use client";

import React from "react";
import { use } from "react";
import Link from "next/link";
import { ChevronLeft, Package, MapPin } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Mock order detail — replace with real data
const mockOrder = {
  id: "GL-102345",
  date: "۱۴۰۴/۰۶/۱۵",
  status: "delivered",
  statusLabel: "تحویل شده",
  paymentStatus: "paid",
  paymentStatusLabel: "پرداخت شده",
  items: [
    {
      title: "انگشتر طلای زنانه مدل نگین‌دار",
      weight: 4.2,
      quantity: 1,
      price: 18_500_000,
    },
  ],
  shippingAddress: {
    fullName: "علی رضایی",
    province: "تهران",
    city: "تهران",
    address: "خیابان ولیعصر، کوچه گل",
    postalCode: "1234567890",
  },
  subtotal: 18_000_000,
  shipping: 500_000,
  total: 18_500_000,
};

export default function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 py-8 lg:py-12">
          <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
            <Link href="/account" className="hover:text-gold transition-colors">
              حساب کاربری
            </Link>
            <ChevronLeft className="w-3 h-3" />
            <Link
              href="/account/orders"
              className="hover:text-gold transition-colors"
            >
              سفارشات
            </Link>
            <ChevronLeft className="w-3 h-3" />
            <span className="text-foreground">{id}</span>
          </nav>

          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                سفارش {mockOrder.id}
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                ثبت شده در {mockOrder.date}
              </p>
            </div>
            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full">
              {mockOrder.statusLabel}
            </span>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Items */}
            <div className="lg:col-span-2">
              <div className="bg-card border border-border rounded-xl p-5">
                <h2 className="text-sm font-semibold mb-4">اقلام سفارش</h2>
                <div className="space-y-3">
                  {mockOrder.items.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg"
                    >
                      <div className="w-12 h-12 rounded bg-secondary flex items-center justify-center">
                        <Package className="w-5 h-5 text-muted-foreground/30" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.weight} گرم • {item.quantity} عدد
                        </p>
                      </div>
                      <p className="text-sm font-semibold">
                        {new Intl.NumberFormat("fa-IR").format(item.price)}{" "}
                        تومان
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="space-y-4">
              <div className="bg-card border border-border rounded-xl p-5">
                <h3 className="text-sm font-semibold mb-3">خلاصه پرداخت</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">جمع کل</span>
                    <span>
                      {new Intl.NumberFormat("fa-IR").format(
                        mockOrder.subtotal,
                      )}{" "}
                      تومان
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">ارسال</span>
                    <span>
                      {new Intl.NumberFormat("fa-IR").format(
                        mockOrder.shipping,
                      )}{" "}
                      تومان
                    </span>
                  </div>
                  <div className="flex justify-between font-bold border-t border-border pt-2">
                    <span>نهایی</span>
                    <span>
                      {new Intl.NumberFormat("fa-IR").format(
                        mockOrder.total,
                      )}{" "}
                      تومان
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-5">
                <h3 className="text-sm font-semibold mb-3">آدرس ارسال</h3>
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">
                      {mockOrder.shippingAddress.fullName}
                    </p>
                    <p>
                      {mockOrder.shippingAddress.province},{" "}
                      {mockOrder.shippingAddress.city}
                    </p>
                    <p>{mockOrder.shippingAddress.address}</p>
                    <p>کد پستی: {mockOrder.shippingAddress.postalCode}</p>
                  </div>
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
