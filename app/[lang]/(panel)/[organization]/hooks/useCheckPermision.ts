import { useCallback } from "react";
import { useOrganizationPermissions } from "../../organizations/hooks/useOrganizations";
import { useWorkspacePermissions } from "../workspaces/hooks/useWorkspaces";
import { useOrganizationContext } from "../../services/organization/organizationContext";
import { useWorkspacesContext } from "../services/workspaces/workspacesContext";
import { type Permission } from "../../utils/permissions";

function checkHasPermission(perm: Permission, permissions: Permission[]) {
  return permissions.includes(perm) ? "accept" : "decline";
}

export function useCheckPermission() {
  const { activeOrganization } = useOrganizationContext();
  const { activeWorkspace } = useWorkspacesContext();
  const orgnaizationPermissionsQuery = useOrganizationPermissions({
    enabled: !!activeOrganization,
  });
  const workspacePermissionsQuery = useWorkspacePermissions({
    enabled: !!activeOrganization,
  });
  const checkPermission = useCallback(
    ({
      type,
      perm,
    }: {
      perm: Permission;
      type: "organization" | "workspace" | "organizationAndWorkspace";
    }) => {
      let hasPermission: "accept" | "decline" | "pending" = "pending";
      if (
        !orgnaizationPermissionsQuery.isSuccess ||
        !workspacePermissionsQuery.isSuccess
      )
        return hasPermission;
      const organizationRolePermissions =
        orgnaizationPermissionsQuery.data.permissions[
          activeOrganization.userRole
        ];
      const workspaceRolePermissions =
        workspacePermissionsQuery.data.permissions[
          activeWorkspace.workspaceMemberRole
        ];
      if (type === "organization" || type === "organizationAndWorkspace") {
        hasPermission = checkHasPermission(perm, organizationRolePermissions);
      }
      if (type === "workspace" || type === "organizationAndWorkspace") {
        hasPermission = checkHasPermission(perm, workspaceRolePermissions);
      }
      return hasPermission;
    },
    [
      activeOrganization,
      activeWorkspace,
      orgnaizationPermissionsQuery.data,
      orgnaizationPermissionsQuery.isSuccess,
      workspacePermissionsQuery.data,
      workspacePermissionsQuery.isSuccess,
    ],
  );

  return { checkPermission };
}
