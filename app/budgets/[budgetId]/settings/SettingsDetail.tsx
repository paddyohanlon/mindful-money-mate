import useAppStore from "@/app/store";

interface Props {
  budgetId: string;
}

const SettingsDetail = ({ budgetId }: Props) => {
  const budget = useAppStore((state) => state.getBudget(budgetId));

  return (
    <>
      <ul>
        <li>Name: {budget.name}</li>
        <li>Currency: {budget.currency}</li>
        <li>Pay Day: {budget.payDay}</li>
      </ul>
    </>
  );
};

export default SettingsDetail;
