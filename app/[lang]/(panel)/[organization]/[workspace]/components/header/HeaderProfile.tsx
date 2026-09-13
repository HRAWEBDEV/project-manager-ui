"use client";
import { useProfile } from "@/app/[lang]/(panel)/services/profile/profileContext";
import { useSettingsContext } from "@/app/[lang]/(panel)/services/settings/settingsContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

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
        {usersInfoQuery.data?.user.avatar && (
          <AvatarImage
            src={usersInfoQuery.data?.user.avatar}
            alt="user profile image"
          />
        )}
        <AvatarFallback>
          {usersInfoQuery.data?.user.firstName[0]}
        </AvatarFallback>
      </Avatar>
      <p className="text-sm text-neutral-700 dark:text-neutral-400 font-normal truncate max-w-32 hidden md:block">
        {usersInfoQuery.data?.user.firstName}{" "}
        {usersInfoQuery.data?.user.lastName}
      </p>
    </Button>
  );
}
