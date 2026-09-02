import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "حریم خصوصی",
  description: "سیاست حفظ حریم خصوصی فروشگاه گلدستون",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-to-bl from-charcoal via-[#3a3228] to-charcoal text-white py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h1 className="text-3xl lg:text-4xl font-bold">حریم خصوصی</h1>
            <p className="mt-3 text-white/70">
              آخرین بروزرسانی: شهریور ۱۴۰۴
            </p>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 py-12">
          <div className="bg-card border border-border rounded-2xl p-6 lg:p-8 space-y-6 text-sm text-muted-foreground leading-8">
            <div>
              <h2 className="text-base font-semibold text-foreground mb-2">
                ۱. جمع‌آوری اطلاعات
              </h2>
              <p>
                ما اطلاعات شخصی شما شامل نام، ایمیل، شماره تلفن و آدرس را
                تنها برای اهداف پردازش سفارش و ارائه خدمات بهتر جمع‌آوری
                می‌کنیم. این اطلاعات به هیچ عنوان به اشخاص ثالث فروخته یا
                اجاره داده نمی‌شوند.
              </p>
            </div>

            <div>
              <h2 className="text-base font-semibold text-foreground mb-2">
                ۲. استفاده از اطلاعات
              </h2>
              <p>
                اطلاعات شما صرفاً برای موارد زیر استفاده می‌شود: پردازش
                سفارشات، ارسال محصولات، ارتباط با شما در مورد سفارش، بهبود
                خدمات وب‌سایت، و ارسال اطلاعیه‌های مهم مربوط به سفارش.
              </p>
            </div>

            <div>
              <h2 className="text-base font-semibold text-foreground mb-2">
                ۳. امنیت اطلاعات
              </h2>
              <p>
                ما از رمزنگاری SSL و استانداردهای امنیتی بانکی برای محافظت از
                اطلاعات شما استفاده می‌کنیم. اطلاعات پرداخت شما مستقیماً از
                طریق درگاه بانکی پردازش می‌شود و در سرورهای ما ذخیره نمی‌شود.
              </p>
            </div>

            <div>
              <h2 className="text-base font-semibold text-foreground mb-2">
                ۴. کوکی‌ها
              </h2>
              <p>
                وب‌سایت ما از کوکی‌ها برای بهبود تجربه کاربری و ذخیره تنظیمات
                شما استفاده می‌کند. شما می‌توانید کوکی‌ها را از تنظیمات مرورگر
                خود غیرفعال کنید.
              </p>
            </div>

            <div>
              <h2 className="text-base font-semibold text-foreground mb-2">
                ۵. حقوق شما
              </h2>
              <p>
                شما حق دسترسی، اصلاح و حذف اطلاعات شخصی خود را دارید. برای
                استفاده از این حقوق با ما تماس بگیرید.
              </p>
            </div>

            <div>
              <h2 className="text-base font-semibold text-foreground mb-2">
                ۶. تماس با ما
              </h2>
              <p>
                در صورت داشتن سوال درباره حریم خصوصی، با ما از طریق ایمیل
                info@goldstone.ir یا شماره تلفن ۰۲۱-۱۲۳۴۵۶۷۸ در تماس باشید.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
