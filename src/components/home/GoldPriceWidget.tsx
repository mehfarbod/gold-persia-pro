"use client";

import React from "react";
import { TrendingUp, TrendingDown, Clock } from "lucide-react";
import { GoldPrice } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface GoldPriceWidgetProps {
  goldPrice: GoldPrice;
}

export default function GoldPriceWidget({ goldPrice }: GoldPriceWidgetProps) {
  const isPositive = goldPrice.change >= 0;

  const prices = [
    { label: "طلای ۱۸ عیار", value: goldPrice.gold18K, suffix: "تومان/گرم" },
    { label: "طلای ۲۴ عیار", value: goldPrice.gold24K, suffix: "تومان/گرم" },
    { label: "قیمت پایه", value: goldPrice.gramPrice, suffix: "تومان/گرم" },
  ];

  return (
    <section className="bg-white border border-border rounded-2xl p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-foreground">نرخ لحظه‌ای طلا</h2>
          <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>آخرین بروزرسانی: {new Date(goldPrice.updatedAt).toLocaleTimeString("fa-IR")}</span>
          </div>
        </div>
        <div
          className={cn(
            "flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium",
            isPositive
              ? "bg-emerald-50 text-emerald-700"
              : "bg-red-50 text-red-700",
          )}
        >
          {isPositive ? (
            <TrendingUp className="w-3 h-3" />
          ) : (
            <TrendingDown className="w-3 h-3" />
          )}
          <span>
            {isPositive ? "+" : ""}
            {goldPrice.change}%
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {prices.map((item) => (
          <div
            key={item.label}
            className="bg-secondary/30 rounded-xl p-4 text-center"
          >
            <p className="text-xs text-muted-foreground mb-2">{item.label}</p>
            <p className="text-xl lg:text-2xl font-bold text-foreground">
              {formatPrice(item.value)}
            </p>
            <p className="text-[10px] text-muted-foreground mt-1">{item.suffix}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <span
          className={cn(
            "inline-flex items-center gap-1",
            isPositive ? "text-emerald-600" : "text-red-600",
          )}
        >
          {isPositive ? "+" : ""}
          {formatPrice(goldPrice.changeAmount)} تومان
        </span>
        <span>تغییرات امروز</span>
      </div>
    </section>
  );
}
