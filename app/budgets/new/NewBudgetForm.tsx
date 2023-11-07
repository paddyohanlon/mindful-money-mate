"use client";

import React, { FormEvent, useState } from "react";
import FormControl from "@/app/components/FormControl";
import FormLabel from "@/app/components/FormLabel";
import FormInput from "@/app/components/FormInput";
import FormSelect from "@/app/components/FormSelect";
import { Budget, UnsavedBudget } from "@/app/types";
import { budgetsCollection } from "@/app/services/rethinkid";
import { useRouter } from "next/navigation";
import { BUDGETS_PATH, EUR, USD } from "@/app/constants";
import useAppStore from "@/app/store";

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

  const setBudget = useAppStore((state) => state.setBudget);

  const [unsavedBudget, setUnsavedBudget] =
    useState<UnsavedBudget>(unsavedBudgetDefault);

  const [payDayStr, setPayDayStr] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (
      !(unsavedBudget.name && unsavedBudget.currency && unsavedBudget.payDay)
    ) {
      console.log("Missing form values. Do not submit");
      return;
    }

    unsavedBudget.payDay = parseFloat(payDayStr);

    const id = await budgetsCollection.insertOne(unsavedBudget);

    const newBudget: Budget = { id, ...unsavedBudget };

    setBudget(newBudget);

    setUnsavedBudget(unsavedBudgetDefault);

    router.push(`${BUDGETS_PATH}/${id}`);
  }

  return (
    <form onSubmit={handleSubmit}>
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
          value={payDayStr}
          onChange={(value) => setPayDayStr(value)}
        />
      </FormControl>
      <button type="submit" className="btn btn-primary mt-4">
        Save
      </button>
    </form>
  );
};

export default NewBudgetForm;
