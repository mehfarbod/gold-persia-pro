"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ShoppingBag,
  Heart,
  Upload,
  Camera,
  MessageSquare,
  Star,
  Package,
  MapPin,
  Send,
  Loader2,
  X,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

interface UserPost {
  id: string;
  title: string;
  content: string;
  images: string[];
  createdAt: string;
  likes: number;
  type: "review" | "photo" | "question";
}

const mockPosts: UserPost[] = [
  {
    id: "post-1",
    title: "تجربه خرید انگشتر طلا",
    content:
      "انگشتر رو سفارش دادم و خیلی کیفیتش عالی بود. وزنش دقیقاً همونی بود که تو سایت نوشته بود و فاکتورش هم کامل بود.",
    images: [],
    createdAt: "۱۴۰۴/۰۶/۱۰",
    likes: 12,
    type: "review",
  },
  {
    id: "post-2",
    title: "ست گردنبند و دستبند",
    content:
      "برای همسرم خریدم، خیلی راضیه. طراحی ظریف و شیک.",
    images: [],
    createdAt: "۱۴۰۴/۰۵/۲۸",
    likes: 8,
    type: "photo",
  },
];

const stats = [
  { label: "سفارشات", value: "۳", icon: ShoppingBag, color: "text-gold" },
  { label: "علاقه‌مندی‌ها", value: "۵", icon: Heart, color: "text-red-500" },
  { label: "محتواها", value: "۲", icon: MessageSquare, color: "text-navy" },
  { label: "امتیاز", value: "۴.۸", icon: Star, color: "text-amber-500" },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const { itemCount, total } = useCart();
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postType, setPostType] = useState<"review" | "photo" | "question">("review");
  const [posts, setPosts] = useState<UserPost[]>(mockPosts);

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              لطفاً وارد حساب خود شوید
            </p>
            <Link
              href="/auth"
              className="px-6 py-2.5 bg-gold text-navy rounded-lg text-sm font-semibold hover:bg-gold-light transition-colors"
            >
              ورود
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const handleUpload = async () => {
    if (!postTitle.trim() || !postContent.trim()) {
      toast.error("لطفاً عنوان و محتوا را وارد کنید");
      return;
    }
    setUploadLoading(true);
    await new Promise((r) => setTimeout(r, 800));

    const newPost: UserPost = {
      id: `post-${Date.now()}`,
      title: postTitle.trim(),
      content: postContent.trim(),
      images: [],
      createdAt: "اکنون",
      likes: 0,
      type: postType,
    };
    setPosts((prev) => [newPost, ...prev]);
    setPostTitle("");
    setPostContent("");
    setShowUploadForm(false);
    setUploadLoading(false);
    toast.success("محتوا با موفقیت منتشر شد");
  };

  const typeLabels = {
    review: "بررسی",
    photo: "عکس",
    question: "سؤال",
  };
  const typeColors = {
    review: "bg-gold/10 text-gold",
    photo: "bg-navy/10 text-navy",
    question: "bg-emerald-50 text-emerald-700",
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-4 py-8 lg:py-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
            <Link href="/account" className="hover:text-gold transition-colors">
              حساب کاربری
            </Link>
            <ChevronLeft className="w-3 h-3" />
            <span className="text-foreground">داشبورد</span>
          </nav>

          {/* Welcome */}
          <div className="mb-8">
            <h1 className="text-2xl font-extrabold text-foreground tracking-tight">
              سلام، {user.name} 👋
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              فعالیت‌ها و محتوای خود را اینجا مدیریت کنید.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="bg-card border border-border rounded-xl p-4 shadow-sm"
                >
                  <Icon className={`w-5 h-5 ${stat.color} mb-2`} />
                  <p className="text-2xl font-extrabold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
                </div>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main content — posts & upload */}
            <div className="lg:col-span-2 space-y-6">
              {/* Upload button */}
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-foreground">
                  محتوای من
                </h2>
                <button
                  onClick={() => setShowUploadForm(!showUploadForm)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-gold text-navy rounded-lg text-sm font-semibold hover:bg-gold-light transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  انتشار محتوا
                </button>
              </div>

              {/* Upload form */}
              {showUploadForm && (
                <div className="bg-card border border-gold/20 rounded-xl p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-foreground">
                      محتوای جدید
                    </h3>
                    <button
                      onClick={() => setShowUploadForm(false)}
                      className="p-1 hover:bg-secondary rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Post type selector */}
                  <div className="flex gap-2 mb-4">
                    {(["review", "photo", "question"] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => setPostType(t)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
                          postType === t
                            ? "bg-charcoal text-white border-charcoal"
                            : "bg-card text-muted-foreground border-border hover:border-gold/30"
                        }`}
                      >
                        {typeLabels[t]}
                      </button>
                    ))}
                  </div>

                  <input
                    type="text"
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                    placeholder="عنوان محتوا..."
                    className="w-full h-10 px-3 bg-secondary/30 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold mb-3"
                  />

                  <textarea
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    placeholder={
                      postType === "review"
                        ? "تجربه خود از خرید یا محصول را بنویسید..."
                        : postType === "photo"
                          ? "درباره عکس خود توضیح دهید..."
                          : "سؤال خود را مطرح کنید..."
                    }
                    rows={4}
                    className="w-full px-3 py-2 bg-secondary/30 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold resize-none mb-3"
                  />

                  {/* Image upload placeholder */}
                  <button className="flex items-center gap-2 px-4 py-2.5 border-2 border-dashed border-border rounded-lg text-sm text-muted-foreground hover:border-gold/30 hover:text-gold transition-colors mb-4">
                    <Camera className="w-4 h-4" />
                    افزودن تصویر
                  </button>

                  <div className="flex gap-3">
                    <button
                      onClick={handleUpload}
                      disabled={uploadLoading}
                      className="inline-flex items-center gap-2 px-5 py-2 bg-gold text-navy rounded-lg text-sm font-semibold hover:bg-gold-light transition-colors disabled:opacity-50"
                    >
                      {uploadLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                      انتشار
                    </button>
                    <button
                      onClick={() => setShowUploadForm(false)}
                      className="px-5 py-2 border border-border rounded-lg text-sm text-muted-foreground hover:bg-secondary transition-colors"
                    >
                      انصراف
                    </button>
                  </div>
                </div>
              )}

              {/* Posts list */}
              <div className="space-y-4">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-card border border-border rounded-xl p-5 shadow-sm"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 text-[10px] font-semibold rounded-full ${typeColors[post.type]}`}
                        >
                          {typeLabels[post.type]}
                        </span>
                        <h3 className="text-sm font-bold text-foreground">
                          {post.title}
                        </h3>
                      </div>
                      <span className="text-[10px] text-muted-foreground">
                        {post.createdAt}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-7">
                      {post.content}
                    </p>
                    <div className="mt-3 flex items-center gap-3">
                      <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-gold transition-colors">
                        <Heart className="w-3.5 h-3.5" />
                        {post.likes}
                      </button>
                      <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-gold transition-colors">
                        <MessageSquare className="w-3.5 h-3.5" />
                        پاسخ
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Recent order */}
              <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
                <h3 className="text-sm font-bold text-foreground mb-3">
                  آخرین سفارش
                </h3>
                <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
                  <Package className="w-5 h-5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-xs font-medium">GS-102345</p>
                    <p className="text-[10px] text-muted-foreground">
                      ۱۴۰۴/۰۶/۱۵ • تحویل شده
                    </p>
                  </div>
                </div>
                <Link
                  href="/account/orders"
                  className="mt-3 flex items-center gap-1 text-xs text-gold font-medium hover:text-gold-dark transition-colors"
                >
                  مشاهده همه سفارشات
                  <ChevronLeft className="w-3 h-3" />
                </Link>
              </div>

              {/* Quick actions */}
              <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
                <h3 className="text-sm font-bold text-foreground mb-3">
                  دسترسی سریع
                </h3>
                <div className="space-y-2">
                  <Link
                    href="/shop"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-colors"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    فروشگاه
                  </Link>
                  <Link
                    href="/account/wishlist"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-colors"
                  >
                    <Heart className="w-4 h-4" />
                    علاقه‌مندی‌ها
                  </Link>
                  <Link
                    href="/account/addresses"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-colors"
                  >
                    <MapPin className="w-4 h-4" />
                    آدرس‌ها
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
