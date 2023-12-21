export function getNextDueDate(
  targetFirstDueDateTimestamp: number,
  targetMonthlyFrequency: number
): number | null {
  if (targetMonthlyFrequency <= 0) {
    console.error("targetMonthlyFrequency must be a positive number.");
    return null;
  }

  const nowTimestamp = new Date().getTime();
  let candidate = new Date(targetFirstDueDateTimestamp);

  const attemptLimit = 100;
  for (let attempts = 0; attempts < attemptLimit; attempts++) {
    if (candidate.getTime() < nowTimestamp) {
      candidate = addMonthsToDate(candidate, targetMonthlyFrequency);
    } else {
      return candidate.getTime();
    }
  }

  console.error(
    `Could not find a next due date within ${attemptLimit} iterations.`
  );
  return null;
}

function addMonthsToDate(originalDate: Date, monthsToAdd: number): Date {
  // Create a new Date object from the original one to avoid mutating it
  let futureDate = new Date(originalDate);

  // Set the month, adding the desired number of months
  futureDate.setMonth(futureDate.getMonth() + monthsToAdd);

  // If the day of the month changes, it means the original date had more days
  // in its month than the resulting month.
  // We adjust by setting the day to the last day of the resulting month.
  if (originalDate.getDate() !== futureDate.getDate()) {
    futureDate.setDate(0);
  }

  return futureDate;
}
