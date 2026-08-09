"use client";
import { type Setting, SettingContext } from "./settingContext";
import { useState } from "react";
import { useShareDictionary } from "../../../services/share-dictionary/shareDictionaryContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export function SettingProvider({ children }: { children: React.ReactNode }) {
  const {
    shareDictionary: {
      components: { settings: settingsDic },
    },
  } = useShareDictionary();
  const [isOpen, setIsOpen] = useState(false);

  function toggleSetting(state?: boolean) {
    setIsOpen((prev) => (state === undefined ? !prev : state));
  }

  const ctx: Setting = {
    isOpen,
    toggleSetting,
  };

  return (
    <SettingContext.Provider value={ctx}>
      {children}
      <Dialog open={isOpen} onOpenChange={toggleSetting}>
        <DialogContent className="flex flex-col sm:w-[min(95%,40rem)] sm:max-h-[95svh] max-w-none! p-0 overflow-hidden gap-0">
          <DialogHeader className="p-4 border-b border-border">
            <DialogTitle>{settingsDic.title}</DialogTitle>
            <DialogDescription className="hidden"></DialogDescription>
          </DialogHeader>
          <div className="grow overflow-auto p-4 pt-0 scroll-smooth"></div>
        </DialogContent>
      </Dialog>
    </SettingContext.Provider>
  );
}
