"use client";

import { ContainerSmall } from "@/app/components/ContainerSmall";
import Link from "next/link";
import { BUDGETS_PATH } from "@/app/constants";
import dynamic from "next/dynamic";

const AssignmentsList = dynamic(() => import("./AssignmentsList"), {
  ssr: false,
});

interface Props {
  params: { budgetId: string };
}

const PayeesPage = ({ params: { budgetId } }: Props) => {
  return (
    <>
      <h1 className="sr-only">Assignments</h1>
      <AssignmentsList budgetId={budgetId} />
    </>
  );
};

export default PayeesPage;
