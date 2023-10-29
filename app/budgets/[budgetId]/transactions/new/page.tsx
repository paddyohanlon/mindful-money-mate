import { ContainerSmall } from "@/app/components/ContainerSmall";
import dynamic from "next/dynamic";
import React from "react";

const NewTransactionForm = dynamic(() => import("./NewTransactionForm"), {
  ssr: false,
});

interface Props {
  params: { budgetId: string };
}

const NewBudgetPage = ({ params: { budgetId } }: Props) => {
  return (
    <ContainerSmall>
      <h1>New transaction</h1>
      <NewTransactionForm budgetId={budgetId} />
    </ContainerSmall>
  );
};

export default NewBudgetPage;
