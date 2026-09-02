import { Shield, FileText, Lock, Truck, Headphones } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "اصالت کالا",
    description: "تمامی محصولات دارای گواهی اصالت و آزمایشگاه معتبر",
  },
  {
    icon: FileText,
    title: "فاکتور معتبر",
    description: "صدور فاکتور رسمی برای تمامی خریدها",
  },
  {
    icon: Lock,
    title: "پرداخت امن",
    description: "پرداخت از طریق درگاه‌های معتبر بانکی",
  },
  {
    icon: Truck,
    title: "ارسال مطمئن",
    description: "بسته‌بندی ایمن و ارسال با بیمه کامل",
  },
  {
    icon: Headphones,
    title: "پشتیبانی",
    description: "مشاوره رایگان و پشتیبانی در تمام ساعات",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-secondary/30 rounded-2xl p-8 lg:p-12">
      <div className="text-center mb-10">
        <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
          چرا گلدستون؟
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          اعتماد شما، سرمایه ماست
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <div key={feature.title} className="text-center">
              <div className="w-12 h-12 mx-auto rounded-xl bg-card border border-border flex items-center justify-center mb-3">
                <Icon className="w-5 h-5 text-gold" />
              </div>
              <h3 className="text-sm font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-1 leading-5">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
