import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "شرایط و قوانین",
  description: "شرایط و قوانین استفاده از فروشگاه گلدستون",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-to-bl from-charcoal via-[#3a3228] to-charcoal text-white py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h1 className="text-3xl lg:text-4xl font-bold">
              شرایط و قوانین
            </h1>
            <p className="mt-3 text-white/70">آخرین بروزرسانی: شهریور ۱۴۰۴</p>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 py-12">
          <div className="bg-card border border-border rounded-2xl p-6 lg:p-8 space-y-6 text-sm text-muted-foreground leading-8">
            <div>
              <h2 className="text-base font-semibold text-foreground mb-2">
                ۱. پذیرش شرایط
              </h2>
              <p>
                با استفاده از وب‌سایت گلدستون، شما شرایط و قوانین ذکر شده در این
                صفحه را می‌پذیرید. در صورت عدم موافقت، لطفاً از استفاده از
                وب‌سایت خودداری کنید.
              </p>
            </div>

            <div>
              <h2 className="text-base font-semibold text-foreground mb-2">
                ۲. محصولات و قیمت‌ها
              </h2>
              <p>
                تمامی قیمت‌ها بر اساس نرخ لحظه‌ای طلا محاسبه می‌شوند و ممکن
                است تا زمان تکمیل خرید تغییر کنند. قیمت نهایی در زمان ثبت سفارش
                قطعی می‌شود. گلدستون حق تغییر قیمت‌ها را بدون اطلاع قبلی محفوظ
                می‌دارد.
              </p>
            </div>

            <div>
              <h2 className="text-base font-semibold text-foreground mb-2">
                ۳. سفارش و خرید
              </h2>
              <p>
                ثبت سفارش به معنای پذیرش شرایط فروش نیست. گلدستون حق لغو یا
                تأیید سفارشات را برای خود محفوظ می‌دارد. در صورت عدم موجودی
                کالا، مبلغ پرداختی ظرف ۴۸ ساعت کاری بازگشت داده خواهد شد.
              </p>
            </div>

            <div>
              <h2 className="text-base font-semibold text-foreground mb-2">
                ۴. پرداخت
              </h2>
              <p>
                پرداخت از طریق درگاه‌های معتبر بانکی انجام می‌شود. اطلاعات
                پرداخت شما نزد بانک محفوظ است و گلدستون هیچ اطلاعات کارت
                بانکی را ذخیره نمی‌کند.
              </p>
            </div>

            <div>
              <h2 className="text-base font-semibold text-foreground mb-2">
                ۵. گارانتی و ضمانت
              </h2>
              <p>
                تمامی محصولات دارای گواهی اصالت و فاکتور معتبر هستند. در صورت
                اثبات غیراصل بودن محصول، تمام مبلغ قابل بازگشت خواهد بود.
              </p>
            </div>

            <div>
              <h2 className="text-base font-semibold text-foreground mb-2">
                ۶. مسئولیت‌ها
              </h2>
              <p>
                گلدستون مسئولیتی در قبال خسارات ناشی از استفاده نادرست از
                محصولات، حمل و نقل توسط مشتری پس از تحویل، و یا نیروی قاهره
                ندارد.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
