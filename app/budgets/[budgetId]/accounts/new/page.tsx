"use client";

import { ContainerSmall } from "@/app/components/ContainerSmall";
import dynamic from "next/dist/shared/lib/dynamic";

const NewAccountForm = dynamic(
  () => import("@/app/components/NewAccountForm"),
  { ssr: false }
);

interface Props {
  params: { budgetId: string };
}

const NewAccountPage = ({ params: { budgetId } }: Props) => {
  return (
    <ContainerSmall>
      <h1>New Account</h1>
      <NewAccountForm budgetId={budgetId} />
    </ContainerSmall>
  );
};

export default NewAccountPage;
