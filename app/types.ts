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
  type: AccountTypes;
  balanceCents: number;
};

export type UnsavedAccount = Omit<Account, "id">;

export enum AccountTypes {
  CHECKING = "Checking",
  SAVINGS = "Savings",
  CASH = "Cash",
  CREDIT = "Credit",
}

export type Category = {
  id: string;
  budgetId: string;
  name: string;
  // order: number;
  group: CategoryGroups;
  balanceCents: number;
  notes: string;
  // isPartOfDailySpend: boolean;
  // hidden: boolean;
  // targetMonthly
  // targetTotal
};

export type UnsavedCategory = Omit<Category, "id">;

export enum CategoryGroups {
  FIXED_COSTS = "Fixed Costs",
  GUILT_FREE_SPENDING = "Guilt-Free Spending",
  SAVINGS = "Savings",
  INVESTMENTS = "Investments",
  CREDIT_CARD_PAYMENTS = "Credit Card Payments",
}

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
  amountCents: number;
  memo: string;
};

export type Option = {
  value: string;
  label: string;
};

export interface CSVRow {
  "Payee Name": string;
  "Account Name": string;
  "Account Type": AccountTypes;
  "Account Balance": string;
  "Category Name": string;
  "Category Group": string;
  "Category Balance": string;
  "Category Notes": string;
}
