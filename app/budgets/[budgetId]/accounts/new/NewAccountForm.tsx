import FormControl from "@/app/components/FormControl";
import FormLabel from "@/app/components/FormLabel";
import FormInput from "@/app/components/FormInput";
import FormSelect from "@/app/components/FormSelect";
import { FormEvent, useState } from "react";
import { Account } from "@/app/types";
import { accountsCollection } from "@/app/services/rethinkid";
import useAppStore from "@/app/store";
import { BANK, BUDGETS_PATH, CASH } from "@/app/constants";
import { useRouter } from "next/navigation";
import FormInputCurrency from "@/app/components/FormInputCurrency";

interface Props {
  budgetId: string;
}

type UnsavedAccount = Omit<Account, "id">;

const NewAccountForm = ({ budgetId }: Props) => {
  const router = useRouter();

  const nameInputId = "name";
  const typeInputId = "type";
  const balanceInputId = "balance";

  const typeOptions = [
    { value: BANK, label: "Bank" },
    { value: CASH, label: "Cash" },
  ];

  const { setAccount } = useAppStore();

  const [unsavedAccount, setUnsavedAccount] = useState<UnsavedAccount>({
    budgetId,
    name: "",
    type: BANK,
    balance: 0,
  });

  const [balance, setBalance] = useState(0);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!unsavedAccount.name) {
      console.log("Missing form values. Do not submit");
      return;
    }

    unsavedAccount.balance = balance;

    const id = await accountsCollection.insertOne(unsavedAccount);

    const newAccount: Account = {
      id,
      ...unsavedAccount,
    };

    setAccount(newAccount);

    router.push(`${BUDGETS_PATH}/${budgetId}/accounts`);
  }

  return (
    <form onSubmit={handleSubmit}>
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
        <FormInputCurrency
          budgetId={budgetId}
          inputId={balanceInputId}
          onChange={(value) => setBalance(value)}
        />
      </FormControl>
      <button className="btn btn-primary" type="submit">
        Save
      </button>
    </form>
  );
};

export default NewAccountForm;
