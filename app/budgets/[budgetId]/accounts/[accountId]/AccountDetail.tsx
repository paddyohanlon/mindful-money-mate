import useAppStore from "@/app/store";
import dynamic from "next/dynamic";
import { FormEvent, useState } from "react";
import FormControl from "@/app/components/FormControl";
import FormLabel from "@/app/components/FormLabel";
import FormInput from "@/app/components/FormInput";
import FormSelect from "@/app/components/FormSelect";
import FormInputCurrency from "@/app/components/FormInputCurrency";
import { Account } from "@/app/types";
import { ACCOUNT_TYPE_OPTIONS, BUDGETS_PATH } from "@/app/constants";
import { accountsCollection } from "@/app/services/rethinkid";
import { useRouter } from "next/navigation";

const DeleteAccountButton = dynamic(() => import("./DeleteAccountButton"), {
  ssr: false,
});

interface Props {
  budgetId: string;
  accountId: string;
}

const AccountDetail = ({ budgetId, accountId }: Props) => {
  const nameInputId = "name";
  const typeInputId = "type";
  const balanceInputId = "balance";

  const router = useRouter();

  const updateAccount = useAppStore((state) => state.updateAccount);

  const account = useAppStore((state) => state.getAccount(accountId));

  const [updatedAccount, setUpdatedAccount] = useState<Account>(account);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!updatedAccount.name) {
      console.log("Missing form values. Do not submit");
      return;
    }

    accountsCollection.updateOne(updatedAccount.id, updatedAccount);
    updateAccount(updatedAccount);

    router.push(`${BUDGETS_PATH}/${budgetId}/accounts`);
  }

  return (
    <>
      <h1>Edit Account</h1>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel htmlFor={nameInputId}>Name</FormLabel>
          <FormInput
            id={nameInputId}
            value={updatedAccount.name}
            onChange={(value) =>
              setUpdatedAccount({ ...updatedAccount, name: value })
            }
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor={typeInputId}>Type</FormLabel>
          <FormSelect
            id={typeInputId}
            options={ACCOUNT_TYPE_OPTIONS}
            value={updatedAccount.type}
            onChange={(value) =>
              setUpdatedAccount({ ...updatedAccount, type: value })
            }
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor={balanceInputId}>Balance</FormLabel>
          <FormInputCurrency
            budgetId={budgetId}
            inputId={balanceInputId}
            initialAmountCents={updatedAccount.balanceCents}
            onChange={(value) =>
              setUpdatedAccount({ ...updatedAccount, balanceCents: value })
            }
          />
        </FormControl>
        <button className="btn btn-primary" type="submit">
          Save
        </button>
      </form>

      <div className="pt-16 text-right">
        <DeleteAccountButton budgetId={budgetId} accountId={accountId}>
          Delete Account
        </DeleteAccountButton>
      </div>
    </>
  );
};

export default AccountDetail;
