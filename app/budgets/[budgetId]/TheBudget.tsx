import { BUDGETS_PATH } from "@/app/constants";
import useAppStore from "@/app/store";
import dynamic from "next/dynamic";
import Link from "next/link";
import CategoryDueDate from "./CategoryDueDate";

const CategoryBalanceForm = dynamic(
  () => import("@/app/budgets/[budgetId]/CategoryBalanceForm"),
  {
    ssr: false,
  }
);
const CategoryAssigned = dynamic(
  () => import("@/app/budgets/[budgetId]/CategoryAssigned"),
  {
    ssr: false,
  }
);
const CategorySpent = dynamic(
  () => import("@/app/budgets/[budgetId]/CategorySpent"),
  {
    ssr: false,
  }
);
const FormattedCurrency = dynamic(
  () => import("@/app/budgets/[budgetId]/FormattedCurrency"),
  {
    ssr: false,
  }
);

interface Props {
  budgetId: string;
}

const TheBudget = ({ budgetId }: Props) => {
  const categoriesForBudget = useAppStore((state) =>
    state.categories.filter((c) => c.budgetId === budgetId)
  );

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Group</th>
              <th>Balance</th>
              <th>Target</th>
              <th>Next Due Date</th>
              <th>Assigned</th>
              <th>Spent</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categoriesForBudget.map((category) => (
              <tr key={category.id}>
                <td>{category.name}</td>
                <td className="capitalize">{category.group}</td>
                <td>
                  <CategoryBalanceForm category={category} />
                </td>
                <td>
                  <FormattedCurrency
                    budgetId={budgetId}
                    amountCents={category.targetCents}
                  />
                </td>
                <td>
                  <CategoryDueDate category={category} />
                </td>
                <td>
                  <CategoryAssigned
                    budgetId={budgetId}
                    categoryId={category.id}
                  />
                </td>
                <td>
                  <CategorySpent budgetId={budgetId} categoryId={category.id} />
                </td>
                <td>{category.notes}</td>
                <td>
                  <Link
                    className="btn btn-xs btn-accent"
                    href={`${BUDGETS_PATH}/${budgetId}/categories/${category.id}`}
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TheBudget;
