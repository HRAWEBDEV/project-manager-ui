"use client";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useShareDictionary } from "@/services/share-dictionary/shareDictionaryContext";
import { useDeleteUserAvatar, useUpdateUserAvatar } from "../hooks/useUsers";
import { Spinner } from "@/components/ui/spinner";
import { useProfile } from "../../services/profile/profileContext";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { IoIosWarning } from "react-icons/io";

export default function UserAvatar() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const confirmDeleteUserAvatar = useDeleteUserAvatar();
  const confirmUpdateUserAvatar = useUpdateUserAvatar();
  const {
    shareDictionary: {
      components: { userInfo: dic },
    },
  } = useShareDictionary();
  const { usersInfoQuery } = useProfile();

  const pendAction =
    confirmDeleteUserAvatar.isPending || confirmUpdateUserAvatar.isPending;
  return (
    <div className="flex flex-col items-center mb-6">
      <Avatar className="size-36">
        {usersInfoQuery.data?.user.avatar && (
          <AvatarImage
            src={`${process.env.NEXT_PUBLIC_SERVER_URI}${usersInfoQuery.data?.user.avatar}`}
            alt="user profile image"
          />
        )}
        <AvatarFallback>
          {usersInfoQuery.data?.user.firstName[0]}
        </AvatarFallback>
      </Avatar>
      <div className="flex gap-2 items-center flex-wrap mt-4">
        <AlertDialog>
          <AlertDialogTrigger
            render={
              <Button
                variant="destructive"
                className="min-w-28"
                disabled={pendAction || !usersInfoQuery.data?.user.avatar}
              >
                {pendAction && <Spinner />}
                {dic.removeAvatar}
              </Button>
            }
          />
          <AlertDialogContent size="sm">
            <AlertDialogHeader>
              <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                <IoIosWarning />
              </AlertDialogMedia>
              <AlertDialogTitle>{dic.removeAvatarConfirmMessage}</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={pendAction} variant="outline">
                {dic.cancel}
              </AlertDialogCancel>
              <AlertDialogAction
                disabled={pendAction}
                variant="destructive"
                onClick={() => confirmDeleteUserAvatar.mutate()}
              >
                {dic.confirm}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <Button
          className="min-w-28"
          disabled={pendAction}
          onClick={() => {
            fileInputRef.current?.click();
          }}
        >
          <input
            disabled={pendAction}
            ref={fileInputRef}
            type="file"
            onChange={(e) => {
              const formData = new FormData();
              if (!e.target.files) return;
              formData.append("image", e.target.files[0]);
              confirmUpdateUserAvatar.mutate(formData);
            }}
            accept="image/*"
            hidden
          />
          {pendAction && <Spinner />}
          {dic.changeAvatar}
        </Button>
      </div>
    </div>
  );
}
