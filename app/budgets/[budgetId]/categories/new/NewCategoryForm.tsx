import FormControl from "@/app/components/FormControl";
import FormLabel from "@/app/components/FormLabel";
import FormInput from "@/app/components/FormInput";
import FormSelect from "@/app/components/FormSelect";
import FormInputCurrency from "@/app/components/FormInputCurrency";
import { FormEvent, useState } from "react";
import {
  Assignment,
  Category,
  CategoryGroups,
  UnsavedAssignment,
  UnsavedCategory,
} from "@/app/types";
import {
  assignmentsCollection,
  categoriesCollection,
} from "@/app/services/rethinkid";
import useAppStore from "@/app/store";
import { BUDGETS_PATH } from "@/app/constants";
import { useRouter } from "next/navigation";

interface Props {
  budgetId: string;
}

const NewCategoryForm = ({ budgetId }: Props) => {
  const router = useRouter();

  const nameInputId = "name";
  const groupInputId = "group";
  const balanceInputId = "balance";
  const notesInputId = "notes";

  // const groupOptions = [
  //   { value: FLEXIBLE, label: "Flexible" },
  //   { value: FIXED, label: "Fixed" },
  //   { value: THIS_MONTH_ONLY, label: "This Month Only" },
  //   { value: SAVINGS, label: "Savings" },
  //   { value: SINK_FUNDS, label: "Sink Funds" },
  //   { value: CREDIT_CARD_PAYMENTS, label: "Credit Card Payments" },
  // ];

  const groupOptions = [];

  for (let member in CategoryGroups) {
    const key = member as keyof typeof CategoryGroups;
    groupOptions.push({ value: member, label: CategoryGroups[key] });
  }

  const setCategory = useAppStore((state) => state.setCategory);
  const setAssignment = useAppStore((state) => state.setAssignment);

  const [unsavedCategory, setUnsavedCategory] = useState<UnsavedCategory>({
    budgetId,
    name: "",
    group: CategoryGroups.FIXED_COSTS,
    balanceCents: 0,
    notes: "",
  });

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!unsavedCategory.name) {
      console.log("Missing form values. Do not submit");
      return;
    }

    const id = await categoriesCollection.insertOne(unsavedCategory);

    const newCategory: Category = {
      id,
      ...unsavedCategory,
    };

    setCategory(newCategory);

    // Set Assignment
    const unsavedAssignment: UnsavedAssignment = {
      budgetId,
      categoryId: newCategory.id,
      date: Date.now(),
      amountCents: newCategory.balanceCents,
    };

    const assignmentId = await assignmentsCollection.insertOne(
      unsavedAssignment
    );

    const newAssignment: Assignment = {
      id: assignmentId,
      ...unsavedAssignment,
    };

    setAssignment(newAssignment);

    router.push(`${BUDGETS_PATH}/${budgetId}/categories`);
  }
  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <FormLabel htmlFor={nameInputId}>Name</FormLabel>
        <FormInput
          id={nameInputId}
          value={unsavedCategory.name}
          onChange={(value) =>
            setUnsavedCategory({ ...unsavedCategory, name: value })
          }
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor={groupInputId}>Type</FormLabel>
        <FormSelect
          id={groupInputId}
          options={groupOptions}
          value={unsavedCategory.group}
          onChange={(value) => {
            const group = value as CategoryGroups;
            setUnsavedCategory({ ...unsavedCategory, group });
          }}
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor={balanceInputId}>Balance</FormLabel>
        <FormInputCurrency
          budgetId={budgetId}
          inputId={notesInputId}
          initialAmountCents={unsavedCategory.balanceCents}
          onChange={(value) =>
            setUnsavedCategory({ ...unsavedCategory, balanceCents: value })
          }
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor={notesInputId}>Notes</FormLabel>
        <FormInput
          id={notesInputId}
          value={unsavedCategory.notes}
          onChange={(value) =>
            setUnsavedCategory({ ...unsavedCategory, notes: value })
          }
          required={false}
        />
      </FormControl>
      <button className="btn btn-primary" type="submit">
        Save
      </button>
    </form>
  );
};

export default NewCategoryForm;
