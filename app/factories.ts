import { BANK, EUR, FLEXIBLE } from "./constants";
import { Account, Budget, Category, Payee, Transaction } from "./types";

export function createEmptyBudget(): Budget {
  return {
    id: "",
    name: "",
    currency: EUR,
    payDay: 1,
  };
}

export function createEmptyAccount(): Account {
  return {
    id: "",
    budgetId: "",
    name: "",
    type: BANK,
    balance: 0,
  };
}

export function createEmptyCategory(): Category {
  return {
    id: "",
    budgetId: "",
    name: "",
    group: FLEXIBLE,
    balance: 0,
  };
}

export function createEmptyPayee(): Payee {
  return {
    id: "",
    budgetId: "",
    name: "",
  };
}

export function createEmptyTransaction(): Transaction {
  return {
    id: "",
    budgetId: "",
    accountId: "",
    categoryId: "",
    payeeId: "",
    date: Date.now(),
    amount: 0,
    memo: "",
  };
}
