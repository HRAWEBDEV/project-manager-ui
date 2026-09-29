"use client";
import { useState } from "react";
import { type OrganizationMember } from "../services/organizationsApiActions";
import { useDeleteOrganizationMember } from "../hooks/useOrganizations";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaUserTag } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { IoIosWarning } from "react-icons/io";
import { useShareDictionary } from "@/services/share-dictionary/shareDictionaryContext";

export default function OrganizationMemberItem({
  member,
}: {
  member: OrganizationMember;
}) {
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const deleteOrganizationMemberMutation = useDeleteOrganizationMember();
  const {
    shareDictionary: {
      components: { organizationMembers: dic },
    },
  } = useShareDictionary();

  return (
    <div key={member.id} className="relative">
      <div className="absolute top-2 -inset-e-1">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="ghost">
                <IoEllipsisVerticalSharp className="size-5" />
              </Button>
            }
          />
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="h-11">
              <FaUserTag className="size-5" />
              {dic.role}
            </DropdownMenuItem>
            {member.role !== "owner" && (
              <DropdownMenuItem
                variant="destructive"
                className="h-11"
                onClick={() => setConfirmDeleteOpen(true)}
              >
                <FaTrashCan className="size-5" />
                {dic.remove}
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <AlertDialog
          open={confirmDeleteOpen}
          onOpenChange={setConfirmDeleteOpen}
        >
          <AlertDialogContent size="sm">
            <AlertDialogHeader>
              <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                <IoIosWarning />
              </AlertDialogMedia>
              <AlertDialogTitle>
                {dic.removeOrganizationMemberConfirmMessage}
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                disabled={deleteOrganizationMemberMutation.isPending}
                variant="outline"
              >
                {dic.cancel}
              </AlertDialogCancel>
              <AlertDialogAction
                disabled={deleteOrganizationMemberMutation.isPending}
                variant="destructive"
                onClick={() => {
                  deleteOrganizationMemberMutation
                    .mutateAsync(member.id)
                    .then(() => {
                      setConfirmDeleteOpen(false);
                    });
                }}
              >
                {deleteOrganizationMemberMutation.isPending && <Spinner />}
                {dic.confirm}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <Button
        variant="outline"
        className="h-auto p-3 w-full text-start justify-items-stretch font-normal gap-3 items-start bg-neutral-100 dark:bg-neutral-900 pe-6 flex-col"
      >
        <div className="shrink-0">
          <Avatar className="size-14">
            {member.userAvatar && (
              <AvatarImage
                src={`${process.env.NEXT_PUBLIC_SERVER_URI}${member.userAvatar}`}
                alt="user profile image"
              />
            )}
            <AvatarFallback>{member.userFirstName[0]}</AvatarFallback>
          </Avatar>
        </div>
        <div className="grid gap-2">
          <div>
            <span className="text-neutral-600 dark:text-neutral-400">
              {dic.username}:{" "}
            </span>
            <span className="font-medium text-primary">{member.username}</span>
          </div>
          <div>
            <span className="text-neutral-600 dark:text-neutral-400">
              {dic.fullName}:{" "}
            </span>
            <span className="font-medium">
              {member.userFirstName} {member.userLastName}
            </span>
          </div>
          <div>
            <span className="text-neutral-600 dark:text-neutral-400">
              {dic.role}:{" "}
            </span>
            <span className="font-medium">{dic[member.role]}</span>
          </div>
          <div>
            <span className="text-neutral-600 dark:text-neutral-400">
              {dic.invitedBy}:{" "}
            </span>
            <span className="font-medium">
              {member.addedBy
                ? member.addedByFirstName?.concat(
                    " ",
                    member.addedByLastName || "",
                  )
                : "---"}
            </span>
          </div>
        </div>
      </Button>
    </div>
  );
}
