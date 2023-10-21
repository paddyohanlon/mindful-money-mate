import { RethinkID } from "@rethinkid/rethinkid-js-sdk";
import type { Options } from "@rethinkid/rethinkid-js-sdk";

console.log("App ID", process.env.NEXT_PUBLIC_RETHINKID_APP_ID);
console.log("Redirect URI", process.env.NEXT_PUBLIC_RETHINKID_REDIRECT_URI);

const options: Options = {
  appId: process.env.NEXT_PUBLIC_RETHINKID_APP_ID || "",
  loginRedirectUri: process.env.NEXT_PUBLIC_RETHINKID_REDIRECT_URI || "",
  onApiConnectError: async (rid, message) => {
    if (message.includes("invalid_token")) {
      rid.logOut();
    }
  },
};

if (process.env.NODE_ENV === "development") {
  console.log("set dev", process.env.NEXT_PUBLIC_RETHINKID_MOCK_SERVER_URL);
  options.rethinkIdUri = process.env.NEXT_PUBLIC_RETHINKID_MOCK_SERVER_URL;
}

export const rid = new RethinkID(options);

export const budgetCollection = rid.collection("budgets");
