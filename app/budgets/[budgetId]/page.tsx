"use client";

import dynamic from "next/dynamic";

const BudgetDetail = dynamic(() => import("./BudgetDetail"), {
  ssr: false,
});
const TheBudget = dynamic(() => import("./TheBudget"), {
  ssr: false,
});

interface Props {
  params: { budgetId: string };
}

const BudgetDetailPage = ({ params: { budgetId } }: Props) => {
  return (
    <>
      <div className="w-full">
        <BudgetDetail id={budgetId} />
        <TheBudget budgetId={budgetId} />
      </div>
    </>
  );
};

export default BudgetDetailPage;
