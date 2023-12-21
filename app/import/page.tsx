"use client";

import dynamic from "next/dynamic";
import { ContainerSmall } from "../components/ContainerSmall";

const ImportCSV = dynamic(() => import("@/app/import/ImportCSV"), {
  ssr: false,
});
const StartFreshButton = dynamic(
  () => import("@/app/import/StartFreshButton"),
  {
    ssr: false,
  }
);
const PopulateDataButton = dynamic(
  () => import("@/app/import/PopulateDataButton"),
  {
    ssr: false,
  }
);

const ImportPage = () => {
  return (
    <>
      <ContainerSmall>
        <div className="prose pb-8">
          <h1>Import Data</h1>
        </div>
        <ImportCSV />
        <div className="flex justify-between items-baseline gap-4 py-16">
          <PopulateDataButton />
          <StartFreshButton />
        </div>
        <div className="prose pb-20">
          <h2>CSV Headings</h2>
          <p>
            The idea is to upload up to three separate CSV files for payees,
            accounts, and categories.
          </p>
          <ul>
            {/* See the CSVRow type for row names */}
            <li>Payee Name</li>
            <li>Account Name</li>
            <li>Account Type</li>
            <li>Account Balance</li>
            <li>Category Name</li>
            <li>Category Group</li>
            <li>Category Balance</li>
            <li>Category Notes</li>
            <li>Category Target</li>
            <li>Category Target First Due Date</li>
            <li>Category Target Monthly Frequency</li>
          </ul>
        </div>
      </ContainerSmall>
    </>
  );
};

export default ImportPage;
