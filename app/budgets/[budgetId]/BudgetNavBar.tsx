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
  const budgetsPath = `${BUDGETS_PATH}/${budgetId}`;
  const transactionsPath = `${BUDGETS_PATH}/${budgetId}/transactions`;
  const categoriesPath = `${BUDGETS_PATH}/${budgetId}/categories`;
  const assignmentsPath = `${BUDGETS_PATH}/${budgetId}/assignments`;
  const payeesPath = `${BUDGETS_PATH}/${budgetId}/payees`;
  const accountsPath = `${BUDGETS_PATH}/${budgetId}/accounts`;
  const settingsPath = `${BUDGETS_PATH}/${budgetId}/settings`;

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

  function active(path: string): string {
    return `${pathName.includes(path) && "active"}`;
  }

  return (
    <div className="flex justify-between gap-6 px-2">
      <ul className="menu menu-horizontal">
        <li>
          <Link href={budgetsPath} className={active(budgetsPath)}>
            Budget
          </Link>
        </li>
        <li>
          <Link href={transactionsPath} className={active(transactionsPath)}>
            Transactions
          </Link>
        </li>
        <li>
          <Link
            className="bg-secondary"
            href={`${BUDGETS_PATH}/${budgetId}/transactions/new`}
            title="New payee"
          >
            New Transaction
          </Link>
        </li>
      </ul>

      <div className="stats shadow">
        <div className="stat py-1">
          <div className="stat-title">Accounts Balance</div>
          <div className="stat-value text-xl">
            {<FormattedCurrency budgetId={budgetId} amount={accountsBalance} />}
          </div>
        </div>
        <div className="stat py-1">
          <div className="stat-title">Ready to Assign</div>
          <div
            className={`stat-value text-xl ${
              readyToAssign < 0 && "text-red-500"
            }`}
          >
            {<FormattedCurrency budgetId={budgetId} amount={readyToAssign} />}
          </div>
        </div>
        <div className="stat py-1">
          <div className="stat-title">Month</div>
          <div className="stat-value text-xl">
            <MonthStartEnd budgetId={budgetId} />
          </div>
        </div>
      </div>

      <ul className="menu menu-horizontal">
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
  );
};

export default BudgetNavBar;
