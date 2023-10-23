"use client";

import { useContext, useEffect, useState } from "react";
import BudgetsContext from "@/app/contexts/budgetsContext";
import { Budget } from "@/app/types";
import BackLink from "@/app/components/BackLink";
import dynamic from "next/dynamic";
import { EUR, USD } from "@/app/constants";
import AccountsContext from "@/app/contexts/accountsContext";

const DeleteBudgetButton = dynamic(
  () => import("@/app/components/DeleteBudgetButton"),
  { ssr: false }
);
const NewAccountForm = dynamic(
  () => import("@/app/components/NewAccountForm"),
  { ssr: false }
);

interface Props {
  params: { budgetId: string };
}

const BudgetDetailPage = ({ params: { budgetId } }: Props) => {
  const { budgets } = useContext(BudgetsContext);

  const [budget, setBudget] = useState<Budget>();

  const { accounts } = useContext(AccountsContext);

  useEffect(() => {
    const budget = budgets.find((b) => b.id === budgetId);
    setBudget(budget);
  }, [budgets, budgetId]);

  function getCurrencySymbol(currency: string) {
    switch (currency) {
      case EUR:
        return "€";
      case USD:
        return "$";
    }
  }

  return (
    <>
      {!budget ? (
        <p className="max-w-sm mx-auto">No budget found.</p>
      ) : (
        <>
          <div className="center">
            <ul className="menu menu-sm menu-vertical lg:menu-horizontal bg-base-200 rounded-box">
              <li>
                <a>Accounts</a>
              </li>
              <li>
                <a>Budget</a>
              </li>
            </ul>
          </div>
          <div className="prose max-w-sm mx-auto">
            <BackLink href="/budgets">Budgets</BackLink>
            <h1>Budget: {budget.name}</h1>

            {!accounts ? (
              <div>No accounts</div>
            ) : (
              <div>
                <h2>Accounts</h2>
                <ul className="not-prose menu menu-lg bg-base-200 rounded-box w-full">
                  {accounts.map((account) => (
                    <li key={account.id}>
                      <div className="flex justify-between">
                        <div>{account.name}</div>
                        <div>
                          {getCurrencySymbol(budget.currency)}
                          {account.balance.toLocaleString()}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <h2>New Account</h2>
                <NewAccountForm budgetId={budgetId} />
              </div>
            )}

            <div className="pt-12">
              <DeleteBudgetButton id={budget.id}>
                Delete Budget
              </DeleteBudgetButton>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default BudgetDetailPage;
