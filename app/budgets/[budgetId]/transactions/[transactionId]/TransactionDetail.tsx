import useAppStore from "@/app/store";
import dynamic from "next/dynamic";

const DeleteTransactionButton = dynamic(
  () => import("./DeleteTransactionButton"),
  {
    ssr: false,
  }
);
const FormattedCurrency = dynamic(
  () => import("@/app/budgets/[budgetId]/FormattedCurrency"),
  {
    ssr: false,
  }
);

interface Props {
  budgetId: string;
  transactionId: string;
}

const TransactionDetail = ({ budgetId, transactionId }: Props) => {
  const { getBudget, getTransaction } = useAppStore();

  return (
    <>
      <h1>Transaction</h1>
      <p>
        <FormattedCurrency
          budgetId={budgetId}
          amount={getTransaction(transactionId).amount}
        />
      </p>
      <p>timestamp: {getTransaction(transactionId).date}</p>
      <p>accountId: {getTransaction(transactionId).accountId}</p>
      <p>categoryId: {getTransaction(transactionId).categoryId}</p>
      <p>payeeId: {getTransaction(transactionId).payeeId}</p>
      <p>{getTransaction(transactionId).memo}</p>
      <DeleteTransactionButton
        budgetId={budgetId}
        transactionId={transactionId}
      >
        Delete Transaction
      </DeleteTransactionButton>
    </>
  );
};

export default TransactionDetail;
