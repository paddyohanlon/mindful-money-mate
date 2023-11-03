import useAppStore from "@/app/store";
import dynamic from "next/dynamic";
import { FormEvent, useState } from "react";
import FormControl from "@/app/components/FormControl";
import FormLabel from "@/app/components/FormLabel";
import FormInput from "@/app/components/FormInput";
import FormSelect from "@/app/components/FormSelect";
import FormInputCurrency from "@/app/components/FormInputCurrency";
import { useTransactionOptions } from "../useTransactionOptions";
import Alert from "@/app/components/Alert";
import {
  accountsCollection,
  categoriesCollection,
  transactionsCollection,
} from "@/app/services/rethinkid";
import { BUDGETS_PATH } from "@/app/constants";
import { useRouter } from "next/navigation";
import { convertToSignedAmount } from "@/app/currency";

const DeleteTransactionButton = dynamic(
  () => import("./DeleteTransactionButton"),
  {
    ssr: false,
  }
);

interface Props {
  budgetId: string;
  transactionId: string;
}

const TransactionDetail = ({ budgetId, transactionId }: Props) => {
  const isInflowInputId = "flow-toggle";
  const memoInputId = "memo";
  const accountInputId = "account";
  const categoryInputId = "category";
  const payeeInputId = "payee";
  const amountInputId = "amount";

  const router = useRouter();

  const transaction = useAppStore((state) =>
    state.getTransaction(transactionId)
  );
  const {
    updateTransaction,
    getCategory,
    getAccount,
    updateAccount,
    updateCategory,
  } = useAppStore();

  const { payeeOptions } = useTransactionOptions(budgetId);

  const [updatedTransaction, setUpdatedTransaction] = useState(transaction);
  const [isInflow, setIsInflow] = useState(
    transaction.amountCents >= 0 && true
  );
  const [previousAmountCents] = useState(transaction.amountCents);
  const [unsignedAmountCents, setUnsignedAmountCents] = useState(
    Math.abs(transaction.amountCents)
  );
  const [amountError, setAmountError] = useState("");

  function handleSubmit(event: FormEvent): void {
    event.preventDefault();

    setAmountError("");

    if (unsignedAmountCents < 1) {
      setAmountError(`Enter an amount of at least 0.01`);
      return;
    }

    updatedTransaction.amountCents = convertToSignedAmount(
      unsignedAmountCents,
      isInflow
    );

    transactionsCollection.updateOne(updatedTransaction.id, updatedTransaction);
    updateTransaction(updatedTransaction);

    const difference = updatedTransaction.amountCents - previousAmountCents;

    const category = getCategory(updatedTransaction.categoryId);
    category.balanceCents += difference;
    updateCategory(category);
    categoriesCollection.updateOne(category.id, category);

    const account = getAccount(updatedTransaction.accountId);
    account.balanceCents += difference;
    updateAccount(account);
    accountsCollection.updateOne(account.id, account);

    router.push(`${BUDGETS_PATH}/${budgetId}/transactions`);
  }

  return (
    <>
      <h1>Edit Transaction</h1>

      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel htmlFor={isInflowInputId}>
            {isInflow ? "Inflow" : "Outflow"}
          </FormLabel>
          <input
            id={isInflowInputId}
            type="checkbox"
            className="toggle toggle-success"
            checked={isInflow}
            onChange={() => setIsInflow(!isInflow)}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor={amountInputId}>Amount</FormLabel>
          <FormInputCurrency
            budgetId={budgetId}
            inputId={amountInputId}
            initialAmountCents={unsignedAmountCents}
            onChange={(value) => setUnsignedAmountCents(value)}
          />
          {amountError && <Alert className="mt-2">{amountError}</Alert>}
        </FormControl>
        <FormControl>
          <FormLabel htmlFor={accountInputId}>Account</FormLabel>
          <FormInput
            id={accountInputId}
            value={getAccount(updatedTransaction.accountId).name}
            readOnly={true}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor={categoryInputId}>Category</FormLabel>
          <FormInput
            id={categoryInputId}
            value={getCategory(updatedTransaction.categoryId).name}
            readOnly={true}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor={payeeInputId}>Payee</FormLabel>
          <FormSelect
            id={payeeInputId}
            options={payeeOptions}
            value={updatedTransaction.payeeId}
            onChange={(value) =>
              setUpdatedTransaction({ ...updatedTransaction, payeeId: value })
            }
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor={memoInputId}>Memo</FormLabel>
          <FormInput
            id={memoInputId}
            value={updatedTransaction.memo}
            onChange={(value) =>
              setUpdatedTransaction({ ...updatedTransaction, memo: value })
            }
            required={false}
          />
        </FormControl>
        <button type="submit" className="btn btn-primary mt-4">
          Save
        </button>
      </form>

      <div className="pt-16 text-right">
        <DeleteTransactionButton budgetId={budgetId} transaction={transaction}>
          Delete Transaction
        </DeleteTransactionButton>
      </div>
    </>
  );
};

export default TransactionDetail;
