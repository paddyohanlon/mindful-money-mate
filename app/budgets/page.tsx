"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

const BudgetsList = dynamic(() => import("@/app/components/BudgetsList"), {
  ssr: false,
});

const BudgetListPage = () => {
  return (
    <div className="max-w-sm mx-auto">
      <div className="prose flex justify-between gap-4">
        <h1>Budgets</h1>
        <Link className="btn btn-neutral" href="/budgets/new">
          New
        </Link>
      </div>
      <BudgetsList />
    </div>
  );
};

export default BudgetListPage;
