"use client";

import { useContext } from "react";
import Link from "next/link";
import BudgetsContext from "@/app/contexts/budgetsContext";

const BudgetListPage = () => {
  const { budgets } = useContext(BudgetsContext);

  return (
    <div className="max-w-sm mx-auto">
      <div className="prose flex justify-between gap-4">
        <h1>Budgets</h1>
        <Link className="btn btn-neutral" href="/budgets/new">
          New
        </Link>
      </div>

      <ul className="menu menu-lg bg-base-200 rounded-box w-full">
        {budgets.map((budget) => (
          <li key={budget.id}>
            <Link href={`/budgets/${budget.id}`}>{budget.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BudgetListPage;
