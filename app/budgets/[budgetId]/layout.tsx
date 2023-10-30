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
      <div className="px-6 pb-6">{children}</div>
    </>
  );
};

export default BudgetLayout;
