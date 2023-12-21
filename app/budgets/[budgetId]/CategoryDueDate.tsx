import { Category } from "@/app/types";
import { getNextDueDate } from "./categoryTargets";
import FormattedCurrency from "./FormattedCurrency";
import { budgetId } from "@/app/sampleData";
import { MONTH_NAMES } from "@/app/constants";

interface Props {
  category: Category;
}

const CategoryDueDate = ({
  category: {
    targetFirstDueDate,
    targetMonthlyFrequency,
    balanceCents,
    targetCents,
  },
}: Props) => {
  const nextDueDate = getNextDueDate(
    targetFirstDueDate,
    targetMonthlyFrequency
  );

  function monthlyTargetAmountRemainder(): number {
    if (!nextDueDate) return 0;

    const targetBalance = targetCents - balanceCents;

    const monthsTillDue = getFullMonthsBetweenDates(
      new Date(),
      new Date(nextDueDate)
    );

    return targetBalance / monthsTillDue;
  }

  const nth = (d: number) => {
    if (d > 3 && d < 21) return "th";
    switch (d % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  function getFullMonthsBetweenDates(startDate: Date, endDate: Date): number {
    // Extract year and month from both dates
    const startYear = startDate.getFullYear();
    const startMonth = startDate.getMonth();
    const endYear = endDate.getFullYear();
    const endMonth = endDate.getMonth();

    // Calculate the difference in months
    let months = (endYear - startYear) * 12 + (endMonth - startMonth + 1); // +1 seems right

    // Adjust if the end date's day is before the start date's day
    if (endDate.getDate() < startDate.getDate()) {
      months--;
    }

    return months;
  }

  function nextDueDateOrdinal() {
    if (!nextDueDate) return "";
    const dateDate = new Date(nextDueDate).getDate();
    return `${dateDate}${nth(dateDate)}`;
  }

  function nextDueDateFull() {
    if (!nextDueDate) return "";

    const date = new Date(nextDueDate);

    return `${nextDueDateOrdinal()} ${
      MONTH_NAMES[date.getMonth()]
    } ${date.getFullYear()}`;
  }

  return (
    <>
      <div>
        Due:&nbsp;
        {nextDueDate && targetMonthlyFrequency > 1
          ? nextDueDateFull()
          : nextDueDateOrdinal()}
      </div>
      <div>
        Target:{" "}
        <FormattedCurrency budgetId={budgetId} amountCents={targetCents} />
      </div>
      {targetMonthlyFrequency > 1 && (
        <div>
          Monthly target:&nbsp;
          <FormattedCurrency
            budgetId={budgetId}
            amountCents={monthlyTargetAmountRemainder()}
          />
        </div>
      )}
      {targetMonthlyFrequency > 1 && (
        <div>{targetMonthlyFrequency} monthly</div>
      )}
    </>
  );
};

export default CategoryDueDate;
