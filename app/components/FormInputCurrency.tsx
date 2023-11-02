import { ChangeEvent, useEffect, useState } from "react";
import useAppStore from "../store";
import { EUR, USD } from "../constants";
import Alert from "./Alert";

interface Props {
  budgetId: string;
  inputId: string;
  initialAmount: number;
  className?: string;
  isSmall?: boolean;
  onChange: (value: number) => void;
}

const FormInputCurrency = ({
  budgetId,
  inputId,
  initialAmount,
  className = "",
  isSmall = false,
  onChange,
}: Props) => {
  const [amountStr, setAmountStr] = useState(initialAmount.toString());
  const [amountError, setAmountError] = useState("");
  const [currencySymbol, setCurrencySymbol] = useState("€");

  const budget = useAppStore((state) => state.getBudget(budgetId));

  useEffect(() => {
    switch (budget.currency) {
      case EUR:
        setCurrencySymbol("€");
        break;
      case USD:
        setCurrencySymbol("$");
    }
  }, [budget]);

  function onChangeAmount(event: ChangeEvent<HTMLInputElement>) {
    setAmountError("");

    let value = event.target.value;

    // Allow empty value to clear the input
    if (value === "") {
      setAmountStr(value);
      return;
    }

    // Check if the value matches the allowed pattern (number with up to two decimal places)
    const isValueValid = /^(\d+\.?\d{0,2}|\.\d{1,2})$/.test(value);

    if (!isValueValid) return;

    setAmountStr(value);

    // If the value is a valid number, also call the onChange prop
    const amount = parseFloat(value);

    if (isNaN(amount)) return;
    const max = 100000;
    if (amount > 100000) {
      setAmountError(`Enter a value less than ${max}`);
      return;
    }

    onChange(amount);
  }

  return (
    <>
      <div className="relative">
        <div
          role="presentation"
          className={`absolute left-4 text-lg ${
            isSmall ? "top-0.5" : "top-2.5"
          }`}
        >
          {currencySymbol}
        </div>
        <input
          id={inputId}
          className={`input ${
            isSmall && "input-sm"
          } input-bordered w-full pl-8 ${className} ${
            parseFloat(amountStr) < 0 && "text-red-500"
          }`}
          value={amountStr}
          onChange={onChangeAmount}
          type="number"
          required={true}
          max="100000"
          step="0.01"
        />
      </div>
      {amountError && <Alert className="mt-2">{amountError}</Alert>}
    </>
  );
};

export default FormInputCurrency;
