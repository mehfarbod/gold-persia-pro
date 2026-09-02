import Link from "next/link";
import { ArrowLeft, Shield, BadgeCheck, Truck } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-bl from-charcoal via-[#3a3228] to-charcoal text-white">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgba(197,165,90,0.3) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold/10 border border-gold/20 rounded-full text-gold text-xs font-medium mb-6">
              <Shield className="w-3 h-3" />
              ضمانت اصالت کالا
            </div>

            <h1 className="text-3xl lg:text-5xl font-bold leading-tight">
              زیبایی اصیل،
              <br />
              <span className="text-gold">اعتماد واقعی</span>
            </h1>

            <p className="mt-6 text-base lg:text-lg text-white/70 leading-8 max-w-lg">
              مجموعه‌ای منحصربه‌فرد از طلا و جواهرات با کیفیت بی‌نظیر.
              تمامی محصولات با فاکتور معتبر و گواهی اصالت عرضه می‌شوند.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-white rounded-xl font-medium text-sm hover:bg-gold-dark transition-colors"
              >
                مشاهده محصولات
                <ArrowLeft className="w-4 h-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white border border-white/10 rounded-xl font-medium text-sm hover:bg-white/15 transition-colors"
              >
                درباره ما
              </Link>
            </div>

            {/* Trust badges */}
            <div className="mt-10 flex flex-wrap gap-6">
              <div className="flex items-center gap-2 text-xs text-white/50">
                <BadgeCheck className="w-4 h-4 text-gold" />
                فاکتور معتبر
              </div>
              <div className="flex items-center gap-2 text-xs text-white/50">
                <Truck className="w-4 h-4 text-gold" />
                ارسال مطمئن
              </div>
              <div className="flex items-center gap-2 text-xs text-white/50">
                <Shield className="w-4 h-4 text-gold" />
                ضمانت بازگشت
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative w-80 h-80">
              {/* Decorative rings */}
              <div className="absolute inset-0 rounded-full border-2 border-gold/20 animate-pulse" />
              <div className="absolute inset-6 rounded-full border border-gold/10" />
              <div className="absolute inset-12 rounded-full border border-gold/15" />
              {/* Center gold accent */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-gold/20 flex items-center justify-center">
                  <span className="text-3xl font-bold text-gold">گ</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
