// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { IoMdArrowDropdown } from "react-icons/io";
import { LiaHotelSolid } from "react-icons/lia";
import LogoShape from "@/components/LogoShape";

export default function SidebarHotelInfo() {
  return (
    <div>
      <Button
        variant="ghost"
        className="w-full justify-stretch text-start p-2 h-auto bg-transparent rounded-none min-h-(--panel-header-height) opacity-0"
      >
        <div className="flex gap-2 items-center grow text-neutral-700 dark:text-neutral-400">
          <LogoShape className="size-12" />
          <div className="grow grid">
            <h3 className="mb-0.5 truncate">مدیریت اقامتگاه</h3>
          </div>
        </div>
      </Button>
    </div>
  );
}
