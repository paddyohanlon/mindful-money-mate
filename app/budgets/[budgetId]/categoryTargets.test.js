import { getNextDueDate } from "./categoryTargets";

test("past target start date", () => {
  const targetFirstDueDate = new Date("Jun 10, 2022").getTime();
  const targetMonthlyFrequency = 3;

  expect(getNextDueDate(targetFirstDueDate, targetMonthlyFrequency)).toBe(
    new Date("Mar 10, 2024").getTime()
  );
});

test("future target start date", () => {
  const targetFirstDueDate = new Date("Jan 10, 2030").getTime();
  const targetMonthlyFrequency = 3;

  expect(getNextDueDate(targetFirstDueDate, targetMonthlyFrequency)).toBe(
    new Date("Jan 10, 2030").getTime()
  );
});

test("big monthly frequency", () => {
  const targetFirstDueDate = new Date("Nov 30, 2023").getTime();
  const targetMonthlyFrequency = 48;

  expect(getNextDueDate(targetFirstDueDate, targetMonthlyFrequency)).toBe(
    new Date("Nov 30, 2027").getTime()
  );
});

test("big different end of month dates", () => {
  const targetFirstDueDate = new Date("Oct 31, 2023").getTime();
  const targetMonthlyFrequency = 20;

  expect(getNextDueDate(targetFirstDueDate, targetMonthlyFrequency)).toBe(
    new Date("Jun 30, 2025").getTime()
  );
});
