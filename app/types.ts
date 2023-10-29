export type Budget = {
  id: string;
  name: string;
  currency: string;
  payDay: number;
  // isPrimary: boolean;
};

export type Account = {
  id: string;
  budgetId: string;
  name: string;
  type: string; // a constant BANK | CASH, gives 'not string' type error on select input
  balance: number;
};

export type Category = {
  id: string;
  budgetId: string;
  name: string;
  // order: number;
  group: string; // See groups in @/app/constants.ts
  balance: number;
  // isPartOfDailySpend: boolean;
  // hidden: boolean;
};

export type Payee = {
  id: string;
  budgetId: string;
  name: string;
};

export type Transaction = {
  id: string;
  budgetId: string;
  accountId: string;
  categoryId: string;
  payeeId: string;
  date: number; // timestamp
  amount: number;
  memo: string;
};

export type Option = {
  value: string;
  label: string;
};
