"use client";

import { ContainerSmall } from "@/app/components/ContainerSmall";
import dynamic from "next/dynamic";

interface Props {
  params: { budgetId: string; transactionId: string };
}

const TransactionDetail = dynamic(() => import("./TransactionDetail"), {
  ssr: false,
});

const TransactionDetailPage = ({
  params: { budgetId, transactionId },
}: Props) => {
  return (
    <ContainerSmall>
      <TransactionDetail budgetId={budgetId} transactionId={transactionId} />
    </ContainerSmall>
  );
};

export default TransactionDetailPage;
