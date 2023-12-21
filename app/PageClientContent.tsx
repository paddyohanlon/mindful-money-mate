import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAppStore from "@/app/store";
import { BUDGETS_PATH, LAST_USED_BUDGET_ID } from "./constants";
import { settingsCollection } from "./services/rethinkid";

const PageClientContent = () => {
  const isLoggedIn = useAppStore((state) => state.isLoggedIn);

  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      settingsCollection.getOne(LAST_USED_BUDGET_ID).then((doc) => {
        const lastUsedBudgetId = doc ? doc.budgetId : "";
        if (lastUsedBudgetId) {
          router.push(`${BUDGETS_PATH}/${lastUsedBudgetId}`);
          return;
        }
        router.push(BUDGETS_PATH);
      });
    }
  }, [router, isLoggedIn]);

  return (
    <div className="prose px-6 py-6">
      {!isLoggedIn ? <p>Sign up or sign in to get started.</p> : <div></div>}
    </div>
  );
};

export default PageClientContent;
