"use client";
import { ReactNode } from "react";
import { useProjects } from "../../hooks/useProjects";
import { type ProjectsDictionary } from "@/internalization/app/dictionaries/panel/projects/dictionary";
import { type ProjectsContextProps, ProjectsContext } from "./projectsContext";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type FilterProjectsSchemas,
  filterProjectsSchemas,
} from "../../schemas/projectsSchemas";

export default function ProjectsProvider({
  children,
}: {
  dic: ProjectsDictionary;
  children: ReactNode;
}) {
  const filterProjectsUseForm = useForm<FilterProjectsSchemas>({
    resolver: zodResolver(filterProjectsSchemas()),
    defaultValues: {
      search: "",
    },
  });
  const [searchValue] = filterProjectsUseForm.watch(["search"]);
  const projectsQuery = useProjects();
  const visibleProjects = (() => {
    if (!projectsQuery.isSuccess || !projectsQuery.data?.projects.length)
      return [];
    if (!searchValue) return projectsQuery.data?.projects || [];
    return projectsQuery.data?.projects.filter((item) => {
      return item.name.includes(searchValue);
    });
  })();

  const ctx: ProjectsContextProps = {
    projectsInfo: projectsQuery,
    visibleProjects,
  };

  return (
    <ProjectsContext.Provider value={ctx}>
      <FormProvider {...filterProjectsUseForm}>{children}</FormProvider>
    </ProjectsContext.Provider>
  );
}
