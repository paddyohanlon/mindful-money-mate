import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import useAppStore from "@/app/store";
import { categoriesCollection } from "@/app/services/rethinkid";
import { BUDGETS_PATH } from "@/app/constants";

interface Props {
  children: ReactNode;
  budgetId: string;
  categoryId: string;
}

const DeleteCategoryButton = ({ children, budgetId, categoryId }: Props) => {
  const router = useRouter();

  const deleteCategory = useAppStore((state) => state.deleteCategory);

  async function handleClick() {
    if (!window.confirm("You sure?")) return;

    categoriesCollection.deleteOne(categoryId);
    deleteCategory(categoryId);
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

export default DeleteCategoryButton;
