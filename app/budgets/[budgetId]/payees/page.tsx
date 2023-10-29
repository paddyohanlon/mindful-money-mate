"use client";

import { ContainerSmall } from "@/app/components/ContainerSmall";
import Link from "next/link";
import { BUDGETS_PATH } from "@/app/constants";
import dynamic from "next/dynamic";

const PayeesList = dynamic(() => import("./PayeesList"), {
  ssr: false,
});

interface Props {
  params: { budgetId: string };
}

const PayeesPage = ({ params: { budgetId } }: Props) => {
  return (
    <>
      <ContainerSmall>
        <div className="flex justify-between items-baseline gap-4">
          <h2>Payees</h2>
          <Link
            href={`${BUDGETS_PATH}/${budgetId}/payees/new`}
            className="btn btn-sm btn-neutral"
            title="New payee"
          >
            New
          </Link>
        </div>
        <PayeesList budgetId={budgetId} />
      </ContainerSmall>
    </>
  );
};

export default PayeesPage;
