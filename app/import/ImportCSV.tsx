import { FormEvent, useEffect, useState } from "react";
import Papa from "papaparse";
import FormControl from "../components/FormControl";
import FormLabel from "../components/FormLabel";
import { CSVRow, Option } from "../types";
import { importPayee } from "./importPayee";
import { importAccount } from "./importAccount";
import { importCategory } from "./importCategory";
import useAppStore from "../store";
import dynamic from "next/dynamic";
import FormSelect from "../components/FormSelect";

const AddSampleBudgetButton = dynamic(() => import("./AddSampleBudgetButton"), {
  ssr: false,
});

const ImportCSV = () => {
  const budgetInputId = "budget";
  const csvInputId = "csv";

  const budgets = useAppStore((state) => state.budgets);

  const [budgetId, setBudgetId] = useState("");
  const [budgetOptions, setBudgetOptions] = useState<Option[]>([]);

  useEffect(() => {
    if (budgets.length > 0) {
      setBudgetId(budgets[0].id);
    }
    setBudgetOptions(
      budgets.map((budget) => ({ value: budget.id, label: budget.name }))
    );
  }, [budgets]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const csv = formData.get(csvInputId);

    if (csv instanceof File) {
      Papa.parse(csv, {
        header: true,
        skipEmptyLines: true,
        complete: handleParsedCSV,
        error: function (error) {
          console.error("Error:", error);
        },
      });
    }

    function handleParsedCSV(results: any) {
      if (!results.data) return;

      for (const row of results.data) {
        const csvRow = row as CSVRow;
        importPayee(budgetId, csvRow);
        importAccount(budgetId, csvRow);
        importCategory(budgetId, csvRow);

        location.reload();
      }
    }
  }

  return (
    <>
      {budgets.length === 0 ? (
        <div className="prose">
          <p>Create a budget before importing.</p>
          <AddSampleBudgetButton />
        </div>
      ) : (
        <form method="post" onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel htmlFor={budgetInputId}>Budget</FormLabel>
            <FormSelect
              id={budgetInputId}
              options={budgetOptions}
              value={budgetId}
              onChange={(value) => setBudgetId(value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor={csvInputId}>Upload CSV</FormLabel>
            <input
              name={csvInputId}
              id={csvInputId}
              type="file"
              className="file-input file-input-bordered file-input-primary w-full max-w-xs"
              accept=".csv"
            />
          </FormControl>
          <button className="btn btn-primary btn-outline" type="submit">
            Upload CSV and Import Data
          </button>
        </form>
      )}
    </>
  );
};

export default ImportCSV;
