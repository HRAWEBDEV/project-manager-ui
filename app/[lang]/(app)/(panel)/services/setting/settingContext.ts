import { use, createContext } from "react";
import { OutOfContext } from "@/utils/OutOfContext";
import { settingsTabs } from "./utils/settingsTabs";

interface Setting {
  isOpen: boolean;
  toggleSetting: (
    state?: boolean,
    tab?: (typeof settingsTabs)[number]["title"],
  ) => void;
}

const SettingContext = createContext<Setting | null>(null);

function useSetting() {
  const val = use(SettingContext);
  if (!val) throw new OutOfContext("Setting context");
  return val;
}

export type { Setting };
export { SettingContext, useSetting };
