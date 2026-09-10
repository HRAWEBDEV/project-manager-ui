import { use, createContext } from "react";
import { OutOfContext } from "@/utils/OutOfContext";

interface SettingsContextProps {
  open: boolean;
  showConfirmLogout: boolean;
  toggleOpen: (state?: boolean) => unknown;
  setShowConfirmlogout: (state: boolean) => unknown;
}

const SettingsContext = createContext<SettingsContextProps | null>(null);

function useSettingsContext() {
  const val = use(SettingsContext);
  if (!val) throw new OutOfContext("settings context");
  return val;
}

export type { SettingsContextProps };
export { SettingsContext, useSettingsContext };
