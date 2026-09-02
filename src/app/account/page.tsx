"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  ShoppingBag,
  Heart,
  MapPin,
  LogOut,
  ChevronLeft,
  Package,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/contexts/AuthContext";

const menuItems = [
  {
    href: "/account/orders",
    label: "سفارشات من",
    description: "مشاهده سفارشات قبلی و وضعیت آن‌ها",
    icon: ShoppingBag,
  },
  {
    href: "/account/wishlist",
    label: "علاقه‌مندی‌ها",
    description: "محصولات ذخیره شده",
    icon: Heart,
  },
  {
    href: "/account/addresses",
    label: "آدرس‌ها",
    description: "مدیریت آدرس‌های ارسال",
    icon: MapPin,
  },
];

export default function AccountPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-center">
            <User className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-lg font-semibold">لطفاً وارد شوید</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              برای مشاهده حساب کاربری، وارد شوید
            </p>
            <Link
              href="/auth"
              className="inline-block mt-4 px-5 py-2.5 bg-charcoal text-white rounded-lg text-sm font-medium hover:bg-gold transition-colors"
            >
              ورود / ثبت‌نام
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
          <h1 className="text-2xl font-bold text-foreground mb-8">
            حساب کاربری
          </h1>

          {/* Profile card */}
          <div className="bg-card border border-border rounded-xl p-5 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center">
                <User className="w-6 h-6 text-muted-foreground" />
              </div>
              <div>
                <h2 className="font-semibold text-foreground">{user.name}</h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {user.phone}
                </p>
              </div>
            </div>
          </div>

          {/* Menu */}
          <div className="space-y-3">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl hover:border-gold/20 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-secondary/50 flex items-center justify-center group-hover:bg-gold/10 transition-colors">
                    <Icon className="w-5 h-5 text-muted-foreground group-hover:text-gold transition-colors" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-foreground">
                      {item.label}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                  <ChevronLeft className="w-4 h-4 text-muted-foreground" />
                </Link>
              );
            })}
          </div>

          {/* Logout */}
          <button
            onClick={() => {
              logout();
              router.push("/");
            }}
            className="mt-6 flex items-center gap-3 w-full p-4 text-destructive hover:bg-destructive/5 rounded-xl transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">خروج از حساب</span>
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
