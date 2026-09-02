import { Shield, FileText, Lock, Truck, Headphones } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "اصالت تضمینی",
    description: "هر محصول با آزمایشگاه معتبر و گواهی رسمی عرضه می‌شود.",
  },
  {
    icon: FileText,
    title: "فاکتور رسمی",
    description: "صدور فاکتور با جزئیات کامل وزن، عیار و قیمت خرید.",
  },
  {
    icon: Lock,
    title: "پرداخت امن",
    description: "درگاه پرداخت بانکی با رمزنگاری استاندارد.",
  },
  {
    icon: Truck,
    title: "ارسال بیمه‌شده",
    description: "بسته‌بندی اختصاصی و بیمه کامل تا لحظه تحویل.",
  },
  {
    icon: Headphones,
    title: "مشاوره تخصصی",
    description: "پشتیبانی و راهنمای خرید در تمام ساعات روز.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-navy rounded-2xl p-8 lg:p-12 text-white">
      <div className="text-center mb-10">
        <h2 className="text-2xl lg:text-3xl font-extrabold tracking-tight">
          چرا Goldshop؟
        </h2>
        <p className="mt-2 text-sm text-white/50">
          تجربه خریدی متفاوت از طلای اصل
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <div key={feature.title} className="text-center">
              <div className="w-12 h-12 mx-auto rounded-xl bg-white/8 border border-white/8 flex items-center justify-center mb-3">
                <Icon className="w-5 h-5 text-gold" />
              </div>
              <h3 className="text-sm font-semibold text-white">
                {feature.title}
              </h3>
              <p className="text-xs text-white/45 mt-1 leading-5">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
