import { getAuthDictionary } from "@/internalization/app/dictionaries/auth/dictionary";
import SignInWrapper from "./components/SignInWrapper";
import { type Locale } from "@/internalization/app/localization";

export default async function SignIn(props: PageProps<"/[lang]/sign-in">) {
  const { lang } = await props.params;
  const authDictionary = await getAuthDictionary({
    locale: lang as Locale,
  });
  return <SignInWrapper dic={authDictionary} />;
}
