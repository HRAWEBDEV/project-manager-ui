"use client";
import { type Setting, SettingContext } from "./settingContext";
import { useState } from "react";
import { useShareDictionary } from "../../../services/share-dictionary/shareDictionaryContext";

export function SettingProvider({ children }: { children: React.ReactNode }) {
  const {
    shareDictionary: { components: componentsDic },
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
    <SettingContext.Provider value={ctx}>{children}</SettingContext.Provider>
  );
}
