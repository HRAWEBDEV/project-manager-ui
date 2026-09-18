"use client";
import { useState } from "react";
import { type ProjectsDictionary } from "@/internalization/app/dictionaries/panel/projects/dictionary";
import { type Project } from "../services/projectsApiActions";
import ProjectsFilters from "./ProjectsFilters";
import ProjectsList from "./ProjectsList";
import EditProjectDialog from "./EditProjectDialog";
import { useProjectsContext } from "../services/control/projectsContext";
import LinearLoading from "@/components/LinearLoading";

export default function ProjectsWrapper({ dic }: { dic: ProjectsDictionary }) {
  const { projectsInfo } = useProjectsContext();
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="p-4 relative">
      {projectsInfo.isFetching && (
        <div className="absolute top-0 inset-x-0">
          <LinearLoading />
        </div>
      )}
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
