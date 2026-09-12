"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useSettingsContext } from "../../services/settings/settingsContext";
import { useProfile } from "../../services/profile/profileContext";

export default function HeaderProfile() {
  const { toggleOpen } = useSettingsContext();
  const { usersInfoQuery } = useProfile();
  return (
    <Button
      variant="ghost"
      className="gap-1 items-center flex-row-reverse p-0 rounded-none"
      onClick={() => toggleOpen(true)}
    >
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="profile image" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <p className="text-sm text-neutral-700 dark:text-neutral-400 font-normal truncate max-w-32 hidden md:block">
        {usersInfoQuery.data?.user.firstName}{" "}
        {usersInfoQuery.data?.user.lastName}
      </p>
    </Button>
  );
}
