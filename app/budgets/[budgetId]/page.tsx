"use client";

import { useContext, useEffect, useState } from "react";
import BudgetsContext from "@/app/contexts/budgetsContext";
import { Budget } from "@/app/types";
import BackLink from "@/app/components/BackLink";
import dynamic from "next/dynamic";

const DeleteBudgetButton = dynamic(
  () => import("@/app/components/DeleteBudgetButton"),
  { ssr: false }
);

interface Props {
  params: { budgetId: string };
}

const BudgetDetailPage = ({ params: { budgetId } }: Props) => {
  const { budgets } = useContext(BudgetsContext);

  const [budget, setBudget] = useState<Budget>();

  useEffect(() => {
    const budget = budgets.find((b) => b.id === budgetId);
    setBudget(budget);
  }, [budgets, budgetId]);

  return (
    <>
      {!budget ? (
        <p className="max-w-sm mx-auto">No budget found.</p>
      ) : (
        <>
          <div className="center">
            <ul className="menu menu-sm menu-vertical lg:menu-horizontal bg-base-200 rounded-box">
              <li>
                <a>Accounts</a>
              </li>
              <li>
                <a>Budget</a>
              </li>
            </ul>
          </div>
          <div className="max-w-sm mx-auto">
            <BackLink href="/budgets">Budgets</BackLink>
            <h1>Budget: {budget.name}</h1>
            <div>{budget.currency}</div>
            <div>{budget.payDay}</div>
            <DeleteBudgetButton id={budget.id}>Delete</DeleteBudgetButton>
          </div>
        </>
      )}
    </>
  );
};

export default BudgetDetailPage;
