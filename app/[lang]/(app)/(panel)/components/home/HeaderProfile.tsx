import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePanelInfo } from "../../services/panel-info/panelInfoContext";
import { Spinner } from "@/components/ui/spinner";
import { IoMdPerson, IoMdArrowDropdown } from "react-icons/io";

export default function HeaderProfile() {
  const {
    userInfo: { data, isFetching, isSuccess },
  } = usePanelInfo();
  return (
    <button className="flex items-center">
      <IoMdArrowDropdown />
      <p className="text-sm font-medium min-w-24 max-w-28 truncate mx-2">
        {isSuccess ? `${data?.user.firstName} ${data?.user.lastName}` : "..."}
      </p>
      <Avatar className="size-9">
        <AvatarImage src="" />
        <AvatarFallback className="text-foreground">
          {isFetching ? (
            <Spinner />
          ) : (
            <IoMdPerson className="size-6 text-neutral-500" />
          )}
        </AvatarFallback>
      </Avatar>
    </button>
  );
}
