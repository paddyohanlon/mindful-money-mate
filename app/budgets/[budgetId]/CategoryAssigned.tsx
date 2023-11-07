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

const CategoryAssigned = ({ budgetId, categoryId }: Props) => {
  const assignments = useAppStore((state) => state.assignments);

  const [assigned, setAssigned] = useState(0);

  useEffect(() => {
    const assignmentsForCategory = assignments.filter(
      (a) => a.categoryId === categoryId
    );

    setAssigned(
      assignmentsForCategory.reduce(
        (accumulator, assignment) => accumulator + assignment.amountCents,
        0
      )
    );
  }, [categoryId, setAssigned, assignments]);

  return <FormattedCurrency budgetId={budgetId} amountCents={assigned} />;
};

export default CategoryAssigned;
