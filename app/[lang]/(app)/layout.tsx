import { type Locale } from "@/internalization/app/localization";
import { getShareDictionary } from "@/internalization/app/dictionaries/share/dictionary";
import { getMetaDictionary } from "@/internalization/app/dictionaries/meta/dictionary";
import { getAuthDictionary } from "@/internalization/app/dictionaries/auth/dictionary";
import ShareDictionaryProvider from "./services/share-dictionary/ShareDictionaryProvider";
import { Toaster } from "@/components/ui/sonner";
import { locales } from "@/internalization/app/localization";
import AxiosLoggerInterceptor from "./services/axios-logger/AxiosLoggerInterceptor";
import AxiosBaseInterceptor from "./services/axios-base-interceptor/AxiosBaseInterceptor";

export default async function AppLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  const [shareDic, metaDic, authDic] = await Promise.all([
    getShareDictionary({
      locale: lang as Locale,
    }),
    getMetaDictionary({
      locale: lang as Locale,
    }),
    getAuthDictionary({
      locale: lang as Locale,
    }),
  ]);
  const { contentDirection } = locales[lang as Locale];
  return (
    <ShareDictionaryProvider
      metaDictionary={metaDic}
      shareDictionary={shareDic}
      authDictionary={authDic}
    >
      <AxiosBaseInterceptor />
      <AxiosLoggerInterceptor />
      {children}
      <Toaster
        className="font-[inherit]!"
        position={contentDirection === "rtl" ? "top-right" : "top-left"}
        richColors
        closeButton
      />
    </ShareDictionaryProvider>
  );
}
