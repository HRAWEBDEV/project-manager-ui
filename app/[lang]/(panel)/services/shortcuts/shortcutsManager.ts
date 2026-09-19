import { type RegisterableHotkey } from "@tanstack/react-hotkeys";

type ShortcutsSetup = typeof defaultShortcuts;
type ShortcutsCategory = keyof ShortcutsSetup;
type ShortcutsItem<T extends ShortcutsCategory> = keyof ShortcutsSetup[T];

const defaultShortcuts = {
  static: {
    static: {
      keys: "" as RegisterableHotkey,
    },
  },
  general: {
    toggleNavigation: {
      keys: "Control+B" as RegisterableHotkey,
    },
  },
} as const;

export type { ShortcutsSetup, ShortcutsCategory, ShortcutsItem };
export { defaultShortcuts };
