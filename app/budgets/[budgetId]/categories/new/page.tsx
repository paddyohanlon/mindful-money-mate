"use client";

import { ContainerSmall } from "@/app/components/ContainerSmall";
import dynamic from "next/dist/shared/lib/dynamic";

const NewCategoryForm = dynamic(() => import("./NewCategoryForm"), {
  ssr: false,
});

interface Props {
  params: { budgetId: string };
}

const NewAccountPage = ({ params: { budgetId } }: Props) => {
  return (
    <ContainerSmall>
      <h1>New Category</h1>
      <NewCategoryForm budgetId={budgetId} />
    </ContainerSmall>
  );
};

export default NewAccountPage;
