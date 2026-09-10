import { z } from "zod";
import { type AuthDictionary } from "@/internalization/app/dictionaries/auth/dictionary";

function signInWithPasswordSchema({}: { dic: AuthDictionary }) {
  return z
    .object({
      username: z.string().min(3),
      password: z.string().min(3),
      confirmPassword: z.string(),
    })
    .refine(({ password, confirmPassword }) => password === confirmPassword, {
      path: ["confirmPassword"],
    });
}

type SignInWithPasswordProps = z.infer<
  ReturnType<typeof signInWithPasswordSchema>
>;

export type { SignInWithPasswordProps };
export { signInWithPasswordSchema };
