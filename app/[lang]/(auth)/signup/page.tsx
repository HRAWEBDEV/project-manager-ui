import { getAuthDictionary } from "@/internalization/app/dictionaries/auth/dictionary";
import { type Locale } from "@/internalization/app/localization";
import SingupWrapper from "./components/SignupWrapper";

export default async function Signup(props: PageProps<"/[lang]/sign-in">) {
  const { lang } = await props.params;
  const authDictionary = await getAuthDictionary({
    locale: lang as Locale,
  });
  return <SingupWrapper dic={authDictionary} />;
}
