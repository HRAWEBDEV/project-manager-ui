"use client";
import { type WorkspaceMember } from "../services/workspacesApiActions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoKey } from "react-icons/io5";
import { FaTrashCan } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { useShareDictionary } from "@/services/share-dictionary/shareDictionaryContext";

export default function WorkspaceMemberItem({
  member,
}: {
  member: WorkspaceMember;
}) {
  const {
    shareDictionary: {
      components: { workspaceMembers: dic },
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
              <IoKey className="size-5" />
              {dic.accessibility}
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive" className="h-11">
              <FaTrashCan className="size-5" />
              {dic.remove}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
