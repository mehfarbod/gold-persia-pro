import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

const footerLinks = {
  shop: [
    { label: "فروشگاه", href: "/shop" },
    { label: "انگشتر", href: "/shop?category=rings" },
    { label: "گردنبند", href: "/shop?category=necklaces" },
    { label: "دستبند", href: "/shop?category=bracelets" },
    { label: "گوشواره", href: "/shop?category=earrings" },
    { label: "پلاک", href: "/shop?category=pendants" },
    { label: "سکه و شمش", href: "/shop?category=coins" },
  ],
  info: [
    { label: "درباره ما", href: "/about" },
    { label: "تماس با ما", href: "/contact" },
    { label: "سوالات متداول", href: "/faq" },
    { label: "شرایط و قوانین", href: "/terms" },
    { label: "حریم خصوصی", href: "/privacy" },
    { label: "ارسال و مرجوع", href: "/shipping" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white/80">
      <div className="max-w-7xl mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center">
                <span className="text-white font-bold text-lg">G</span>
              </div>
              <span className="text-xl font-bold text-white">Goldshop</span>
            </div>
            <p className="text-sm leading-7 text-white/60">
              خرید آنلاین طلا و جواهرات اصل با فاکتور معتبر و گواهی اصالت.
              قیمت لحظه‌ای، ارسال بیمه‌شده، و پشتیبانی تخصصی.
            </p>
            <div className="mt-6 space-y-2">
              <a
                href="tel:02112345678"
                className="flex items-center gap-2 text-sm text-white/60 hover:text-gold transition-colors"
              >
                <Phone className="w-4 h-4" />
                ۰۲۱-۱۲۳۴۵۶۷۸
              </a>
              <a
                href="mailto:support@goldshop.ir"
                className="flex items-center gap-2 text-sm text-white/60 hover:text-gold transition-colors"
              >
                <Mail className="w-4 h-4" />
                support@goldshop.ir
              </a>
              <div className="flex items-center gap-2 text-sm text-white/60">
                <MapPin className="w-4 h-4" />
                تهران، بازار بزرگ طلا و جواهر
              </div>
            </div>
          </div>

          {/* Shop links */}
          <div>
            <h3 className="text-white font-semibold mb-4">فروشگاه</h3>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info links */}
          <div>
            <h3 className="text-white font-semibold mb-4">اطلاعات</h3>
            <ul className="space-y-2">
              {footerLinks.info.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Trust & Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-4">اعتماد و اطمینان</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-white/60">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-xs">
                  🏅
                </div>
                <div>
                  <p className="text-white/80">گواهی اصالت</p>
                  <p className="text-xs">تمامی محصولات دارای گواهی</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/60">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-xs">
                  🔒
                </div>
                <div>
                  <p className="text-white/80">پرداخت امن</p>
                  <p className="text-xs">درگاه پرداخت معتبر بانکی</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/60">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-xs">
                  📦
                </div>
                <div>
                  <p className="text-white/80">ارسال مطمئن</p>
                  <p className="text-xs">بسته‌بندی ایمن و بیمه شده</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            © ۱۴۰۴ Goldshop. تمامی حقوق محفوظ است.
          </p>
          <div className="flex items-center gap-4 text-xs text-white/40">
            <Link href="/terms" className="hover:text-gold transition-colors">
              شرایط استفاده
            </Link>
            <Link href="/privacy" className="hover:text-gold transition-colors">
              حریم خصوصی
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
