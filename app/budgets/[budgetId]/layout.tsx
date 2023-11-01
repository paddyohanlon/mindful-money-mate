import dynamic from "next/dynamic";
import { ReactNode } from "react";

const BudgetNavBar = dynamic(() => import("./BudgetNavBar"), {
  ssr: false,
});

interface Props {
  params: { budgetId: string };
  children: ReactNode;
}

const BudgetLayout = ({ children, params: { budgetId } }: Props) => {
  return (
    <>
      <BudgetNavBar budgetId={budgetId} />
      <div className="px-4 pb-4">{children}</div>
    </>
  );
};

export default BudgetLayout;
