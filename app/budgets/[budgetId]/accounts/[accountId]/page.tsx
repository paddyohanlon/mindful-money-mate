"use client";

import { ContainerSmall } from "@/app/components/ContainerSmall";
import dynamic from "next/dynamic";

interface Props {
  params: { budgetId: string; accountId: string };
}

const AccountDetail = dynamic(() => import("./AccountDetail"), {
  ssr: false,
});

const AccountDetailPage = ({ params: { budgetId, accountId } }: Props) => {
  return (
    <ContainerSmall>
      <AccountDetail budgetId={budgetId} accountId={accountId} />
    </ContainerSmall>
  );
};

export default AccountDetailPage;
