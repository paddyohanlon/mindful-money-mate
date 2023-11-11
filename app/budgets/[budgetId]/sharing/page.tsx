"use client";

import dynamic from "next/dynamic";
import { useParams } from "next/navigation";

const ShareBudgetButton = dynamic(() => import("../ShareBudgetButton"), {
  ssr: false,
});
const PermissionsModalButton = dynamic(
  () => import("@/app/components/PermissionsModalButton"),
  {
    ssr: false,
  }
);

const SharingPage = () => {
  const params = useParams();

  return (
    <>
      <div className="prose">
        <div className="flex justify-between items-baseline gap-4 px-6 py-2">
          <h1 className="text-2xl">Sharing</h1>
          <PermissionsModalButton budgetId={params.budgetId as string} />
        </div>
      </div>
      <ShareBudgetButton budgetId={params.budgetId as string} />
    </>
  );
};

export default SharingPage;
