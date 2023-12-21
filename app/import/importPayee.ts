import { payeesCollection } from "../services/rethinkid";
import { CSVRow, UnsavedPayee } from "../types";

export async function importPayee(
  budgetId: string,
  csvRow: CSVRow
): Promise<void> {
  const name = csvRow["Payee Name"];
  if (!name) return;

  console.log("payee name", name);

  // Create unsaved doc
  const unsavedPayee: UnsavedPayee = { name, budgetId };

  console.log("unsavedPayee", unsavedPayee);

  // Check doesn't exist
  const existingPayees = await payeesCollection.getAll({ name, budgetId });

  console.log("existingPayees", existingPayees);

  if (existingPayees && existingPayees.length > 0) {
    console.log("payee exists, return");
    return;
  }

  console.log("insert payee");

  // Insert
  const res = await payeesCollection.insertOne(unsavedPayee);

  console.log("inserted payee. res:", res);
}
