"use client";

import React, { FormEvent, useContext, useState } from "react";
import FormControl from "./FormControl";
import FormLabel from "./FormLabel";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import { Budget } from "../types";
import { budgetCollection } from "../services/rethinkid";
import BudgetsContext from "../contexts/budgetsContext";

type UnsavedBudget = Omit<Budget, "id">;

const CreateBudgetForm = () => {
  const nameInputId = "name";
  const currencyInputId = "currency";
  const payDayInputId = "pay-day";

  const EUR = "EUR";
  const USD = "USD";

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

  const { budgets, setBudgets } = useContext(BudgetsContext);

  const [unsavedBudget, setUnsavedBudget] =
    useState<UnsavedBudget>(unsavedBudgetDefault);

  async function handleSubmitCreateBudget(event: FormEvent) {
    event.preventDefault();

    if (
      !(unsavedBudget.name && unsavedBudget.currency && unsavedBudget.payDay)
    ) {
      console.log("Missing form values. Do not submit");
      return;
    }

    console.log(unsavedBudget);

    const id = await budgetCollection.insertOne(unsavedBudget);

    const newBudget: Budget = { id, ...unsavedBudget };

    setBudgets((prevBudgets) => [...prevBudgets, newBudget]);

    setUnsavedBudget(unsavedBudgetDefault);
  }

  return (
    <>
      <h2>Create a budget</h2>
      <form onSubmit={handleSubmitCreateBudget}>
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
        <button type="submit" className="btn btn-primary">
          Create budget
        </button>
      </form>
    </>
  );
};

export default CreateBudgetForm;
