import FormControl from "@/app/components/FormControl";
import FormLabel from "@/app/components/FormLabel";
import FormInput from "@/app/components/FormInput";
import FormSelect from "@/app/components/FormSelect";
import FormInputCurrency from "@/app/components/FormInputCurrency";
import { FormEvent, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
} from "@/app/services/bzr";
import useAppStore from "@/app/store";
import { BUDGETS_PATH, createOptionsFromStrEnum } from "@/app/constants";
import { useRouter } from "next/navigation";

interface Props {
  budgetId: string;
}

const NewCategoryForm = ({ budgetId }: Props) => {
  const router = useRouter();

  const nameInputId = "name";
  const groupInputId = "group";
  const balanceInputId = "balance";
  const targetInputId = "target";
  const targetMonthInputId = "targetMonthIndex";
  const targetMonthlyFrequencyInputId = "targetMonthlyFrequency";
  const notesInputId = "notes";

  const setCategory = useAppStore((state) => state.setCategory);
  const setAssignment = useAppStore((state) => state.setAssignment);

  const [startDate, setStartDate] = useState(new Date());

  const [unsavedCategory, setUnsavedCategory] = useState<UnsavedCategory>({
    budgetId,
    name: "",
    group: CategoryGroups.FIXED_COSTS,
    balanceCents: 0,
    notes: "",
    targetCents: 0,
    targetFirstDueDate: 0,
    targetMonthlyFrequency: 1,
  });

  const targetMonthlyFrequencyOptions = Array.from(
    { length: 60 },
    (_, i) => `${i + 1}`
  ).map((value) => {
    return {
      value,
      label: value,
    };
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
          placeholder="e.g. Food"
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor={groupInputId}>Group</FormLabel>
        <FormSelect
          id={groupInputId}
          options={createOptionsFromStrEnum(CategoryGroups)}
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
          inputId={balanceInputId}
          initialAmountCents={unsavedCategory.balanceCents}
          onChange={(value) =>
            setUnsavedCategory({ ...unsavedCategory, balanceCents: value })
          }
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor={targetInputId}>Target Amount</FormLabel>
        <FormInputCurrency
          budgetId={budgetId}
          inputId={targetInputId}
          initialAmountCents={unsavedCategory.targetCents}
          onChange={(value) =>
            setUnsavedCategory({ ...unsavedCategory, targetCents: value })
          }
        />
      </FormControl>
      <FormControl>
        {/* TODO ID */}
        <FormLabel htmlFor={targetMonthInputId}>
          Target (First) Due Date
        </FormLabel>
        <DatePicker
          selected={startDate}
          onChange={(date: Date) => {
            setStartDate(date);
            setUnsavedCategory({
              ...unsavedCategory,
              targetFirstDueDate: date.getTime(),
            });
          }}
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor={targetMonthlyFrequencyInputId}>
          Target Monthly Frequency
        </FormLabel>
        <FormSelect
          id={targetMonthlyFrequencyInputId}
          options={targetMonthlyFrequencyOptions}
          value={unsavedCategory.targetMonthlyFrequency.toString()}
          onChange={(value) => {
            const targetMonthlyFrequency = parseInt(value);
            setUnsavedCategory({ ...unsavedCategory, targetMonthlyFrequency });
          }}
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
