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
  let existingPayees = null;

  try {
    existingPayees = await payeesCollection.getAll({ name, budgetId });
  } catch (error) {
    console.log("error existingPayees getAll", error);
  }

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
