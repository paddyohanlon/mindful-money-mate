import useAppStore from "@/app/store";

interface Props {
  id: string;
}

const BudgetDetail = ({ id }: Props) => {
  const budget = useAppStore((state) => state.getBudget(id));

  return (
    <>
      <h1 className="sr-only">{budget.name}</h1>
    </>
  );
};

export default BudgetDetail;
