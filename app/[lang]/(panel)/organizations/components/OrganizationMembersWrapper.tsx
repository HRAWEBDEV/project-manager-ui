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
import NoItemFound from "../../components/NoItemFound";
import SomethingWentWrong from "../../components/SomethingWentWrong";
import { Button } from "@/components/ui/button";
import SearchUsersDialog from "../../users/components/SearchUsersDialog";
import OrganizationInvitationsList from "./OrganizationInvitationsList";
import OrganizationMemberItem from "./OrganizationMemberItem";

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
              return <OrganizationMemberItem key={member.id} member={member} />;
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
        <div className="py-4 sticky top-0 z-1 bg-popover">
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
