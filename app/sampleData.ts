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
  payDay: 21,
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
    balanceCents: 10000,
  },
  {
    id: uuidv7(),
    budgetId,
    name: "Unicaja",
    type: AccountTypes.CHECKING,
    balanceCents: 20000,
  },
];

export const SAMPLE_CATEGORIES: Category[] = [
  {
    id: uuidv7(),
    budgetId,
    name: "Trip",
    group: CategoryGroups.FIXED_COSTS,
    balanceCents: 10000,
    notes: "",
  },
  {
    id: uuidv7(),
    budgetId,
    name: "Amazon Prime",
    group: CategoryGroups.FIXED_COSTS,
    balanceCents: 1061,
    notes: "€5.62/month - Goal: €49.90",
  },
  {
    id: uuidv7(),
    budgetId,
    name: "Car Service",
    group: CategoryGroups.FIXED_COSTS,
    balanceCents: 17000,
    notes: "€20/month - Goal: €240",
  },
  {
    id: uuidv7(),
    budgetId,
    name: "Car Tax",
    group: CategoryGroups.FIXED_COSTS,
    balanceCents: 6615,
    notes: "€5.13/month - Goal: €66.15",
  },
  {
    id: uuidv7(),
    budgetId,
    name: "Gifts",
    group: CategoryGroups.FIXED_COSTS,
    balanceCents: 5000,
    notes: "€20/month",
  },
  {
    id: uuidv7(),
    budgetId,
    name: "Food",
    group: CategoryGroups.FIXED_COSTS,
    balanceCents: 63902,
    notes: "€800/month",
  },
  {
    id: uuidv7(),
    budgetId,
    name: "Fuel",
    group: CategoryGroups.FIXED_COSTS,
    balanceCents: 2000,
    notes: "",
  },
  {
    id: uuidv7(),
    budgetId,
    name: "Child Care",
    group: CategoryGroups.FIXED_COSTS,
    balanceCents: 24400,
    notes: "€150/month",
  },
  {
    id: uuidv7(),
    budgetId,
    name: "School",
    group: CategoryGroups.FIXED_COSTS,
    balanceCents: 0,
    notes: "€290/month",
  },
  {
    id: uuidv7(),
    budgetId,
    name: "Garage",
    group: CategoryGroups.FIXED_COSTS,
    balanceCents: 0,
    notes: "€10/month",
  },
  {
    id: uuidv7(),
    budgetId,
    name: "School Transport",
    group: CategoryGroups.FIXED_COSTS,
    balanceCents: 0,
    notes: "€50/month",
  },
  {
    id: uuidv7(),
    budgetId,
    name: "Ready To Invest",
    group: CategoryGroups.FIXED_COSTS,
    balanceCents: 69976,
    notes: "",
  },
  {
    id: uuidv7(),
    budgetId,
    name: "Spotify",
    group: CategoryGroups.FIXED_COSTS,
    balanceCents: 1099,
    notes: "€10.99/month",
  },
  {
    id: uuidv7(),
    budgetId,
    name: "Guilt-Free Spending",
    group: CategoryGroups.FIXED_COSTS,
    balanceCents: 20458,
    notes: "€450/month",
  },
  {
    id: uuidv7(),
    budgetId,
    name: "Child Savings",
    group: CategoryGroups.SAVINGS,
    balanceCents: 0,
    notes: "€25/month",
  },
  {
    id: uuidv7(),
    budgetId,
    name: "Car Savings",
    group: CategoryGroups.SAVINGS,
    balanceCents: 0,
    notes: "€20/month",
  },
  {
    id: uuidv7(),
    budgetId,
    name: "Personal Savings",
    group: CategoryGroups.SAVINGS,
    balanceCents: 0,
    notes: "€50/month",
  },
  {
    id: uuidv7(),
    budgetId,
    name: "Holiday Savings",
    group: CategoryGroups.SAVINGS,
    balanceCents: 0,
    notes: "€150/month",
  },
];
