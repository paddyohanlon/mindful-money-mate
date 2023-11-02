import { centsToCurrency, colorCurrencyClass } from "@/app/currency";
import { LOCALE } from "@/app/constants";
import useAppStore from "@/app/store";

interface Props {
  budgetId: string;
  amountCents: number;
}

const FormattedCurrency = ({ budgetId, amountCents }: Props) => {
  const { getBudget } = useAppStore();

  return (
    <>
      <span className={colorCurrencyClass(amountCents)}>
        {!amountCents
          ? "€0.00"
          : centsToCurrency(amountCents).toLocaleString(LOCALE, {
              style: "currency",
              currency: getBudget(budgetId).currency,
            })}
      </span>
    </>
  );
};

export default FormattedCurrency;
