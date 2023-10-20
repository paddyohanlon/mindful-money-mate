"use client";

import { useContext } from "react";
import IsLoggedInContext from "./contexts/isLoggedInContext";
import dynamic from "next/dynamic";
import BudgetsProvider from "./BudgetsProvider";

const CreateBudgetForm = dynamic(() => import("./components/CreateBudgetForm"));
const ListBudgets = dynamic(() => import("./components/ListBudgets"));

export default function Home() {
  const { isLoggedIn } = useContext(IsLoggedInContext);

  return (
    <>
      <div className="prose">
        {!isLoggedIn ? (
          <p>Sign up or sign in to get started.</p>
        ) : (
          <div>
            <BudgetsProvider>
              <ListBudgets />
              <CreateBudgetForm />
            </BudgetsProvider>
          </div>
        )}
      </div>
    </>
  );
}
