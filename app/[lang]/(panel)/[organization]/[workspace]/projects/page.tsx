import { getProjectsDictionary } from "@/internalization/app/dictionaries/panel/projects/dictionary";
import { type Locale } from "@/internalization/app/localization";
import { Metadata } from "next";
import ProjectsWrapper from "./components/ProjectsWrapper";
import ProjectsProvider from "./services/control/ProjectsProvider";

export const generateMetadata = async (
  props: LayoutProps<"/[lang]/[organization]/[workspace]">,
): Promise<Metadata> => {
  const { lang } = await props.params;
  const meta = await getProjectsDictionary({ locale: lang as Locale });
  return {
    title: meta.title,
  };
};

export default async function ProjectsPage({
  params,
}: PageProps<"/[lang]/[organization]/[workspace]/projects">) {
  const { lang } = await params;
  const dic = await getProjectsDictionary({ locale: lang as Locale });
  return (
    <ProjectsProvider dic={dic}>
      <ProjectsWrapper dic={dic} />
    </ProjectsProvider>
  );
}
