import { create } from "zustand";
import { Account, Budget } from "./types";

interface Store {
  isLoggedIn: boolean;
  budgets: Budget[];
  addBudget: (budget: Budget) => void;
  deleteBudget: (id: string) => void;
  accounts: Account[];
  addAccount: (account: Account) => void;
  // deleteAccount: () => void;
}

create<Store>((set) => ({
  isLoggedIn: false,
  budgets: [],
  addBudget: (budget: Budget) =>
    set((store) => ({ budgets: [...store.budgets, budget] })),
  deleteBudget: (id: string) =>
    set((store) => ({ budgets: store.budgets.filter((b) => b.id !== id) })),
  accounts: [],
  addAccount: (account: Account) =>
    set((store) => ({ accounts: [...store.accounts, account] })),
}));
