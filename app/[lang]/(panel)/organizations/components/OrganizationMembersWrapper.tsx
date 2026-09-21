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
import { Badge } from "@/components/ui/badge";
import { TbMailForward } from "react-icons/tb";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function OrganizationMembersWrapper() {
  const [searchText, setSearchText] = useState("");
  const organizationMembersQuery = useOrganizationMembers();
  const {
    shareDictionary: {
      components: { organizationMembers: dic },
    },
  } = useShareDictionary();

  function renderContent() {
    if (organizationMembersQuery.isError)
      <div>
        <SomethingWentWrong tryAgain={organizationMembersQuery.refetch} />
      </div>;
    if (organizationMembersQuery.isSuccess) {
      if (organizationMembersQuery.data.members.length === 0) {
        return (
          <div>
            <NoItemFound />
          </div>
        );
      } else {
        return (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            {organizationMembersQuery.data.members.map((member) => {
              return (
                <div key={member.id} className="relative">
                  <div className="absolute top-1 -inset-e-1">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <Button variant="ghost">
                            <IoEllipsisVerticalSharp />
                          </Button>
                        }
                      />
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>item</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <Button
                    variant="outline"
                    className="h-auto p-4 w-full text-start justify-items-stretch font-normal gap-3 items-start bg-neutral-100 dark:bg-neutral-900"
                  >
                    <div className="shrink-0">
                      <Avatar className="size-12">
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
                    <div className="grow">
                      <h3 className="font-medium text-primary mb-0.5">
                        {member.username}
                      </h3>
                      <p>
                        {member.userFirstName} {member.userLastName}
                      </p>
                      <p className="text-neutral-500 mb-1">
                        {dic[member.role]}
                      </p>
                      {/* <Badge variant="destructive"> */}
                      {/*   <TbMailForward /> */}
                      {/*   {dic.pendingInvitation} */}
                      {/* </Badge> */}
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
      {organizationMembersQuery.isFetching && (
        <div className="absolute top-0 inset-x-0">
          <LinearLoading />
        </div>
      )}
      <div>
        <div className="mb-4">
          <div className="grid gap-2 grid-cols-[1fr_max-content]">
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
            <Button onClick={() => {}}>
              <FaPlus className="size-3" />
              {dic.newMember}
            </Button>
          </div>
        </div>
        {renderContent()}
      </div>
    </>
  );
}
