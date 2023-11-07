import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import useAppStore from "@/app/store";
import { payeesCollection } from "@/app/services/rethinkid";
import { BUDGETS_PATH } from "@/app/constants";

interface Props {
  children: ReactNode;
  budgetId: string;
  payeeId: string;
}

const DeletePayeeButton = ({ children, budgetId, payeeId }: Props) => {
  const router = useRouter();

  const deletePayee = useAppStore((state) => state.deletePayee);

  async function handleClick() {
    if (!window.confirm("You sure?")) return;

    payeesCollection.deleteOne(payeeId);
    deletePayee(payeeId);
    router.push(`${BUDGETS_PATH}/${budgetId}`);
  }

  return (
    <button
      className="btn btn-sm btn-outline btn-error"
      onClick={() => handleClick()}
    >
      {children}
    </button>
  );
};

export default DeletePayeeButton;
