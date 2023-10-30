"use client";

import { ContainerSmall } from "@/app/components/ContainerSmall";
import Link from "next/link";
import { BUDGETS_PATH } from "@/app/constants";
import dynamic from "next/dynamic";

const AccountsList = dynamic(() => import("./AccountsList"), {
  ssr: false,
});

interface Props {
  params: { budgetId: string };
}

const AccountsPage = ({ params: { budgetId } }: Props) => {
  return (
    <>
      <ContainerSmall>
        <div className="flex justify-between items-baseline gap-4">
          <h1>Accounts</h1>
          <Link
            href={`${BUDGETS_PATH}/${budgetId}/accounts/new`}
            className="btn btn-sm btn-neutral"
            title="New account"
          >
            New
          </Link>
        </div>
        <AccountsList budgetId={budgetId} />
      </ContainerSmall>
    </>
  );
};

export default AccountsPage;
