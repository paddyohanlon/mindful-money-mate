import useAppStore from "@/app/store";

interface Props {
  id: string;
}

const BudgetDetail = ({ id }: Props) => {
  const getBudget = useAppStore((state) => state.getBudget);

  return (
    <>
      <h1 className="sr-only">{getBudget(id).name}</h1>
    </>
  );
};

export default BudgetDetail;
