import { type ProjectsDictionary } from "@/internalization/app/dictionaries/panel/projects/dictionary";
import { type Project } from "../services/projectsApiActions";
import { Button } from "@/components/ui/button";

export default function ProjectsItem({
  project,
  onEdit,
}: {
  dic: ProjectsDictionary;
  project: Project;
  onEdit: () => void;
}) {
  return (
    <Button
      variant="outline"
      className="h-auto flex-col items-stretch gap-2 p-3 text-start"
      onClick={onEdit}
    >
      <span
        className="size-6 rounded-full border border-border"
        style={{ backgroundColor: project.color || undefined }}
      />
      <p className="truncate">{project.name}</p>
    </Button>
  );
}
