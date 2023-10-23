import BackLink from "@/app/components/BackLink";
import { BUDGETS_PATH } from "@/app/constants";
import dynamic from "next/dynamic";
import React from "react";

const NewBudgetForm = dynamic(() => import("@/app/budgets/new/NewBudgetForm"), {
  ssr: false,
});

const NewBudgetPage = () => {
  return (
    <div className="prose max-w-sm mx-auto">
      <BackLink href={BUDGETS_PATH}>Budgets</BackLink>
      <h1>New budget</h1>
      <NewBudgetForm />
    </div>
  );
};

export default NewBudgetPage;
