import Link from "next/link";
import { useParams } from "next/navigation";
import useAppStore from "../store";
import { BUDGETS_PATH } from "../constants";

const ActiveBudgetLink = () => {
  const params = useParams();

  const getBudget = useAppStore((state) => state.getBudget);

  return (
    <Link href={`${BUDGETS_PATH}/${getBudget(params.budgetId as string).id}`}>
      {getBudget(params.budgetId as string).name}
    </Link>
  );
};

export default ActiveBudgetLink;
