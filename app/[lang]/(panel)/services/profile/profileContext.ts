import { use, createContext } from "react";
import { OutOfContext } from "@/utils/OutOfContext";

interface ProfileContextProps {
  open: boolean;
  onToggle: (state?: boolean) => unknown;
}

const ProfileContext = createContext<ProfileContextProps | null>(null);

function useProfile() {
  const val = use(ProfileContext);
  if (!val) throw new OutOfContext("profile context");
  return val;
}

export type { ProfileContextProps };
export { ProfileContext, useProfile };
