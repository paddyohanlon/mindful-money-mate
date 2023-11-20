"use client";

import { ContainerSmall } from "@/app/components/ContainerSmall";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";

const ShareBudgetForm = dynamic(() => import("./ShareBudgetForm"), {
  ssr: false,
});
const SharedList = dynamic(() => import("./SharedList"), {
  ssr: false,
});
const CreateShareLinkForm = dynamic(() => import("./CreateShareLinkForm"), {
  ssr: false,
});
const ShareLinksList = dynamic(() => import("./ShareLinksList"), {
  ssr: false,
});
const PermissionsModalButton = dynamic(
  () => import("./PermissionsModalButton"),
  {
    ssr: false,
  }
);

const SharingPage = () => {
  const params = useParams();

  return (
    <>
      {/* rid.contacts.subscribe */}
      {/* openModal, social, withId??? */}
      {/* openModal, social, get ID from select User in callback */}

      {/* DONE: rid.permissions.openModal */}

      {/* DONE: rid.permissions.create */}
      {/* DONE: rid.permissions.list */}
      {/* DONE: rid.permissions.delete */}

      {/* DONE: rid.permissions.links.create */}
      {/* DONE: rid.permissions.links.list */}
      {/* DONE: rid.permissions.links.delete */}

      {/* rid.permissions.granted */}
      {/* rid.permissions.onGranted */}
      {/* rid.permissions.stopOnGranted */}

      <h1 className="sr-only">Budget Sharing</h1>
      <PermissionsModalButton budgetId={params.budgetId as string} />
      <div className="grid grid-cols-2 gap-4 pt-8">
        <div>
          <ShareBudgetForm budgetId={params.budgetId as string} />
          <SharedList />
        </div>
        <div>
          <CreateShareLinkForm budgetId={params.budgetId as string} />
          <ShareLinksList />
        </div>
      </div>
    </>
  );
};

export default SharingPage;
