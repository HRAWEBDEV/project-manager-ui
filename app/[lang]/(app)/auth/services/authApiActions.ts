import { axios } from "../../services/axios/axiosConfig";

interface SignIn {
  username: string;
  password: string;
}
interface SignUp {
  user: {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    password: string;
  };
  organization: {
    name: string;
    description?: string;
  };
}

const signInApi = "/auth/sign-in";
const signUpApi = "/auth/sign-up";

function signIn(data: SignIn) {
  return axios.post(signInApi, data);
}

function signUp(data: SignUp) {
  return axios.post(signUpApi, data);
}

export type { SignIn, SignUp };
export { signInApi, signIn, signUpApi, signUp };
