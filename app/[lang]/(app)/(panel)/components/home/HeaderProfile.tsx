import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePanelInfo } from "../../services/panel-info/panelInfoContext";
import { Spinner } from "@/components/ui/spinner";
import { IoMdPerson, IoMdArrowDropdown } from "react-icons/io";
import { useProfile } from "../../services/profile/profileContext";

export default function HeaderProfile() {
  const { toggleProfile } = useProfile();
  const {
    userInfo: { data, isFetching, isSuccess },
  } = usePanelInfo();
  return (
    <button className="flex items-center" onClick={() => toggleProfile(true)}>
      <IoMdArrowDropdown className="hidden sm:block" />
      <p className="text-sm font-medium max-w-28 truncate mx-2 hidden sm:block">
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
