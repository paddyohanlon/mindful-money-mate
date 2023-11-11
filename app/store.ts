"use client";

import { create } from "zustand";
import {
  Account,
  Assignment,
  Budget,
  Category,
  Payee,
  Transaction,
} from "./types";
import {
  rid,
  budgetsCollection,
  accountsCollection,
  categoriesCollection,
  payeesCollection,
  transactionsCollection,
  assignmentsCollection,
} from "./services/rethinkid";
import {
  createEmptyAccount,
  createEmptyAssignment,
  createEmptyBudget,
  createEmptyCategory,
  createEmptyPayee,
  createEmptyTransaction,
  createEmptyUser,
} from "./factories";
import {
  SAMPLE_ACCOUNTS,
  SAMPLE_BUDGET,
  SAMPLE_CATEGORIES,
  SAMPLE_PAYEES,
} from "./sampleData";
import { CollectionAPI, Contact, User } from "@rethinkid/rethinkid-js-sdk";

interface AppStore {
  isLoading: boolean;
  isLoggedIn: boolean;
  setIsLoggedIn: (status: boolean) => void;
  user: User;
  budgets: Budget[];
  getBudget: (id: string) => Budget;
  setBudget: (budget: Budget) => void;
  deleteBudget: (id: string) => void;
  accounts: Account[];
  getAccount: (id: string) => Account;
  setAccount: (account: Account) => void;
  updateAccount: (account: Account) => void;
  deleteAccount: (id: string) => void;
  categories: Category[];
  getCategory: (id: string) => Category;
  setCategory: (category: Category) => void;
  updateCategory: (category: Category) => void;
  deleteCategory: (id: string) => void;
  assignments: Assignment[];
  getAssignment: (assignmentId: string) => Assignment;
  setAssignment: (assignment: Assignment) => void;
  payees: Payee[];
  getPayee: (id: string) => Payee;
  setPayee: (payee: Payee) => void;
  deletePayee: (id: string) => void;
  transactions: Transaction[];
  getTransaction: (id: string) => Transaction;
  setTransaction: (transaction: Transaction) => void;
  updateTransaction: (transaction: Transaction) => void;
  deleteTransaction: (id: string) => void;
  contacts: Contact[];
  load: () => void;
  startFresh: () => void;
  populateSampleData: () => void;
}

