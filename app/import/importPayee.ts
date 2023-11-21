import { payeesCollection } from "../services/rethinkid";
import { CSVRow, UnsavedPayee } from "../types";

export async function importPayee(
  budgetId: string,
  csvRow: CSVRow
): Promise<void> {
  const name = csvRow["Payee Name"];
  console.log("in Payee Name", name);
  if (!name) return;

  // Create unsaved doc
  const unsavedPayee: UnsavedPayee = { name, budgetId };

  // Check doesn't exist
  const existingPayees = await payeesCollection.getAll({ name, budgetId });
  if (existingPayees && existingPayees.length > 0) return;

  // Insert
  payeesCollection.insertOne(unsavedPayee);
}
