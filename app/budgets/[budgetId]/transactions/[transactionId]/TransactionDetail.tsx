import useAppStore from "@/app/store";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import TransactionHead from "../TransactionHead";
import Link from "next/link";
import { BUDGETS_PATH } from "@/app/constants";

const DeleteTransactionButton = dynamic(
  () => import("./DeleteTransactionButton"),
  {
    ssr: false,
  }
);
const TransactionRow = dynamic(() => import("../TransactionRow"), {
  ssr: false,
});

interface Props {
  budgetId: string;
  transactionId: string;
}

const TransactionDetail = ({ budgetId, transactionId }: Props) => {
  const { getBudget, getTransaction } = useAppStore();

  const [transaction, setTransaction] = useState(getTransaction(transactionId));

  useEffect(() => {
    setTransaction(getTransaction(transactionId));
  }, [setTransaction, getTransaction, transactionId]);

  return (
    <>
      <div className="prose">
        <h1>Transaction</h1>
      </div>
      <table className="table">
        <TransactionHead />
        <tbody>
          <TransactionRow
            key={transaction.id}
            budgetId={budgetId}
            transaction={transaction}
            actions={
              <DeleteTransactionButton
                budgetId={budgetId}
                transaction={transaction}
              >
                Delete Transaction
              </DeleteTransactionButton>
            }
          />
        </tbody>
      </table>
    </>
  );
};

export default TransactionDetail;
