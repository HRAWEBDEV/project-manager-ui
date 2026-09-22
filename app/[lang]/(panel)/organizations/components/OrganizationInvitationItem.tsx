"use client";
import { type Invitation } from "@/app/[lang]/(panel)/organizations/services/organizationsApiActions";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LiaTimesSolid } from "react-icons/lia";
import { useDeleteUserInvitation } from "../hooks/useOrganizations";
import { Spinner } from "@/components/ui/spinner";
import { useShareDictionary } from "@/services/share-dictionary/shareDictionaryContext";

export default function OrganizationInvitationItem({
  invite,
}: {
  invite: Invitation;
}) {
  const confirmDeleteUserInvitation = useDeleteUserInvitation();
  const {
    shareDictionary: {
      components: { organizationMembers: dic },
    },
  } = useShareDictionary();

  return (
    <div className="relative">
      <div className="absolute top-2 -inset-e-1">
        <Button
          variant="ghost"
          className="text-destructive"
          disabled={confirmDeleteUserInvitation.isPending}
          onClick={() => confirmDeleteUserInvitation.mutate(invite.id)}
        >
          {confirmDeleteUserInvitation.isPending ? (
            <Spinner />
          ) : (
            <LiaTimesSolid className="size-5" />
          )}
        </Button>
      </div>
      <div className="h-auto p-3 w-full text-start justify-items-stretch font-normal gap-3 items-start bg-neutral-100 dark:bg-neutral-900 flex flex-col rounded-md border border-border pe-6">
        <div className="shrink-0">
          <Avatar className="size-14">
            {invite.invitedUserAvatar && (
              <AvatarImage
                src={`${process.env.NEXT_PUBLIC_SERVER_URI}${invite.invitedUserAvatar}`}
                alt="user profile image"
              />
            )}
            <AvatarFallback>{invite.invitedUserFirstName[0]}</AvatarFallback>
          </Avatar>
        </div>
        <div className="grid gap-2">
          <div>
            <span className="text-neutral-600 dark:text-neutral-400">
              {dic.username}:{" "}
            </span>
            <span className="font-medium text-primary">
              {invite.invitedUsername}
            </span>
          </div>
          <div>
            <span className="text-neutral-600 dark:text-neutral-400">
              {dic.fullName}:{" "}
            </span>
            <span className="font-medium">
              {invite.invitedUserFirstName} {invite.invitedUserLastName}
            </span>
          </div>
          <div>
            <span className="text-neutral-600 dark:text-neutral-400">
              {dic.invitedBy}:{" "}
            </span>
            <span className="font-medium">
              {invite.userFirstName} {invite.userLastName}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
