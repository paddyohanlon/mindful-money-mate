import { centsToCurrency, colorCurrencyClass } from "@/app/currency";
import { LOCALE } from "@/app/constants";
import useAppStore from "@/app/store";

interface Props {
  budgetId: string;
  amountCents: number;
  isColored?: boolean;
}

const FormattedCurrency = ({
  budgetId,
  amountCents,
  isColored = false,
}: Props) => {
  const getBudget = useAppStore((state) => state.getBudget);

  return (
    <>
      <span className={isColored ? colorCurrencyClass(amountCents) : ""}>
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
