import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import {
  accountsCollection,
  budgetsCollection,
} from "@/app/services/rethinkid";
import useAppStore from "../store";
import { BUDGETS_PATH } from "../constants";

interface Props {
  children: ReactNode;
  id: string;
}

const DeleteBudgetButton = ({ children, id }: Props) => {
  const router = useRouter();

  const { deleteBudget } = useAppStore();

  async function handleClick() {
    if (!window.confirm("You sure?")) return;

    budgetsCollection.deleteOne(id);
    accountsCollection.deleteAll({ budgetId: id });
    // Could clean up accounts from local state, not really important
    deleteBudget(id);
    router.push(BUDGETS_PATH);
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

export default DeleteBudgetButton;
