import { BazaarApp } from "@bzr/bazaar";
import type { BazaarOptions } from "@bzr/bazaar";
import { LAST_USED_BUDGET_ID } from "../constants";
import { SettingsDoc } from "../types";

const options: BazaarOptions = {
  appId: process.env.NEXT_PUBLIC_BAZAAR_APP_ID || "",
  loginRedirectUri: process.env.NEXT_PUBLIC_BAZAAR_REDIRECT_URI || "",
  onApiConnectError: async (bzr, message) => {
    if (message.includes("invalid_token")) {
      bzr.logOut();
    }
  },
  onApiConnect: async (bzr) => {
    console.log("API Connect callback fired!");
  },
  onLoginError: async () => {
    console.log("onLoginError callback fired!");
  },
};

if (process.env.NODE_ENV === "development") {
  options.bazaarUri = process.env.NEXT_PUBLIC_BAZAAR_MOCK_SERVER_URL;
}

export const bzr = new BazaarApp(options);

export const BUDGETS_COLLECTION_NAME = "budgets";

export const settingsCollection = bzr.collection<SettingsDoc>("settings", {
  onCreate: async () => {
    settingsCollection.insertOne({ id: LAST_USED_BUDGET_ID, budgetId: "" });
  },
});

// const testingCollection = bzr.collection("testing");
// testingCollection
//   .insertOne({ name: "Waddy" })
//   .then((res) => console.log("res", res))
//   .catch((e) => console.log("catch testingColl", e));

export const budgetsCollection = bzr.collection(BUDGETS_COLLECTION_NAME);
export const accountsCollection = bzr.collection("accounts");
export const categoriesCollection = bzr.collection("categories");
export const assignmentsCollection = bzr.collection("assignments");
export const payeesCollection = bzr.collection("payees");
export const transactionsCollection = bzr.collection("transactions");

/**
 * Auth
 */

// bzr.isLoggedIn()
// bzr.logOut()
// bzr.login()
// bzr.onLogin()
// bzr.onLoginError()

/**
 * Data API
 */

// bzr.onApiConnect()
// bzr.onApiConnectError()

/**
 * Data API - Collection
 */

// bzr.collection().getAll
// bzr.collection().getOne
// bzr.collection().getPage // implement! could do for transactions
// bzr.collection().insertOne
// bzr.collection().updateOne
// bzr.collection().replaceOne // implement! how to do this?
// bzr.collection().deleteAll
// bzr.collection().deleteOne
// bzr.collection().subscribeAll
// bzr.collection().subscribeOne // implement! do this for budget I guess,

/**
 * Collections
 */

// bzr.collections.create()
// bzr.collections.drop()
// bzr.collections.list()

/**
 * Sharing API (Permissions)
 */

// bzr.permissions.granted.
// - bzr.permissions.granted.list()
// - bzr.permissions.granted.delete()
// - bzr.permissions.granted.subscribe()

// bzr.permissions.create()
// bzr.permissions.delete()
// bzr.permissions.list()

// bzr.permissions.links.
// - bzr.permissions.links.create()
// - bzr.permissions.links.list()
// - bzr.permissions.links.delete()
// - bzr.permissions.links.subscribe()

/**
 * Social API (Contacts)
 */

// bzr.social.openModal()

// bzr.social.getUser()

// bzr.social.contacts.list
// bzr.social.contacts.subscribe
