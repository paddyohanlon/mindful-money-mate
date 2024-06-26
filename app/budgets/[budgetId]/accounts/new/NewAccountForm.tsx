import FormControl from "@/app/components/FormControl";
import FormLabel from "@/app/components/FormLabel";
import FormInput from "@/app/components/FormInput";
import FormSelect from "@/app/components/FormSelect";
import FormInputCurrency from "@/app/components/FormInputCurrency";
import { FormEvent, useState } from "react";
import { Account, AccountTypes, UnsavedAccount } from "@/app/types";
import { accountsCollection } from "@/app/services/bzr";
import useAppStore from "@/app/store";
import { BUDGETS_PATH, createOptionsFromStrEnum } from "@/app/constants";
import { useRouter } from "next/navigation";

interface Props {
  budgetId: string;
}

const NewAccountForm = ({ budgetId }: Props) => {
  const router = useRouter();

  const nameInputId = "name";
  const typeInputId = "type";
  const balanceInputId = "balance";

  const setAccount = useAppStore((state) => state.setAccount);

  const [unsavedAccount, setUnsavedAccount] = useState<UnsavedAccount>({
    budgetId,
    name: "",
    type: AccountTypes.CHECKING,
    balanceCents: 0,
  });

  async function handleSubmit(event: FormEvent) {
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
          options={createOptionsFromStrEnum(AccountTypes)}
          value={unsavedAccount.type}
          onChange={(value) => {
            const type = value as AccountTypes;
            setUnsavedAccount({ ...unsavedAccount, type });
          }}
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor={balanceInputId}>Balance</FormLabel>
        <FormInputCurrency
          budgetId={budgetId}
          inputId={balanceInputId}
          initialAmountCents={unsavedAccount.balanceCents}
          onChange={(value) =>
            setUnsavedAccount({ ...unsavedAccount, balanceCents: value })
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
