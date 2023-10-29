"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { BUDGETS_PATH } from "../constants";
import { ContainerSmall } from "../components/ContainerSmall";

const BudgetsList = dynamic(() => import("@/app/budgets/BudgetsList"), {
  ssr: false,
});

const BudgetListPage = () => {
  return (
    <ContainerSmall>
      <div className="prose flex justify-between gap-4">
        <h1>Budgets</h1>
        <Link className="btn btn-neutral" href={`${BUDGETS_PATH}/new`}>
          New
        </Link>
      </div>
      <BudgetsList />
    </ContainerSmall>
  );
};

export default BudgetListPage;
