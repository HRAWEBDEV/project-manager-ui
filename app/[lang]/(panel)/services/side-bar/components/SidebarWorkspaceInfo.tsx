"use client";
import { Button } from "@/components/ui/button";
import { IoMdArrowDropup } from "react-icons/io";
import ConnectivityInfo from "@/app/[lang]/(panel)/components/ConnectivityInfo";
import { useSettingsContext } from "../../settings/settingsContext";
import { BsPersonWorkspace } from "react-icons/bs";

export default function SidebarWorkspaceInfo() {
  const { toggleOpen } = useSettingsContext();
  return (
    <div>
      <div className="mb-1">
        <ConnectivityInfo />
      </div>
      <Button
        variant="outline"
        className="w-full justify-stretch text-start p-2 h-auto bg-transparent rounded-none border-0 border-t"
        onClick={() => toggleOpen(true)}
      >
        <div className="flex gap-2 items-center grow text-neutral-700 dark:text-neutral-400">
          <BsPersonWorkspace className="size-8" />
          <div className="grow grid">
            <h3 className="mb-0.5 truncate">مدیر سیستم</h3>
            <p className="text-xs text-primary truncate">هتل عباسی</p>
          </div>
          <IoMdArrowDropup />
        </div>
      </Button>
    </div>
  );
}
