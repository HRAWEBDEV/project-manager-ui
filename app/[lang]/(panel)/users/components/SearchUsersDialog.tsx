"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useShareDictionary } from "@/services/share-dictionary/shareDictionaryContext";
import { Field } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useUsers } from "../hooks/useUsers";
import NoItemFound from "../../components/NoItemFound";
import SomethingWentWrong from "../../components/SomethingWentWrong";
import { useDebouncedValue } from "@tanstack/react-pacer";
import { z } from "zod";
import LinearLoading from "@/components/LinearLoading";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MdOutlineHelpOutline } from "react-icons/md";

export default function SearchUsersDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [dbEmail] = useDebouncedValue(email, {
    wait: 500,
  });
  const [dbUsername] = useDebouncedValue(username, {
    wait: 500,
  });
  const isEmailValid = z.email().safeParse(dbEmail).success;
  const isUserNameValid = z.string().min(3).safeParse(dbUsername).success;
  const {
    shareDictionary: {
      components: { searchUsers: dic },
    },
  } = useShareDictionary();

  const usersQuery = useUsers({
    enabled: isEmailValid || isUserNameValid,
    email: dbEmail,
    username: dbUsername,
  });

  function renderContent() {
    if (!isUserNameValid && !isEmailValid) {
      return (
        <div>
          <div>
            <div className="flex flex-col items-center p-4 text-primary">
              <MdOutlineHelpOutline className="size-14 mb-4" />
              <div className="text-center">
                <p className="text-md font-medium mb-1">
                  {dic.fillUsernameOrEmailToSearchUser}.
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }
    if (usersQuery.isError)
      return (
        <div>
          <SomethingWentWrong />
        </div>
      );
    if (usersQuery.isSuccess) {
      if (usersQuery.data.total === 0) {
        return (
          <div>
            <NoItemFound searchedText={dbEmail || dbUsername} />
          </div>
        );
      } else {
        return (
          <div>
            {usersQuery.data.users.map((user) => (
              <div key={user.id}>
                <div className="h-auto p-3 w-full text-start justify-items-stretch font-normal gap-3 items-start bg-neutral-100 dark:bg-neutral-900 flex flex-row border border-border rounded-md not-last:mb-4">
                  <div className="shrink-0">
                    <Avatar className="size-12">
                      {user.avatar && (
                        <AvatarImage
                          src={`${process.env.NEXT_PUBLIC_SERVER_URI}${user.avatar}`}
                          alt="user profile image"
                        />
                      )}
                      <AvatarFallback>{user.firstName[0]}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="grow">
                    <h3 className="font-medium text-primary mb-0.5">
                      {user.username}
                    </h3>
                    <p>
                      {user.firstName} {user.lastName}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      }
    }
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 gap-0 max-h-[80svh] overflow-hidden flex flex-col">
        <DialogHeader className="p-4 border-b border-border relative">
          <DialogTitle>{dic.title}</DialogTitle>
          <DialogDescription className="hidden"></DialogDescription>
          {usersQuery.isFetching && (
            <div className="absolute bottom-0 inset-x-0">
              <LinearLoading />
            </div>
          )}
        </DialogHeader>
        <div className="relative grow overflow-auto p-4">
          <div className="mb-3">
            <div className="grid gap-2 grid-cols-2 mb-0.5">
              <Field>
                <InputGroup className="bg-neutral-100 dark:bg-neutral-900">
                  <InputGroupAddon align="inline-start">
                    <p>{dic.email}: </p>
                  </InputGroupAddon>
                  <InputGroupInput
                    id="email"
                    type="search"
                    value={email}
                    onChange={(e) => {
                      setUsername("");
                      setEmail(e.target.value);
                    }}
                  />
                </InputGroup>
              </Field>
              <Field>
                <InputGroup className="bg-neutral-100 dark:bg-neutral-900">
                  <InputGroupAddon align="inline-start">
                    <p>{dic.username}: </p>
                  </InputGroupAddon>
                  <InputGroupInput
                    id="username"
                    type="search"
                    value={username}
                    onChange={(e) => {
                      setEmail("");
                      setUsername(e.target.value);
                    }}
                  />
                </InputGroup>
              </Field>
            </div>
          </div>
          {renderContent()}
        </div>
      </DialogContent>
    </Dialog>
  );
}
