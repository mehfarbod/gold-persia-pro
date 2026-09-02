"use client";

import React, { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, Loader2 } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { toast } from "sonner";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error("لطفاً فیلدهای ضروری را پر کنید");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    toast.success("پیام شما با موفقیت ارسال شد");
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-bl from-charcoal via-[#3a3228] to-charcoal text-white py-12 lg:py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-3xl lg:text-4xl font-bold">تماس با ما</h1>
            <p className="mt-3 text-white/70">
              ما آماده پاسخگویی به سوالات شما هستیم
            </p>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Contact info */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-card border border-border rounded-xl p-5">
                <h3 className="text-sm font-semibold mb-4">اطلاعات تماس</h3>
                <div className="space-y-4">
                  <a
                    href="tel:02112345678"
                    className="flex items-center gap-3 text-sm text-muted-foreground hover:text-gold transition-colors"
                  >
                    <Phone className="w-4 h-4 shrink-0" />
                    <div>
                      <p className="text-foreground font-medium">تلفن</p>
                      <p>۰۲۱-۱۲۳۴۵۶۷۸</p>
                    </div>
                  </a>
                  <a
                    href="mailto:info@goldstone.ir"
                    className="flex items-center gap-3 text-sm text-muted-foreground hover:text-gold transition-colors"
                  >
                    <Mail className="w-4 h-4 shrink-0" />
                    <div>
                      <p className="text-foreground font-medium">ایمیل</p>
                      <p>info@goldstone.ir</p>
                    </div>
                  </a>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 shrink-0" />
                    <div>
                      <p className="text-foreground font-medium">آدرس</p>
                      <p>تهران، بازار بزرگ، پلاک ۱۲۳</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 shrink-0" />
                    <div>
                      <p className="text-foreground font-medium">ساعات کاری</p>
                      <p>شنبه تا پنجشنبه، ۹ صبح تا ۸ شب</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-3">
              <form
                onSubmit={handleSubmit}
                className="bg-card border border-border rounded-xl p-5"
              >
                <h3 className="text-sm font-semibold mb-4">
                  ارسال پیام
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium mb-1">
                        نام
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full h-10 px-3 bg-secondary/30 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">
                        ایمیل
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full h-10 px-3 bg-secondary/30 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
                        dir="ltr"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">
                      موضوع
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full h-10 px-3 bg-secondary/30 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">
                      پیام *
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={5}
                      className="w-full px-3 py-2 bg-secondary/30 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-charcoal text-white rounded-lg text-sm font-medium hover:bg-gold transition-colors disabled:opacity-50"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                    ارسال پیام
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
