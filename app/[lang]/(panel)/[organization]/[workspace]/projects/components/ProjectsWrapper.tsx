import { type ProjectsDictionary } from "@/internalization/app/dictionaries/panel/projects/dictionary";
import ProjectsFilters from "./ProjectsFilters";
import ProjectsList from "./ProjectsList";

export default function ProjectsWrapper({ dic }: { dic: ProjectsDictionary }) {
  return (
    <div>
      <ProjectsFilters dic={dic} />
      <ProjectsList dic={dic} />
    </div>
  );
}
