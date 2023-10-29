import FormControl from "@/app/components/FormControl";
import FormLabel from "@/app/components/FormLabel";
import FormInput from "@/app/components/FormInput";
import FormSelect from "@/app/components/FormSelect";
import { FormEvent, useState } from "react";
import { Category } from "@/app/types";
import { categoriesCollection } from "@/app/services/rethinkid";
import useAppStore from "@/app/store";
import {
  BUDGETS_PATH,
  CREDIT_CARD_PAYMENTS,
  FIXED,
  FLEXIBLE,
  SAVINGS,
  SINK_FUNDS,
  THIS_MONTH_ONLY,
} from "@/app/constants";
import { useRouter } from "next/navigation";

interface Props {
  budgetId: string;
}

type UnsavedCategory = Omit<Category, "id">;

const NewCategoryForm = ({ budgetId }: Props) => {
  const router = useRouter();

  const nameInputId = "name";
  const groupInputId = "group";
  const balanceInputId = "balance";

  const groupOptions = [
    { value: FLEXIBLE, label: "Flexible" },
    { value: FIXED, label: "Fixed" },
    { value: THIS_MONTH_ONLY, label: "This Month Only" },
    { value: SAVINGS, label: "Savings" },
    { value: SINK_FUNDS, label: "Sink Funds" },
    { value: CREDIT_CARD_PAYMENTS, label: "Credit Card Payments" },
  ];

  const { setCategory } = useAppStore();

  const [unsavedCategory, setUnsavedCategory] = useState<UnsavedCategory>({
    budgetId,
    name: "",
    group: FLEXIBLE,
    balance: 0,
  });

  const [balanceStr, setBalanceStr] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!unsavedCategory.name) {
      console.log("Missing form values. Do not submit");
      return;
    }

    unsavedCategory.balance = parseFloat(balanceStr);

    const id = await categoriesCollection.insertOne(unsavedCategory);

    const newCategory: Category = {
      id,
      ...unsavedCategory,
    };

    setCategory(newCategory);

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
          onChange={(value) =>
            setUnsavedCategory({ ...unsavedCategory, group: value })
          }
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor={balanceInputId}>Balance</FormLabel>
        <FormInput
          id={balanceInputId}
          value={balanceStr}
          onChange={(value) => setBalanceStr(value)}
        />
      </FormControl>
      <button className="btn btn-primary" type="submit">
        Save
      </button>
    </form>
  );
};

export default NewCategoryForm;
