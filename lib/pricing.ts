export const PRICE_PER_WINDOW = 8;
export const MINIMUM_PRICE = 199;

export function calculatePrice(windowCount: number): number {
  if (Number.isNaN(windowCount) || windowCount < 0) {
    return MINIMUM_PRICE;
  }

  const subtotal = windowCount * PRICE_PER_WINDOW;
  return Math.max(subtotal, MINIMUM_PRICE);
}
