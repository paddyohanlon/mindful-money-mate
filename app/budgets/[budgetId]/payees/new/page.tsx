"use client";

import { ContainerSmall } from "@/app/components/ContainerSmall";
import dynamic from "next/dist/shared/lib/dynamic";

const NewPayeeForm = dynamic(() => import("./NewPayeeForm"), {
  ssr: false,
});

interface Props {
  params: { budgetId: string };
}

const NewAccountPage = ({ params: { budgetId } }: Props) => {
  return (
    <ContainerSmall>
      <h1>New Payee</h1>
      <NewPayeeForm budgetId={budgetId} />
    </ContainerSmall>
  );
};

export default NewAccountPage;
