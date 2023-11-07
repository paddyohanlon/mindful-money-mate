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
  category: Category;
}

const CategoryBalance = ({ category }: Props) => {
  const balanceInputId = "category-balance";

  const updateCategory = useAppStore((state) => state.updateCategory);
  const setAssignment = useAppStore((state) => state.setAssignment);

  const [updatedCategory, setUpdatedCategory] = useState<Category>(category);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    categoriesCollection.updateOne(category.id, updatedCategory);
    updateCategory(updatedCategory);

    // Set assignment
    const unsavedAssignment: UnsavedAssignment = {
      budgetId: category.budgetId,
      categoryId: category.id,
      date: Date.now(),
      amountCents: updatedCategory.balanceCents - category.balanceCents,
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
          budgetId={category.budgetId}
          inputId={balanceInputId}
          initialAmountCents={category.balanceCents}
          onChange={(value) =>
            setUpdatedCategory({ ...updatedCategory, balanceCents: value })
          }
          isSmall={true}
          isColored={true}
        />
        <button className="sr-only" type="submit">
          Save
        </button>
      </form>
    </>
  );
};

export default CategoryBalance;
