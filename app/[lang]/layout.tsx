import type { Metadata } from "next";
import "../globals.css";
import { cn } from "@/lib/utils";
import localFont from "next/font/local";
import { DEVELOPMENT } from "@/utils/env";
import {
  type Locale,
  getLocalInfo,
  localesList,
} from "@/internalization/app/localization";
import { TooltipProvider } from "@/components/ui/tooltip";
import BaseConfigProvider from "@/services/base-config/BaseConfigProvider";
import QueryClientProvider from "@/services/react-query/ReactQueryProvider";
import { getMetaDictionary } from "@/internalization/app/dictionaries/meta/dictionary";
import { getAuthDictionary } from "@/internalization/app/dictionaries/auth/dictionary";
import { getShareDictionary } from "@/internalization/app/dictionaries/share/dictionary";
import ShareDictionaryProvider from "@/services/share-dictionary/ShareDictionaryProvider";
import AxiosBaseConfig from "./services/axios-interceptors/AxiosBaseConfig";

export function generateStaticParams(): { lang: Locale }[] {
  return localesList.map((lang) => ({
    lang: lang as Locale,
  }));
}

export const generateMetadata = async (
  props: LayoutProps<"/[lang]">,
): Promise<Metadata> => {
  const { lang } = await props.params;
  const meta = getMetaDictionary({ locale: lang as Locale });
  return meta;
};

const faSans = localFont({
  display: "swap",
  variable: "--font-fa-sans",
  src: [
    {
      path: "../../public/fonts/fa/sans/IRANSansWebFaNum-UltraLight.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/fa/sans/IRANSansWebFaNum-UltraLight.woff",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/fa/sans/IRANSansWebFaNum-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/fa/sans/IRANSansWebFaNum-Light.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/fa/sans/IRANSansWebFaNum.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/fa/sans/IRANSansWebFaNum.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/fa/sans/IRANSansWebFaNum-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/fa/sans/IRANSansWebFaNum-Medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/fa/sans/IRANSansWebFaNum-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/fa/sans/IRANSansWebFaNum-Bold.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/fa/sans/IRANSansWebFaNum-Black.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../public/fonts/fa/sans/IRANSansWebFaNum-Black.woff",
      weight: "900",
      style: "normal",
    },
  ],
});

const enRoboto = localFont({
  display: "swap",
  variable: "--font-en-roboto",
  src: [
    {
      path: "../../public/fonts/en/roboto/Roboto-VariableFont_wdth,wght.ttf",
      style: "normal",
    },
    {
      path: "../../public/fonts/en/roboto/Roboto-Italic-VariableFont_wdth,wght.ttf",
      style: "italic",
    },
  ],
});

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  const { contentDirection } = getLocalInfo(lang as Locale);
  const [authDic, shareDic, metaDic] = await Promise.all([
    getAuthDictionary({ locale: lang as Locale }),
    getShareDictionary({ locale: lang as Locale }),
    getMetaDictionary({ locale: lang as Locale }),
  ]);
  return (
    <html
      suppressHydrationWarning
      lang={lang}
      dir={contentDirection}
      className={cn(
        "h-full",
        "antialiased",
        faSans.variable,
        enRoboto.variable,
        "font-sans",
        "font-en-roboto",
        "[[dir='rtl']]:font-fa-sans",
        "bg-background",
        "text-foreground",
      )}
    >
      <head>
        {/* {process.env.NEXT_PUBLIC_MODE === DEVELOPMENT && ( */}
        {/*   <script */}
        {/*     crossOrigin="anonymous" */}
        {/*     src="//unpkg.com/react-scan/dist/auto.global.js" */}
        {/*     async */}
        {/*   /> */}
        {/* )} */}
      </head>
      <body className="min-h-full flex flex-col scroll-smooth">
        <TooltipProvider>
          <ShareDictionaryProvider
            authDictionary={authDic}
            metaDictionary={metaDic}
            shareDictionary={shareDic}
          >
            <BaseConfigProvider activeLocale={lang as Locale}>
              <AxiosBaseConfig />
              <QueryClientProvider>{children}</QueryClientProvider>
            </BaseConfigProvider>
          </ShareDictionaryProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
