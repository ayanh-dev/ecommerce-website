export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function getDiscountPercent(mrp: number, price: number) {
  if (!mrp || !price) return 0;
  return Math.round(((mrp - price) / mrp) * 100);
}

export function getStars(rating: number) {
  const filled = Math.round(rating);
  return Array.from({ length: 5 }, (_, index) => index < filled);
}
