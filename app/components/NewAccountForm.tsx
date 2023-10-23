import FormControl from "@/app/components/FormControl";
import FormLabel from "@/app/components/FormLabel";
import FormInput from "@/app/components/FormInput";
import FormSelect from "@/app/components/FormSelect";
import { FormEvent, useContext, useState } from "react";
import { Account } from "../types";
import { accountsCollection } from "../services/rethinkid";
import AccountsContext from "../contexts/accountsContext";

interface Props {
  budgetId: string;
}

type UnsavedAccount = Omit<Account, "id">;

const NewAccountForm = ({ budgetId }: Props) => {
  const nameInputId = "name";
  const typeInputId = "type";
  const balanceInputId = "balance";

  const typeOptions = [
    { value: "bank", label: "Bank" },
    { value: "cash", label: "Cash" },
  ];

  const { setAccounts } = useContext(AccountsContext);

  const [unsavedAccount, setUnsavedAccount] = useState<UnsavedAccount>({
    budgetId,
    name: "",
    type: "bank",
    balance: 0,
  });

  async function handleSubmitNewAccount(event: FormEvent) {
    event.preventDefault();

    if (!unsavedAccount.name) {
      console.log("Missing form values. Do not submit");
      return;
    }

    const id = await accountsCollection.insertOne(unsavedAccount);

    const newAccount: Account = {
      id,
      ...unsavedAccount,
    };

    setAccounts((prevAccounts) => [...prevAccounts, newAccount]);

    console.log("Submit new account");
  }
  return (
    <form onSubmit={handleSubmitNewAccount}>
      <FormControl>
        <FormLabel htmlFor={nameInputId}>Name</FormLabel>
        <FormInput
          id={nameInputId}
          value={unsavedAccount.name}
          onChange={(value) =>
            setUnsavedAccount({ ...unsavedAccount, name: value })
          }
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor={typeInputId}>Type</FormLabel>
        <FormSelect
          id={typeInputId}
          options={typeOptions}
          value={unsavedAccount.type}
          onChange={(value) =>
            setUnsavedAccount({ ...unsavedAccount, type: value })
          }
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor={balanceInputId}>Balance</FormLabel>
        <FormInput
          id={balanceInputId}
          type="number"
          value={unsavedAccount.balance.toString()}
          onChange={(value) =>
            setUnsavedAccount({
              ...unsavedAccount,
              balance: parseInt(value),
            })
          }
        />
      </FormControl>
      <button className="btn btn-primary" type="submit">
        Save
      </button>
    </form>
  );
};

export default NewAccountForm;
