import { z } from "zod";
import { type AuthDictionary } from "@/internalization/app/dictionaries/auth/dictionary";

function createUserInfoSchema(dic: AuthDictionary["signUp"]) {
  return z.object({
    username: z.string().min(1, dic.userInfo.fillRequiredFields),
    firstName: z.string().min(1, dic.userInfo.fillRequiredFields),
    lastName: z.string().min(1, dic.userInfo.fillRequiredFields),
    email: z.email().min(1, dic.userInfo.fillRequiredFields),
    phoneNumber: z.string(),
  });
}

type UserInfoSchema = z.infer<ReturnType<typeof createUserInfoSchema>>;

export type { UserInfoSchema };
export { createUserInfoSchema };
