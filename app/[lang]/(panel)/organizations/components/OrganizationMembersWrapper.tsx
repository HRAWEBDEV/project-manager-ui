"use client";
import { useState } from "react";
import { useOrganizationMembers } from "@/app/[lang]/(panel)/organizations/hooks/useOrganizations";
import { Field } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { FaPlus, FaSearch } from "react-icons/fa";
import { useShareDictionary } from "@/services/share-dictionary/shareDictionaryContext";
import LinearLoading from "@/components/LinearLoading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import NoItemFound from "../../components/NoItemFound";
import SomethingWentWrong from "../../components/SomethingWentWrong";
import { Button } from "@/components/ui/button";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SearchUsersDialog from "../../users/components/SearchUsersDialog";
import OrganizationInvitationsList from "./OrganizationInvitationsList";
import { IoKey } from "react-icons/io5";
import { FaTrashCan } from "react-icons/fa6";

export default function OrganizationMembersWrapper() {
  const [searchText, setSearchText] = useState("");
  const [showSearchUsers, setShowSearchUsers] = useState(false);
  const organizationMembersQuery = useOrganizationMembers();
  const {
    shareDictionary: {
      components: { organizationMembers: dic },
    },
  } = useShareDictionary();

  const visibilityMembers = searchText
    ? organizationMembersQuery.data?.members.filter((item) => {
        return (
          item.username.includes(searchText) ||
          item.userFirstName.concat(" ", item.userLastName).includes(searchText)
        );
      }) || []
    : organizationMembersQuery.data?.members || [];

  function renderContent() {
    if (organizationMembersQuery.isError)
      <div>
        <SomethingWentWrong tryAgain={organizationMembersQuery.refetch} />
      </div>;
    if (organizationMembersQuery.isSuccess) {
      if (visibilityMembers.length === 0) {
        return (
          <div>
            <NoItemFound searchedText={searchText} />
          </div>
        );
      } else {
        return (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            {visibilityMembers.map((member) => {
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
                        {member.role !== "owner" && (
                          <DropdownMenuItem
                            variant="destructive"
                            className="h-11"
                          >
                            <FaTrashCan className="size-5" />
                            {dic.remove}
                          </DropdownMenuItem>
                        )}
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
                        <AvatarFallback>
                          {member.userFirstName[0]}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="grid gap-2">
                      <div>
                        <span className="text-neutral-600 dark:text-neutral-400">
                          {dic.username}:{" "}
                        </span>
                        <span className="font-medium text-primary">
                          {member.username}
                        </span>
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
            })}
          </div>
        );
      }
    }
    return null;
  }

  return (
    <>
      <div className="p-4 pt-0">
        <div className="py-4 sticky top-0 z-1 bg-background">
          {organizationMembersQuery.isFetching && (
            <div className="absolute top-0 inset-x-0">
              <LinearLoading />
            </div>
          )}
          <div className="grid gap-2 grid-cols-[1fr_max-content] mb-0.5">
            <Field>
              <InputGroup className="bg-neutral-100 dark:bg-neutral-900">
                <InputGroupInput
                  id="search"
                  type="search"
                  placeholder={dic.search + " ..."}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <InputGroupAddon align="inline-end">
                  <FaSearch className="size-4" />
                </InputGroupAddon>
              </InputGroup>
            </Field>
            <Button
              onClick={() => {
                setShowSearchUsers(true);
              }}
            >
              <FaPlus className="size-3" />
              {dic.newMember}
            </Button>
          </div>
          <div className="mt-0.5">
            <div className="text-xs">
              <span className="text-neutral-500">{dic.results}: </span>
              <span className="text-neutral-700 dark:text-neutral-400">
                {visibilityMembers.length}
              </span>
            </div>
          </div>
        </div>
        {renderContent()}
        <div className="mt-6">
          <OrganizationInvitationsList />
        </div>
      </div>
      <SearchUsersDialog
        open={showSearchUsers}
        onOpenChange={() => {
          setShowSearchUsers(false);
        }}
      />
    </>
  );
}
