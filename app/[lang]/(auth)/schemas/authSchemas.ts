import { z } from "zod";
import { type AuthDictionary } from "@/internalization/app/dictionaries/auth/dictionary";

function createSignInWithPasswordSchema({ dic }: { dic: AuthDictionary }) {
  return z.object({
    username: z.string().min(3, dic.signIn.withPassword.fillRequiredFields),
    password: z.string().min(3, dic.signIn.withPassword.fillRequiredFields),
  });
}

type SignInWithPasswordProps = z.infer<
  ReturnType<typeof createSignInWithPasswordSchema>
>;

export type { SignInWithPasswordProps };
export { createSignInWithPasswordSchema };
