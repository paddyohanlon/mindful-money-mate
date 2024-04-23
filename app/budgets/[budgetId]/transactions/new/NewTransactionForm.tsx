"use client";

import React, { FormEvent, useEffect, useState } from "react";
import FormControl from "@/app/components/FormControl";
import FormLabel from "@/app/components/FormLabel";
import FormInput from "@/app/components/FormInput";
import FormSelect from "@/app/components/FormSelect";
import FormInputCurrency from "@/app/components/FormInputCurrency";
import { Transaction } from "@/app/types";
import {
  accountsCollection,
  categoriesCollection,
  transactionsCollection,
} from "@/app/services/bzr";
import { useRouter } from "next/navigation";
import useAppStore from "@/app/store";
import { BUDGETS_PATH } from "@/app/constants";
import { useTransactionOptions } from "../useTransactionOptions";
import Alert from "@/app/components/Alert";
import { convertToSignedAmount } from "@/app/currency";

interface Props {
  budgetId: string;
}

interface Selectable {
  id: string;
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
    amountCents: 0,
    memo: "",
  };

  const accounts = useAppStore((state) => state.accounts);
  const categories = useAppStore((state) => state.categories);
  const payees = useAppStore((state) => state.payees);
  const setTransaction = useAppStore((state) => state.setTransaction);
  const getCategory = useAppStore((state) => state.getCategory);
  const updateCategory = useAppStore((state) => state.updateCategory);
  const getAccount = useAppStore((state) => state.getAccount);
  const updateAccount = useAppStore((state) => state.updateAccount);

  const { accountOptions, categoryOptions, payeeOptions } =
    useTransactionOptions(budgetId);

  const [unsavedTransaction, setUnsavedTransaction] =
    useState<UnsavedTransaction>(unsavedTransactionDefault);
  const [isInflow, setIsInflow] = useState(false);
  const [amountError, setAmountError] = useState("");
  const [unsignedAmountCents, setUnsignedAmountCents] = useState(
    Math.abs(unsavedTransaction.amountCents)
  );

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

    const categoriesForBudget = categories.filter(
      (c) => c.budgetId === budgetId
    );
    unsavedTransaction.categoryId = getDefault(
      unsavedTransaction.categoryId,
      categoriesForBudget
    );

    const payeesForBudget = payees.filter((p) => p.budgetId === budgetId);
    unsavedTransaction.payeeId = getDefault(
      unsavedTransaction.payeeId,
      payeesForBudget
    );
  }, [budgetId, accounts, categories, payees, unsavedTransaction]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    setAmountError("");

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

    if (unsignedAmountCents < 1) {
      setAmountError(`Enter an amount of at least 0.01`);
      return;
    }

    unsavedTransaction.amountCents = convertToSignedAmount(
      unsignedAmountCents,
      isInflow
    );

    const id = await transactionsCollection.insertOne(unsavedTransaction);

    const newTransaction: Transaction = { id, ...unsavedTransaction };

    setTransaction(newTransaction);

    console.log("newTransaction.categoryId", newTransaction.categoryId);
    console.log(
      "newTransaction.categoryId type",
      typeof newTransaction.categoryId
    );

    if (newTransaction.categoryId !== "ready-to-assign") {
      const category = getCategory(newTransaction.categoryId);
      category.balanceCents += newTransaction.amountCents;
      updateCategory(category);
      categoriesCollection.updateOne(category.id, category);
    }

    const account = getAccount(newTransaction.accountId);
    account.balanceCents += newTransaction.amountCents;
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
          initialAmountCents={unsignedAmountCents}
          onChange={(value) => setUnsignedAmountCents(value)}
        />
        {amountError && <Alert className="mt-2">{amountError}</Alert>}
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
