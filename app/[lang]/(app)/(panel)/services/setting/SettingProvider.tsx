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
import { settingsTabs } from "./utils/settingsTabs";
import { getSettingsIcon } from "./utils/getSettingsIcon";
import { Button } from "@/components/ui/button";
import UserInfo from "../../user/components/UserInfo";

const defaultTab = settingsTabs[0];

export function SettingProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] =
    useState<(typeof settingsTabs)[number]>(defaultTab);
  const {
    shareDictionary: {
      components: { settings: settingsDic },
    },
  } = useShareDictionary();

  function toggleSetting(
    state?: boolean,
    tab?: (typeof settingsTabs)[number]["title"],
  ) {
    setIsOpen((prev) => (state === undefined ? !prev : state));
    if (tab)
      setActiveTab(settingsTabs.find((t) => t.title === tab) ?? defaultTab);
  }

  const ctx: Setting = {
    isOpen,
    toggleSetting,
  };

  function renderContent() {
    if (activeTab.title === "userInfo") {
      return <UserInfo />;
    }
    return null;
  }

  return (
    <SettingContext.Provider value={ctx}>
      {children}
      <Dialog open={isOpen} onOpenChange={toggleSetting}>
        <DialogContent className="flex flex-col w-[min(95%,45rem)] h-[95svh] max-w-none! p-0 overflow-hidden gap-0">
          <DialogHeader className="p-4 border-b border-border">
            <DialogTitle>{settingsDic.title}</DialogTitle>
            <DialogDescription className="hidden"></DialogDescription>
          </DialogHeader>
          <div className="grow overflow-hidden pt-0 scroll-smooth flex flex-col sm:flex-row">
            <div className="overflow-auto border-b border-border sm:border-e sm:border-b-0 sm:w-28 shrink-0 bg-neutral-100 dark:bg-neutral-900">
              <ul className="flex sm:flex-col">
                {settingsTabs.map((tab) => (
                  <li key={tab.title}>
                    <Button
                      data-active={activeTab.title === tab.title}
                      variant="ghost"
                      className='rounded-none h-auto flex-col w-full text-neutral-600 dark:text-neutral-400 border-border border-e sm:border-b sm:border-e-0 min-h-20 min-w-24 sm:min-w-auto data-[active="true"]:bg-primary data-[active="true"]:text-primary-foreground'
                    >
                      {getSettingsIcon(tab.title, { className: "size-6" })}
                      <span className="text-sm">
                        {settingsDic[tab.title]?.title}
                      </span>
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grow p-4 overflow-auto">{renderContent()}</div>
          </div>
        </DialogContent>
      </Dialog>
    </SettingContext.Provider>
  );
}
