"use client";

import BackLink from "@/app/components/BackLink";
import dynamic from "next/dynamic";
import { BUDGETS_PATH } from "@/app/constants";

const BudgetDetail = dynamic(() => import("./BudgetDetail"), {
  ssr: false,
});
const AccountsList = dynamic(() => import("./AccountsList"), {
  ssr: false,
});
const NewAccountForm = dynamic(
  () => import("@/app/components/NewAccountForm"),
  { ssr: false }
);

interface Props {
  params: { budgetId: string };
}

const BudgetDetailPage = ({ params: { budgetId } }: Props) => {
  return (
    <>
      <ul className="menu menu-sm menu-vertical lg:menu-horizontal bg-base-200 rounded-box">
        <li>
          <a>Accounts</a>
        </li>
        <li>
          <a>Budget</a>
        </li>
      </ul>

      <div className="prose max-w-sm mx-auto">
        <BackLink href={BUDGETS_PATH}>Budgets</BackLink>
        <BudgetDetail id={budgetId} />

        <h2>Accounts</h2>
        <AccountsList budgetId={budgetId} />

        <h2>New Account</h2>
        <NewAccountForm budgetId={budgetId} />
      </div>
    </>
  );
};

export default BudgetDetailPage;
