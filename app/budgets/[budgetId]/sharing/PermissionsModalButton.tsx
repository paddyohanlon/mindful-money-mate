import { PermissionType } from "@rethinkid/rethinkid-js-sdk";
import type { PermissionTemplate } from "@rethinkid/rethinkid-js-sdk";
import { BUDGETS_COLLECTION_NAME, rid } from "../../../services/rethinkid";

interface Props {
  budgetId: string;
}

const PermissionsModalButton = ({ budgetId }: Props) => {
  function handleClick() {
    const permissionTemplate: PermissionTemplate = {
      collectionName: BUDGETS_COLLECTION_NAME,
      types: [PermissionType.READ],
      filter: {
        id: budgetId,
      },
    };
    rid.permissions.openModal(permissionTemplate);
  }
  return (
    <button className="btn btn-sm btn-neutral" onClick={handleClick}>
      Share via Modal
    </button>
  );
};

export default PermissionsModalButton;
