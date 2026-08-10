"use client";
import { type Profile, ProfileContext } from "./profileContext";
import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { useBaseConfig } from "@/services/base-config/baseConfigContext";
import { useShareDictionary } from "../../../services/share-dictionary/shareDictionaryContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePanelInfo } from "../panel-info/panelInfoContext";
import { IoMdPerson } from "react-icons/io";
import { IoExitOutline } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useLogout } from "../panel-info/hooks/useLogout";
import { Spinner } from "@/components/ui/spinner";
import WorkspaceController from "../../components/WorkspaceController";
import { RiEdit2Fill } from "react-icons/ri";
import { useSetting } from "../setting/settingContext";

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const { userInfo } = usePanelInfo();
  const logout = useLogout();
  const {
    shareDictionary: { components: componentsDic },
  } = useShareDictionary();
  const [isOpen, setIsOpen] = useState(false);
  const { localeInfo } = useBaseConfig();
  const { toggleSetting } = useSetting();

  function toggleProfile(state?: boolean) {
    setIsOpen((prev) => (state === undefined ? !prev : state));
  }

  const ctx: Profile = {
    isOpen,
    toggleProfile,
  };

  return (
    <ProfileContext.Provider value={ctx}>
      {children}
      <Drawer
        open={isOpen}
        onOpenChange={(state) => {
          if (logout.isPending) return;
          setIsOpen(state);
        }}
        direction={localeInfo.contentDirection === "rtl" ? "left" : "right"}
      >
        <DrawerContent dir={localeInfo.contentDirection}>
          <DrawerHeader className="border-border border-b">
            <DrawerTitle className="text-start">
              {componentsDic.profile.userProfile}
            </DrawerTitle>
            <DrawerDescription className="sr-only hidden">
              {componentsDic.profile.userProfile}
            </DrawerDescription>
          </DrawerHeader>
          <div className="grow overflow-auto p-4">
            <div className="flex items-start gap-4 pe-11 relative">
              <Avatar className="shrink-0 size-20">
                <AvatarFallback className="bg-neutral-200 dark:bg-neutral-800">
                  <IoMdPerson className="size-10 text-neutral-500" />
                </AvatarFallback>
              </Avatar>
              <div className="pt-2">
                <p className="font-medium mb-0.5 text-lg text-primary">
                  {userInfo.data?.user.firstName} {userInfo.data?.user.lastName}
                </p>
                <p className="text-neutral-600 dark:text-neutral-400">
                  {userInfo.data?.user.username}
                </p>
              </div>
              <div className="absolute top-0 inset-e-0">
                <Button
                  variant="outline"
                  className="rounded-full size-11 bg-neutral-200 dark:bg-neutral-800"
                  onClick={() => {
                    toggleSetting(true, "userInfo");
                    toggleProfile(false);
                  }}
                >
                  <RiEdit2Fill className="size-5" />
                </Button>
              </div>
            </div>
            <div className="mt-6 grid gap-3">
              <WorkspaceController
                variant="outline"
                className="w-full h-auto justify-start text-start"
              />
              <Button
                className="w-full h-auto justify-start text-neutral-600 dark:text-neutral-400 bg-neutral-600/5 dark:bg-neutral-400/5"
                variant="outline"
                disabled={logout.isPending}
                onClick={() => {
                  toggleSetting(true);
                  toggleProfile(false);
                }}
              >
                <IoSettingsSharp className="size-8" />
                <span>{componentsDic.profile.settings}</span>
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    className="w-full h-auto justify-start text-destructive border-destructive bg-destructive/5"
                    variant="outline"
                    disabled={logout.isPending}
                  >
                    {logout.isPending ? (
                      <Spinner className="size-8" />
                    ) : (
                      <IoExitOutline className="size-8" />
                    )}

                    <span>{componentsDic.profile.exit.title}</span>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      {componentsDic.profile.exit.title}
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-md">
                      {componentsDic.profile.exit.confirmExitMessage}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="md:w-24">
                      {componentsDic.profile.exit.cancel}
                    </AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-destructive hover:bg-destructive md:w-24"
                      onClick={() => {
                        if (logout.isPending) return;
                        logout.mutate();
                      }}
                    >
                      {componentsDic.profile.exit.confirm}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
          <DrawerFooter className="p-0">
            <DrawerClose asChild>
              <Button
                variant="outline"
                size="lg"
                className="w-full rounded-none bg-neutral-100 dark:bg-neutral-900"
              >
                {componentsDic.profile.close}
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </ProfileContext.Provider>
  );
}
