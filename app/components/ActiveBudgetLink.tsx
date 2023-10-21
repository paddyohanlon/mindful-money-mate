import Link from "next/link";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import BudgetsContext from "../contexts/budgetsContext";
import { Budget } from "../types";

const ActiveBudgetLink = () => {
  const params = useParams();

  const { budgets } = useContext(BudgetsContext);

  const [budget, setBudget] = useState<Budget>();

  useEffect(() => {
    const foundBudget = budgets.find((b) => b.id === params.budgetId);

    if (foundBudget) {
      setBudget(foundBudget);
    }
  }, [budgets, params, setBudget]);

  return (
    <>
      {!budget ? (
        <p>Budget not found.</p>
      ) : (
        <Link href={`/budgets/${budget.id}`}>Budget: {budget.name}</Link>
      )}
    </>
  );
};

export default ActiveBudgetLink;
