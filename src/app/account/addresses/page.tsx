"use client";

import React, { useState } from "react";
import { MapPin, Plus, Trash2, Star, ChevronLeft } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

export default function AddressesPage() {
  const { user, addresses, addAddress, removeAddress, setDefaultAddress } =
    useAuth();
  const [showForm, setShowForm] = useState(false);

  // Form state
  const [title, setTitle] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [addressText, setAddressText] = useState("");
  const [postalCode, setPostalCode] = useState("");

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

  const handleAddAddress = () => {
    if (!title || !fullName || !phone || !province || !city || !addressText || !postalCode) {
      return;
    }
    addAddress({
      title,
      fullName,
      phone,
      province,
      city,
      address: addressText,
      postalCode,
      isDefault: addresses.length === 0,
    });
    setTitle("");
    setFullName("");
    setPhone("");
    setProvince("");
    setCity("");
    setAddressText("");
    setPostalCode("");
    setShowForm(false);
  };

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
            <span className="text-foreground">آدرس‌ها</span>
          </nav>

          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-foreground">آدرس‌ها</h1>
            <button
              onClick={() => setShowForm(!showForm)}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-charcoal text-white rounded-lg text-sm font-medium hover:bg-gold transition-colors"
            >
              <Plus className="w-4 h-4" />
              آدرس جدید
            </button>
          </div>

          {/* Add form */}
          {showForm && (
            <div className="bg-card border border-border rounded-xl p-5 mb-6">
              <h3 className="text-sm font-semibold mb-4">آدرس جدید</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium mb-1">عنوان</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="خانه / محل کار"
                    className="w-full h-10 px-3 bg-secondary/30 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">
                    نام گیرنده
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full h-10 px-3 bg-secondary/30 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">
                    شماره تماس
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full h-10 px-3 bg-secondary/30 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">استان</label>
                  <input
                    type="text"
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    className="w-full h-10 px-3 bg-secondary/30 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">شهر</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full h-10 px-3 bg-secondary/30 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">
                    کد پستی
                  </label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full h-10 px-3 bg-secondary/30 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
                    dir="ltr"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-medium mb-1">
                    آدرس کامل
                  </label>
                  <textarea
                    value={addressText}
                    onChange={(e) => setAddressText(e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 bg-secondary/30 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold resize-none"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleAddAddress}
                  className="px-5 py-2 bg-charcoal text-white rounded-lg text-sm font-medium hover:bg-gold transition-colors"
                >
                  ذخیره
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="px-5 py-2 border border-border rounded-lg text-sm font-medium hover:bg-secondary transition-colors"
                >
                  انصراف
                </button>
              </div>
            </div>
          )}

          {/* Address list */}
          {addresses.length === 0 ? (
            <div className="py-16 text-center">
              <MapPin className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-lg font-semibold">هنوز آدرسی ثبت نکرده‌اید</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                اولین آدرس خود را اضافه کنید
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {addresses.map((addr) => (
                <div
                  key={addr.id}
                  className="bg-card border border-border rounded-xl p-4"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-semibold">{addr.title}</span>
                      {addr.isDefault && (
                        <span className="px-1.5 py-0.5 bg-gold/10 text-gold text-[10px] font-medium rounded">
                          پیش‌فرض
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {!addr.isDefault && (
                        <button
                          onClick={() => setDefaultAddress(addr.id)}
                          className="text-xs text-gold hover:text-gold-dark"
                        >
                          <Star className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => removeAddress(addr.id)}
                        className="text-xs text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {addr.fullName} • {addr.phone}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {addr.province}، {addr.city}، {addr.address}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    کد پستی: {addr.postalCode}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
