"use client";
import { useState } from "react";
import { type ProfileContextProps, ProfileContext } from "./profileContext";
import { ReactNode } from "react";
import { useUsersInfo } from "@/app/[lang]/(panel)/users/hooks/useUsers";

export default function ProfileProvider({ children }: { children: ReactNode }) {
  const usersInfoQuery = useUsersInfo();
  const [open, setOpen] = useState(false);

  function onToggle(state?: boolean) {
    setOpen((pre) => (state === undefined ? !pre : state));
  }

  const ctx: ProfileContextProps = {
    open,
    onToggle,
    usersInfoQuery,
  };
  return (
    <ProfileContext.Provider value={ctx}>
      {usersInfoQuery.isSuccess && children}
    </ProfileContext.Provider>
  );
}
