import Link from "next/link";
import { useParams } from "next/navigation";
import useAppStore from "../store";
import { BUDGETS_PATH } from "../constants";
import { useEffect } from "react";

const ActiveBudgetLink = () => {
  const params = useParams();

  const { getBudget } = useAppStore();

  return (
    <Link href={`${BUDGETS_PATH}/${getBudget(params.budgetId as string).id}`}>
      {getBudget(params.budgetId as string).name}
    </Link>
  );
};

export default ActiveBudgetLink;
