import { rid } from "@/app/services/rethinkid";
import useAppStore from "@/app/store";
import dynamic from "next/dynamic";
import { getRole } from "./getRole";

const BudgetNameFromFilter = dynamic(
  () => import("@/app/components/BudgetNameFromFilter"),
  {
    ssr: false,
  }
);
const Username = dynamic(() => import("@/app/components/Username"), {
  ssr: false,
});

const SharedList = () => {
  const permissions = useAppStore((store) => store.permissions);

  const deletePermission = useAppStore((store) => store.deletePermission);

  function handleDeleteClick(permissionId: string): void {
    if (!window.confirm("Are you sure?")) return;

    rid.permissions.delete(permissionId);
    deletePermission(permissionId);
  }

  return (
    <>
      {permissions.length > 0 && (
        <div className="pt-12">
          <h3>People with Access</h3>
          <table className="table">
            <thead>
              <tr>
                <td>User</td>
                <td>Budget</td>
                <td>Role</td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody>
              {permissions.map((p) => (
                <tr key={p.id}>
                  <td>
                    <Username userId={p.userId} />
                  </td>
                  <td>
                    <BudgetNameFromFilter filter={p.filter} />
                  </td>
                  <td>{getRole(p.types)}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline btn-error"
                      onClick={() => handleDeleteClick(p.id)}
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

export default SharedList;
