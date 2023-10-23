import { useContext } from "react";
import BudgetsContext from "@/app/contexts/budgetsContext";
import Link from "next/link";

const BudgetsList = () => {
  const { budgets } = useContext(BudgetsContext);

  return (
    <ul className="menu menu-lg bg-base-200 rounded-box w-full">
      {budgets.map((budget) => (
        <li key={budget.id}>
          <Link href={`/budgets/${budget.id}`}>{budget.name}</Link>
        </li>
      ))}
    </ul>
  );
};

export default BudgetsList;
