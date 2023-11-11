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
        <div className="prose">
          <h2>CSV Headings</h2>
          <ul>
            <li>
              <b>Categories:</b> Category Name, Category Group (Values: Fixed
              Costs Guilt-Free Spending Savings Investments Credit Card
              Payments), Category Balance, Category Notes.
            </li>
            <li>
              <b>Account:</b> Account Name, Account Type (Values: Checking,
              Savings, Cash, Credit), Balance (without currency symbol).
            </li>
            <li>
              <b>Payees:</b> Payee Name.
            </li>
          </ul>
        </div>
      </ContainerSmall>
    </>
  );
};

export default ImportPage;
