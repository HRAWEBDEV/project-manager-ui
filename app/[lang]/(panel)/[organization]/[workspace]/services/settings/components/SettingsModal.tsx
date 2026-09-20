"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useSettingsContext } from "../settingsContext";
import { useShareDictionary } from "@/services/share-dictionary/shareDictionaryContext";
import { Button } from "@/components/ui/button";
import { settingItems } from "../utils/settingItems";
import { getSettingsIcon } from "../utils/getSettingsIcon";
import UserWrapper from "@/app/[lang]/(panel)/users/components/UserWrapper";
import OrganizationWrapper from "@/app/[lang]/(panel)/organizations/components/OrganizationWrapper";
import WorkspacesWrapper from "@/app/[lang]/(panel)/[organization]/workspaces/components/WorkspacesWrapper";
import EditWorkspace from "@/app/[lang]/(panel)/[organization]/workspaces/components/EditWorkspace";
import ShortcutsWrapper from "@/app/[lang]/(panel)/services/shortcuts/components/ShortcutsWrapper";
import { useWorkspacesContext } from "@/app/[lang]/(panel)/[organization]/services/workspaces/workspacesContext";

export default function SettingsModal() {
  const { open, activeTab, toggleOpen, setShowConfirmlogout } =
    useSettingsContext();
  const {
    shareDictionary: {
      components: { settings: dic },
    },
  } = useShareDictionary();
  const { activeWorksapce } = useWorkspacesContext();

  function renderSettingContent() {
    switch (activeTab) {
      case "userInfo":
        return <UserWrapper />;
      case "organization":
        return <OrganizationWrapper />;
      case "workspace":
        return <EditWorkspace workspace={activeWorksapce} />;
      case "myWorkspaces":
        return <WorkspacesWrapper />;
      case "shortcuts":
        return <ShortcutsWrapper />;
      default:
        return null;
    }
  }

  return (
    <Dialog open={open} onOpenChange={(state) => toggleOpen(state)}>
      <DialogContent className="p-0 gap-0 sm:max-w-2xl h-[85dvh] max-h-160 flex flex-col overflow-hidden">
        <DialogHeader className="border-b border-border p-4">
          <DialogTitle>{dic.title}</DialogTitle>
          <DialogDescription className="hidden">{dic.title}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col sm:grid sm:grid-cols-[11rem_1fr] grow overflow-hidden">
          <div className="bg-neutral-100 dark:bg-neutral-800 overflow-auto flex sm:flex-col shrink-0">
            {settingItems.map((item) => (
              <Button
                data-active={activeTab === item.key}
                variant="ghost"
                key={item.key}
                data-logout={item.key === "logout"}
                className="text-start justify-stretch rounded-none font-normal text-neutral-700 dark:text-neutral-400 data-[logout='true']:text-destructive data-[active='true']:bg-primary data-[active='true']:text-primary-foreground h-12 gap-3"
                onClick={() => {
                  if (item.key === "logout") {
                    setShowConfirmlogout(true);
                    return;
                  }
                  toggleOpen(true, item.key);
                }}
              >
                {getSettingsIcon(item.key, { className: "size-5" })}
                <span>{dic[item.key]}</span>
              </Button>
            ))}
          </div>
          <div className="overflow-auto grow p-3">{renderSettingContent()}</div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
