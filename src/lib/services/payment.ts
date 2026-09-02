import { PaymentProvider, PaymentResult } from "@/lib/types";

/**
 * Payment provider abstraction.
 *
 * In production, replace the mock provider with a real Iranian gateway
 * (e.g. Zarinpal, Pay.ir, Saman, etc.) by implementing the PaymentProvider interface.
 * Gateway credentials must come from environment variables, never hardcoded.
 */

// ─── Mock Provider (development only) ─────────────────
export class MockPaymentProvider implements PaymentProvider {
  async createPayment(
    amount: number,
    orderId: string,
    _callbackUrl: string,
  ): Promise<PaymentResult> {
    console.log(`[MockPayment] Creating payment: ${amount} Toman for order ${orderId}`);
    return {
      success: true,
      transactionId: `MOCK-${Date.now()}`,
      message: "پرداخت با موفقیت ایجاد شد (حالت آزمایشی)",
    };
  }

  async verifyPayment(transactionId: string): Promise<PaymentResult> {
    console.log(`[MockPayment] Verifying payment: ${transactionId}`);
    if (transactionId.startsWith("MOCK-")) {
      return {
        success: true,
        transactionId,
        message: "پرداخت با موفقیت تایید شد (حالت آزمایشی)",
      };
    }
    return {
      success: false,
      message: "پرداخت تایید نشد",
    };
  }
}

// ─── Factory ──────────────────────────────────────────
let _provider: PaymentProvider | null = null;

export function getPaymentProvider(): PaymentProvider {
  if (_provider) return _provider;

  // In production, check PAYMENT_PROVIDER env var and instantiate accordingly.
  // Example:
  // if (process.env.PAYMENT_PROVIDER === "zarinpal") {
  //   _provider = new ZarinpalProvider();
  // } else {
  //   _provider = new MockPaymentProvider();
  // }

  _provider = new MockPaymentProvider();
  return _provider;
}
