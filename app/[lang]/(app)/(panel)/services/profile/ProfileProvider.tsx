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

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const { userInfo } = usePanelInfo();
  const {
    shareDictionary: { components: componentsDic },
  } = useShareDictionary();
  console.log(componentsDic);
  const [isOpen, setIsOpen] = useState(false);
  const { localeInfo } = useBaseConfig();

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
        onOpenChange={(state) => setIsOpen(state)}
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
            <div className="flex items-start gap-4">
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
