import FormControl from "@/app/components/FormControl";
import FormLabel from "@/app/components/FormLabel";
import FormSelect from "@/app/components/FormSelect";
import {
  EDITOR_ROLE_PERMISSION_TYPES,
  VIEWER_ROLE_PERMISSION_TYPES,
  createOptionsFromStrEnum,
} from "@/app/constants";
import { BUDGETS_COLLECTION_NAME, rid } from "@/app/services/rethinkid";
import useAppStore from "@/app/store";
import { Option, Roles } from "@/app/types";
import { PermissionTemplate } from "@rethinkid/rethinkid-js-sdk";
import { FormEvent, useState } from "react";

interface Props {
  budgetId: string;
}

const CreateShareLinkForm = ({ budgetId }: Props) => {
  const roleIdInputId = "roleId";
  const limitInputId = "limit";

  const limitOptions: Option[] = [{ value: "0", label: "Unlimited" }];
  const maxLimit = 100;
  for (let i = 1; i <= maxLimit; i++) {
    const value = i.toString();
    limitOptions.push({ value, label: value });
  }

  const [selectedRole, setSelectedRole] = useState<Roles>(Roles.VIEWER);
  const [limitStr, setLimitStr] = useState("");

  const setLink = useAppStore((state) => state.setLink);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    let types = VIEWER_ROLE_PERMISSION_TYPES;

    if (selectedRole === Roles.EDITOR) {
      types = EDITOR_ROLE_PERMISSION_TYPES;
    }

    const permission: PermissionTemplate = {
      collectionName: BUDGETS_COLLECTION_NAME,
      types,
      filter: {
        id: budgetId,
      },
    };

    let limit: number = parseInt(limitStr);
    if (Number.isNaN(limit)) limit = 0;

    const link = await rid.permissions.links.create(permission, limit);
    // setLink(link); no need because handled by subscribe
  }
  return (
    <>
      <h2 className="text-2xl">Create Share Link</h2>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel htmlFor={roleIdInputId}>Role</FormLabel>
          <FormSelect
            id={roleIdInputId}
            options={createOptionsFromStrEnum(Roles)}
            onChange={(value) => {
              const role = value as Roles;
              setSelectedRole(role);
            }}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor={limitInputId}>Redemption Limit</FormLabel>
          <FormSelect
            id={limitInputId}
            options={limitOptions}
            onChange={(value) => setLimitStr(value)}
          />
        </FormControl>
        <button className="btn btn-primary">Create Link</button>
      </form>
    </>
  );
};

export default CreateShareLinkForm;
