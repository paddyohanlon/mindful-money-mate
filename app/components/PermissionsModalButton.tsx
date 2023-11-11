import {
  PermissionTemplate,
  PermissionType,
} from "@rethinkid/rethinkid-js-sdk/dist/types/types";
import { rid } from "../services/rethinkid";

interface Props {
  budgetId: string;
}

const PermissionsModalButton = ({ budgetId }: Props) => {
  function handleClick() {
    const permissionTemplate: PermissionTemplate = {
      collectionName: "budgets",
      types: [PermissionType.READ],
    };
    rid.permissions.openModal(permissionTemplate);
  }
  return (
    <button className="btn btn-sm btn-neutral" onClick={handleClick}>
      Manage Sharing
    </button>
  );
};

export default PermissionsModalButton;
