import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: {
    default: "Goldshop | فروشگاه آنلاین طلا و جواهرات",
    template: "%s | Goldshop",
  },
  description:
    "Goldshop — خرید آنلاین طلا و جواهرات اصل با فاکتور معتبر، قیمت لحظه‌ای طلا و ارسال بیمه‌شده به سراسر کشور.",
  keywords: ["طلا", "جواهرات", "انگشتر", "گردنبند", "دستبند", "گوشواره", "سکه", "شمش", "goldshop"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen">
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              {children}
              <Toaster
                position="top-center"
                toastOptions={{
                  style: {
                    fontFamily: "Vazirmatn, Tahoma, Arial, sans-serif",
                    direction: "rtl",
                  },
                }}
              />
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
