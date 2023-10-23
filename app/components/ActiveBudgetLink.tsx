import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Budget } from "../types";
import useAppStore from "../store";
import { BUDGETS_PATH } from "../constants";

const ActiveBudgetLink = () => {
  const params = useParams();

  const { budgets } = useAppStore();

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
        <Link href={`${BUDGETS_PATH}/${budget.id}`}>Budget: {budget.name}</Link>
      )}
    </>
  );
};

export default ActiveBudgetLink;
