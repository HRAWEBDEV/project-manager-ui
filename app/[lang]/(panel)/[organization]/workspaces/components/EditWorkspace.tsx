"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type UpdateWorkspaceSchema,
  createUpdateWorkspaceSchema,
} from "../schemas/workspacesSchema";
import {
  useUpdateWorkspace,
  useCreateWorkspace,
  useDeleteWorkspace,
} from "../hooks/useWorkspaces";
import { type Workspace } from "../services/workspacesApiActions";
import { useShareDictionary } from "@/services/share-dictionary/shareDictionaryContext";
import { FieldGroup, FieldLabel, Field } from "@/components/ui/field";
import {
  InputGroupInput,
  InputGroup,
  InputGroupTextarea,
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

export default function EditWorkspace({
  workspace,
  onSuccess,
}: {
  workspace: Workspace | null;
  onSuccess?: () => void;
}) {
  const updateWorkspaceMutation = useUpdateWorkspace();
  const createWorkspaceMutation = useCreateWorkspace();
  const deleteWorkspaceMutation = useDeleteWorkspace();
  const {
    shareDictionary: {
      components: { workspaceInfo: dic },
    },
  } = useShareDictionary();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<UpdateWorkspaceSchema>({
    resolver: zodResolver(createUpdateWorkspaceSchema()),
  });
  const pendAction =
    updateWorkspaceMutation.isPending ||
    createWorkspaceMutation.isPending ||
    deleteWorkspaceMutation.isPending;

  useEffect(() => {
    reset({
      name: workspace?.name || "",
      description: workspace?.description || "",
    });
  }, [workspace, reset]);

  return (
    <form>
      <FieldGroup className="gap-4">
        {workspace && (
          <Field>
            <FieldLabel htmlFor="organization-name">
              {dic.organizationName}
            </FieldLabel>
            <InputGroup>
              <InputGroupInput
                id="organization-name"
                readOnly
                value={workspace.organizationName}
              />
            </InputGroup>
          </Field>
        )}

        <Field data-invalid={!!errors.name}>
          <FieldLabel htmlFor="name">{dic.workspaceName} *</FieldLabel>
          <InputGroup data-invalid={!!errors.name}>
            <InputGroupInput id="name" {...register("name")} />
          </InputGroup>
        </Field>
        <Field data-invalid={!!errors.description}>
          <FieldLabel htmlFor="description">{dic.description}</FieldLabel>
          <InputGroup data-invalid={!!errors.description}>
            <InputGroupTextarea
              id="description"
              {...register("description")}
              className="field-sizing-fixed"
              rows={3}
            />
          </InputGroup>
        </Field>
        <div className="flex justify-between gap-2">
          <AlertDialog>
            <AlertDialogTrigger
              render={
                <Button variant="destructive" disabled={pendAction}>
                  {pendAction && <Spinner />}
                  {dic.delete}
                </Button>
              }
            />
            <AlertDialogContent size="sm">
              <AlertDialogHeader>
                <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                  <IoIosWarning />
                </AlertDialogMedia>
                <AlertDialogTitle>
                  {dic.deleteWorkspaceConfirmMessage}
                </AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={pendAction} variant="outline">
                  {dic.cancel}
                </AlertDialogCancel>
                <AlertDialogAction
                  disabled={pendAction}
                  variant="destructive"
                  onClick={() => {
                    if (!workspace) return;
                    deleteWorkspaceMutation
                      .mutateAsync(workspace.id)
                      .then(() => {
                        onSuccess?.();
                      });
                  }}
                >
                  {dic.confirm}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Button
            className="w-32"
            type="submit"
            disabled={(workspace ? !isDirty : false) || pendAction}
            onClick={(e) => {
              e.preventDefault();
              handleSubmit((data) => {
                const props = {
                  name: data.name,
                  description: data.description || null,
                };
                const mutation = workspace
                  ? updateWorkspaceMutation.mutateAsync({
                      id: workspace.id,
                      ...props,
                    })
                  : createWorkspaceMutation.mutateAsync(props);
                mutation.then(() => {
                  toast.success(dic.changesSavedSuccessfully);
                  onSuccess?.();
                });
              })();
            }}
          >
            {pendAction && <Spinner />}
            {workspace ? dic.saveChanges : dic.create}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}
