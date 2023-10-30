import { BUDGETS_PATH } from "@/app/constants";
import useAppStore from "@/app/store";
import dynamic from "next/dynamic";
import Link from "next/link";

const FormattedCurrency = dynamic(
  () => import("@/app/budgets/[budgetId]/FormattedCurrency"),
  {
    ssr: false,
  }
);

interface Props {
  budgetId: string;
}

const AccountsList = ({ budgetId }: Props) => {
  const accountsForBudget = useAppStore((state) =>
    state.accounts.filter((a) => a.budgetId === budgetId)
  );

  return (
    <>
      {accountsForBudget.length === 0 ? (
        <div className="prose">
          <p>Add your first account</p>
        </div>
      ) : (
        <ul className="not-prose menu menu-lg bg-base-200 rounded-box w-full">
          {accountsForBudget.map((account) => (
            <li key={account.id}>
              <Link
                className="flex justify-between"
                href={`${BUDGETS_PATH}/${budgetId}/accounts/${account.id}`}
              >
                <span>{account.name}</span>
                <span>
                  <FormattedCurrency
                    budgetId={budgetId}
                    amount={account.balance}
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default AccountsList;
