import { axios } from "@/app/utils/defaultAxios";

const signInApi = "/auth/sign-in";
const signupApi = "/auth/sign-up";

interface SignInProps {
  username: string;
  password: string;
}

interface SignUpProps {
  user: {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string | null;
    password: string;
  };
  organization: {
    name: string;
    description: string | null;
  };
}

function singIn(props: SignInProps) {
  return axios.post(signInApi, props);
}

function signup(props: SignUpProps) {
  return axios.post(signupApi, props);
}

export type { SignInProps, SignUpProps };
export { signInApi, signupApi, singIn, signup };
