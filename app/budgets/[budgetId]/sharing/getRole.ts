import { EDITOR_ROLE_PERMISSION_TYPES } from "@/app/constants";
import { Roles } from "@/app/types";
import { PermissionType } from "@bzr/bazaar";

export function getRole(types: PermissionType[]): string {
  function isRole(
    roleTypes: PermissionType[],
    permissionTypes: PermissionType[]
  ): boolean {
    if (roleTypes.length !== permissionTypes.length) return false;
    return permissionTypes.reduce(
      (possiblyIsRole, permissionType) =>
        possiblyIsRole && roleTypes.includes(permissionType),
      true
    );
  }

  let role: Roles = Roles.VIEWER;

  if (isRole(EDITOR_ROLE_PERMISSION_TYPES, types)) {
    role = Roles.EDITOR;
  }

  return role;
}
