import { EUR, USD } from "@/app/constants";
import useAppStore from "@/app/store";
import { Budget } from "@/app/types";
import { useEffect, useState } from "react";

interface Props {
  budgetId: string;
}

const AccountsList = ({ budgetId }: Props) => {
  const { budgets, accounts } = useAppStore();

  const [budget, setBudget] = useState<Budget>();

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
      {!accounts || !budget ? (
        <div>No accounts</div>
      ) : (
        <div>
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
        </div>
      )}
    </>
  );
};

export default AccountsList;
