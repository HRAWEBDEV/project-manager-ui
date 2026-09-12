import { z } from "zod";
import { type AuthDictionary } from "@/internalization/app/dictionaries/auth/dictionary";

function createUserInfoSchema({}: { dic: AuthDictionary }) {
  return z
    .object({
      username: z.string().min(3),
      firstName: z.string().min(1),
      lastName: z.string().min(1),
      email: z.email().min(1),
      phoneNumber: z.string(),
      password: z.string().min(1),
      confirmPassword: z.string(),
    })
    .refine(({ password, confirmPassword }) => confirmPassword === password, {
      path: ["confirmPassword"],
    });
}
function createOrganizationInfo({}: { dic: AuthDictionary }) {
  return z.object({
    name: z.string().min(3),
    description: z.string(),
  });
}

type UserInfoSchema = z.infer<ReturnType<typeof createUserInfoSchema>>;
type OrganizationInfoSchema = z.infer<
  ReturnType<typeof createOrganizationInfo>
>;
export type { UserInfoSchema, OrganizationInfoSchema };
export { createOrganizationInfo, createUserInfoSchema };
