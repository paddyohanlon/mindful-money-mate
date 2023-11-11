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
        <div className="flex justify-between items-baseline gap-4 py-2">
          <h1 className="text-2xl">Import Data</h1>
          <div>
            <PopulateDataButton />
            <StartFreshButton />
          </div>
        </div>
        <ImportCSV />
      </ContainerSmall>
    </>
  );
};

export default ImportPage;
