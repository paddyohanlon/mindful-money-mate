export function centsToCurrency(cents: number) {
  return cents / 100;
}

export function currencyToCents(currency: number) {
  return currency * 100;
}

export function colorCurrencyClass(amount: number) {
  if (amount === 0) return "text-yellow-500";
  if (amount < 0) return "text-red-500";
  if (amount > 0) return "text-green-500";
  return "";
}
