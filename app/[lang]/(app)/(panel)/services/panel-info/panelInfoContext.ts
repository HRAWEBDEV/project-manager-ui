import { use, createContext } from "react";
import { OutOfContext } from "@/utils/OutOfContext";
import { type UserInfo } from "./services/panelInfoApiActions";

interface PanelInfo {
  userInfo: {
    data?: UserInfo;
    isError: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    isFetching: boolean;
  };
}

const PanelInfoContext = createContext<PanelInfo | null>(null);

function usePanelInfo() {
  const val = use(PanelInfoContext);
  if (!val) throw new OutOfContext("panel info");
  return val;
}

export type { PanelInfo };
export { PanelInfoContext, usePanelInfo };
