import { use, createContext } from "react";
import { OutOfContext } from "@/utils/OutOfContext";
import {
  type ShortcutsSetup,
  type ShortcutsCategory,
  type ShortcutsItem,
} from "./shortcutsManager";
import { type RegisterableHotkey } from "@tanstack/react-hotkeys";

interface ShortcutsContextProps {
  shortcuts: ShortcutsSetup;
  onGetShortcutKeys: <T extends ShortcutsCategory>(
    category: T,
    item: ShortcutsItem<T>,
  ) => RegisterableHotkey;
}

const ShortcutsContext = createContext<ShortcutsContextProps | null>(null);

function useShortcutsContext() {
  const val = use(ShortcutsContext);
  if (!val) throw new OutOfContext("ShortcutsContext");
  return val;
}

export type { ShortcutsContextProps };
export { ShortcutsContext, useShortcutsContext };
