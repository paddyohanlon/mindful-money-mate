"use client";

import { ContainerSmall } from "@/app/components/ContainerSmall";
import dynamic from "next/dynamic";

const SettingsDetail = dynamic(() => import("./SettingsDetail"), {
  ssr: false,
});
const DeleteBudgetButton = dynamic(
  () => import("@/app/components/DeleteBudgetButton"),
  { ssr: false }
);

interface Props {
  params: { budgetId: string };
}

const SettingsPage = ({ params: { budgetId } }: Props) => {
  return (
    <>
      <ContainerSmall>
        <h1>Budget Settings</h1>
        <SettingsDetail budgetId={budgetId} />
        <DeleteBudgetButton id={budgetId}>Delete Budget</DeleteBudgetButton>
      </ContainerSmall>
    </>
  );
};

export default SettingsPage;
