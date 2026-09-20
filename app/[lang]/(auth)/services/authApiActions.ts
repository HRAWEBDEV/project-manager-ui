import { axios } from "@/app/utils/defaultAxios";

const authBaseApi = "/auth";
const signInApi = `${authBaseApi}/sign-in`;
const signupApi = `${authBaseApi}/sign-up`;
const logoutApi = `${authBaseApi}/logout`;
const emailAvailablityApi = `${authBaseApi}/email-availability`;
const usernameAvailablityApi = `${authBaseApi}/username-availability`;

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

function logout() {
  return axios.post(logoutApi);
}

function emailAvailability(email: string, signal: AbortSignal) {
  const searchParams = new URLSearchParams([["email", email]]);
  return axios.get<{ isAvailable: boolean }>(
    `${emailAvailablityApi}?${searchParams}`,
    {
      signal,
    },
  );
}
function usernameAvailability(username: string, signal: AbortSignal) {
  const searchParams = new URLSearchParams([["username", username]]);
  return axios.get<{ isAvailable: boolean }>(
    `${usernameAvailablityApi}?${searchParams}`,
    {
      signal,
    },
  );
}

export type { SignInProps, SignUpProps };
export {
  signInApi,
  signupApi,
  emailAvailablityApi,
  usernameAvailablityApi,
  singIn,
  signup,
  logout,
  emailAvailability,
  usernameAvailability,
};
