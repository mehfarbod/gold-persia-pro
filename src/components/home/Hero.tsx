import Link from "next/link";
import { ArrowLeft, Shield, BadgeCheck, Truck } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-bl from-navy via-[#1e3258] to-charcoal text-white">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgba(212,168,67,0.5) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* Gold accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-l from-gold via-gold-light to-gold" />

      <div className="relative max-w-7xl mx-auto px-4 py-16 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gold/15 border border-gold/25 rounded-full text-gold-light text-xs font-semibold mb-6 tracking-wide">
              <Shield className="w-3.5 h-3.5" />
              ضمانت اصالت و فاکتور معتبر
            </div>

            <h1 className="text-3xl lg:text-5xl font-extrabold leading-tight tracking-tight">
              طلای اصل،
              <br />
              <span className="text-gold">قیمت منصفانه</span>
            </h1>

            <p className="mt-6 text-base lg:text-lg text-white/65 leading-8 max-w-lg">
              خرید آنلاین طلا و جواهرات با اطمینان کامل. قیمت لحظه‌ای بر اساس
              نرخ بازار، فاکتور رسمی، و ارسال بیمه‌شده به سراسر کشور.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-gold text-navy font-semibold rounded-xl text-sm hover:bg-gold-light transition-colors"
              >
                مشاهده محصولات
                <ArrowLeft className="w-4 h-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/8 text-white border border-white/12 rounded-xl font-medium text-sm hover:bg-white/12 transition-colors"
              >
                درباره ما
              </Link>
            </div>

            {/* Trust badges */}
            <div className="mt-10 flex flex-wrap gap-6">
              <div className="flex items-center gap-2 text-xs text-white/45">
                <BadgeCheck className="w-4 h-4 text-gold" />
                فاکتور رسمی
              </div>
              <div className="flex items-center gap-2 text-xs text-white/45">
                <Truck className="w-4 h-4 text-gold" />
                ارسال بیمه‌شده
              </div>
              <div className="flex items-center gap-2 text-xs text-white/45">
                <Shield className="w-4 h-4 text-gold" />
                گارانتی بازگشت
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative w-80 h-80">
              {/* Decorative rings */}
              <div className="absolute inset-0 rounded-full border-2 border-gold/25" />
              <div className="absolute inset-4 rounded-full border border-gold/15" />
              <div className="absolute inset-10 rounded-full border border-gold/10" />
              <div className="absolute inset-16 rounded-full border border-gold/8" />
              {/* Center gold accent */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center shadow-lg shadow-gold/20">
                  <span className="text-3xl font-extrabold text-white">G</span>
                </div>
              </div>
              {/* Floating gold dots */}
              <div className="absolute top-8 right-12 w-2 h-2 rounded-full bg-gold/40" />
              <div className="absolute bottom-12 left-8 w-1.5 h-1.5 rounded-full bg-gold/30" />
              <div className="absolute top-1/2 right-0 w-1 h-1 rounded-full bg-gold/20" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
