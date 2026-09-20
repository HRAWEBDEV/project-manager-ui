"use client";
import { useState } from "react";
import { useOrganizationMembers } from "@/app/[lang]/(panel)/organizations/hooks/useOrganizations";
import { Field } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { FaSearch } from "react-icons/fa";
import { useShareDictionary } from "@/services/share-dictionary/shareDictionaryContext";
import LinearLoading from "@/components/LinearLoading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function OrganizationMembersWrapper() {
  const [searchText, setSearchText] = useState("");
  const organizationMembersQuery = useOrganizationMembers();
  const {
    shareDictionary: {
      components: { organizationMembers: dic },
    },
  } = useShareDictionary();

  return (
    <>
      {organizationMembersQuery.isFetching && (
        <div className="absolute top-0 inset-x-0">
          <LinearLoading />
        </div>
      )}
      <div>
        <div className="mb-4">
          <div className="grid gap-2 grid-cols-1">
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
          </div>
        </div>
        {organizationMembersQuery.isSuccess && (
          <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(10rem,12rem))]">
            <ul>
              {organizationMembersQuery.data.members.map((member) => {
                return (
                  <li key={member.id} className="pt-10">
                    <div className="rounded-md border border-border">
                      <div className="grid place-content-center -mt-10">
                        <Avatar className="size-20">
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
                      <div className="p-4 py-2">
                        <h3 className="text-center font-medium text-base font-en-roboto text-primary mb-0.5">
                          {member.username}
                        </h3>
                        <div className="text-center">
                          <p className="mb-0.5 text-neutral-700 dark:text-neutral-300">
                            {member.userFirstName} {member.userLastName}
                          </p>
                          <p className="text-neutral-600 dark:text-neutral-400">
                            {dic[member.role]}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
