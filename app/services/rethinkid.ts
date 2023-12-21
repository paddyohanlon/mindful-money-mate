import { RethinkID } from "@rethinkid/rethinkid-js-sdk";
import type { Options } from "@rethinkid/rethinkid-js-sdk";
import { LAST_USED_BUDGET_ID } from "../constants";
import { SettingsDoc } from "../types";

// console.log("App ID", process.env.NEXT_PUBLIC_RETHINKID_APP_ID);
// console.log("Redirect URI", process.env.NEXT_PUBLIC_RETHINKID_REDIRECT_URI);

const options: Options = {
  appId: process.env.NEXT_PUBLIC_RETHINKID_APP_ID || "",
  loginRedirectUri: process.env.NEXT_PUBLIC_RETHINKID_REDIRECT_URI || "",
  onApiConnectError: async (rid, message) => {
    if (message.includes("invalid_token")) {
      rid.logOut();
    }
  },
  onApiConnect: async (rid) => {
    console.log("API Connect callback fired!");
  },
  onLoginError: async () => {
    console.log("onLoginError callback fired!");
  },
};

if (process.env.NODE_ENV === "development") {
  // console.log("set dev", process.env.NEXT_PUBLIC_RETHINKID_MOCK_SERVER_URL);
  options.rethinkIdUri = process.env.NEXT_PUBLIC_RETHINKID_MOCK_SERVER_URL;
}

export const rid = new RethinkID(options);

export const BUDGETS_COLLECTION_NAME = "budgets";

export const settingsCollection = rid.collection<SettingsDoc>("settings", {
  onCreate: async () => {
    settingsCollection.insertOne({ id: LAST_USED_BUDGET_ID, budgetId: "" });
  },
});
export const budgetsCollection = rid.collection(BUDGETS_COLLECTION_NAME);
export const accountsCollection = rid.collection("accounts");
export const categoriesCollection = rid.collection("categories");
export const assignmentsCollection = rid.collection("assignments");
export const payeesCollection = rid.collection("payees");
export const transactionsCollection = rid.collection("transactions");

// rid.isLoggedIn()
// rid.logOut()
// rid.login()
// rid.onApiConnect()
// rid.onApiConnectError()
// rid.onLogin()
// rid.onLoginError()

/**
 * Permissions
 */

// rid.permissions.openModal()

// rid.permissions.granted.
// - rid.permissions.granted.list()
// - rid.permissions.granted.delete()
// - rid.permissions.granted.subscribe()

// rid.permissions.create()
// rid.permissions.delete()
// rid.permissions.list()

// rid.permissions.links.
// - rid.permissions.links.create()
// - rid.permissions.links.list()
// - rid.permissions.links.delete()
// - rid.permissions.links.subscribe()

/**
 * Collection
 */

// rid.collection().deleteAll
// rid.collection().deleteOne
// rid.collection().getAll
// rid.collection().getOne
// rid.collection().getPage // implement! could do for transactions
// rid.collection().insertOne
// rid.collection().replaceOne // implement! how to do this?
// rid.collection().subscribeAll
// rid.collection().subscribeOne // implement! do this for budget I guess,
// rid.collection().updateOne

/**
 * Collections
 */

// rid.collections.create()
// rid.collections.drop()
// rid.collections.list()

/**
 * Social
 */

// rid.social.openModal()

// rid.social.getUser()

// rid.social.contacts.list
// rid.social.contacts.subscribe
