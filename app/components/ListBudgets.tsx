import React, { useContext, useEffect, useState } from "react";
import { Budget } from "../types";
import { budgetCollection } from "../services/rethinkid";
import BudgetsContext from "../contexts/budgetsContext";

const ListBudgets = () => {
  const { budgets, setBudgets } = useContext(BudgetsContext);

  useEffect(() => {
    // Fetch data
    budgetCollection.getAll().then((budgets: Budget[]) => {
      setBudgets(budgets);
    });
  }, [setBudgets]);

  async function deleteBudget(id: string) {
    await budgetCollection.deleteOne(id);
    setBudgets((prevBudgets) =>
      prevBudgets.filter((budget) => budget.id !== id)
    );
  }
  return (
    <>
      <h1>Budgets</h1>
      <ul className="mb-8">
        {budgets.map((budget) => (
          <li key={budget.id} className="mb-1 flex justify-between">
            <a href="#">
              {budget.name} ({budget.currency} - {budget.payDay})
            </a>
            <button className="button" onClick={() => deleteBudget(budget.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ListBudgets;
