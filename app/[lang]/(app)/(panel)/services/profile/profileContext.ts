import { use, createContext } from "react";
import { OutOfContext } from "@/utils/OutOfContext";

interface Profile {
  isOpen: boolean;
  toggleProfile: (state?: boolean) => void;
}

const ProfileContext = createContext<Profile | null>(null);

function useProfile() {
  const val = use(ProfileContext);
  if (!val) throw new OutOfContext("profile context");
  return val;
}

export type { Profile };
export { ProfileContext, useProfile };
