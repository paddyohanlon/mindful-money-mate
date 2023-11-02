export type Budget = {
  id: string;
  name: string;
  currency: string;
  payDay: number;
  // isPrimary: boolean;
};

export type UnsavedBudget = Omit<Budget, "id">;

export type Account = {
  id: string;
  budgetId: string;
  name: string;
  /** BANK | CASH */
  type: string; // a constant BANK | CASH, gives 'not string' type error on select input
  balanceCents: number;
};

export type Category = {
  id: string;
  budgetId: string;
  name: string;
  // order: number;
  group: string; // See groups in @/app/constants.ts
  balanceCents: number;
  notes: string;
  // isPartOfDailySpend: boolean;
  // hidden: boolean;
  // targetMonthly
  // targetTotal
};

// when updating category balance, create an assignment newBalance - currentBalance
// display sum for category based on last to next pay days.
export type Assignment = {
  id: string;
  categoryId: string;
  budgetId: string;
  /** Timestamp */
  date: number;
  amountCents: number;
};

export type UnsavedAssignment = Omit<Assignment, "id">;

export type Payee = {
  id: string;
  budgetId: string;
  name: string;
};

export type UnsavedPayee = Omit<Payee, "id">;

export type Transaction = {
  id: string;
  budgetId: string;
  accountId: string;
  categoryId: string;
  payeeId: string;
  /** Value is a timestamp */
  date: number;
  /** Value is in cents */
  amountCents: number;
  memo: string;
};

export type Option = {
  value: string;
  label: string;
};
