import { currencyToCents } from "../currency";
import { accountsCollection } from "../services/bzr";
import { AccountTypes, CSVRow, UnsavedAccount } from "../types";

export async function importAccount(budgetId: string, csvRow: CSVRow) {
  const name = csvRow["Account Name"];
  const userInputType = csvRow["Account Type"];
  const currencyStr = csvRow["Account Balance"];

  if (!name) return;

  function isValidAccountType(type: string): type is AccountTypes {
    return Object.values(AccountTypes).includes(type as AccountTypes);
  }

  let type = AccountTypes.CHECKING;
  if (isValidAccountType(userInputType)) {
    type = userInputType;
  }

  let balanceCents = 0;
  if (currencyStr) {
    const currency: number = parseFloat(currencyStr);
    if (!Number.isNaN(currency)) {
      balanceCents = currencyToCents(currency);
    }
  }

  // Create unsaved doc
  const unsavedAccount: UnsavedAccount = {
    budgetId,
    name,
    type,
    balanceCents,
  };

  // Check doesn't exist
  const existingAccounts = await accountsCollection.getAll({ name, budgetId });
  if (existingAccounts && existingAccounts.length > 0) return;
  // Insert
  accountsCollection.insertOne(unsavedAccount);
}
