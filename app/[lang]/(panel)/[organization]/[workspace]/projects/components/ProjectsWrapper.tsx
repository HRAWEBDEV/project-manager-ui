"use client";
import { useState } from "react";
import { type ProjectsDictionary } from "@/internalization/app/dictionaries/panel/projects/dictionary";
import { type Project } from "../services/projectsApiActions";
import ProjectsFilters from "./ProjectsFilters";
import ProjectsList from "./ProjectsList";
import EditProjectDialog from "./EditProjectDialog";

export default function ProjectsWrapper({ dic }: { dic: ProjectsDictionary }) {
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div>
      <ProjectsFilters
        dic={dic}
        onCreate={() => {
          setEditingProject(null);
          setDialogOpen(true);
        }}
      />
      <ProjectsList
        dic={dic}
        onEdit={(project) => {
          setEditingProject(project);
          setDialogOpen(true);
        }}
      />
      <EditProjectDialog
        project={editingProject}
        dic={dic}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
}
