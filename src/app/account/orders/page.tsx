"use client";

import React from "react";
import Link from "next/link";
import { Package, ChevronLeft } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/contexts/AuthContext";

// Mock orders — replace with real data source
const mockOrders = [
  {
    id: "GS-102345",
    date: "۱۴۰۴/۰۶/۱۵",
    total: 18_500_000,
    status: "delivered",
    statusLabel: "تحویل شده",
    items: 2,
  },
  {
    id: "GS-102280",
    date: "۱۴۰۴/۰۵/۲۸",
    total: 32_000_000,
    status: "shipped",
    statusLabel: "ارسال شده",
    items: 1,
  },
];

const statusColors: Record<string, string> = {
  pending: "bg-yellow-50 text-yellow-700",
  paid: "bg-blue-50 text-blue-700",
  processing: "bg-purple-50 text-purple-700",
  shipped: "bg-orange-50 text-orange-700",
  delivered: "bg-emerald-50 text-emerald-700",
  cancelled: "bg-red-50 text-red-700",
};

export default function OrdersPage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              لطفاً وارد حساب خود شوید
            </p>
            <Link
              href="/auth"
              className="px-5 py-2.5 bg-charcoal text-white rounded-lg text-sm font-medium hover:bg-gold transition-colors"
            >
              ورود
            </Link>
          </div>
        </main>
      </div>
    );
  }

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
            <span className="text-foreground">سفارشات</span>
          </nav>

          <h1 className="text-2xl font-bold text-foreground mb-6">
            سفارشات من
          </h1>

          {mockOrders.length === 0 ? (
            <div className="py-20 text-center">
              <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-lg font-semibold">هنوز سفارشی ثبت نکرده‌اید</h2>
              <Link
                href="/shop"
                className="inline-block mt-4 px-5 py-2.5 bg-charcoal text-white rounded-lg text-sm font-medium hover:bg-gold transition-colors"
              >
                شروع خرید
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {mockOrders.map((order) => (
                <Link
                  key={order.id}
                  href={`/account/orders/${order.id}`}
                  className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl hover:border-gold/20 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-secondary/50 flex items-center justify-center">
                    <Package className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold">سفارش {order.id}</h3>
                      <span
                        className={`px-2 py-0.5 text-[10px] font-medium rounded-full ${statusColors[order.status] || ""}`}
                      >
                        {order.statusLabel}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {order.date} • {order.items} محصول
                    </p>
                  </div>
                  <div className="text-sm font-semibold text-foreground">
                    {new Intl.NumberFormat("fa-IR").format(order.total)} تومان
                  </div>
                  <ChevronLeft className="w-4 h-4 text-muted-foreground" />
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
