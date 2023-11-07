import FormControl from "@/app/components/FormControl";
import FormLabel from "@/app/components/FormLabel";
import FormInput from "@/app/components/FormInput";
import { FormEvent, useState } from "react";
import { Payee, UnsavedPayee } from "@/app/types";
import { payeesCollection } from "@/app/services/rethinkid";
import useAppStore from "@/app/store";
import { BUDGETS_PATH } from "@/app/constants";
import { useRouter } from "next/navigation";

interface Props {
  budgetId: string;
}

const NewPayeeForm = ({ budgetId }: Props) => {
  const router = useRouter();

  const nameInputId = "name";

  const setPayee = useAppStore((state) => state.setPayee);

  const [unsavedPayee, setUnsavedPayee] = useState<UnsavedPayee>({
    budgetId,
    name: "",
  });

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!unsavedPayee.name) {
      console.log("Missing form values. Do not submit");
      return;
    }

    const id = await payeesCollection.insertOne(unsavedPayee);

    const newPayee: Payee = {
      id,
      ...unsavedPayee,
    };

    setPayee(newPayee);

    router.push(`${BUDGETS_PATH}/${budgetId}/payees`);
  }
  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <FormLabel htmlFor={nameInputId}>Name</FormLabel>
        <FormInput
          id={nameInputId}
          value={unsavedPayee.name}
          onChange={(value) =>
            setUnsavedPayee({ ...unsavedPayee, name: value })
          }
        />
      </FormControl>
      <button className="btn btn-primary" type="submit">
        Save
      </button>
    </form>
  );
};

export default NewPayeeForm;
