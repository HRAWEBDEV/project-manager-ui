"use client";
import { ReactNode, useState, useCallback } from "react";
import { ShortcutsContext, ShortcutsContextProps } from "./shortcutsContext";
import {
  type ShortcutsCategory,
  type ShortcutsItem,
  defaultShortcuts,
} from "./shortcutsManager";
import { type RegisterableHotkey } from "@tanstack/react-hotkeys";

export default function ShortcutsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [shortcuts, setShortcuts] = useState(defaultShortcuts);

  const handleGetShortcutKeys = useCallback(
    <T extends ShortcutsCategory>(category: T, item: ShortcutsItem<T>) => {
      const categoryShortcuts = shortcuts[category] as Record<
        ShortcutsItem<T>,
        { keys: RegisterableHotkey }
      >;
      return categoryShortcuts[item].keys;
    },
    [shortcuts],
  );

  const ctx: ShortcutsContextProps = {
    shortcuts,
    onGetShortcutKeys: handleGetShortcutKeys,
  };
  return (
    <ShortcutsContext.Provider value={ctx}>
      {children}
    </ShortcutsContext.Provider>
  );
}
