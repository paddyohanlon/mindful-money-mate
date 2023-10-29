import { BUDGETS_PATH } from "@/app/constants";
import useAppStore from "@/app/store";
import dynamic from "next/dynamic";
import Link from "next/link";

const CategoryBalance = dynamic(
  () => import("@/app/budgets/[budgetId]/CategoryBalance"),
  {
    ssr: false,
  }
);

interface Props {
  budgetId: string;
}

const TheBudget = ({ budgetId }: Props) => {
  const { getCategoriesForBudget } = useAppStore();

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Group</th>
            <th>Balance</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {getCategoriesForBudget(budgetId).map((category) => (
            <tr key={category.id}>
              <td>{category.name}</td>
              <td className="capitalize">{category.group}</td>
              <td>
                <CategoryBalance budgetId={budgetId} category={category} />
              </td>
              <td>
                <Link
                  className="btn btn-xs btn-neutral"
                  href={`${BUDGETS_PATH}/${budgetId}/categories/${category.id}`}
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TheBudget;
