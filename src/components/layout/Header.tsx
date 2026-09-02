"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  Home,
  Store,
  TrendingUp,
  Info,
  Phone,
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "خانه", icon: Home },
  { href: "/shop", label: "فروشگاه", icon: Store },
  { href: "/shop?sort=gold-price", label: "قیمت طلا", icon: TrendingUp },
  { href: "/about", label: "درباره ما", icon: Info },
  { href: "/contact", label: "تماس با ما", icon: Phone },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const { itemCount } = useCart();
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      {/* Top bar */}
      <div className="hidden lg:block border-b border-border/50 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 h-8 flex items-center justify-between text-xs text-muted-foreground">
          <span>ارگانیک با فاکتور معتبر و ضمانت اصالت</span>
          <div className="flex items-center gap-4">
            <span>پشتیبانی: ۰۲۱-۱۲۳۴۵۶۷۸</span>
            <span>|</span>
            <span>ارسال رایگان بالای ۵۰ میلیون تومان</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 -me-2"
            aria-label="منو"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-charcoal flex items-center justify-center">
              <span className="text-gold font-bold text-sm lg:text-lg">گ</span>
            </div>
            <span className="text-lg lg:text-xl font-bold text-charcoal hidden sm:block">
              گلدستون
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                    isActive
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-lg hover:bg-secondary transition-colors"
              aria-label="جستجو"
            >
              <Search className="w-5 h-5 text-muted-foreground" />
            </button>

            {/* Wishlist */}
            <Link
              href="/account/wishlist"
              className="p-2 rounded-lg hover:bg-secondary transition-colors hidden sm:flex"
              aria-label="علاقه‌مندی‌ها"
            >
              <Heart className="w-5 h-5 text-muted-foreground" />
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 rounded-lg hover:bg-secondary transition-colors"
              aria-label="سبد خرید"
            >
              <ShoppingBag className="w-5 h-5 text-muted-foreground" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -start-0.5 w-4.5 h-4.5 bg-gold text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </Link>

            {/* Account */}
            <Link
              href={user ? "/account" : "/auth"}
              className="p-2 rounded-lg hover:bg-secondary transition-colors hidden sm:flex"
              aria-label="حساب کاربری"
            >
              <User className="w-5 h-5 text-muted-foreground" />
            </Link>
          </div>
        </div>
      </div>

      {/* Search overlay */}
      {searchOpen && (
        <div className="border-t border-border bg-background">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="relative">
              <Search className="absolute end-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="جستجوی محصولات..."
                className="w-full h-10 ps-4 pe-10 bg-secondary/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Escape") setSearchOpen(false);
                  if (e.key === "Enter") {
                    const q = (e.target as HTMLInputElement).value;
                    if (q.trim()) {
                      window.location.href = `/shop?search=${encodeURIComponent(q.trim())}`;
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-background">
          <nav className="max-w-7xl mx-auto px-4 py-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-3 rounded-lg text-sm transition-colors",
                    isActive
                      ? "bg-secondary text-foreground font-medium"
                      : "text-muted-foreground hover:bg-secondary/50",
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
            <div className="border-t border-border mt-2 pt-2">
              <Link
                href={user ? "/account" : "/auth"}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm text-muted-foreground hover:bg-secondary/50"
              >
                <User className="w-4 h-4" />
                {user ? "حساب کاربری" : "ورود / ثبت‌نام"}
              </Link>
              <Link
                href="/account/wishlist"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm text-muted-foreground hover:bg-secondary/50"
              >
                <Heart className="w-4 h-4" />
                علاقه‌مندی‌ها
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
