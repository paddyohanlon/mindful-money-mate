import { BUDGETS_PATH } from "@/app/constants";
import useAppStore from "@/app/store";
import dynamic from "next/dynamic";
import Link from "next/link";

const FormattedCurrency = dynamic(
  () => import("@/app/budgets/[budgetId]/FormattedCurrency"),
  {
    ssr: false,
  }
);

interface Props {
  budgetId: string;
}

const AccountsList = ({ budgetId }: Props) => {
  const { getTransactionsForBudget, getAccount, getPayee, getCategory } =
    useAppStore();

  function formatDate(timestamp: number): string {
    return new Date(timestamp).toDateString();
  }

  return (
    <>
      {getTransactionsForBudget(budgetId).length === 0 ? (
        <div className="prose">
          <p>
            Add your first transaction (Make sure you add at least one account,
            category, and payee before adding you first transaction)
          </p>
        </div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Account</th>
              <th>Date</th>
              <th>Payee</th>
              <th>Category</th>
              <th>Memo</th>
              <th>Outflow</th>
              <th>Inflow</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {getTransactionsForBudget(budgetId).map((transaction) => (
              <tr key={transaction.id}>
                <td>{getAccount(transaction.accountId).name}</td>
                <td>
                  <Link
                    className="flex gap-4"
                    href={`${BUDGETS_PATH}/${budgetId}/transactions/${transaction.id}`}
                  >
                    {formatDate(transaction.date)}
                  </Link>
                </td>
                <td>{getPayee(transaction.payeeId).name}</td>
                <td>{getCategory(transaction.categoryId).name}</td>
                <td>{transaction.memo}</td>
                <td>
                  {transaction.amount < 0 && (
                    <FormattedCurrency
                      budgetId={budgetId}
                      amount={transaction.amount * -1}
                    />
                  )}
                </td>
                <td>
                  {transaction.amount > 0 && (
                    <FormattedCurrency
                      budgetId={budgetId}
                      amount={transaction.amount}
                    />
                  )}
                </td>
                <td>
                  <Link
                    className="btn btn-xs btn-neutral"
                    href={`${BUDGETS_PATH}/${budgetId}/transactions/${transaction.id}`}
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default AccountsList;
