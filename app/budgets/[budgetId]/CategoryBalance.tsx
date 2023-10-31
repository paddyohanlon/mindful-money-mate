import FormInputCurrency from "@/app/components/FormInputCurrency";
import FormLabel from "@/app/components/FormLabel";
import { categoriesCollection } from "@/app/services/rethinkid";
import useAppStore from "@/app/store";
import { Category } from "@/app/types";
import { FormEvent, useState } from "react";

interface Props {
  budgetId: string;
  category: Category;
}

const CategoryBalance = ({ budgetId, category }: Props) => {
  const balanceInputId = "category-balance";

  const [balance, setBalance] = useState(category.balance);

  const { updateCategory } = useAppStore();

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const updatedCategory = {
      ...category,
      balance,
    };
    categoriesCollection.updateOne(category.id, updatedCategory);
    updateCategory(updatedCategory);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <FormLabel htmlFor={balanceInputId} className="sr-only">
          {category.name} Category Balance
        </FormLabel>
        <FormInputCurrency
          budgetId={budgetId}
          inputId={balanceInputId}
          initialAmount={balance}
          onChange={(value) => setBalance(value)}
          isSmall={true}
        />
        <button className="sr-only" type="submit">
          Save
        </button>
      </form>
    </>
  );
};

export default CategoryBalance;
