import useAppStore from "@/app/store";
import { getRole } from "./getRole";
import { rid } from "@/app/services/rethinkid";
import dynamic from "next/dynamic";

const BudgetNameFromFilter = dynamic(
  () => import("@/app/components/BudgetNameFromFilter"),
  {
    ssr: false,
  }
);
const Username = dynamic(() => import("@/app/components/Username"), {
  ssr: false,
});

const ShareLinksList = () => {
  const links = useAppStore((store) => store.links);
  const deleteLink = useAppStore((store) => store.deleteLink);

  function handleDeleteClick(linkId: string): void {
    if (!window.confirm("Are you sure?")) return;
    rid.permissions.links.delete(linkId);
    deleteLink(linkId);
  }

  return (
    <>
      {links.length > 0 && (
        <div className="pt-12">
          <h3>Links list</h3>
          <table className="table">
            <thead>
              <tr>
                <th>URL</th>
                <th>Redeemed/Limit</th>
                <th>Users</th>
                <th>Budget</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {links.map((l) => (
                <tr key={l.id}>
                  <td>{l.url}</td>
                  <td>{`${l.users.length}/${l.limit}` || "Unlimited"}</td>
                  <td>
                    <ul className="list-disc">
                      {l.users.map((userId) => (
                        <li key={userId}>
                          <Username userId={userId} />
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <BudgetNameFromFilter filter={l.permission.filter} />
                  </td>
                  <td>{getRole(l.permission.types)}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline btn-error"
                      onClick={() => handleDeleteClick(l.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default ShareLinksList;
