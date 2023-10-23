import { createContext } from "react";
import { Account } from "@/app/types";

interface ContextType {
  accounts: Account[];
  setAccounts: React.Dispatch<React.SetStateAction<Account[]>>;
}

const AccountsContext = createContext<ContextType>({} as ContextType);

export default AccountsContext;
