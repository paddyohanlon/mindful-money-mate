"use client";

import Link from "next/link";
import { BUDGETS_PATH } from "@/app/constants";
import dynamic from "next/dynamic";

const TheBudget = dynamic(() => import("../TheBudget"), {
  ssr: false,
});

interface Props {
  params: { budgetId: string };
}

const CategoriesPage = ({ params: { budgetId } }: Props) => {
  return (
    <>
      <div className="flex justify-between items-baseline gap-4">
        <h1 className="sr-only">Categories</h1>
        <Link
          href={`${BUDGETS_PATH}/${budgetId}/categories/new`}
          className="btn btn-sm btn-neutral"
        >
          New Category
        </Link>
      </div>
      <TheBudget budgetId={budgetId} />
    </>
  );
};

export default CategoriesPage;
