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
import { useDebouncedValue } from "@tanstack/react-pacer";
import { z } from "zod";
import LinearLoading from "@/components/LinearLoading";

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
  const {
    shareDictionary: {
      components: { searchUsers: dic },
    },
  } = useShareDictionary();

  const usersQuery = useUsers({
    enabled:
      z.email().safeParse(dbEmail).success ||
      z.string().min(3).safeParse(dbUsername).success,
    email: dbEmail,
    username: dbUsername,
  });

  function renderContent() {}

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
        </div>
      </DialogContent>
    </Dialog>
  );
}
