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

/**
 * Converts an unsigned amount in cents to a signed value based on the transaction direction.
 *
 * @param {number} unsignedAmount - The amount in cents without sign consideration.
 * @param {boolean} isInflow - Indicates if the amount is an inflow (true) or outflow (false).
 * @return {number} - The signed amount in cents, positive for inflow and negative for outflow.
 */
export function convertToSignedAmount(
  unsignedAmount: number,
  isInflow: boolean
): number {
  return unsignedAmount * (isInflow ? 1 : -1);
}

export function convertToUnsignedAmount(amount: number) {
  return Math.abs(amount);
}
