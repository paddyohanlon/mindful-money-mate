import Link from "next/link";
import useAppStore from "../store";
import { BUDGETS_PATH } from "../constants";

const BudgetsList = () => {
  const budgets = useAppStore((state) => state.budgets);
  const myUserId = useAppStore((state) => state.user.id);

  return (
    <>
      {!budgets.length ? (
        <div className="prose">
          <p>Add your first budget.</p>
        </div>
      ) : (
        <ul className="not-prose menu menu-lg bg-base-200 rounded-box w-full">
          {budgets.map((budget) => (
            <li key={budget.id}>
              <Link href={`${BUDGETS_PATH}/${budget.id}`}>
                {budget.name}{" "}
                {budget.ownerId && budget.ownerId !== myUserId && " (shared)"}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default BudgetsList;
