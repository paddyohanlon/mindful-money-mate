import { BUDGETS_PATH } from "@/app/constants";
import useAppStore from "@/app/store";
import Link from "next/link";

interface Props {
  budgetId: string;
}

const PayeesList = ({ budgetId }: Props) => {
  const { getPayeesForBudget } = useAppStore();

  return (
    <>
      {getPayeesForBudget(budgetId).length === 0 ? (
        <div className="prose">
          <p>Add your first payee</p>
        </div>
      ) : (
        <ul className="not-prose menu menu-lg bg-base-200 rounded-box w-full">
          {getPayeesForBudget(budgetId).map((payee) => (
            <li key={payee.id}>
              <Link
                className="flex justify-between"
                href={`${BUDGETS_PATH}/${budgetId}/payees/${payee.id}`}
              >
                <span>{payee.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default PayeesList;
