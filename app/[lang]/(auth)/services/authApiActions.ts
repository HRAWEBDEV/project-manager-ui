import { axios } from "@/app/utils/defaultAxios";

const signInApi = "/auth/sign-in";
const signupApi = "/auth/signup";

interface SignInProps {
  username: string;
  password: string;
}

function singIn(props: SignInProps) {
  return axios.post(signInApi, props);
}

export type { SignInProps };
export { signInApi, signupApi, singIn };
