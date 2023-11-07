import { useEffect, useState } from "react";
import { Option } from "@/app/types";
import useAppStore from "@/app/store";

export function useTransactionOptions(budgetId: string) {
  const accounts = useAppStore((state) => state.accounts);
  const categories = useAppStore((state) => state.categories);
  const payees = useAppStore((state) => state.payees);

  const [accountOptions, setAccountOptions] = useState<Option[]>([
    { value: "", label: "" },
  ]);
  const [categoryOptions, setCategoryOptions] = useState<Option[]>([
    { value: "", label: "" },
  ]);
  const [payeeOptions, setPayeeOptions] = useState<Option[]>([
    { value: "", label: "" },
  ]);

  useEffect(() => {
    const accountsForBudget = accounts.filter((a) => a.budgetId === budgetId);
    setAccountOptions(
      accountsForBudget.map((a) => ({
        value: a.id,
        label: a.name,
      }))
    );

    const categoriesForBudget = categories.filter(
      (c) => c.budgetId === budgetId
    );
    setCategoryOptions(
      categoriesForBudget.map((a) => ({
        value: a.id,
        label: a.name,
      }))
    );

    const payeesForBudget = payees.filter((p) => p.budgetId === budgetId);
    setPayeeOptions(
      payeesForBudget.map((a) => ({
        value: a.id,
        label: a.name,
      }))
    );
  }, [budgetId, accounts, categories, payees, setAccountOptions]);

  return {
    accountOptions,
    categoryOptions,
    payeeOptions,
  };
}
