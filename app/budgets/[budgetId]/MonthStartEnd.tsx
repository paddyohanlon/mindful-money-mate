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
    const currentDate = now.getDate(); // 0-based Sunday
    const currentMonthIndex = now.getMonth(); // 0-based January

    let startMonthIndex = currentMonthIndex;
    // Use previous month
    if (currentDate < budget.payDay) {
      startMonthIndex = currentMonthIndex === 0 ? 11 : startMonthIndex - 1;
    }

    const endMonthIndex = startMonthIndex === 11 ? 0 : startMonthIndex + 1;

    setStartMonth(getMonthStr(startMonthIndex));
    setEndMonth(getMonthStr(endMonthIndex));
  }, [budget.payDay]);

  function getMonthStr(zeroBasedMonthIndex: number) {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    return monthNames[zeroBasedMonthIndex];
  }

  return (
    <>
      {budget.payDay} {startMonth}-{budget.payDay} {endMonth}
    </>
  );
};

export default MonthStartEnd;
