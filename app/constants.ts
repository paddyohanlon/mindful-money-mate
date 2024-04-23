import { PermissionType } from "@bzr/bazaar";
import { Option } from "./types";

export const BUDGETS_PATH = "/budgets";

export const LAST_USED_BUDGET_ID = "lastUsedBudgetId";

export const LOCALE = "en-US";

export const EUR = "EUR";
export const USD = "USD";

interface StringEnum {
  [key: string]: string;
}

export function createOptionsFromStrEnum(enumType: StringEnum): Option[] {
  let options = [] as Option[];
  for (let member in enumType) {
    options.push({
      value: enumType[member] as string,
      label: enumType[member] as string,
    });
  }
  return options;
}

export const VIEWER_ROLE_PERMISSION_TYPES = [PermissionType.READ];
export const EDITOR_ROLE_PERMISSION_TYPES = [
  PermissionType.READ,
  PermissionType.INSERT,
  PermissionType.UPDATE,
];

export const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
