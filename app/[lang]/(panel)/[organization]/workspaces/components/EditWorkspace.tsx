"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type UpdateWorkspaceSchema,
  createUpdateWorkspaceSchema,
} from "../schemas/workspacesSchema";
import { useUpdateWorkspace, useCreateWorkspace } from "../hooks/useWorkspaces";
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

export default function EditWorkspace({
  workspace,
}: {
  workspace: Workspace | null;
}) {
  const updateWorkspaceMutation = useUpdateWorkspace();
  const createWorkspaceMutation = useCreateWorkspace();
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
    updateWorkspaceMutation.isPending || createWorkspaceMutation.isPending;

  useEffect(() => {
    reset({
      name: workspace?.name || "",
      description: workspace?.description || "",
    });
  }, [workspace, reset]);

  return (
    <form>
      <FieldGroup className="gap-4">
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
              rows={6}
            />
          </InputGroup>
        </Field>
        <div className="flex justify-end gap-2">
          <Button
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
                mutation.then(() =>
                  toast.success(dic.changesSavedSuccessfully),
                );
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
