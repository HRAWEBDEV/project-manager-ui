import { type AuthDictionary } from "@/internalization/app/dictionaries/auth/dictionary";
import {
  type UserInfoSchema,
  type OrganizationInfoSchema,
} from "@/app/[lang]/(auth)/signup/schemas/signupSchemas";

export default function SignupConfirm({
  dic,
  userInfo,
  organizationInfo,
}: {
  dic: AuthDictionary;
  userInfo: UserInfoSchema;
  organizationInfo: OrganizationInfoSchema;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <span className="text-neutral-600 dark:text-neutral-400 inline-block min-w-24">
          {dic.signup.userInfo.firstName}
        </span>
        <span className="font-medium">{userInfo.firstName}</span>
      </div>
      <div>
        <span className="text-neutral-600 dark:text-neutral-400 inline-block min-w-24">
          {dic.signup.userInfo.lastName}
        </span>
        <span className="font-medium">{userInfo.lastName}</span>
      </div>
      <div>
        <span className="text-neutral-600 dark:text-neutral-400 inline-block min-w-24">
          {dic.signup.userInfo.username}
        </span>
        <span className="font-medium">{userInfo.username}</span>
      </div>
      <div>
        <span className="text-neutral-600 dark:text-neutral-400 inline-block min-w-24">
          {dic.signup.userInfo.email}
        </span>
        <span className="font-medium">{userInfo.email}</span>
      </div>
      <div>
        <span className="text-neutral-600 dark:text-neutral-400 inline-block min-w-24">
          {dic.signup.userInfo.phoneNumber}
        </span>
        <span className="font-medium">{userInfo.phoneNumber || "---"}</span>
      </div>
      <div>
        <span className="text-neutral-600 dark:text-neutral-400 inline-block min-w-24">
          {dic.signup.organizationInfo.name}
        </span>
        <span className="font-medium">{organizationInfo.name}</span>
      </div>
      <div>
        <span className="text-neutral-600 dark:text-neutral-400 inline-block min-w-24">
          {dic.signup.organizationInfo.description}
        </span>
        <p className="font-medium">{organizationInfo.description || "---"}</p>
      </div>
    </div>
  );
}
