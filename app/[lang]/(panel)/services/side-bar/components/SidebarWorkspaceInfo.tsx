"use client";
import { Button } from "@/components/ui/button";
import { IoMdArrowDropup } from "react-icons/io";
import { useSettingsContext } from "../../settings/settingsContext";
import { BsPersonWorkspace } from "react-icons/bs";
import { useWorkspacesContext } from "../../../[organization]/services/workspaces/workspacesContext";
import { useShareDictionary } from "@/services/share-dictionary/shareDictionaryContext";
import ConnectivityInfo from "../../../[organization]/[workspace]/components/ConnectivityInfo";

export default function SidebarWorkspaceInfo() {
  const {
    shareDictionary: {
      components: { workspaceInfo: dic },
    },
  } = useShareDictionary();
  const { activeWorksapce } = useWorkspacesContext();
  const { toggleOpen } = useSettingsContext();
  return (
    <div>
      <div className="mb-1">
        <ConnectivityInfo />
      </div>
      <Button
        variant="outline"
        className="w-full justify-stretch text-start p-2 h-auto bg-transparent rounded-none border-0 border-t"
        onClick={() => toggleOpen(true, "workspace")}
      >
        <div className="flex gap-2 items-center grow text-neutral-700 dark:text-neutral-400">
          <BsPersonWorkspace className="size-8" />
          <div className="grow grid">
            <h3 className="mb-1 truncate">مدیر سیستم</h3>
            <p className="text-xs text-primary truncate">
              <span>{dic.workspaceName}: </span>
              <span>{activeWorksapce.name}</span>
            </p>
          </div>
          <IoMdArrowDropup />
        </div>
      </Button>
    </div>
  );
}
