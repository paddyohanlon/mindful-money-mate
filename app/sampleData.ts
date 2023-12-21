import { uuidv7 } from "uuidv7";
import {
  Account,
  AccountTypes,
  Budget,
  Category,
  CategoryGroups,
  Payee,
} from "./types";
import { EUR } from "./constants";

export const budgetId = uuidv7();

export const SAMPLE_BUDGET: Budget = {
  id: budgetId,
  name: "My Budget",
  currency: EUR,
  payDay: 1,
  ownerId: "",
};

export const SAMPLE_PAYEES: Payee[] = [
  {
    id: uuidv7(),
    budgetId,
    name: "Shop",
  },
  {
    id: uuidv7(),
    budgetId,
    name: "Amazon",
  },
  {
    id: uuidv7(),
    budgetId,
    name: "Pharmacy",
  },
  {
    id: uuidv7(),
    budgetId,
    name: "Bakery",
  },
  {
    id: uuidv7(),
    budgetId,
    name: "Salary",
  },
  {
    id: uuidv7(),
    budgetId,
    name: "Parking",
  },
  {
    id: uuidv7(),
    budgetId,
    name: "Fruit & Veg",
  },
  {
    id: uuidv7(),
    budgetId,
    name: "Petrol Station",
  },
  {
    id: uuidv7(),
    budgetId,
    name: "School",
  },
];

export const SAMPLE_ACCOUNTS: Account[] = [
  {
    id: uuidv7(),
    budgetId,
    name: "Cash",
    type: AccountTypes.CASH,
    balanceCents: 200 * 100,
  },
  {
    id: uuidv7(),
    budgetId,
    name: "Checking",
    type: AccountTypes.CHECKING,
    balanceCents: 3000 * 100,
  },
];

export const SAMPLE_CATEGORIES: Category[] = [
  {
    id: uuidv7(),
    budgetId,
    name: "Amazon Prime",
    group: CategoryGroups.FIXED_COSTS,
    balanceCents: 10 * 100,
    notes: "",
    targetCents: 50 * 100,
    targetFirstDueDate: new Date("5 May, 2024").getTime(),
    targetMonthlyFrequency: 12,
  },
  {
    id: uuidv7(),
    budgetId,
    name: "Gifts",
    group: CategoryGroups.FIXED_COSTS,
    balanceCents: 50 * 100,
    notes: "",
    targetCents: 20 * 100,
    targetFirstDueDate: 0,
    targetMonthlyFrequency: 1,
  },
  {
    id: uuidv7(),
    budgetId,
    name: "Food",
    group: CategoryGroups.FIXED_COSTS,
    balanceCents: 639 * 100,
    notes: "",
    targetCents: 800 * 100,
    targetFirstDueDate: 0,
    targetMonthlyFrequency: 1,
  },
  {
    id: uuidv7(),
    budgetId,
    name: "Fuel",
    group: CategoryGroups.FIXED_COSTS,
    balanceCents: 20 * 100,
    notes: "",
    targetCents: 100 * 100,
    targetFirstDueDate: 0,
    targetMonthlyFrequency: 1,
  },
  {
    id: uuidv7(),
    budgetId,
    name: "Child Care",
    group: CategoryGroups.FIXED_COSTS,
    balanceCents: 244 * 100,
    notes: "",
    targetCents: 150 * 100,
    targetFirstDueDate: 0,
    targetMonthlyFrequency: 1,
  },
  {
    id: uuidv7(),
    budgetId,
    name: "School",
    group: CategoryGroups.FIXED_COSTS,
    balanceCents: 0,
    notes: "",
    targetCents: 300 * 100,
    targetFirstDueDate: 0,
    targetMonthlyFrequency: 1,
  },
  {
    id: uuidv7(),
    budgetId,
    name: "Guilt-Free Spending",
    group: CategoryGroups.FIXED_COSTS,
    balanceCents: 200 * 100,
    notes: "",
    targetCents: 450 * 100,
    targetFirstDueDate: 0,
    targetMonthlyFrequency: 1,
  },
  {
    id: uuidv7(),
    budgetId,
    name: "Holiday Savings",
    group: CategoryGroups.SAVINGS,
    balanceCents: 0,
    notes: "Family trip to Norway",
    targetCents: 3000 * 100,
    targetFirstDueDate: new Date("Jul 1, 2024").getTime(),
    targetMonthlyFrequency: 12,
  },
];
