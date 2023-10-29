import { ContainerSmall } from "@/app/components/ContainerSmall";
import dynamic from "next/dynamic";
import React from "react";

const NewBudgetForm = dynamic(() => import("@/app/budgets/new/NewBudgetForm"), {
  ssr: false,
});

const NewBudgetPage = () => {
  return (
    <ContainerSmall>
      <h1>New budget</h1>
      <NewBudgetForm />
    </ContainerSmall>
  );
};

export default NewBudgetPage;
