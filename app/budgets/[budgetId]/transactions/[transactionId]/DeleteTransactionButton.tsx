import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import useAppStore from "@/app/store";
import { transactionsCollection } from "@/app/services/rethinkid";
import { BUDGETS_PATH } from "@/app/constants";

interface Props {
  children: ReactNode;
  budgetId: string;
  transactionId: string;
}

const DeleteTransactionButton = ({
  children,
  budgetId,
  transactionId,
}: Props) => {
  const router = useRouter();

  const { deleteTransaction } = useAppStore();

  async function handleClick() {
    if (!window.confirm("You sure?")) return;

    transactionsCollection.deleteOne(transactionId);
    deleteTransaction(transactionId);
    router.push(`${BUDGETS_PATH}/${budgetId}/transactions`);
  }

  return (
    <button className="btn btn-sm btn-error" onClick={() => handleClick()}>
      {children}
    </button>
  );
};

export default DeleteTransactionButton;
