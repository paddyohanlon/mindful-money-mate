import { MONTH_NAMES } from "@/app/constants";
import useAppStore from "@/app/store";
import { useEffect, useState } from "react";

interface Props {
  budgetId: string;
}

const MonthStartEnd = ({ budgetId }: Props) => {
  const budget = useAppStore((state) => state.getBudget(budgetId));

  const [startMonth, setStartMonth] = useState("");
  const [endMonth, setEndMonth] = useState("");

  useEffect(() => {
    // Month
    const now = new Date();
    const currentDate = now.getDate(); // 0-based
    const currentMonthIndex = now.getMonth(); // 0-based

    let startMonthIndex = currentMonthIndex;
    // Use previous month
    if (currentDate < budget.payDay) {
      startMonthIndex = currentMonthIndex === 0 ? 11 : startMonthIndex - 1;
    }

    const endMonthIndex = startMonthIndex === 11 ? 0 : startMonthIndex + 1;

    setStartMonth(MONTH_NAMES[startMonthIndex]);
    setEndMonth(MONTH_NAMES[endMonthIndex]);
  }, [budget.payDay]);

  return (
    <>
      {budget.payDay} {startMonth}-{budget.payDay} {endMonth}
    </>
  );
};

export default MonthStartEnd;
