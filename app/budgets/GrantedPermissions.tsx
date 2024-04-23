import dynamic from "next/dynamic";
import useAppStore from "../store";
import { getRole } from "./[budgetId]/sharing/getRole";
import { bzr } from "../services/bzr";

const BudgetNameFromFilter = dynamic(
  () => import("@/app/components/BudgetNameFromFilter"),
  {
    ssr: false,
  }
);
const Username = dynamic(() => import("@/app/components/Username"), {
  ssr: false,
});

const BudgetsSharedWithMeList = () => {
  const grantedPermissions = useAppStore((state) => state.grantedPermissions);
  const deleteGrantedPermission = useAppStore(
    (state) => state.deleteGrantedPermission
  );

  function handleDeleteClick(grantedPermissionId: string): void {
    if (!window.confirm("Are you sure?")) return;

    bzr.permissions.granted.delete(grantedPermissionId);
    deleteGrantedPermission(grantedPermissionId);
  }

  return (
    <>
      {grantedPermissions.length > 0 && (
        <div>
          <table className="table">
            <thead>
              <tr>
                <td>Sharer Name</td>
                <td>Budget Name</td>
                <td>Role</td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody>
              {grantedPermissions.map((grantedPermission) => (
                <tr key={grantedPermission.permission.id}>
                  <td>
                    <Username userId={grantedPermission.ownerId} />
                  </td>
                  <td>
                    <BudgetNameFromFilter
                      filter={grantedPermission.permission.filter}
                    />
                  </td>
                  <td>{getRole(grantedPermission.permission.types)}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline btn-error"
                      onClick={() => handleDeleteClick(grantedPermission.id)}
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

export default BudgetsSharedWithMeList;
