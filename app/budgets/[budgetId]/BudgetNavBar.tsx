"use client";

import { BUDGETS_PATH } from "@/app/constants";
import useAppStore from "@/app/store";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const FormattedCurrency = dynamic(
  () => import("@/app/budgets/[budgetId]/FormattedCurrency"),
  {
    ssr: false,
  }
);
const MonthStartEnd = dynamic(
  () => import("@/app/budgets/[budgetId]/MonthStartEnd"),
  {
    ssr: false,
  }
);

interface Props {
  budgetId: string;
}

const BudgetNavBar = ({ budgetId }: Props) => {
  const parentPath = `${BUDGETS_PATH}/${budgetId}`;

  const links = [
    { title: "Budget", path: parentPath },
    { title: "Transactions", path: `${parentPath}/transactions` },
    { title: "Categories", path: `${parentPath}/categories` },
    { title: "Assignments", path: `${parentPath}/assignments` },
    { title: "Payees", path: `${parentPath}/payees` },
    { title: "Accounts", path: `${parentPath}/accounts` },
    { title: "Settings", path: `${parentPath}/settings` },
    { title: "Sharing", path: `${parentPath}/sharing` },
  ];

  const pathName = usePathname();

  const accounts = useAppStore((state) =>
    state.accounts.filter((a) => a.budgetId === budgetId)
  );
  const categories = useAppStore((state) =>
    state.categories.filter((c) => c.budgetId === budgetId)
  );

  const [readyToAssignCents, setReadyToAssignCents] = useState(0);

  useEffect(() => {
    const accountsBalanceCents = accounts.reduce(
      (accumulator, account) => accumulator + account.balanceCents,
      0
    );

    const categoriesBalanceCents = categories.reduce(
      (accumulator, account) => accumulator + account.balanceCents,
      0
    );

    const newReadyToAssign = accountsBalanceCents - categoriesBalanceCents;

    if (readyToAssignCents !== newReadyToAssign)
      setReadyToAssignCents(newReadyToAssign);
  }, [accounts, categories, readyToAssignCents, setReadyToAssignCents]);

  function active(linkPath: string) {
    return pathName === linkPath ||
      (linkPath !== parentPath && pathName.includes(linkPath))
      ? "active"
      : "";
  }

  return (
    <div className="xl:flex xl:justify-between items-center xl:gap-6 xl:px-2">
      <div className="flex max-w-md px-1 py-2">
        <div className="stat p-1">
          <div className="stat-title text-xs sm:text-sm">Ready to Assign</div>
          <div className="stat-value text-xs sm:text-xl">
            {
              <FormattedCurrency
                budgetId={budgetId}
                amountCents={readyToAssignCents}
                isColored={true}
              />
            }
          </div>
        </div>
        <div className="stat p-1">
          <div className="stat-title text-xs sm:text-sm">Month</div>
          <div className="stat-value text-xs sm:text-xl">
            <MonthStartEnd budgetId={budgetId} />
          </div>
        </div>
      </div>

      <div>
        <ul className="menu menu-horizontal">
          <li className="pr-4">
            <Link
              className="bg-secondary"
              href={`${BUDGETS_PATH}/${budgetId}/transactions/new`}
            >
              New Transaction
            </Link>
          </li>

          {links.map(({ title, path }) => (
            <li key={title}>
              <Link href={path} className={active(path)}>
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BudgetNavBar;
