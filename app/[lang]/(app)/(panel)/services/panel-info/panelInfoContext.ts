import { use, createContext } from "react";
import { OutOfContext } from "@/utils/OutOfContext";
import {
  type UserInfo,
  type Organization,
} from "../../user/services/userApiActions";

interface PanelInfo {
  userInfo: {
    data?: UserInfo;
    isError: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    isFetching: boolean;
  };
  organizations: {
    data?: Organization[];
    activeOrganization: Organization | null;
    onChangeActiveOrganization: (id: string) => unknown;
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
