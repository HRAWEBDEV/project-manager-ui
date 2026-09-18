"use client";
import { type ProjectsDictionary } from "@/internalization/app/dictionaries/panel/projects/dictionary";
import { type Project } from "../services/projectsApiActions";
import { useProjectsContext } from "../services/control/projectsContext";
import ProjectsItem from "./ProjectsItem";
import { Skeleton } from "@/components/ui/skeleton";
import NoItemFound from "@/app/[lang]/(panel)/components/NoItemFound";

const wrapperClassName =
  "grid gap-4 grid-cols-[repeat(auto-fill,minmax(12rem,14rem))]";

export default function ProjectsList({
  dic,
  onEdit,
}: {
  dic: ProjectsDictionary;
  onEdit: (project: Project) => void;
}) {
  const { projectsInfo } = useProjectsContext();
  if (projectsInfo.isLoading) {
    return (
      <div className={wrapperClassName}>
        {[1, 2, 3, 4].map((item) => (
          <Skeleton key={item} className="h-40 w-full bg-neutral-500/10" />
        ))}
      </div>
    );
  }
  if (projectsInfo.isSuccess && projectsInfo.data.projects.length === 0) {
    return (
      <div>
        <NoItemFound />
      </div>
    );
  }
  return (
    <div className={wrapperClassName}>
      {projectsInfo.data?.projects.map((project) => (
        <ProjectsItem
          key={project.id}
          dic={dic}
          project={project}
          onEdit={() => onEdit(project)}
        />
      ))}
    </div>
  );
}
