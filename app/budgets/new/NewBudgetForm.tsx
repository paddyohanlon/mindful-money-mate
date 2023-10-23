"use client";

import React, { FormEvent, useEffect, useState } from "react";
import FormControl from "../../components/FormControl";
import FormLabel from "../../components/FormLabel";
import FormInput from "../../components/FormInput";
import FormSelect from "../../components/FormSelect";
import { Budget } from "../../types";
import { budgetsCollection } from "../../services/rethinkid";
import { useRouter } from "next/navigation";
import { BUDGETS_PATH, EUR, USD } from "@/app/constants";
import useAppStore from "../../store";

type UnsavedBudget = Omit<Budget, "id">;

const NewBudgetForm = () => {
  const router = useRouter();

  const nameInputId = "name";
  const currencyInputId = "currency";
  const payDayInputId = "pay-day";

  const currencyOptions = [
    { value: EUR, label: "Euro" },
    { value: USD, label: "US Dollar" },
  ];

  // Day of month. All months have 28 days. Keep it simple
  const payDayOptions = Array.from({ length: 28 }, (_, index) => {
    const value = `${index + 1}`;
    return { value, label: value };
  });

  const currencyDefault = EUR;
  const payDayDefault = "1";
  const unsavedBudgetDefault: UnsavedBudget = {
    name: "",
    currency: currencyDefault,
    payDay: parseInt(payDayDefault),
  };

  const { addBudget } = useAppStore();

  const [unsavedBudget, setUnsavedBudget] =
    useState<UnsavedBudget>(unsavedBudgetDefault);

  async function handleSubmitNewBudget(event: FormEvent) {
    event.preventDefault();

    if (
      !(unsavedBudget.name && unsavedBudget.currency && unsavedBudget.payDay)
    ) {
      console.log("Missing form values. Do not submit");
      return;
    }

    const id = await budgetsCollection.insertOne(unsavedBudget);

    const newBudget: Budget = { id, ...unsavedBudget };

    addBudget(newBudget);

    setUnsavedBudget(unsavedBudgetDefault);

    router.push(`${BUDGETS_PATH}/${id}`);
  }

  return (
    <form onSubmit={handleSubmitNewBudget}>
      <FormControl>
        <FormLabel htmlFor={nameInputId}>Name</FormLabel>
        <FormInput
          id={nameInputId}
          value={unsavedBudget.name}
          onChange={(value) =>
            setUnsavedBudget({ ...unsavedBudget, name: value })
          }
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor={currencyInputId}>Currency</FormLabel>
        <FormSelect
          id={currencyInputId}
          options={currencyOptions}
          value={unsavedBudget.currency}
          onChange={(value) =>
            setUnsavedBudget({ ...unsavedBudget, currency: value })
          }
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor={payDayInputId}>Pay Day</FormLabel>
        <FormSelect
          id={payDayInputId}
          options={payDayOptions}
          value={unsavedBudget.payDay.toString()}
          onChange={(value) =>
            setUnsavedBudget({ ...unsavedBudget, payDay: parseInt(value) })
          }
        />
      </FormControl>
      <button type="submit" className="btn btn-primary mt-4">
        Create budget
      </button>
    </form>
  );
};

export default NewBudgetForm;
