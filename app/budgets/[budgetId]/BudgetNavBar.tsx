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
  const transactionsPath = `${parentPath}/transactions`;
  const categoriesPath = `${parentPath}/categories`;
  const assignmentsPath = `${parentPath}/assignments`;
  const payeesPath = `${parentPath}/payees`;
  const accountsPath = `${parentPath}/accounts`;
  const settingsPath = `${parentPath}/settings`;

  const pathName = usePathname();

  const accounts = useAppStore((state) =>
    state.accounts.filter((a) => a.budgetId === budgetId)
  );
  const categories = useAppStore((state) =>
    state.categories.filter((c) => c.budgetId === budgetId)
  );

  const [accountsBalance, setAccountsBalance] = useState(0);
  const [categoriesBalance, setCategoriesBalance] = useState(0);
  const [readyToAssign, setReadyToAssign] = useState(0);

  useEffect(() => {
    const newAccountsBalance = accounts.reduce(
      (accumulator, account) => accumulator + account.balance,
      0
    );

    const newCategoriesBalance = categories.reduce(
      (accumulator, account) => accumulator + account.balance,
      0
    );

    if (accountsBalance !== newAccountsBalance)
      setAccountsBalance(newAccountsBalance);
    if (categoriesBalance !== newCategoriesBalance)
      setCategoriesBalance(newCategoriesBalance);

    const newReadyToAssign = newAccountsBalance - newCategoriesBalance;

    if (readyToAssign !== newReadyToAssign) setReadyToAssign(newReadyToAssign);
  }, [
    accounts,
    categories,
    readyToAssign,
    accountsBalance,
    categoriesBalance,
    setReadyToAssign,
  ]);

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
          <div className="stat-title text-xs sm:text-sm">Accounts Balance</div>
          <div className="stat-value text-xs sm:text-xl">
            {<FormattedCurrency budgetId={budgetId} amount={accountsBalance} />}
          </div>
        </div>
        <div className="stat p-1">
          <div className="stat-title text-xs sm:text-sm">Ready to Assign</div>
          <div
            className={`stat-value text-xs sm:text-xl ${
              readyToAssign < 0 && "text-red-500"
            }`}
          >
            {<FormattedCurrency budgetId={budgetId} amount={readyToAssign} />}
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
              title="New payee"
            >
              New Transaction
            </Link>
          </li>
          <li>
            <Link href={parentPath} className={active(parentPath)}>
              Budget
            </Link>
          </li>
          <li>
            <Link href={transactionsPath} className={active(transactionsPath)}>
              Transactions
            </Link>
          </li>
          <li>
            <Link href={categoriesPath} className={active(categoriesPath)}>
              Categories
            </Link>
          </li>
          <li>
            <Link href={assignmentsPath} className={active(assignmentsPath)}>
              Assignments
            </Link>
          </li>
          <li>
            <Link href={payeesPath} className={active(payeesPath)}>
              Payees
            </Link>
          </li>
          <li>
            <Link href={accountsPath} className={active(accountsPath)}>
              Accounts
            </Link>
          </li>
          <li>
            <Link href={settingsPath} className={active(settingsPath)}>
              Settings
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BudgetNavBar;
