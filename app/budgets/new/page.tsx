import BackLink from "@/app/components/BackLink";
import dynamic from "next/dynamic";
import Link from "next/link";
import React from "react";

const NewBudgetForm = dynamic(() => import("@/app/components/NewBudgetForm"), {
  ssr: false,
});

const NewBudgetPage = () => {
  return (
    <div className="prose max-w-sm mx-auto">
      <BackLink href="/budgets">Budgets</BackLink>
      <h1>New budget</h1>
      <NewBudgetForm />
    </div>
  );
};

export default NewBudgetPage;
