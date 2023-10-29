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

const CategoriesList = ({ budgetId }: Props) => {
  const { getCategoriesForBudget } = useAppStore();

  return (
    <>
      {getCategoriesForBudget(budgetId).length === 0 ? (
        <div className="prose">
          <p>Add your first category</p>
        </div>
      ) : (
        <ul className="not-prose menu menu-lg bg-base-200 rounded-box w-full">
          {getCategoriesForBudget(budgetId).map((category) => (
            <li key={category.id}>
              <Link
                className="flex justify-between"
                href={`${BUDGETS_PATH}/${budgetId}/categories/${category.id}`}
              >
                <span>{category.name}</span>
                <span>{category.group}</span>
                <span>
                  <FormattedCurrency
                    budgetId={budgetId}
                    amount={category.balance}
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

export default CategoriesList;
