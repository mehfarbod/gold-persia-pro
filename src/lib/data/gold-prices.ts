import { GoldPrice } from "@/lib/types";

// This module is the single source of truth for gold pricing.
// Replace the sample data below with a real API call later.
// The architecture isolates price fetching so the rest of the app
// never hardcodes gold prices.

const SAMPLE_PRICES: GoldPrice = {
  id: "gp-1",
  gold18K: 4_250_000,      // Toman per gram
  gold24K: 5_670_000,
  gramPrice: 4_250_000,
  change: 1.2,
  changeAmount: 50_500,
  currency: "تومان",
  updatedAt: new Date().toISOString(),
};

/**
 * Fetch the current gold price.
 * In production, replace with a real API call (e.g. Tgju, Melal, etc.)
 */
export async function fetchGoldPrice(): Promise<GoldPrice> {
  // TODO: Replace with real API
  // const response = await fetch(process.env.GOLD_PRICE_API_URL!);
  // return response.json();
  return { ...SAMPLE_PRICES, updatedAt: new Date().toISOString() };
}

/**
 * Get cached / static gold price for server-side rendering.
 * In production, cache this with revalidate.
 */
export function getGoldPrice(): GoldPrice {
  return SAMPLE_PRICES;
}

export type { GoldPrice };
