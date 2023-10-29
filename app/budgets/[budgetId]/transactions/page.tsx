"use client";

import Link from "next/link";
import { BUDGETS_PATH } from "@/app/constants";
import dynamic from "next/dynamic";

const TransactionsList = dynamic(() => import("./TransactionsList"), {
  ssr: false,
});

interface Props {
  params: { budgetId: string };
}

const TransactionsPage = ({ params: { budgetId } }: Props) => {
  return (
    <>
      <h2 className="sr-only">Transactions</h2>
      <TransactionsList budgetId={budgetId} />
    </>
  );
};

export default TransactionsPage;
