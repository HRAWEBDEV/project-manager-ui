import UserInfoForm from "./UserInfoForm";
import UserAvatar from "./UserAvatar";

export default function UserInfo() {
  return (
    <div className="p-4">
      <UserAvatar />
      <UserInfoForm />
    </div>
  );
}
