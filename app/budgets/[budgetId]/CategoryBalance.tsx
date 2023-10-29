import FormControl from "@/app/components/FormControl";
import FormInput from "@/app/components/FormInput";
import FormLabel from "@/app/components/FormLabel";
import { EUR, USD } from "@/app/constants";
import { categoriesCollection } from "@/app/services/rethinkid";
import useAppStore from "@/app/store";
import { Category } from "@/app/types";
import { FormEvent, useEffect, useState } from "react";

interface Props {
  budgetId: string;
  category: Category;
}

const CategoryBalance = ({ budgetId, category }: Props) => {
  const balanceInputId = "category-balance";

  const [unsavedBalance, setUnsavedBalance] = useState(
    category.balance.toString()
  );

  const [currencySymbol, setCurrencySymbol] = useState("€");

  const { updateCategory, getBudget } = useAppStore();

  useEffect(() => {
    const currency = getBudget(budgetId).currency;

    switch (currency) {
      case EUR:
        setCurrencySymbol("€");
        break;
      case USD:
        setCurrencySymbol("$");
    }
  }, [getBudget, budgetId]);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const updatedCategory = {
      ...category,
      balance: parseFloat(unsavedBalance),
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
        <div className="relative">
          <div role="presentation" className="absolute top-0.5 left-4 text-lg">
            {currencySymbol}
          </div>
          <FormInput
            id={balanceInputId}
            className="input-sm pl-8"
            value={unsavedBalance}
            onChange={(value) => setUnsavedBalance(value)}
          />
        </div>

        <button className="sr-only" type="submit">
          Save
        </button>
      </form>
    </>
  );
};

export default CategoryBalance;
