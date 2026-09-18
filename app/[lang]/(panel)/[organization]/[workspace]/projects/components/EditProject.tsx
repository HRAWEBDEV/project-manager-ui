"use client";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type UpdateProjectSchema,
  updateProjectSchema,
} from "../schemas/projectsSchemas";
import {
  useUpdateProject,
  useCreateProject,
  useDeleteProject,
} from "../hooks/useProjects";
import { type Project } from "../services/projectsApiActions";
import { type ProjectsDictionary } from "@/internalization/app/dictionaries/panel/projects/dictionary";
import { FieldGroup, FieldLabel, Field } from "@/components/ui/field";
import {
  InputGroupInput,
  InputGroupTextarea,
  InputGroup,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { IoIosWarning } from "react-icons/io";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DialogFooter } from "@/components/ui/dialog";

const DEFAULT_PROJECT_COLOR = "#3b82f6";

export default function EditProject({
  project,
  dic,
  onSuccess,
}: {
  project: Project | null;
  dic: ProjectsDictionary;
  onSuccess?: () => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const updateProjectMutation = useUpdateProject();
  const createProjectMutation = useCreateProject();
  const deleteProjectMutation = useDeleteProject();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<UpdateProjectSchema>({
    resolver: zodResolver(updateProjectSchema()),
  });
  const pendAction =
    updateProjectMutation.isPending ||
    createProjectMutation.isPending ||
    deleteProjectMutation.isPending;

  useEffect(() => {
    reset({
      name: project?.name || "",
      description: project?.description || "",
      color: project?.color || DEFAULT_PROJECT_COLOR,
    });
  }, [project, reset]);

  return (
    <form className="flex flex-col grow overflow-hidden">
      <div className="p-4 overflow-auto">
        {!!project && (
          <div className="flex items-center flex-col">
            <Avatar className="size-28">
              <AvatarFallback>{project.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex gap-2 items-center flex-wrap mt-4">
              <Button variant="destructive" className="min-w-28" disabled>
                {dic.editProject.removeImage}
              </Button>
              <Button className="min-w-28" disabled={pendAction}>
                <input
                  disabled={pendAction}
                  ref={fileInputRef}
                  type="file"
                  onChange={(e) => {
                    const formData = new FormData();
                    if (!e.target.files) return;
                    formData.append("image", e.target.files[0]);
                  }}
                  accept="image/*"
                  hidden
                />
                {dic.editProject.changeImage}
              </Button>
            </div>
          </div>
        )}
        <FieldGroup className="gap-4">
          <Field data-invalid={!!errors.name}>
            <FieldLabel htmlFor="name">{dic.editProject.name} *</FieldLabel>
            <InputGroup data-invalid={!!errors.name}>
              <InputGroupInput id="name" {...register("name")} />
            </InputGroup>
          </Field>
          <Field data-invalid={!!errors.description}>
            <FieldLabel htmlFor="description">
              {dic.editProject.description}
            </FieldLabel>
            <InputGroup data-invalid={!!errors.description}>
              <InputGroupTextarea
                id="description"
                {...register("description")}
                className="field-sizing-fixed"
                rows={3}
              />
            </InputGroup>
          </Field>
          <Field data-invalid={!!errors.color}>
            <FieldLabel htmlFor="color">{dic.editProject.color}</FieldLabel>
            <InputGroup data-invalid={!!errors.color}>
              <InputGroupInput
                id="color"
                type="color"
                className="h-8 cursor-pointer p-1"
                {...register("color")}
              />
            </InputGroup>
          </Field>
        </FieldGroup>
      </div>
      <DialogFooter className="p-2 px-4 sm:justify-between">
        <AlertDialog>
          <AlertDialogTrigger
            render={
              <Button variant="destructive" disabled={pendAction}>
                {pendAction && <Spinner />}
                {dic.editProject.delete}
              </Button>
            }
          />
          <AlertDialogContent size="sm">
            <AlertDialogHeader>
              <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                <IoIosWarning />
              </AlertDialogMedia>
              <AlertDialogTitle>
                {dic.editProject.deleteProjectConfirmMessage}
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={pendAction} variant="outline">
                {dic.editProject.cancel}
              </AlertDialogCancel>
              <AlertDialogAction
                disabled={pendAction}
                variant="destructive"
                onClick={() => {
                  if (!project) return;
                  deleteProjectMutation.mutateAsync(project.id).then(() => {
                    onSuccess?.();
                  });
                }}
              >
                {dic.editProject.confirm}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <Button
          className="sm:w-32"
          type="submit"
          disabled={(project ? !isDirty : false) || pendAction}
          onClick={(e) => {
            e.preventDefault();
            handleSubmit((data) => {
              const props = {
                name: data.name,
                description: data.description || null,
                color: data.color || null,
              };
              const mutation = project
                ? updateProjectMutation.mutateAsync({
                    id: project.id,
                    ...props,
                  })
                : createProjectMutation.mutateAsync(props);
              mutation.then(() => {
                toast.success(dic.editProject.changesSavedSuccessfully);
                onSuccess?.();
              });
            })();
          }}
        >
          {pendAction && <Spinner />}
          {project ? dic.editProject.saveChanges : dic.editProject.create}
        </Button>
      </DialogFooter>
    </form>
  );
}
