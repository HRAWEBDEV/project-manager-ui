import { Metadata } from "next";
import { getTasksDictionary } from "@/internalization/app/dictionaries/panel/tasks/dictionary";
import { type Locale } from "@/internalization/app/localization";

export const generateMetadata = async (
  props: LayoutProps<"/[lang]/[organization]/[workspace]">,
): Promise<Metadata> => {
  const { lang } = await props.params;
  const meta = await getTasksDictionary({ locale: lang as Locale });
  return {
    title: meta.title,
  };
};

export default async function TasksPage({
  params,
}: PageProps<"/[lang]/[organization]/[workspace]/tasks">) {
  return <div>tasks</div>;
}
