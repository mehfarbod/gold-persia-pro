"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Package,
  MapPin,
  CreditCard,
  CheckCircle,
  Loader2,
  ArrowRight,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { calculateShipping } from "@/lib/services/pricing";
import { formatPrice, cn } from "@/lib/utils";
import { toast } from "sonner";

type Step = "review" | "address" | "payment" | "result";

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState<Step>(user ? "address" : "address");
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Address form
  const [fullName, setFullName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [note, setNote] = useState("");

  const shipping = calculateShipping(total);
  const grandTotal = total + shipping;

  if (items.length === 0 && !paymentSuccess) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-center">
            <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-lg font-semibold">سبد خرید خالی است</h2>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 bg-charcoal text-white rounded-lg text-sm font-medium hover:bg-gold transition-colors"
            >
              رفتن به فروشگاه
            </Link>
          </div>
        </main>
      </div>
    );
  }

  if (paymentSuccess) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-emerald-600" />
            </div>
            <h2 className="text-xl font-bold text-foreground">
              سفارش با موفقیت ثبت شد!
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              سفارش شما با شماره <span className="font-mono">#GS-{Date.now().toString().slice(-6)}</span> ثبت
              شد و به زودی پردازش خواهد شد.
            </p>
            <div className="mt-6 flex flex-col gap-2">
              <Link
                href="/account/orders"
                className="px-5 py-2.5 bg-charcoal text-white rounded-lg text-sm font-medium hover:bg-gold transition-colors"
              >
                مشاهده سفارشات
              </Link>
              <Link
                href="/shop"
                className="px-5 py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                بازگشت به فروشگاه
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const handlePayment = async () => {
    if (!fullName || !phone || !province || !city || !address || !postalCode) {
      toast.error("لطفاً تمام فیلدهای آدرس را پر کنید");
      return;
    }
    setLoading(true);
    // Simulate payment
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setPaymentSuccess(true);
    clearCart();
    toast.success("پرداخت با موفقیت انجام شد");
  };

  const steps = [
    { key: "address" as Step, label: "آدرس ارسال", icon: MapPin },
    { key: "payment" as Step, label: "پرداخت", icon: CreditCard },
  ];

  const currentStepIndex = steps.findIndex((s) => s.key === step);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 py-8 lg:py-12">
          <h1 className="text-2xl font-bold text-foreground mb-6">
            تکمیل خرید
          </h1>

          {/* Steps indicator */}
          <div className="flex items-center gap-4 mb-8">
            {steps.map((s, i) => {
              const Icon = s.icon;
              const isActive = s.key === step;
              const isCompleted = i < currentStepIndex;
              return (
                <React.Fragment key={s.key}>
                  {i > 0 && (
                    <div
                      className={cn(
                        "flex-1 h-0.5 rounded-full",
                        isCompleted ? "bg-gold" : "bg-border",
                      )}
                    />
                  )}
                  <div
                    className={cn(
                      "flex items-center gap-2 text-sm",
                      isActive
                        ? "text-gold font-medium"
                        : isCompleted
                          ? "text-gold"
                          : "text-muted-foreground",
                    )}
                  >
                    <div
                      className={cn(
                        "w-7 h-7 rounded-full flex items-center justify-center text-xs border",
                        isActive
                          ? "bg-gold text-white border-gold"
                          : isCompleted
                            ? "bg-gold/10 text-gold border-gold"
                            : "bg-card border-border",
                      )}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        i + 1
                      )}
                    </div>
                    <span className="hidden sm:block">{s.label}</span>
                  </div>
                </React.Fragment>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2">
              {step === "address" && (
                <div className="bg-card border border-border rounded-xl p-5">
                  <h2 className="text-sm font-semibold mb-4">
                    آدرس ارسال سفارش
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-xs font-medium mb-1">
                        نام و نام خانوادگی
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full h-10 px-3 bg-secondary/30 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-xs font-medium mb-1">
                        شماره موبایل
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
                      <label className="block text-xs font-medium mb-1">
                        استان
                      </label>
                      <input
                        type="text"
                        value={province}
                        onChange={(e) => setProvince(e.target.value)}
                        placeholder="تهران"
                        className="w-full h-10 px-3 bg-secondary/30 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">
                        شهر
                      </label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="تهران"
                        className="w-full h-10 px-3 bg-secondary/30 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs font-medium mb-1">
                        آدرس کامل
                      </label>
                      <textarea
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 bg-secondary/30 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold resize-none"
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
                    <div>
                      <label className="block text-xs font-medium mb-1">
                        توضیحات سفارش (اختیاری)
                      </label>
                      <input
                        type="text"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="w-full h-10 px-3 bg-secondary/30 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => setStep("payment")}
                    className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 bg-charcoal text-white rounded-lg text-sm font-medium hover:bg-gold transition-colors"
                  >
                    ادامه
                    <ArrowRight className="w-4 h-4 rotate-180" />
                  </button>
                </div>
              )}

              {step === "payment" && (
                <div className="bg-card border border-border rounded-xl p-5">
                  <h2 className="text-sm font-semibold mb-4">پرداخت</h2>
                  <div className="bg-secondary/30 rounded-lg p-4 mb-4">
                    <p className="text-sm text-muted-foreground">
                      در حال حاضر پرداخت آزمایشی فعال است. در نسخه نهایی،
                      درگاه پرداخت بانکی جایگزین خواهد شد.
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep("address")}
                      className="px-5 py-2.5 border border-border rounded-lg text-sm font-medium hover:bg-secondary transition-colors"
                    >
                      بازگشت
                    </button>
                    <button
                      onClick={handlePayment}
                      disabled={loading}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-charcoal text-white rounded-lg text-sm font-medium hover:bg-gold transition-colors disabled:opacity-50"
                    >
                      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                      پرداخت {formatPrice(grandTotal)} تومان
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Order summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-card border border-border rounded-xl p-5">
                <h3 className="text-sm font-semibold mb-4">خلاصه سفارش</h3>
                <div className="space-y-3 max-h-60 overflow-auto">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center gap-3 text-sm"
                    >
                      <div className="w-10 h-10 shrink-0 bg-secondary/50 rounded flex items-center justify-center">
                        <Package className="w-4 h-4 text-muted-foreground/30" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs line-clamp-1">{item.product.title}</p>
                        <p className="text-[10px] text-muted-foreground">
                          {item.quantity}× {formatPrice(item.priceAtAddition)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border mt-4 pt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">جمع کل</span>
                    <span>{formatPrice(total)} تومان</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">هزینه ارسال</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-emerald-600">رایگان</span>
                      ) : (
                        `${formatPrice(shipping)} تومان`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold border-t border-border pt-2">
                    <span>نهایی</span>
                    <span>{formatPrice(grandTotal)} تومان</span>
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
