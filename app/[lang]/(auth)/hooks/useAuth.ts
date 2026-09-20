import { useMutation, useQuery } from "@tanstack/react-query";
import {
  type SignInProps,
  type SignUpProps,
  emailAvailablityApi,
  usernameAvailablityApi,
  singIn,
  signup,
  logout,
  emailAvailability,
  usernameAvailability,
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

function useEmailAvailability(email: string, { enabled }: { enabled: boolean }) {
  const query = useQuery({
    queryKey: [emailAvailablityApi, email],
    enabled,
    async queryFn({ signal }) {
      const res = await emailAvailability(email, signal);
      return res.data;
    },
  });
  return query;
}

function useUsernameAvailability(
  username: string,
  { enabled }: { enabled: boolean },
) {
  const query = useQuery({
    queryKey: [usernameAvailablityApi, username],
    enabled,
    async queryFn({ signal }) {
      const res = await usernameAvailability(username, signal);
      return res.data;
    },
  });
  return query;
}

export {
  useSignIn,
  useSignup,
  useLogout,
  useEmailAvailability,
  useUsernameAvailability,
};
