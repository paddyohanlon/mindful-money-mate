"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { BUDGETS_PATH } from "../constants";

const BudgetsList = dynamic(() => import("@/app/budgets/BudgetsList"), {
  ssr: false,
});
const GrantedPermissions = dynamic(
  () => import("@/app/budgets/GrantedPermissions"),
  {
    ssr: false,
  }
);

const BudgetListPage = () => {
  return (
    <div className="pt-8 px-6 max-w-7xl mx-auto">
      <h1 className="sr-only">Budgets</h1>
      <div className="lg:grid gap-8 grid-cols-2">
        <div className="pb-8">
          <div className="flex justify-between items-end gap-4 pb-2">
            <h2 className="text-2xl">My Budgets</h2>
            <Link
              className="btn btn-sm btn-neutral"
              href={`${BUDGETS_PATH}/new`}
            >
              New
            </Link>
          </div>
          <BudgetsList />
        </div>
        <div>
          <div className="flex justify-between items-end gap-4 pb-2">
            <h2 className="text-2xl">Budgets Shared with Me</h2>
          </div>
          <GrantedPermissions />
        </div>
      </div>
    </div>
  );
};

export default BudgetListPage;
