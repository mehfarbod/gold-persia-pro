import { Product, GoldPrice } from "@/lib/types";

/**
 * Pricing configuration — adjust these values for business rule changes.
 * Do NOT hardcode these percentages elsewhere.
 */
export interface PricingConfig {
  defaultMakingChargeType: "percent" | "fixed";
  defaultMakingChargeValue: number;
  defaultProfitPercentage: number;
  defaultTaxPercentage: number;
  shippingCost: number;
  freeShippingThreshold: number;
}

export const DEFAULT_PRICING_CONFIG: PricingConfig = {
  defaultMakingChargeType: "percent",
  defaultMakingChargeValue: 10,
  defaultProfitPercentage: 4,
  defaultTaxPercentage: 9,
  shippingCost: 500_000,
  freeShippingThreshold: 50_000_000,
};

/**
 * Calculate the final price of a product from its gold price, weight,
 * purity, making charge, profit, and tax.
 *
 * This is the SINGLE source of truth for price calculation.
 * The rest of the app must call this function instead of computing prices manually.
 */
export function calculateProductPrice(
  product: Product,
  goldPrice: GoldPrice,
  config: PricingConfig = DEFAULT_PRICING_CONFIG,
): number {
  const referencePrice =
    product.purity >= 24 ? goldPrice.gold24K : goldPrice.gold18K;

  // Base gold value
  const goldValue = product.weight * referencePrice;

  // Making charge
  let makingCharge = 0;
  if (product.makingChargeType === "percent") {
    makingCharge = goldValue * (product.makingCharge / 100);
  } else {
    makingCharge = product.makingCharge;
  }

  // Seller profit
  const profit = goldValue * (product.profitPercentage / 100);

  // Subtotal before tax
  const subtotal = goldValue + makingCharge + profit;

  // Tax
  const tax = subtotal * (product.taxPercentage / 100);

  return Math.round(subtotal + tax);
}

/**
 * Get a detailed price breakdown for display.
 */
export interface PriceBreakdown {
  goldValue: number;
  makingCharge: number;
  makingChargeLabel: string;
  profit: number;
  tax: number;
  subtotal: number;
  total: number;
}

export function getPriceBreakdown(
  product: Product,
  goldPrice: GoldPrice,
): PriceBreakdown {
  const referencePrice =
    product.purity >= 24 ? goldPrice.gold24K : goldPrice.gold18K;

  const goldValue = product.weight * referencePrice;

  let makingCharge = 0;
  let makingChargeLabel = "";
  if (product.makingChargeType === "percent") {
    makingCharge = goldValue * (product.makingCharge / 100);
    makingChargeLabel = `اجازه ساخت (${product.makingCharge}٪)`;
  } else {
    makingCharge = product.makingCharge;
    makingChargeLabel = "اجازه ساخت";
  }

  const profit = goldValue * (product.profitPercentage / 100);
  const subtotal = goldValue + makingCharge + profit;
  const tax = subtotal * (product.taxPercentage / 100);
  const total = Math.round(subtotal + tax);

  return {
    goldValue: Math.round(goldValue),
    makingCharge: Math.round(makingCharge),
    makingChargeLabel,
    profit: Math.round(profit),
    tax: Math.round(tax),
    subtotal: Math.round(subtotal),
    total,
  };
}

/**
 * Calculate cart total.
 */
export function calculateCartTotal(
  items: { product: Product; quantity: number; priceAtAddition: number }[],
): number {
  return items.reduce((sum, item) => sum + item.priceAtAddition * item.quantity, 0);
}

/**
 * Calculate shipping cost.
 */
export function calculateShipping(
  subtotal: number,
  config: PricingConfig = DEFAULT_PRICING_CONFIG,
): number {
  return subtotal >= config.freeShippingThreshold ? 0 : config.shippingCost;
}
