import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import useAppStore from "@/app/store";
import {
  accountsCollection,
  categoriesCollection,
  transactionsCollection,
} from "@/app/services/rethinkid";
import { BUDGETS_PATH } from "@/app/constants";
import { Transaction } from "@/app/types";

interface Props {
  children: ReactNode;
  budgetId: string;
  transaction: Transaction;
}

const DeleteTransactionButton = ({
  children,
  budgetId,
  transaction,
}: Props) => {
  const router = useRouter();

  const {
    deleteTransaction,
    getCategory,
    getAccount,
    updateCategory,
    updateAccount,
  } = useAppStore();

  async function handleClick() {
    if (!window.confirm("You sure?")) return;

    const category = getCategory(transaction.categoryId);
    console.log(category);
    category.balance -= transaction.amount;
    updateCategory(category);
    categoriesCollection.updateOne(category.id, category);

    const account = getAccount(transaction.accountId);
    account.balance -= transaction.amount;
    updateAccount(account);
    accountsCollection.updateOne(account.id, account);

    transactionsCollection.deleteOne(transaction.id);
    deleteTransaction(transaction.id);
    router.push(`${BUDGETS_PATH}/${budgetId}/transactions`);
  }

  return (
    <button className="btn btn-xs btn-error" onClick={() => handleClick()}>
      {children}
    </button>
  );
};

export default DeleteTransactionButton;
