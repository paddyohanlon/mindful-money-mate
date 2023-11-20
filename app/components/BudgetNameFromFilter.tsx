import useAppStore from "@/app/store";
import { FilterObject } from "@rethinkid/rethinkid-js-sdk";

interface Props {
  filter: FilterObject | undefined;
}

const BudgetNameFromFilter = ({ filter }: Props) => {
  const getBudget = useAppStore((store) => store.getBudget);

  return (
    <>
      {filter && filter.id
        ? getBudget(filter.id as string).name
        : "All budgets"}
    </>
  );
};

export default BudgetNameFromFilter;
