"use client";
import { type ProjectsDictionary } from "@/internalization/app/dictionaries/panel/projects/dictionary";
import { type Project } from "../services/projectsApiActions";
import { useProjectsContext } from "../services/control/projectsContext";
import ProjectsItem from "./ProjectsItem";
import { Skeleton } from "@/components/ui/skeleton";
import NoItemFound from "@/app/[lang]/(panel)/components/NoItemFound";
import { useFormContext } from "react-hook-form";
import { FilterProjectsSchemas } from "../schemas/projectsSchemas";

const wrapperClassName =
  "grid gap-4 grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(12rem,14rem))]";

export default function ProjectsList({
  dic,
  onEdit,
}: {
  dic: ProjectsDictionary;
  onEdit: (project: Project) => void;
}) {
  const { getValues } = useFormContext<FilterProjectsSchemas>();
  const { projectsInfo, visibleProjects } = useProjectsContext();
  if (projectsInfo.isLoading) {
    return (
      <div className={wrapperClassName}>
        {[1, 2, 3, 4].map((item) => (
          <Skeleton key={item} className="h-40 w-full bg-neutral-500/10" />
        ))}
      </div>
    );
  }
  if (projectsInfo.isSuccess && visibleProjects.length === 0) {
    return (
      <div>
        <NoItemFound searchedText={getValues("search")} />
      </div>
    );
  }
  return (
    <div className={wrapperClassName}>
      {visibleProjects.map((project) => (
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
