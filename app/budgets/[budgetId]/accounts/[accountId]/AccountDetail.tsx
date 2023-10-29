import useAppStore from "@/app/store";
import dynamic from "next/dynamic";

const DeleteAccountButton = dynamic(() => import("./DeleteAccountButton"), {
  ssr: false,
});
const FormattedCurrency = dynamic(
  () => import("@/app/budgets/[budgetId]/FormattedCurrency"),
  {
    ssr: false,
  }
);

interface Props {
  budgetId: string;
  accountId: string;
}

const AccountDetail = ({ budgetId, accountId }: Props) => {
  const { getBudget, getAccount } = useAppStore();

  return (
    <>
      <h1>{getAccount(accountId).name}</h1>
      <p>{getAccount(accountId).type}</p>
      <p>
        <FormattedCurrency
          budgetId={budgetId}
          amount={getAccount(accountId).balance}
        />
      </p>
      <DeleteAccountButton budgetId={budgetId} accountId={accountId}>
        Delete Account
      </DeleteAccountButton>
    </>
  );
};

export default AccountDetail;
