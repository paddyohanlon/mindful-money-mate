import { AccountTypes } from "./types";

export const BUDGETS_PATH = "/budgets";

export const LOCALE = "en-US";

export const EUR = "EUR";
export const USD = "USD";

export const ACCOUNT_TYPE_OPTIONS = [
  { value: AccountTypes.CHECKING, label: AccountTypes.CHECKING },
  { value: AccountTypes.SAVINGS, label: AccountTypes.SAVINGS },
  { value: AccountTypes.CASH, label: AccountTypes.CASH },
  { value: AccountTypes.CREDIT, label: AccountTypes.CREDIT },
];
