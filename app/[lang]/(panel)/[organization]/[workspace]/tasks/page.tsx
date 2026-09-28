import { Metadata } from "next";
import { getTasksDictionary } from "@/internalization/app/dictionaries/panel/tasks/dictionary";
import { type Locale } from "@/internalization/app/localization";
import TasksWrapper from "./components/TasksWrapper";
import TasksProvider from "./services/control/TasksControlProvider";

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
  const { lang } = await params;
  const dic = await getTasksDictionary({ locale: lang as Locale });
  return (
    <TasksProvider dic={dic}>
      <TasksWrapper dic={dic} />
    </TasksProvider>
  );
}
