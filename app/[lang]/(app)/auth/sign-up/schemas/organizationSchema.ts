import { z } from "zod";
import { type AuthDictionary } from "@/internalization/app/dictionaries/auth/dictionary";

function createOrganizationSchema(dic: AuthDictionary["signUp"]) {
  return z
    .object({
      name: z.string().min(1, dic.organizationInfo.fillRequiredFields),
      description: z.string(),
      password: z.string().min(1, dic.organizationInfo.fillRequiredFields),
      confirmPassword: z
        .string()
        .min(1, dic.organizationInfo.fillRequiredFields),
    })
    .refine(({ password, confirmPassword }) => password === confirmPassword, {
      message: dic.organizationInfo.confirmPasswordDoestNotMatch,
      path: ["confirmPassword"],
    });
}

type OrganizationSchema = z.infer<ReturnType<typeof createOrganizationSchema>>;

export type { OrganizationSchema };
export { createOrganizationSchema };
