"use client";
import { useState } from "react";
import { type ProfileContextProps, ProfileContext } from "./profileContext";
import { ReactNode } from "react";

export default function ProfileProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  function onToggle(state?: boolean) {
    setOpen((pre) => (state === undefined ? !pre : state));
  }

  const ctx: ProfileContextProps = {
    open,
    onToggle,
  };
  return (
    <ProfileContext.Provider value={ctx}>{children}</ProfileContext.Provider>
  );
}
