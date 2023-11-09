import Link from "next/link";
import { useParams } from "next/navigation";
import useAppStore from "../store";
import { BUDGETS_PATH } from "../constants";

const ActiveBudgetLink = () => {
  const params = useParams();

  const budget = useAppStore((state) =>
    state.getBudget(params.budgetId as string)
  );

  return <Link href={`${BUDGETS_PATH}/${budget.id}`}>{budget.name}</Link>;
};

export default ActiveBudgetLink;
