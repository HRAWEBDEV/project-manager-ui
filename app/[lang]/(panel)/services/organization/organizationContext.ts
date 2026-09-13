import { use, createContext } from "react";
import { OutOfContext } from "@/utils/OutOfContext";
import { useUserOrganizations } from "@/app/[lang]/(panel)/users/hooks/useUsers";
import { type Organization } from "../../organizations/services/organizationsApiActions";

interface OrganizationContextProps {
  userOrganizationsQuery: ReturnType<typeof useUserOrganizations>;
  activeOrganization: Organization;
}

const OrganizationContext = createContext<OrganizationContextProps | null>(
  null,
);

function useOrganizationContext() {
  const val = use(OrganizationContext);
  if (!val) throw new OutOfContext("OrganizationContext");
  return val;
}

export type { OrganizationContextProps };
export { OrganizationContext, useOrganizationContext };
