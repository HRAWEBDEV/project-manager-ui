"use client";
import { useEffect, useRef } from "react";
import { useShareDictionary } from "@/services/share-dictionary/shareDictionaryContext";
import { useProfile } from "../../[organization]/services/profile/profileContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type UpdateOrganizationSchema,
  createOrganizationSchema,
} from "@/app/[lang]/(panel)/organizations/schemas/organizatinosSchemas";
import {
  useUpdateOrganization,
  useUpdateOrganizationLogo,
} from "../hooks/useOrganizations";
import { FieldGroup, FieldLabel, Field } from "@/components/ui/field";
import {
  InputGroupInput,
  InputGroup,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function OrganizationWrapper() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const updateOrganizationQuery = useUpdateOrganization();
  const updateOrganizationLogoQuery = useUpdateOrganizationLogo();
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
  const pendAction =
    updateOrganizationQuery.isPending || updateOrganizationLogoQuery.isPending;

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
      <div className="flex flex-col items-center mb-6">
        <Avatar className="size-36">
          <AvatarImage
            src={`${process.env.NEXT_PUBLIC_SERVER_URI}${usersInfoQuery.data?.organization.logo}`}
            alt="organization image"
          />
          <AvatarFallback>
            {usersInfoQuery.data?.organization.name[0]}
          </AvatarFallback>
        </Avatar>
        <div className="flex gap-2 items-center flex-wrap mt-4">
          <Button
            disabled={pendAction}
            variant="destructive"
            className="min-w-28"
          >
            {pendAction && <Spinner />}
            {dic.removeAvatar}
          </Button>
          <Button
            className="min-w-28"
            onClick={() => {
              fileInputRef.current?.click();
            }}
            disabled={pendAction}
          >
            <input
              ref={fileInputRef}
              disabled={pendAction}
              type="file"
              onChange={(e) => {
                const formData = new FormData();
                if (!e.target.files) return;
                formData.append("image", e.target.files[0]);
                updateOrganizationLogoQuery.mutate(formData);
              }}
              accept="image/*"
              hidden
            />
            {pendAction && <Spinner />}
            {dic.changeAvatar}
          </Button>
        </div>
      </div>
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
            disabled={!isDirty || pendAction}
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
            {pendAction && <Spinner />}
            {dic.saveChanges}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}
