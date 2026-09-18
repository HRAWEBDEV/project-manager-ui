import { use, createContext } from "react";
import { OutOfContext } from "@/utils/OutOfContext";
import { useProjects } from "../../hooks/useProjects";
import { type Project } from "../projectsApiActions";

interface ProjectsContextProps {
  projectsInfo: ReturnType<typeof useProjects>;
  visibleProjects: Project[];
}

const ProjectsContext = createContext<ProjectsContextProps | null>(null);

function useProjectsContext() {
  const val = use(ProjectsContext);
  if (!val) throw new OutOfContext("projects context");
  return val;
}

export type { ProjectsContextProps };
export { ProjectsContext, useProjectsContext };
