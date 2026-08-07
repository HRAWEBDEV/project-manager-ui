import { type OrganizationSchema } from "../schemas/organizationSchema";
import { type UserInfoSchema } from "../schemas/userInfoSchema";

export interface SignUpData {
  userInfo: UserInfoSchema | null;
  organizationInfo: OrganizationSchema | null;
}
