import Link from "next/link";
import useAppStore from "../store";
import { BUDGETS_PATH } from "../constants";

const BudgetsList = () => {
  const { budgets } = useAppStore();

  return (
    <ul className="not-prose menu menu-lg bg-base-200 rounded-box w-full">
      {budgets.map((budget) => (
        <li key={budget.id}>
          <Link href={`${BUDGETS_PATH}/${budget.id}`}>{budget.name}</Link>
        </li>
      ))}
    </ul>
  );
};

export default BudgetsList;
