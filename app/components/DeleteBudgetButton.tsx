import React, { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { budgetsCollection } from "@/app/services/rethinkid";
import useAppStore from "../store";
import { BUDGETS_PATH } from "../constants";

interface Props {
  children: ReactNode;
  id: string;
}

const DeleteBudgetButton = ({ children, id }: Props) => {
  const router = useRouter();

  const { deleteBudget } = useAppStore();

  async function handleClick(id: string) {
    budgetsCollection.deleteOne(id);
    deleteBudget(id);
    router.push(BUDGETS_PATH);
  }

  return (
    <button className="btn btn-error" onClick={() => handleClick(id)}>
      {children}
    </button>
  );
};

export default DeleteBudgetButton;
