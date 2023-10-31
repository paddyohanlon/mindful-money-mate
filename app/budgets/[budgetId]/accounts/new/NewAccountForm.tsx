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
import Alert from "../../../../components/Alert";
import FormCurrencyInput from "@/app/components/FormCurrencyInput";

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

  // In dev...
  const [theBalance, setTheBalance] = useState(0);

  const [balanceStr, setBalanceStr] = useState("");
  const [balanceError, setBalanceError] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    setBalanceError("");

    if (!unsavedAccount.name) {
      console.log("Missing form values. Do not submit");
      return;
    }

    console.log("balanceStr", balanceStr);

    const balance = parseFloat(balanceStr);
    console.log("balance", balance);

    if (Number.isNaN(balance)) {
      setBalanceError("Balance must be a number!");
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

  function onChange(value: string) {
    console.log("onChange fired");
    setBalanceStr(value);
  }
  function onChangeAmount(value: number) {
    console.log("onChangeAmount fired:", typeof value, value);
    setTheBalance(value);
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
        {balanceError && <Alert>{balanceError}</Alert>}
        <FormCurrencyInput
          budgetId={budgetId}
          inputId={balanceInputId}
          onChange={onChangeAmount}
          amount={theBalance}
        />
        <FormInput id={balanceInputId} value={balanceStr} onChange={onChange} />
      </FormControl>
      <button className="btn btn-primary" type="submit">
        Save
      </button>
    </form>
  );
};

export default NewAccountForm;
