import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import useAppStore from "@/app/store";
import { accountsCollection } from "@/app/services/bzr";
import { BUDGETS_PATH } from "@/app/constants";

interface Props {
  children: ReactNode;
  budgetId: string;
  accountId: string;
}

const DeleteAccountButton = ({ children, budgetId, accountId }: Props) => {
  const router = useRouter();

  const deleteAccount = useAppStore((state) => state.deleteAccount);

  async function handleClick() {
    if (!window.confirm("You sure?")) return;

    accountsCollection.deleteOne(accountId);
    deleteAccount(accountId);
    router.push(`${BUDGETS_PATH}/${budgetId}`);
  }

  return (
    <button
      className="btn btn-sm btn-outline btn-error"
      onClick={() => handleClick()}
    >
      {children}
    </button>
  );
};

export default DeleteAccountButton;
