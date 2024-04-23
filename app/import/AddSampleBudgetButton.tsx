import { SAMPLE_BUDGET } from "../sampleData";
import { budgetsCollection } from "../services/bzr";
import useAppStore from "../store";

const AddSampleBudgetButton = () => {
  const setBudget = useAppStore((state) => state.setBudget);

  function handleClick() {
    budgetsCollection.insertOne(SAMPLE_BUDGET);
    setBudget(SAMPLE_BUDGET);
  }

  return (
    <button
      onClick={handleClick}
      className="btn btn-neutral btn-outline btn-sm"
    >
      Add Sample Budget
    </button>
  );
};

export default AddSampleBudgetButton;
