"use client";

import { create } from "zustand";
import { Account, Budget, Category, Payee, Transaction } from "./types";
import {
  rid,
  budgetsCollection,
  accountsCollection,
  categoriesCollection,
  payeesCollection,
  transactionsCollection,
} from "./services/rethinkid";
import {
  createEmptyAccount,
  createEmptyBudget,
  createEmptyCategory,
  createEmptyPayee,
  createEmptyTransaction,
} from "./factories";

interface AppStore {
  isLoggedIn: boolean;
  setIsLoggedIn: (status: boolean) => void;
  budgets: Budget[];
  getBudget: (id: string) => Budget;
  setBudget: (budget: Budget) => void;
  deleteBudget: (id: string) => void;
  accounts: Account[];
  getAccountsForBudget: (budgetId: string) => Account[];
  getAccount: (id: string) => Account;
  setAccount: (account: Account) => void;
  updateAccount: (account: Account) => void;
  deleteAccount: (id: string) => void;
  categories: Category[];
  getCategoriesForBudget: (budgetId: string) => Category[];
  getCategory: (id: string) => Category;
  setCategory: (category: Category) => void;
  updateCategory: (category: Category) => void;
  deleteCategory: (id: string) => void;
  payees: Payee[];
  getPayeesForBudget: (budgetId: string) => Payee[];
  getPayee: (id: string) => Payee;
  setPayee: (payee: Payee) => void;
  deletePayee: (id: string) => void;
  transactions: Transaction[];
  getTransactionsForBudget: (budgetId: string) => Transaction[];
  getTransaction: (id: string) => Transaction;
  setTransaction: (transaction: Transaction) => void;
  deleteTransaction: (id: string) => void;
  load: () => void;
}

const useAppStore = create<AppStore>((set, get) => ({
  isLoggedIn: false,
  setIsLoggedIn: (status: boolean) => {
    set(() => ({ isLoggedIn: status }));
  },
  budgets: [],
  getBudget: (id: string) => {
    const budget = get().budgets.find((b) => b.id === id);
    return budget || createEmptyBudget();
  },
  setBudget: (budget: Budget) =>
    set((store) => ({ budgets: [...store.budgets, budget] })),
  deleteBudget: (id: string) =>
    set((store) => ({ budgets: store.budgets.filter((b) => b.id !== id) })),
  accounts: [],
  getAccountsForBudget: (budgetId: string) => {
    return get().accounts.filter((a) => a.budgetId === budgetId);
  },
  getAccount: (id: string) => {
    const account = get().accounts.find((a) => a.id === id);
    return account || createEmptyAccount();
  },
  setAccount: (account: Account) =>
    set((store) => ({ accounts: [...store.accounts, account] })),
  updateAccount: (account: Account) => {
    set((store) => ({
      accounts: store.accounts.map((a) => (a.id === account.id ? account : a)),
    }));
  },
  deleteAccount: (id: string) => {
    set((store) => ({ accounts: store.accounts.filter((a) => a.id !== id) }));
  },
  categories: [],
  getCategoriesForBudget: (budgetId: string) => {
    return get().categories.filter((c) => c.budgetId === budgetId);
  },
  getCategory: (id: string) => {
    const category = get().categories.find((c) => c.id === id);
    return category || createEmptyCategory();
  },
  setCategory: (category) => {
    set((store) => ({ categories: [...store.categories, category] }));
  },
  updateCategory: (category: Category) => {
    set((store) => ({
      categories: store.categories.map((c) =>
        c.id === category.id ? category : c
      ),
    }));
  },
  deleteCategory: (id: string) => {
    set((store) => ({
      categories: store.categories.filter((c) => c.id !== id),
    }));
  },
  payees: [],
  getPayeesForBudget: (budgetId: string) => {
    return get().payees.filter((p) => p.budgetId === budgetId);
  },
  getPayee: (id: string) => {
    const category = get().payees.find((p) => p.id === id);
    return category || createEmptyPayee();
  },
  setPayee: (payee) => {
    set((store) => ({ payees: [...store.payees, payee] }));
  },
  deletePayee: (id: string) => {
    set((store) => ({
      payees: store.payees.filter((p) => p.id !== id),
    }));
  },
  transactions: [],
  getTransactionsForBudget: (budgetId: string) => {
    return get().transactions.filter((p) => p.budgetId === budgetId);
  },
  getTransaction: (id: string) => {
    const category = get().transactions.find((p) => p.id === id);
    return category || createEmptyTransaction();
  },
  setTransaction: (payee) => {
    set((store) => ({ transactions: [...store.transactions, payee] }));
  },
  deleteTransaction: (id: string) => {
    set((store) => ({
      transactions: store.transactions.filter((p) => p.id !== id),
    }));
  },
  load: async () => {
    // console.log("Load data:");
    const isLoggedIn = rid.isLoggedIn();
    if (!isLoggedIn) return;

    const budgets = await budgetsCollection.getAll();
    const accounts = await accountsCollection.getAll();
    const categories = await categoriesCollection.getAll();
    const payees = await payeesCollection.getAll();
    const transactions = await transactionsCollection.getAll();

    // console.log("- isLoggedIn", isLoggedIn);
    // console.log("- budgets", budgets);
    // console.log("- accounts", accounts);
    // console.log("- categories", categories);
    // console.log("- payees", payees);
    // console.log("- transactions", transactions);

    set(() => ({
      isLoggedIn,
      budgets,
      accounts,
      categories,
      payees,
      transactions,
    }));
  },
}));

export default useAppStore;
