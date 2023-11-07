import useAppStore from "@/app/store";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const FormattedCurrency = dynamic(
  () => import("@/app/budgets/[budgetId]/FormattedCurrency"),
  {
    ssr: false,
  }
);

interface Props {
  budgetId: string;
  categoryId: string;
}

const CategorySpent = ({ budgetId, categoryId }: Props) => {
  const transactions = useAppStore((state) => state.transactions);

  const [spent, setSpent] = useState(0);

  useEffect(() => {
    const transactionsForCategory = transactions.filter(
      (t) => t.categoryId === categoryId
    );

    setSpent(
      transactionsForCategory.reduce(
        (accumulator, transaction) => accumulator + transaction.amountCents,
        0
      )
    );
  }, [categoryId, setSpent, transactions]);

  return <FormattedCurrency budgetId={budgetId} amountCents={spent * -1} />;
};

export default CategorySpent;
