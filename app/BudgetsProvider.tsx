import React, { ReactNode, useState } from "react";
import BudgetsContext from "./contexts/budgetsContext";
import { Budget } from "./types";

interface Props {
  children: ReactNode;
}

const BudgetsProvider = ({ children }: Props) => {
  const [budgets, setBudgets] = useState<Budget[]>([]);

  return (
    <BudgetsContext.Provider value={{ budgets, setBudgets }}>
      {children}
    </BudgetsContext.Provider>
  );
};

export default BudgetsProvider;
