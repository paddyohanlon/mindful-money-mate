"use client";

import { ContainerSmall } from "@/app/components/ContainerSmall";
import dynamic from "next/dynamic";

interface Props {
  params: { budgetId: string; categoryId: string };
}

const CategoryDetail = dynamic(() => import("./CategoryDetail"), {
  ssr: false,
});

const CategoryDetailPage = ({ params: { budgetId, categoryId } }: Props) => {
  return (
    <ContainerSmall>
      <CategoryDetail budgetId={budgetId} categoryId={categoryId} />
    </ContainerSmall>
  );
};

export default CategoryDetailPage;
