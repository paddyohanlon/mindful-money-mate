import { createContext } from "react";
import { Budget } from "../types";

interface ContextType {
  budgets: Budget[];
  setBudgets: React.Dispatch<React.SetStateAction<Budget[]>>;
}

const BudgetsContext = createContext<ContextType>({} as ContextType);

export default BudgetsContext;
