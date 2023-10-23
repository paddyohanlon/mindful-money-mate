"use client";

import React, { ReactNode, useContext, useEffect, useState } from "react";
import BudgetsContext from "./contexts/budgetsContext";
import { Budget } from "./types";
import { budgetsCollection } from "./services/rethinkid";
import IsLoggedInContext from "./contexts/isLoggedInContext";

interface Props {
  children: ReactNode;
}

const BudgetsProvider = ({ children }: Props) => {
  const { isLoggedIn } = useContext(IsLoggedInContext);
  const [budgets, setBudgets] = useState<Budget[]>([]);

  useEffect(() => {
    if (!isLoggedIn) return;

    budgetsCollection.getAll().then((budgets: Budget[]) => {
      setBudgets(budgets);
    });
  }, [isLoggedIn, setBudgets]);

  return (
    <BudgetsContext.Provider value={{ budgets, setBudgets }}>
      {children}
    </BudgetsContext.Provider>
  );
};

export default BudgetsProvider;
