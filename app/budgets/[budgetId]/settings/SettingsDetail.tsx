import useAppStore from "@/app/store";

interface Props {
  budgetId: string;
}

const SettingsDetail = ({ budgetId }: Props) => {
  const getBudget = useAppStore((state) => state.getBudget);

  return (
    <>
      <ul>
        <li>Name: {getBudget(budgetId).name}</li>
        <li>Currency: {getBudget(budgetId).currency}</li>
        <li>Pay Day: {getBudget(budgetId).payDay}</li>
      </ul>
    </>
  );
};

export default SettingsDetail;
