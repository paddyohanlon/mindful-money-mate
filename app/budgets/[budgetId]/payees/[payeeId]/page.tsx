"use client";

import { ContainerSmall } from "@/app/components/ContainerSmall";
import dynamic from "next/dynamic";

interface Props {
  params: { budgetId: string; payeeId: string };
}

const PayeeDetail = dynamic(() => import("./PayeeDetail"), {
  ssr: false,
});

const PayeeDetailPage = ({ params: { budgetId, payeeId } }: Props) => {
  return (
    <ContainerSmall>
      <PayeeDetail budgetId={budgetId} payeeId={payeeId} />
    </ContainerSmall>
  );
};

export default PayeeDetailPage;
