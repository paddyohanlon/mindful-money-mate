import FormattedDate from "@/app/components/FormattedDate";
import { BUDGETS_PATH } from "@/app/constants";
import { convertToUnsignedAmount } from "@/app/currency";
import useAppStore from "@/app/store";
import { Transaction } from "@/app/types";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ReactNode } from "react";

const FormattedCurrency = dynamic(
  () => import("@/app/budgets/[budgetId]/FormattedCurrency"),
  {
    ssr: false,
  }
);

interface Props {
  budgetId: string;
  transaction: Transaction;
  actions: ReactNode;
}

const TransactionRow = ({ budgetId, transaction, actions }: Props) => {
  const getAccount = useAppStore((state) => state.getAccount);
  const getPayee = useAppStore((state) => state.getPayee);
  const getCategory = useAppStore((state) => state.getCategory);

  return (
    <tr>
      <td>{getAccount(transaction.accountId).name}</td>
      <td>
        <Link
          className="flex gap-4"
          href={`${BUDGETS_PATH}/${budgetId}/transactions/${transaction.id}`}
        >
          {<FormattedDate timestamp={transaction.date} />}
        </Link>
      </td>
      <td>{getPayee(transaction.payeeId).name}</td>
      <td>{getCategory(transaction.categoryId).name}</td>
      <td>{transaction.memo}</td>
      <td>
        {transaction.amountCents < 0 && (
          <FormattedCurrency
            budgetId={budgetId}
            amountCents={convertToUnsignedAmount(transaction.amountCents)}
          />
        )}
      </td>
      <td>
        {transaction.amountCents > 0 && (
          <FormattedCurrency
            budgetId={budgetId}
            amountCents={transaction.amountCents}
          />
        )}
      </td>
      <td>{actions}</td>
    </tr>
  );
};

export default TransactionRow;
