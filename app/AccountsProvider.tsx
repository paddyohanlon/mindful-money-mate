"use client";

import React, { ReactNode, useContext, useEffect, useState } from "react";
import AccountsContext from "./contexts/accountsContext";
import { Account } from "./types";
import { accountsCollection } from "./services/rethinkid";
import IsLoggedInContext from "./contexts/isLoggedInContext";

interface Props {
  children: ReactNode;
}

const AccountsProvider = ({ children }: Props) => {
  const { isLoggedIn } = useContext(IsLoggedInContext);
  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    if (!isLoggedIn) return;

    accountsCollection.getAll().then((accounts: Account[]) => {
      setAccounts(accounts);
    });
  }, [isLoggedIn, setAccounts]);

  return (
    <AccountsContext.Provider value={{ accounts, setAccounts }}>
      {children}
    </AccountsContext.Provider>
  );
};

export default AccountsProvider;
