"use client";
import { SidebarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "../../services/sidebar/sidebarContext";

export default function PanelHeader() {
  const { toggleSidebar } = useSidebar();
  return (
    <header className="sticky top-0 z-(--panel-header-zindex) flex w-full items-center border-b bg-primary text-primary-foreground">
      <div className="flex h-(--header-height) w-full items-center gap-2 px-4">
        <Button
          className="h-8 w-8"
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
        >
          <SidebarIcon className="size-6" />
        </Button>
      </div>
    </header>
  );
}
