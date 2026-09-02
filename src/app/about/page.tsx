import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Shield, Award, Users, TrendingUp } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "درباره ما",
  description:
    "Goldshop — فروشگاه آنلاین طلا و جواهرات اصل با فاکتور معتبر و ارسال بیمه‌شده به سراسر کشور.",
};

const stats = [
  { label: "سال تجربه", value: "۱۰+", icon: Award },
  { label: "مشتری راضی", value: "۵,۰۰۰+", icon: Users },
  { label: "محصول فروخته‌شده", value: "۱۲,۰۰۰+", icon: TrendingUp },
  { label: "گواهی اصالت", value: "۱۰۰٪", icon: Shield },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-bl from-navy via-[#1e3258] to-charcoal text-white py-16 lg:py-24">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-l from-gold via-gold-light to-gold" />
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight">
              درباره Goldshop
            </h1>
            <p className="mt-4 text-white/60 leading-8 max-w-2xl mx-auto">
              Goldshop با هدف ارائه طلا و جواهرات اصل و باکیفیت به مشتریان
              عزیز تأسیس شده است. ما با بیش از ده سال تجربه در بازار طلا و
              جواهرات، اکنون این امکان را فراهم کرده‌ایم تا بتوانید بهترین
              محصولات را به‌صورت آنلاین و با اطمینان کامل خریداری کنید.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="max-w-4xl mx-auto px-4 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="bg-card border border-border rounded-xl p-5 text-center shadow-sm"
                >
                  <Icon className="w-6 h-6 mx-auto text-gold mb-2" />
                  <p className="text-2xl font-extrabold text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Story */}
        <section className="max-w-4xl mx-auto px-4 pb-12">
          <div className="bg-card border border-border rounded-2xl p-8 lg:p-10 shadow-sm">
            <h2 className="text-xl font-extrabold text-foreground mb-4 tracking-tight">
              داستان ما
            </h2>
            <div className="space-y-4 text-sm text-muted-foreground leading-8">
              <p>
                Goldshop از عشق به زیبایی و هنر طلاسازی ایرانی متولد شد. ما
                باور داریم که هر قطعه طلا، داستانی از هنر، مهارت و اصالت را
                روایت می‌کند.
              </p>
              <p>
                تیم ما شامل بهترین طلاسازان و کارشناسان این حوزه است که با
                دقت و مهارت بالا، محصولاتی را انتخاب و عرضه می‌کنند که هم از
                نظر کیفیت و هم از نظر طراحی بی‌نظیر باشند.
              </p>
              <p>
                ما متعهد به ارائه محصولات با فاکتور معتبر، گواهی اصالت و
                بهترین قیمت به مشتریان خود هستیم. اعتماد شما بزرگ‌ترین
                سرمایه ماست.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
              <h2 className="text-lg font-extrabold text-foreground mb-3 tracking-tight">
                مأموریت ما
              </h2>
              <p className="text-sm text-muted-foreground leading-7">
                فراهم کردن تجربه خرید آنلاین طلا و جواهرات با بالاترین
                استانداردهای کیفیت، اعتماد و رضایت مشتری. ما می‌خواهیم هر
                ایرانی بتواند با خیال راحت طلای اصل بخرد.
              </p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
              <h2 className="text-lg font-extrabold text-foreground mb-3 tracking-tight">
                چشم‌انداز ما
              </h2>
              <p className="text-sm text-muted-foreground leading-7">
                تبدیل شدن به معتبرترین فروشگاه آنلاین طلا و جواهرات در
                ایران و منطقه، با تکیه بر اعتماد مشتریان و کیفیت بی‌نظیر
                محصولات.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
