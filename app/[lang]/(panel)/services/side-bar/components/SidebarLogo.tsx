import { Button } from "@/components/ui/button";
import { HiOutlineCubeTransparent } from "react-icons/hi2";

export default function SidebarHotelInfo() {
  return (
    <div>
      <Button
        variant="ghost"
        className="w-full justify-stretch text-start p-2 h-auto bg-transparent rounded-none min-h-(--panel-header-height)"
      >
        <div className="flex gap-4 items-center grow text-neutral-700 dark:text-neutral-400">
          <HiOutlineCubeTransparent className="size-11 text-primary" />
          <div className="grow grid">
            <h3 className="mb-0.5 truncate">-------</h3>
            <p className="text-xs text-neutral-500">
              برنامه مدیریت تیم و پروژه
            </p>
          </div>
        </div>
      </Button>
    </div>
  );
}
