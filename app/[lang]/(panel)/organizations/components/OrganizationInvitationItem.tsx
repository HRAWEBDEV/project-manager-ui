"use client";
import { type Invitation } from "@/app/[lang]/(panel)/organizations/services/organizationsApiActions";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LiaTimesSolid } from "react-icons/lia";
import { useDeleteUserInvitation } from "../hooks/useOrganizations";
import { Spinner } from "@/components/ui/spinner";

export default function OrganizationInvitationItem({
  invite,
}: {
  invite: Invitation;
}) {
  const confirmDeleteUserInvitation = useDeleteUserInvitation();

  return (
    <div className="relative">
      <div className="absolute top-1 -inset-e-1">
        <Button
          variant="ghost"
          className="text-destructive"
          disabled={confirmDeleteUserInvitation.isPending}
          onClick={() => confirmDeleteUserInvitation.mutate(invite.id)}
        >
          {confirmDeleteUserInvitation.isPending ? (
            <Spinner />
          ) : (
            <LiaTimesSolid />
          )}
        </Button>
      </div>
      <div className="h-auto p-3 w-full text-start justify-items-stretch font-normal gap-3 items-start bg-neutral-100 dark:bg-neutral-900 flex flex-row rounded-md border border-border pe-6">
        <div className="shrink-0">
          <Avatar className="size-12">
            {invite.invitedUserAvatar && (
              <AvatarImage
                src={`${process.env.NEXT_PUBLIC_SERVER_URI}${invite.invitedUserAvatar}`}
                alt="user profile image"
              />
            )}
            <AvatarFallback>{invite.invitedUserFirstName[0]}</AvatarFallback>
          </Avatar>
        </div>
        <div className="grow">
          <h3 className="font-medium text-primary mb-0.5">
            {invite.invitedUsername}
          </h3>
          <p>
            {invite.invitedUserFirstName} {invite.invitedUserLastName}
          </p>
        </div>
      </div>
    </div>
  );
}
