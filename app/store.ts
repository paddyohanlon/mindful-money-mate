"use client";

import { create } from "zustand";
import { Account, Budget } from "./types";
import {
  rid,
  budgetsCollection,
  accountsCollection,
} from "./services/rethinkid";

interface AppStore {
  isLoggedIn: boolean;
  setIsLoggedIn: (status: boolean) => void;
  budgets: Budget[];
  addBudget: (budget: Budget) => void;
  deleteBudget: (id: string) => void;
  accounts: Account[];
  addAccount: (account: Account) => void;
  load: () => void;
}

const useAppStore = create<AppStore>((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (status: boolean) => {
    set(() => ({ isLoggedIn: status }));
  },
  budgets: [],
  addBudget: (budget: Budget) =>
    set((store) => ({ budgets: [...store.budgets, budget] })),
  deleteBudget: (id: string) =>
    set((store) => ({ budgets: store.budgets.filter((b) => b.id !== id) })),
  accounts: [],
  addAccount: (account: Account) =>
    set((store) => ({ accounts: [...store.accounts, account] })),
  fetch: async () => {},
  load: async () => {
    const isLoggedIn = rid.isLoggedIn();
    const budgets = await budgetsCollection.getAll();
    const accounts = await accountsCollection.getAll();

    console.log("isLoggedIn", isLoggedIn);
    console.log("budgets", budgets);
    console.log("accounts", accounts);

    set(() => ({ isLoggedIn, budgets, accounts }));
  },
}));

export default useAppStore;
