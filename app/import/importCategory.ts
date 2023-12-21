import { currencyToCents } from "../currency";
import { categoriesCollection } from "../services/rethinkid";
import { CSVRow, CategoryGroups, UnsavedCategory } from "../types";

export async function importCategory(
  budgetId: string,
  csvRow: CSVRow
): Promise<void> {
  const name = csvRow["Category Name"];
  const userInputGroup = csvRow["Category Group"];
  const balanceCurrencyStr = csvRow["Category Balance"];
  const notes = csvRow["Category Notes"];
  const targetCurrencyStr = csvRow["Category Target"];
  const targetFirstDueDateStr = csvRow["Category Target First Due Date"];
  const targetMonthlyFrequencyStr = csvRow["Category Target Monthly Frequency"];

  if (!name) return;

  function removeCurrencySign(str: string): string {
    return str.replace(/^[\€\$]/, "");
  }

  function isValidCategoryGroup(type: string): type is CategoryGroups {
    return Object.values(CategoryGroups).includes(type as CategoryGroups);
  }

  let group = CategoryGroups.FIXED_COSTS;
  if (isValidCategoryGroup(userInputGroup)) {
    group = userInputGroup;
  }

  let balanceCents = 0;
  if (balanceCurrencyStr) {
    const balanceCurrencyNoSymbol = removeCurrencySign(balanceCurrencyStr);
    const balanceCurrency: number = parseFloat(balanceCurrencyNoSymbol);
    if (!Number.isNaN(balanceCurrency)) {
      balanceCents = currencyToCents(balanceCurrency);
    }
  }

  let targetCents = 0;
  if (targetCurrencyStr) {
    console.log("targetCurrencyStr", targetCurrencyStr);
    const targetCurrencyStrNoSymbol = removeCurrencySign(targetCurrencyStr);
    console.log("targetCurrencyStrNoSymbol", targetCurrencyStrNoSymbol);
    const targetCurrency: number = parseFloat(targetCurrencyStrNoSymbol);
    console.log("targetCurrency", targetCurrency);
    if (!Number.isNaN(targetCurrency)) {
      console.log("!NaN");
      targetCents = currencyToCents(targetCurrency);
      console.log("targetCents", targetCents);
    }
  }

  let targetFirstDueDate = new Date().getTime();
  if (targetFirstDueDateStr) {
    const strToDate = new Date(targetFirstDueDateStr);
    if (!Number.isNaN(strToDate)) {
      targetFirstDueDate = strToDate.getTime();
    }
  }

  let targetMonthlyFrequency = 1;
  if (targetMonthlyFrequencyStr) {
    const parsedTargetFrequency: number = parseFloat(targetMonthlyFrequencyStr);
    if (!Number.isNaN(parsedTargetFrequency)) {
      targetMonthlyFrequency = parsedTargetFrequency;
    }
  }

  // Create unsaved doc
  const unsavedCategory: UnsavedCategory = {
    budgetId,
    name,
    group,
    balanceCents,
    notes,
    targetCents,
    targetFirstDueDate,
    targetMonthlyFrequency,
  };

  // Check doesn't exist
  const existingCategories = await categoriesCollection.getAll({
    name,
    budgetId,
  });
  if (existingCategories && existingCategories.length > 0) return;
  // Insert
  categoriesCollection.insertOne(unsavedCategory);
}
