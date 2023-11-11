import { currencyToCents } from "../currency";
import { categoriesCollection } from "../services/rethinkid";
import { CSVRow, CategoryGroups, UnsavedCategory } from "../types";

export async function importCategory(
  budgetId: string,
  csvRow: CSVRow
): Promise<void> {
  const name = csvRow["Category Name"];
  const userInputGroup = csvRow["Category Group"];
  const currencyStr = csvRow["Category Amount"];
  const notes = csvRow["Category Notes"];

  if (!name) return;

  function isValidCategoryGroup(type: string): type is CategoryGroups {
    return Object.values(CategoryGroups).includes(type as CategoryGroups);
  }

  let group = CategoryGroups.FIXED_COSTS;
  if (isValidCategoryGroup(userInputGroup)) {
    group = userInputGroup;
  }

  let balanceCents = 0;
  if (currencyStr) {
    const currency: number = parseFloat(currencyStr);
    if (!Number.isNaN(currency)) {
      balanceCents = currencyToCents(currency);
    }
  }

  // Create unsaved doc
  const unsavedCategory: UnsavedCategory = {
    budgetId,
    name,
    group,
    balanceCents,
    notes,
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
