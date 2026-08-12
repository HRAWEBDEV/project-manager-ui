import { useParams } from "next/navigation";
import { type Locale } from "@/internalization/app/localization";

export function useSlugs() {
  const { lang, workspace } = useParams();
  return {
    lang: lang as Locale | undefined,
    workspace: workspace as string | undefined,
  };
}
