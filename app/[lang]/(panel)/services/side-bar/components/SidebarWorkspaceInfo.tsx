"use client";
import { Button } from "@/components/ui/button";
import { IoMdArrowDropup } from "react-icons/io";
import { BsPersonWorkspace } from "react-icons/bs";
import { useOrganizationContext } from "../../../services/organization/organizationContext";
import { useShareDictionary } from "@/services/share-dictionary/shareDictionaryContext";
import ConnectivityInfo from "../../../[organization]/[workspace]/components/ConnectivityInfo";
import { useWorkspacesContext } from "../../../[organization]/[workspace]/services/workspaces/workspacesContext";
import { useSettingsContext } from "../../../[organization]/[workspace]/services/settings/settingsContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function SidebarWorkspaceInfo() {
  const {
    shareDictionary: {
      components: { workspaceInfo: dic },
    },
  } = useShareDictionary();
  const { activeOrganization } = useOrganizationContext();
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
        onClick={() => toggleOpen(true, "myWorkspaces")}
      >
        <div className="flex gap-2 items-center grow text-neutral-700 dark:text-neutral-400">
          <Avatar className="size-8">
            <AvatarImage
              src={`${process.env.NEXT_PUBLIC_SERVER_URI}${activeOrganization.logo}`}
              alt="organization logo"
            />
            <AvatarFallback>
              <BsPersonWorkspace className="size-8" />
            </AvatarFallback>
          </Avatar>
          <div className="grow grid">
            <h3 className="mb-1 truncate">{activeOrganization.name}</h3>
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
