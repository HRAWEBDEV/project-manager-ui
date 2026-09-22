"use client";
import { useOrganizationInvitations } from "../hooks/useOrganizations";
import { useShareDictionary } from "@/services/share-dictionary/shareDictionaryContext";
import OrganizationInvitationItem from "./OrganizationInvitationItem";

export default function OrganizationInvitationsList() {
  const {
    shareDictionary: {
      components: { organizationMembers: dic },
    },
  } = useShareDictionary();
  const organizationInvitationsQuery = useOrganizationInvitations({
    enabled: true,
  });
  if (
    organizationInvitationsQuery.isSuccess &&
    organizationInvitationsQuery.data.invitations.length > 0
  ) {
    return (
      <div>
        <h3 className="font-medium mb-4">{dic.pendingInvitation}</h3>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
          {organizationInvitationsQuery.data.invitations.map((invite) => {
            return (
              <OrganizationInvitationItem key={invite.id} invite={invite} />
            );
          })}
        </div>
      </div>
    );
  }
  return null;
}
