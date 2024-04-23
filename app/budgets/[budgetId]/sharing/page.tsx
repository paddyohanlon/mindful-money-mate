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

const SharingPage = () => {
  const params = useParams();

  return (
    <>
      {/* bzr.contacts.subscribe */}
      {/* openModal, social, withId??? */}
      {/* openModal, social, get ID from select User in callback */}

      {/* DONE: bzr.permissions.create */}
      {/* DONE: bzr.permissions.list */}
      {/* DONE: bzr.permissions.delete */}

      {/* DONE: bzr.permissions.links.create */}
      {/* DONE: bzr.permissions.links.list */}
      {/* DONE: bzr.permissions.links.delete */}

      {/* bzr.permissions.granted */}
      {/* bzr.permissions.onGranted */}
      {/* bzr.permissions.stopOnGranted */}

      <h1 className="sr-only">Budget Sharing</h1>
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
