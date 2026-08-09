import { use, createContext } from "react";
import { OutOfContext } from "@/utils/OutOfContext";

interface Setting {
  isOpen: boolean;
  toggleSetting: (state?: boolean) => void;
}

const SettingContext = createContext<Setting | null>(null);

function useSetting() {
  const val = use(SettingContext);
  if (!val) throw new OutOfContext("Setting context");
  return val;
}

export type { Setting };
export { SettingContext, useSetting };
