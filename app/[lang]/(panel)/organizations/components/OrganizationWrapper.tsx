"use client";
import { useEffect } from "react";
import { useShareDictionary } from "@/services/share-dictionary/shareDictionaryContext";
import { useProfile } from "../../services/profile/profileContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type UpdateOrganizationSchema,
  createOrganizationSchema,
} from "@/app/[lang]/(panel)/organizations/schemas/organizatinosSchemas";
import { useUpdateOrganization } from "../hooks/useOrganizations";
import { FieldGroup, FieldLabel, Field } from "@/components/ui/field";
import {
  InputGroupInput,
  InputGroup,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

export default function OrganizationWrapper() {
  const updateOrganizationQuery = useUpdateOrganization();
  const {
    shareDictionary: {
      components: { organizationInfo: dic },
    },
  } = useShareDictionary();
  const { usersInfoQuery } = useProfile();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<UpdateOrganizationSchema>({
    resolver: zodResolver(createOrganizationSchema()),
  });

  useEffect(() => {
    if (!usersInfoQuery.data?.organization) return;
    const { name, description } = usersInfoQuery.data.organization;
    reset({
      name,
      description: description || "",
    });
  }, [usersInfoQuery.data?.organization, reset]);

  return (
    <form>
      <FieldGroup className="gap-4">
        <Field data-invalid={!!errors.name}>
          <FieldLabel htmlFor="name">{dic.name} *</FieldLabel>
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
            disabled={!isDirty || updateOrganizationQuery.isPending}
            onClick={(e) => {
              e.preventDefault();
              handleSubmit((data) => {
                updateOrganizationQuery
                  .mutateAsync({
                    name: data.name,
                    description: data.description || null,
                  })
                  .then(() => toast.success(dic.changesSavedSuccessfully));
              })();
            }}
          >
            {updateOrganizationQuery.isPending && <Spinner />}
            {dic.saveChanges}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}
