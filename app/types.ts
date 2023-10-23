export type Budget = {
  id: string;
  name: string;
  currency: string;
  payDay: number;
};

export type Account = {
  id: string;
  budgetId: string;
  name: string;
  type: string; // "bank" | "cash", gives 'not string' type error on select input
  balance: number;
};
