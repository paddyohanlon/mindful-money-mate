import useAppStore from "../store";
import { BUDGETS_PATH, LAST_USED_BUDGET_ID } from "../constants";
import { useRouter } from "next/navigation";
import { settingsCollection } from "../services/bzr";

const BudgetsList = () => {
  const router = useRouter();

  const budgets = useAppStore((state) => state.budgets);
  const myUserId = useAppStore((state) => state.user.id);
  const setLastUsedBudgetId = useAppStore((state) => state.setLastUsedBudgetId);

  async function handleClick(budgetId: string) {
    setLastUsedBudgetId(budgetId);
    settingsCollection.updateOne(LAST_USED_BUDGET_ID, {
      id: LAST_USED_BUDGET_ID,
      budgetId,
    });
    router.push(`${BUDGETS_PATH}/${budgetId}`);
  }

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
              <button
                className="btn btn-ghost justify-start"
                onClick={() => handleClick(budget.id)}
              >
                {budget.name}{" "}
                {budget.ownerId && budget.ownerId !== myUserId && " (shared)"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default BudgetsList;
