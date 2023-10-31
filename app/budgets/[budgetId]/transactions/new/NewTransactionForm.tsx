"use client";

import React, { FormEvent, useEffect, useState } from "react";
import FormControl from "@/app/components/FormControl";
import FormLabel from "@/app/components/FormLabel";
import FormInput from "@/app/components/FormInput";
import FormSelect from "@/app/components/FormSelect";
import FormInputCurrency from "@/app/components/FormInputCurrency";
import { Transaction, Option } from "@/app/types";
import {
  accountsCollection,
  categoriesCollection,
  transactionsCollection,
} from "@/app/services/rethinkid";
import { useRouter } from "next/navigation";
import useAppStore from "@/app/store";
import { BUDGETS_PATH } from "@/app/constants";

interface Props {
  budgetId: string;
}

type UnsavedTransaction = Omit<Transaction, "id">;

const NewBudgetForm = ({ budgetId }: Props) => {
  const router = useRouter();

  const isInflowInputId = "flow-toggle";
  const memoInputId = "memo";
  const accountInputId = "account";
  const categoryInputId = "category";
  const payeeInputId = "payee";
  const amountInputId = "amount";

  const unsavedTransactionDefault: UnsavedTransaction = {
    budgetId,
    accountId: "",
    categoryId: "",
    payeeId: "",
    date: Date.now(),
    amount: 0,
    memo: "",
  };

  const {
    accounts,
    categories,
    payees,
    setTransaction,
    getCategory,
    updateCategory,
    getAccount,
    updateAccount,
  } = useAppStore();

  const [accountOptions, setAccountOptions] = useState<Option[]>([
    { value: "", label: "" },
  ]);
  const [categoryOptions, setCategoryOptions] = useState<Option[]>([
    { value: "", label: "" },
  ]);
  const [payeeOptions, setPayeeOptions] = useState<Option[]>([
    { value: "", label: "" },
  ]);
  const [unsavedTransaction, setUnsavedTransaction] =
    useState<UnsavedTransaction>(unsavedTransactionDefault);
  const [isInflow, setIsInflow] = useState(false);

  interface Selectable {
    id: string;
  }

  useEffect(() => {
    function getDefault(id: string, [firstItem]: Selectable[]) {
      if (id) return id;
      if (firstItem) return firstItem.id;
      return "";
    }

    const accountsForBudget = accounts.filter((a) => a.budgetId === budgetId);
    unsavedTransaction.accountId = getDefault(
      unsavedTransaction.accountId,
      accountsForBudget
    );
    setAccountOptions(
      accountsForBudget.map((a) => ({
        value: a.id,
        label: a.name,
      }))
    );

    const categoriesForBudget = categories.filter(
      (c) => c.budgetId === budgetId
    );
    unsavedTransaction.categoryId = getDefault(
      unsavedTransaction.categoryId,
      categoriesForBudget
    );
    setCategoryOptions(
      categoriesForBudget.map((a) => ({
        value: a.id,
        label: a.name,
      }))
    );

    const payeesForBudget = payees.filter((p) => p.budgetId === budgetId);
    unsavedTransaction.payeeId = getDefault(
      unsavedTransaction.payeeId,
      payeesForBudget
    );
    setPayeeOptions(
      payeesForBudget.map((a) => ({
        value: a.id,
        label: a.name,
      }))
    );
  }, [
    budgetId,
    accounts,
    categories,
    payees,
    unsavedTransaction,
    setAccountOptions,
  ]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (
      !(
        unsavedTransaction.accountId &&
        unsavedTransaction.categoryId &&
        unsavedTransaction.payeeId
      )
    ) {
      console.log("Missing form values. Do not submit");
      return;
    }

    const multiplier = isInflow ? 1 : -1;

    unsavedTransaction.amount = unsavedTransaction.amount * multiplier;

    const id = await transactionsCollection.insertOne(unsavedTransaction);

    const newTransaction: Transaction = { id, ...unsavedTransaction };

    setTransaction(newTransaction);

    const category = getCategory(newTransaction.categoryId);
    console.log(category);
    category.balance += newTransaction.amount;
    updateCategory(category);
    categoriesCollection.updateOne(category.id, category);

    const account = getAccount(newTransaction.accountId);
    account.balance += newTransaction.amount;
    updateAccount(account);
    accountsCollection.updateOne(account.id, account);

    setUnsavedTransaction(unsavedTransactionDefault);

    router.push(`${BUDGETS_PATH}/${budgetId}/transactions`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <FormLabel htmlFor={isInflowInputId}>
          {isInflow ? "Inflow" : "Outflow"}
        </FormLabel>
        <input
          id={isInflowInputId}
          type="checkbox"
          className="toggle toggle-success"
          checked={isInflow}
          onChange={() => setIsInflow(!isInflow)}
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor={amountInputId}>Amount</FormLabel>
        <FormInputCurrency
          budgetId={budgetId}
          inputId={amountInputId}
          initialAmount={unsavedTransactionDefault.amount}
          onChange={(value) =>
            setUnsavedTransaction({ ...unsavedTransaction, amount: value })
          }
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor={accountInputId}>Account</FormLabel>
        <FormSelect
          id={accountInputId}
          options={accountOptions}
          value={unsavedTransaction.accountId}
          onChange={(value) =>
            setUnsavedTransaction({ ...unsavedTransaction, accountId: value })
          }
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor={categoryInputId}>Category</FormLabel>
        <FormSelect
          id={categoryInputId}
          options={categoryOptions}
          value={unsavedTransaction.categoryId}
          onChange={(value) =>
            setUnsavedTransaction({ ...unsavedTransaction, categoryId: value })
          }
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor={payeeInputId}>Payee</FormLabel>
        <FormSelect
          id={payeeInputId}
          options={payeeOptions}
          value={unsavedTransaction.payeeId}
          onChange={(value) =>
            setUnsavedTransaction({ ...unsavedTransaction, payeeId: value })
          }
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor={memoInputId}>Memo</FormLabel>
        <FormInput
          id={memoInputId}
          value={unsavedTransaction.memo}
          onChange={(value) =>
            setUnsavedTransaction({ ...unsavedTransaction, memo: value })
          }
          required={false}
        />
      </FormControl>
      <button type="submit" className="btn btn-primary mt-4">
        Save
      </button>
    </form>
  );
};

export default NewBudgetForm;
