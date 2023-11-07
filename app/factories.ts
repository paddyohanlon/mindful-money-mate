import { BANK, EUR, FLEXIBLE } from "./constants";
import {
  Account,
  Assignment,
  Budget,
  Category,
  Payee,
  Transaction,
} from "./types";

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
    balanceCents: 0,
  };
}

export function createEmptyAssignment(): Assignment {
  return {
    id: "",
    categoryId: "",
    budgetId: "",
    date: Date.now(),
    amountCents: 0,
  };
}

export function createEmptyCategory(): Category {
  return {
    id: "",
    budgetId: "",
    name: "",
    group: FLEXIBLE,
    balanceCents: 0,
    notes: "",
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
    amountCents: 0,
    memo: "",
  };
}
