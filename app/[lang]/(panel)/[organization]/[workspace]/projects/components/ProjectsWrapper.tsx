"use client";
import { useState } from "react";
import { type ProjectsDictionary } from "@/internalization/app/dictionaries/panel/projects/dictionary";
import ProjectsFilters from "./ProjectsFilters";
import ProjectsList from "./ProjectsList";
import EditProjectDialog from "./EditProjectDialog";
import { useProjectsContext } from "../services/control/projectsContext";

export default function ProjectsWrapper({ dic }: { dic: ProjectsDictionary }) {
  const { projectsInfo, visibleProjects } = useProjectsContext();
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const editingProject =
    visibleProjects.find((project) => project.id === editingProjectId) ?? null;

  return (
    <div className="relative">
      <ProjectsFilters
        dic={dic}
        isFetching={projectsInfo.isFetching}
        onCreate={() => {
          setEditingProjectId(null);
          setDialogOpen(true);
        }}
      />
      <ProjectsList
        dic={dic}
        onEdit={(project) => {
          setEditingProjectId(project.id);
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
