import { useMutation } from "@tanstack/react-query";
import {
  type SignInProps,
  type SignUpProps,
  singIn,
  signup,
  logout,
} from "@/app/[lang]/(auth)/services/authApiActions";
import { type AuthDictionary } from "@/internalization/app/dictionaries/auth/dictionary";
import { AxiosError } from "axios";
import { toast } from "sonner";

function useSignIn({ dic }: { dic: AuthDictionary }) {
  const mut = useMutation({
    mutationFn(props: SignInProps) {
      return singIn(props);
    },
    onError(err: AxiosError) {
      if (err.response?.status === 401) {
        toast.error(dic.signIn.withPassword.wrongSignInCredentials);
      }
    },
  });
  return mut;
}

function useSignup({ dic }: { dic: AuthDictionary }) {
  const mut = useMutation({
    mutationFn(props: SignUpProps) {
      return signup(props);
    },
    onError(err: AxiosError) {},
  });
  return mut;
}

function useLogout() {
  const mut = useMutation({
    mutationFn() {
      return logout();
    },
    onError(err: AxiosError) {},
  });
  return mut;
}

export { useSignIn, useSignup, useLogout };
