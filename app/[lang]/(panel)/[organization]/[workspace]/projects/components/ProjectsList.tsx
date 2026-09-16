"use client";
import { type ProjectsDictionary } from "@/internalization/app/dictionaries/panel/projects/dictionary";
import { type Project } from "../services/projectsApiActions";
import { useProjectsContext } from "../services/control/projectsContext";
import ProjectsItem from "./ProjectsItem";

export default function ProjectsList({
  dic,
  onEdit,
}: {
  dic: ProjectsDictionary;
  onEdit: (project: Project) => void;
}) {
  const { projectsInfo } = useProjectsContext();
  return (
    <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(12rem,14rem))]">
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
