"use client";

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
      <h1 className="sr-only">Transactions</h1>
      <TransactionsList budgetId={budgetId} />
    </>
  );
};

export default TransactionsPage;
