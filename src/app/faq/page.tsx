"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "آیا محصولات شما اصل هستند؟",
    answer:
      "بله، تمامی محصولات ما اصل هستند و دارای گواهی اصالت و فاکتور معتبر می‌باشند. هر محصول پس از آزمایش و تأیید کارشناسان مجرب عرضه می‌شود.",
  },
  {
    question: "چگونه قیمت طلا محاسبه می‌شود؟",
    answer:
      "قیمت هر محصول بر اساس نرخ لحظه‌ای طلا، وزن، عیار، اجرت ساخت، سود فروشنده و مالیات محاسبه می‌شود. قیمت نهایی به صورت شفاف و با جزئیات کامل نمایش داده می‌شود.",
  },
  {
    question: "هزینه ارسال چقدر است؟",
    answer:
      "ارسال برای سفارش‌های بالای ۵۰ میلیون تومان رایگان است. برای سفارش‌های کمتر، هزینه ارسال ۵۰۰,۰۰۰ تومان می‌باشد. تمامی بسته‌ها بیمه شده و با بسته‌بندی ایمن ارسال می‌شوند.",
  },
  {
    question: "آیا امکان بازگشت محصول وجود دارد؟",
    answer:
      "بله، در صورتی که محصول مشکلی داشته باشد یا با توضیحات مطابقت نداشته باشد، تا ۷ روز پس از تحویل امکان بازگشت وجود دارد. لطفاً شرایط کامل بازگشت را در صفحه ارسال و مرجوع مطالعه کنید.",
  },
  {
    question: "آیا فاکتور رسمی صادر می‌شود؟",
    answer:
      "بله، برای تمامی سفارش‌ها فاکتور رسمی صادر می‌شود. این فاکتور شامل اطلاعات دقیق محصول، وزن، عیار، قیمت و سایر جزئیات است.",
  },
  {
    question: "روش‌های پرداخت چیست؟",
    answer:
      "شما می‌توانید از طریق درگاه پرداخت بانکی، کارت به کارت و یا پرداخت نقدی در هنگام تحویل (برای سفارش‌های تهران) پرداخت کنید.",
  },
  {
    question: "زمان تحویل سفارش چقدر است؟",
    answer:
      "سفارش‌های تهران معمولاً ۱ تا ۲ روز کاری و سایر شهرها ۲ تا ۴ روز کاری پس از تأیید سفارش تحویل داده می‌شوند.",
  },
  {
    question: "آیا مشاوره خرید ارائه می‌دهید؟",
    answer:
      "بله، تیم پشتیبانی ما آماده ارائه مشاوره رایگان در مورد انتخاب محصول مناسب، مقایسه محصولات و راهنمایی خرید است. می‌توانید با شماره ۰۲۱-۱۲۳۴۵۶۷۸ تماس بگیرید.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-bl from-charcoal via-[#3a3228] to-charcoal text-white py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h1 className="text-3xl lg:text-4xl font-bold">سوالات متداول</h1>
            <p className="mt-3 text-white/70">
              پاسخ سوالات رایج شما
            </p>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 py-12">
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-sm font-semibold text-foreground hover:bg-secondary/30 transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 text-muted-foreground transition-transform shrink-0",
                      openIndex === i && "rotate-180",
                    )}
                  />
                </button>
                {openIndex === i && (
                  <div className="px-5 pb-5 text-sm text-muted-foreground leading-7">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
