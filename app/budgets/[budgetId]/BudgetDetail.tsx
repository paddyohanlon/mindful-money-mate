import { Budget } from "@/app/types";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import useAppStore from "@/app/store";

const DeleteBudgetButton = dynamic(
  () => import("@/app/components/DeleteBudgetButton"),
  { ssr: false }
);

interface Props {
  id: string;
}

const BudgetDetail = ({ id }: Props) => {
  const { budgets } = useAppStore();

  const [budget, setBudget] = useState<Budget>();

  useEffect(() => {
    const budget = budgets.find((b) => b.id === id);
    setBudget(budget);
  }, [budgets, id]);

  return (
    <>
      {!budget ? (
        <div>Loading budget...</div>
      ) : (
        <>
          <h1>Budget: {budget.name}</h1>
          <DeleteBudgetButton id={id}>Delete Budget</DeleteBudgetButton>
        </>
      )}
    </>
  );
};

export default BudgetDetail;
