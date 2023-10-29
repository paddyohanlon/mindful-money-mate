"use client";

import { ContainerSmall } from "@/app/components/ContainerSmall";
import Link from "next/link";
import { BUDGETS_PATH } from "@/app/constants";
import dynamic from "next/dynamic";

const CategoriesList = dynamic(() => import("./CategoriesList"), {
  ssr: false,
});

interface Props {
  params: { budgetId: string };
}

const CategoriesPage = ({ params: { budgetId } }: Props) => {
  return (
    <>
      <ContainerSmall>
        <div className="flex justify-between items-baseline gap-4">
          <h2>Categories</h2>
          <Link
            href={`${BUDGETS_PATH}/${budgetId}/categories/new`}
            className="btn btn-sm btn-neutral"
            title="New category"
          >
            New
          </Link>
        </div>
        <CategoriesList budgetId={budgetId} />
      </ContainerSmall>
    </>
  );
};

export default CategoriesPage;
