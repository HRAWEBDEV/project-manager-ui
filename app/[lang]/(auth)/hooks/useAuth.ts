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
import { useRouter } from "next/navigation";
import { useBaseConfig } from "@/services/base-config/baseConfigContext";
import { useClearQueries } from "@/app/[lang]/hooks/useClearQueries";

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

function useSignup({}: { dic: AuthDictionary }) {
  const mut = useMutation({
    mutationFn(props: SignUpProps) {
      return signup(props);
    },
    onError() {},
  });
  return mut;
}

function useLogout() {
  const { clearQueries } = useClearQueries();
  const router = useRouter();
  const { locale } = useBaseConfig();
  const mut = useMutation({
    mutationFn() {
      return logout();
    },
    onSuccess() {
      router.push(`/${locale}/sign-in`);
      clearQueries();
    },
    onError() {},
  });
  return mut;
}

export { useSignIn, useSignup, useLogout };
