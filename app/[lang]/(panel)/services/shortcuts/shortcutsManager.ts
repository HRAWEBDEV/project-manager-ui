import { type RegisterableHotkey } from "@tanstack/react-hotkeys";

type ShortcutsSetup = typeof defaultShortcuts;
type ShortcutsCategory = keyof ShortcutsSetup;
type ShortcutsItem<T extends ShortcutsCategory> = keyof ShortcutsSetup[T];

const defaultShortcuts = {
  general: {
    toggleNavigation: {
      keys: "Control+B" as RegisterableHotkey,
    },
  },
  test: {
    test: {
      keys: "Control+B" as RegisterableHotkey,
    },
  },
} as const;

export type { ShortcutsSetup, ShortcutsCategory, ShortcutsItem };
export { defaultShortcuts };
