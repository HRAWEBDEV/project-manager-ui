"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useShareDictionary } from "@/services/share-dictionary/shareDictionaryContext";
import { useOrganizationMembers } from "../../../organizations/hooks/useOrganizations";
import { useWorkspaceMembers } from "../hooks/useWorkspaces";
import AddWorkspaceMemberItem from "./AddWorkspaceMemberItem";

export default function AddWorkspaceMemberDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: () => unknown;
}) {
  const workspaceMembersQuery = useWorkspaceMembers();
  const organizationMembersQuery = useOrganizationMembers();
  const {
    shareDictionary: {
      components: { workspaceMembers: dic },
    },
  } = useShareDictionary();

  const availableMembers =
    organizationMembersQuery.data?.members.filter((member) => {
      return workspaceMembersQuery.data?.workspaceMembers.some(
        (item) => item.organizationMemberId !== member.id,
      );
    }) || [];

  function renderContent() {
    if (!workspaceMembersQuery.isSuccess || !organizationMembersQuery.isSuccess)
      return null;
    return (
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
        {availableMembers.map((member) => {
          return (
            <AddWorkspaceMemberItem
              key={member.id}
              member={member}
              onAddSuccess={() => onOpenChange()}
            />
          );
        })}
      </div>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 gap-0 max-h-[80svh] overflow-hidden flex flex-col">
        <DialogHeader className="p-4 border-b border-border relative">
          <DialogTitle>{dic.newMember}</DialogTitle>
          <DialogDescription className="hidden">
            {dic.newMember}
          </DialogDescription>
        </DialogHeader>
        <div className="p-4 overflow-auto">{renderContent()}</div>
      </DialogContent>
    </Dialog>
  );
}
