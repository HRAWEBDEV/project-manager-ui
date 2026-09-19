import { type ProjectsDictionary } from "@/internalization/app/dictionaries/panel/projects/dictionary";
import { type Project } from "../services/projectsApiActions";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
      className="h-auto flex-col items-stretch gap-2 p-3 text-start rounded-xl border-px border-neutral-100 dark:border-neutral-900 shadow-lg relative overflow-hidden"
      onClick={onEdit}
    >
      <div
        style={{
          backgroundColor: project.color || "",
          opacity: 0.1,
        }}
        className="absolute inset-0"
      ></div>
      <div className="flex flex-col items-center gap-2">
        <div>
          <Avatar className="size-18 bg-background">
            <AvatarImage
              src={`${process.env.NEXT_PUBLIC_SERVER_URI}${project.icon}`}
              alt="project icon"
            />

            <AvatarFallback>{project.name[0]}</AvatarFallback>
          </Avatar>
        </div>
        <h3 className="font-medium">{project.name}</h3>
      </div>
    </Button>
  );
}
