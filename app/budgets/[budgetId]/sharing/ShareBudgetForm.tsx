import { BUDGETS_COLLECTION_NAME, rid } from "@/app/services/rethinkid";
import { FormEvent, useEffect, useState } from "react";
import FormControl from "@/app/components/FormControl";
import FormLabel from "@/app/components/FormLabel";
import FormSelect from "@/app/components/FormSelect";
import { Option, Roles } from "@/app/types";
import useAppStore from "@/app/store";
import { NewPermission, Permission } from "@rethinkid/rethinkid-js-sdk";
import dynamic from "next/dynamic";
import {
  EDITOR_ROLE_PERMISSION_TYPES,
  VIEWER_ROLE_PERMISSION_TYPES,
  createOptionsFromStrEnum,
} from "@/app/constants";

const SocialModalButton = dynamic(
  () => import("@/app/components/SocialModalButton"),
  {
    ssr: false,
  }
);

interface Props {
  budgetId: string;
}

const ShareBudgetForm = ({ budgetId }: Props) => {
  const contactIdInputId = "contactId";
  const roleIdInputId = "roleId";

  const [contactOptions, setContactOptions] = useState<Option[]>([]);
  const [selectedContactId, setSelectedContactId] = useState("");
  const [selectedRole, setSelectedRole] = useState<Roles>(Roles.VIEWER);

  const contacts = useAppStore((store) => store.contacts);
  const setPermission = useAppStore((store) => store.setPermission);

  useEffect(() => {
    setSelectedContactId(contacts.length > 0 ? contacts[0].user.id : "");

    setContactOptions(
      contacts.map(
        (contact) =>
          ({
            value: contact.user.id,
            label: `${contact.user?.name} - ${
              contact.user?.email || "Not connected"
            }`,
          } as Option)
      )
    );
  }, [contacts]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    let types = VIEWER_ROLE_PERMISSION_TYPES;

    if (selectedRole === Roles.EDITOR) {
      types = EDITOR_ROLE_PERMISSION_TYPES;
    }

    const newPermission: NewPermission = {
      collectionName: BUDGETS_COLLECTION_NAME,
      userId: selectedContactId,
      types,
      filter: {
        id: budgetId,
      },
    };
    const { id } = await rid.permissions.create(newPermission);

    const permission: Permission = {
      id,
      ...newPermission,
    };
    setPermission(permission);
  }

  return (
    <>
      {contacts.length === 0 ? (
        <div className="prose">
          <p>Add a contact to get started.</p>
          <SocialModalButton />
        </div>
      ) : (
        <>
          <h2 className="text-2xl">Share with Contact</h2>
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel htmlFor={contactIdInputId}>Contact</FormLabel>
              <FormSelect
                id={contactIdInputId}
                options={contactOptions}
                onChange={(value) => setSelectedContactId(value)}
              />
            </FormControl>
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
            <button className="btn btn-primary">Share</button>
          </form>
        </>
      )}
    </>
  );
};

export default ShareBudgetForm;
