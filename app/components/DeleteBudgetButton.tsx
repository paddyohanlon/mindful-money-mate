import React, { ReactNode, useContext } from "react";
import { useRouter } from "next/navigation";
import { budgetCollection } from "@/app/services/rethinkid";
import BudgetsContext from "../contexts/budgetsContext";

interface Props {
  children: ReactNode;
  id: string;
}

const DeleteBudgetButton = ({ children, id }: Props) => {
  const router = useRouter();

  const { setBudgets } = useContext(BudgetsContext);

  async function deleteBudget(id: string) {
    budgetCollection.deleteOne(id);
    setBudgets((prevBudgets) =>
      prevBudgets.filter((budget) => budget.id !== id)
    );
    router.push("/budgets");
  }

  return (
    <button className="btn btn-error" onClick={() => deleteBudget(id)}>
      {children}
    </button>
  );
};

export default DeleteBudgetButton;
