import { User } from "@rethinkid/rethinkid-js-sdk";
import { EUR } from "./constants";
import {
  Account,
  AccountTypes,
  Assignment,
  Budget,
  Category,
  CategoryGroups,
  Payee,
  Transaction,
} from "./types";

export function createEmptyUser(): User {
  return {
    id: "",
    name: "",
    email: "",
  };
}

export function createEmptyBudget(): Budget {
  return {
    id: "",
    name: "",
    currency: EUR,
    payDay: 1,
    ownerId: "",
  };
}

export function createEmptyAccount(): Account {
  return {
    id: "",
    budgetId: "",
    name: "",
    type: AccountTypes.CHECKING,
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
    group: CategoryGroups.FIXED_COSTS,
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
