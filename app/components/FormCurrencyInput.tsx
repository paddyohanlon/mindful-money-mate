import { useEffect, useState } from "react";
import FormInput from "./FormInput";
import useAppStore from "../store";
import { EUR, USD } from "../constants";
import Alert from "./Alert";

interface Props {
  budgetId: string;
  inputId: string;
  amount: number;
  onChange: (value: number) => void;
}

const FormCurrencyInput = ({ budgetId, inputId, amount, onChange }: Props) => {
  const [currencySymbol, setCurrencySymbol] = useState("€");
  const [amountStr, setAmountStr] = useState(amount.toString());
  const [amountError, setAmountError] = useState("");

  const budget = useAppStore((state) => state.getBudget(budgetId));

  useEffect(() => {
    const currency = budget.currency;

    switch (currency) {
      case EUR:
        setCurrencySymbol("€");
        break;
      case USD:
        setCurrencySymbol("$");
    }
  }, [budget, budgetId]);

  function onChangeAmount(value: string) {
    setAmountError("");

    console.log(
      "onChangeAmount fired in FormCurrencyInput: value",
      typeof value,
      value
    );

    value = value || "0";

    const float = parseFloat(value);

    const amountStr = float.toFixed(2);

    const amount = Number(amountStr);

    setAmountStr(amountStr);

    if (Number.isNaN(amount)) {
      console.log("NaN")!;
      setAmountError("Balance must be a number!");
      return;
    }

    console.log("amount:", typeof amount, amount);

    onChange(amount);
  }

  return (
    <>
      {amountError && <Alert>{amountError}</Alert>}
      <div className="relative">
        <div role="presentation" className="absolute top-0.5 left-4 text-lg">
          {currencySymbol}
        </div>
        <FormInput
          id={inputId}
          className={`input-sm pl-8 ${
            parseFloat(amountStr) < 0 && "text-red-500"
          }`}
          value={amountStr}
          onChange={onChangeAmount}
        />
      </div>
    </>
  );
};

export default FormCurrencyInput;