const useAppStore = create<AppStore>((set, get) => ({
  isLoading: true,
  isLoggedIn: false,
  setIsLoggedIn: (status: boolean) => {
    set(() => ({ isLoggedIn: status }));
  },
  user: createEmptyUser(),
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
  assignments: [],
  getAssignment: (id: string) => {
    const assignment = get().assignments.find((a) => a.id === id);
    return assignment || createEmptyAssignment();
  },
  setAssignment: (assignment: Assignment) => {
    set((store) => ({ assignments: [...store.assignments, assignment] }));
  },
  categories: [],
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
  getTransaction: (id: string) => {
    const category = get().transactions.find((t) => t.id === id);
    return category || createEmptyTransaction();
  },
  setTransaction: (transaction) => {
    set((store) => ({ transactions: [...store.transactions, transaction] }));
  },
  updateTransaction: (transaction: Transaction) => {
    set((store) => ({
      transactions: store.transactions.map((t) =>
        t.id === transaction.id ? transaction : t
      ),
    }));
  },
  deleteTransaction: (id: string) => {
    set((store) => ({
      transactions: store.transactions.filter((t) => t.id !== id),
    }));
  },
  contacts: [],
  load: async () => {
    // console.log("Load data:");
    const isLoggedIn = rid.isLoggedIn();
    if (!isLoggedIn) return;

    const user = await rid.social.getUser();

    // rid.permissions.create
    // rid.permissions.delete
    // rid.permissions.granted
    // rid.permissions.links
    // rid.permissions.list
    // rid.permissions.onGranted
    // rid.permissions.openModal
    // rid.permissions.stopOnGranted

    /**
     * Budgets
     */
    const budgets = (await budgetsCollection.getAll(
      {},
      { orderBy: { name: "asc" } }
    )) as Budget[];
    // mirror<Budget>(budgetsCollection, {
    mirror(budgetsCollection, {
      add: (doc) => {
        if (get().getBudget(doc.id)) return;
        get().setBudget(doc as Budget);
      },
    });

    /** Accounts */
    const accounts = (await accountsCollection.getAll(
      {},
      { orderBy: { name: "asc" } }
    )) as Account[];
    // mirror<Account>(accountsCollection, {
    mirror(accountsCollection, {
      add: (doc) => {
        if (get().getAccount(doc.id)) return;
        get().setAccount(doc as Account);
      },
      update: (doc) => {
        get().updateAccount(doc as Account);
      },
      remove: (doc) => {
        get().deleteAccount(doc.id);
      },
    });

    /**
     * Categories
     */
    const categories = (await categoriesCollection.getAll(
      {},
      { orderBy: { group: "asc" } }
    )) as Category[];
    // mirror<Category>(categoriesCollection, {
    mirror(categoriesCollection, {
      add: (doc) => {
        if (get().getCategory(doc.id)) return;
        get().setCategory(doc as Category);
      },
      update: (doc) => {
        get().updateCategory(doc as Category);
      },
      remove: (doc) => {
        get().deleteCategory(doc.id);
      },
    });

    /**
     * Assignments
     */
    const assignments = (await assignmentsCollection.getAll(
      {},
      {
        orderBy: {
          date: "desc",
        },
      }
    )) as Assignment[];
    // mirror<Assignment>(assignmentsCollection, {
    mirror(assignmentsCollection, {
      add: (doc) => {
        if (get().getAssignment(doc.id)) return;
        get().setAssignment(doc as Assignment);
      },
    });

    /**
     * Payees
     */
    const payees = (await payeesCollection.getAll(
      {},
      { orderBy: { name: "asc" } }
    )) as Payee[];
    // mirror<Payee>(payeesCollection, {
    mirror(payeesCollection, {
      add: (doc) => {
        if (get().getPayee(doc.id)) return;
        get().setPayee(doc as Payee);
      },
      remove: (doc) => {
        get().deletePayee(doc.id);
      },
    });

    /**
     * Transactions
     */
    const transactions = (await transactionsCollection.getAll(
      {},
      {
        orderBy: {
          date: "desc",
        },
      }
    )) as Transaction[];
    // mirror<Transaction>(transactionsCollection, {
    mirror(transactionsCollection, {
      add: (doc) => {
        if (get().getTransaction(doc.id)) return;
        get().setTransaction(doc as Transaction);
      },
      update: (doc) => {
        get().updateTransaction(doc as Transaction);
      },
      remove: (doc) => {
        get().deleteTransaction(doc.id);
      },
    });

    const contacts = await rid.social.listContacts();
    set((store) => ({ contacts }));

    // console.log("- isLoggedIn", isLoggedIn);
    // console.log("- user", user);
    // console.log("- budgets", budgets);
    // console.log("- accounts", accounts);
    // console.log("- categories", categories);
    // console.log("- assignments", assignments);
    // console.log("- payees", payees);
    // console.log("- transactions", transactions);

    set(() => ({
      isLoggedIn,
      user,
      budgets,
      accounts,
      categories,
      assignments,
      payees,
      transactions,
      isLoading: false,
    }));
  },
  startFresh: async () => {
    await budgetsCollection.deleteAll();
    await accountsCollection.deleteAll();
    await categoriesCollection.deleteAll();
    await assignmentsCollection.deleteAll();
    await payeesCollection.deleteAll();
    await transactionsCollection.deleteAll();

    set(() => ({
      budgets: [],
      accounts: [],
      categories: [],
      assignments: [],
      payees: [],
      transactions: [],
    }));

    rid.logOut();
  },
  populateSampleData: async () => {
    // Budget
    await budgetsCollection.insertOne(SAMPLE_BUDGET);
    set(() => ({ budgets: [SAMPLE_BUDGET] }));

    // Accounts
    for (const account of SAMPLE_ACCOUNTS) {
      accountsCollection.insertOne(account);
    }
    set(() => ({ accounts: SAMPLE_ACCOUNTS }));

    // Categories
    for (const category of SAMPLE_CATEGORIES) {
      categoriesCollection.insertOne(category);
    }
    set(() => ({ categories: SAMPLE_CATEGORIES }));

    // Payees
    for (const payees of SAMPLE_PAYEES) {
      payeesCollection.insertOne(payees);
    }
    set(() => ({ payees: SAMPLE_PAYEES }));
  },
}));

interface Doc {
  id: any;
  [key: string]: any;
}

function mirror(
  collection: CollectionAPI,
  callbacks: {
    add?: (doc: Doc) => void;
    update?: (doc: Doc) => void;
    remove?: (doc: Doc) => void;
  } = {}
) {
  type Changes = {
    newDoc: Doc | null;
    oldDoc: Doc | null;
  };

  const { add, update, remove } = callbacks;

  collection.subscribeAll({}, ({ oldDoc, newDoc }: Changes) => {
    if (add && oldDoc === null && newDoc) {
      add(newDoc);
    }
    if (update && oldDoc && newDoc) {
      update(newDoc);
    }
    if (remove && oldDoc && newDoc === null) {
      remove(oldDoc);
    }
  });
}

export default useAppStore;
