"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { type ProjectsDictionary } from "@/internalization/app/dictionaries/panel/projects/dictionary";
import { type Project } from "../services/projectsApiActions";
import EditProject from "./EditProject";

export default function EditProjectDialog({
  project,
  dic,
  open,
  onOpenChange,
}: {
  project: Project | null;
  dic: ProjectsDictionary;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 gap-0 max-h-[80svh] overflow-hidden flex flex-col">
        <DialogHeader className="p-4 border-b border-border">
          <DialogTitle>
            {project ? project.name : dic.editProject.newProject}
          </DialogTitle>
          <DialogDescription className="hidden">
            {project ? project.name : dic.editProject.newProject}
          </DialogDescription>
        </DialogHeader>
        <EditProject
          project={project}
          dic={dic}
          onSuccess={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
