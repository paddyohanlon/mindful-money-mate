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
      <h1 className="sr-only">Categories</h1>
      <Link
        href={`${BUDGETS_PATH}/${budgetId}/categories/new`}
        className="btn btn-sm btn-neutral"
      >
        New Category
      </Link>
      <TheBudget budgetId={budgetId} />
    </>
  );
};

export default CategoriesPage;
