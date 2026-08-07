"use client";
import { SidebarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "../../services/sidebar/sidebarContext";
import HeaderProfile from "./HeaderProfile";
import HeaderTools from "./HeaderTools";

export default function PanelHeader() {
  const { toggleSidebar } = useSidebar();
  return (
    <header className="sticky top-0 z-(--panel-header-zindex) flex w-full items-center border-b bg-primary text-primary-foreground">
      <div className="flex h-(--header-height) w-full items-center justify-between gap-2 px-4">
        <div>
          <Button
            className="h-8 w-8"
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
          >
            <SidebarIcon className="size-6" />
          </Button>
        </div>
        <div className="flex gap-2">
          <HeaderTools />
          <HeaderProfile />
        </div>
      </div>
    </header>
  );
}
