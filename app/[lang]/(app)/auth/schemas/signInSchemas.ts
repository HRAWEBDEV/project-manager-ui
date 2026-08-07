import { z } from "zod";
import { type AuthDictionary } from "@/internalization/app/dictionaries/auth/dictionary";

function createSignInSchema(dic: AuthDictionary["signIn"]) {
  return z.object({
    username: z.string().min(1, dic.withPassword.fillRequiredFields),
    password: z.string().min(1, dic.withPassword.fillRequiredFields),
  });
}

type SignInSchema = z.infer<ReturnType<typeof createSignInSchema>>;

export type { SignInSchema };
export { createSignInSchema };
