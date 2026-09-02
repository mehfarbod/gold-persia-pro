import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Truck, RotateCcw, Shield, Clock } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ارسال و مرجوع",
  description: "شرایط ارسال و بازگشت محصولات گلدستون",
};

const policies = [
  {
    icon: Truck,
    title: "ارسال سفارشات",
    items: [
      "ارسال سفارشات تهران ۱ تا ۲ روز کاری",
      "ارسال سایر شهرها ۲ تا ۴ روز کاری",
      "بسته‌بندی ایمن و مقاوم برای حفاظت محصول",
      "تمامی بسته‌ها بیمه شده هستند",
    ],
  },
  {
    icon: Shield,
    title: "هزینه ارسال",
    items: [
      "ارسال رایگان برای سفارش‌های بالای ۵۰ میلیون تومان",
      "هزینه ارسال استاندارد: ۵۰۰,۰۰۰ تومان",
      "ارسال ویژه با پیک اختصاصی در تهران",
      "امکان پیگیری سفارش از طریق پنل کاربری",
    ],
  },
  {
    icon: RotateCcw,
    title: "شرایط بازگشت",
    items: [
      "امکان بازگشت تا ۷ روز پس از تحویل",
      "محصول باید در بسته‌بندی اصلی و بدون آسیب باشد",
      "بازگشت تنها در صورت ایراد فنی یا مغایرت با توضیحات",
      "بازگشت وجه ظرف ۴۸ ساعت کاری پس از تأیید",
    ],
  },
  {
    icon: Clock,
    title: "پیگیری سفارش",
    items: [
      "کد پیگیری پس از ارسال از طریق پیامک ارسال می‌شود",
      "امکان پیگیری از طریق پنل کاربری",
      "پشتیبانی تلفنی در ساعات کاری",
      "اطلاع‌رسانی در تمام مراحل ارسال",
    ],
  },
];

export default function ShippingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-to-bl from-charcoal via-[#3a3228] to-charcoal text-white py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h1 className="text-3xl lg:text-4xl font-bold">ارسال و مرجوع</h1>
            <p className="mt-3 text-white/70">
              اطلاعات کامل ارسال و بازگشت محصولات
            </p>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 py-12">
          <div className="grid sm:grid-cols-2 gap-6">
            {policies.map((policy) => {
              const Icon = policy.icon;
              return (
                <div
                  key={policy.title}
                  className="bg-card border border-border rounded-2xl p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-gold" />
                    </div>
                    <h2 className="text-base font-semibold text-foreground">
                      {policy.title}
                    </h2>
                  </div>
                  <ul className="space-y-2">
                    {policy.items.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="w-1 h-1 rounded-full bg-gold mt-2 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* Note */}
          <div className="mt-8 bg-secondary/30 rounded-2xl p-6 text-center">
            <p className="text-sm text-muted-foreground leading-7">
              برای اطلاعات بیشتر درباره شرایط ارسال و بازگشت، با شماره{" "}
              <a href="tel:02112345678" className="text-gold font-medium">
                ۰۲۱-۱۲۳۴۵۶۷۸
              </a>{" "}
              تماس بگیرید اکیداً
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
