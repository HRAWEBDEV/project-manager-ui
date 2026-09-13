"use client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useProfile } from "../../services/profile/profileContext";
import { useShareDictionary } from "@/services/share-dictionary/shareDictionaryContext";

export default function UserAvatar() {
  const {
    shareDictionary: {
      components: { userInfo: dic },
    },
  } = useShareDictionary();
  const { usersInfoQuery } = useProfile();
  return (
    <div className="flex flex-col items-center mb-6">
      <Avatar className="size-36">
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
      <div className="flex gap-2 items-center flex-wrap mt-4">
        <Button variant="destructive" className="min-w-28">
          {dic.removeAvatar}
        </Button>
        <Button className="min-w-28">{dic.changeAvatar}</Button>
      </div>
    </div>
  );
}
