"use client";
import { ReactNode } from "react";
import { useProjects } from "../../hooks/useProjects";
import { type ProjectsDictionary } from "@/internalization/app/dictionaries/panel/projects/dictionary";
import { type ProjectsContextProps, ProjectsContext } from "./projectsContext";

export default function ProjectsProvider({
  children,
}: {
  dic: ProjectsDictionary;
  children: ReactNode;
}) {
  const projectsQuery = useProjects();

  const ctx: ProjectsContextProps = {
    projectsInfo: projectsQuery,
  };

  return (
    <ProjectsContext.Provider value={ctx}>{children}</ProjectsContext.Provider>
  );
}
