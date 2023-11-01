import FormInputCurrency from "@/app/components/FormInputCurrency";
import FormLabel from "@/app/components/FormLabel";
import {
  assignmentsCollection,
  categoriesCollection,
} from "@/app/services/rethinkid";
import useAppStore from "@/app/store";
import { Assignment, Category, UnsavedAssignment } from "@/app/types";
import { FormEvent, useState } from "react";

interface Props {
  budgetId: string;
  category: Category;
}

const CategoryBalance = ({ budgetId, category }: Props) => {
  const balanceInputId = "category-balance";

  const previousBalance = category.balance;

  const [balance, setBalance] = useState(category.balance);

  const { updateCategory, setAssignment } = useAppStore();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const updatedCategory = {
      ...category,
      balance,
    };
    categoriesCollection.updateOne(category.id, updatedCategory);
    updateCategory(updatedCategory);

    // Set assignment
    const unsavedAssignment: UnsavedAssignment = {
      budgetId,
      categoryId: category.id,
      date: Date.now(),
      amount: Number((updatedCategory.balance - previousBalance).toFixed(2)),
    };

    const assignmentId = await assignmentsCollection.insertOne(
      unsavedAssignment
    );

    const newAssignment: Assignment = {
      id: assignmentId,
      ...unsavedAssignment,
    };

    setAssignment(newAssignment);
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="w-32">
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
