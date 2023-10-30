import { BUDGETS_PATH } from "@/app/constants";
import useAppStore from "@/app/store";
import dynamic from "next/dynamic";
import Link from "next/link";
import TransactionHead from "./TransactionHead";

const TransactionRow = dynamic(() => import("./TransactionRow"), {
  ssr: false,
});

interface Props {
  budgetId: string;
}

const AccountsList = ({ budgetId }: Props) => {
  const getTransactionsForBudget = useAppStore((state) =>
    state.transactions.filter((t) => t.budgetId === budgetId)
  );

  return (
    <>
      {getTransactionsForBudget.length === 0 ? (
        <div className="prose">
          <p>
            Add your first transaction (Make sure you add at least one account,
            category, and payee before adding you first transaction)
          </p>
        </div>
      ) : (
        <table className="table">
          <TransactionHead />
          <tbody>
            {getTransactionsForBudget.map((transaction) => (
              <TransactionRow
                key={transaction.id}
                budgetId={budgetId}
                transaction={transaction}
                actions={
                  <Link
                    className="btn btn-xs btn-accent"
                    href={`${BUDGETS_PATH}/${budgetId}/transactions/${transaction.id}`}
                  >
                    View
                  </Link>
                }
              />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default AccountsList;
