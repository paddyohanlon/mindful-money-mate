import { LOCALE } from "@/app/constants";
import useAppStore from "@/app/store";

interface Props {
  budgetId: string;
  amount: number;
}

const FormattedCurrency = ({ budgetId, amount }: Props) => {
  const { getBudget } = useAppStore();
  return (
    <>
      {amount.toLocaleString(LOCALE, {
        style: "currency",
        currency: getBudget(budgetId).currency,
      })}
    </>
  );
};

export default FormattedCurrency;
