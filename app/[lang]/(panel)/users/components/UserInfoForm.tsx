"use client";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  type UpdateUserSchema,
  createUpdateUserSchema,
} from "@/app/[lang]/(panel)/users/schemas/userSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateUser } from "@/app/[lang]/(panel)/users/hooks/useUsers";
import { useShareDictionary } from "@/services/share-dictionary/shareDictionaryContext";
import { NumericFormat } from "react-number-format";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { useProfile } from "../../services/profile/profileContext";
import { Badge } from "@/components/ui/badge";

export default function UserInfoForm() {
  const {
    shareDictionary: {
      components: { userInfo: dic },
    },
  } = useShareDictionary();
  const confirmUpdateUser = useUpdateUser();
  const { usersInfoQuery } = useProfile();
  const {
    reset,
    register,
    control,
    formState: { errors, isDirty },
    handleSubmit,
  } = useForm<UpdateUserSchema>({
    resolver: zodResolver(createUpdateUserSchema()),
  });

  useEffect(() => {
    if (!usersInfoQuery.data?.user) return;
    const { firstName, lastName, username, phoneNumber, email } =
      usersInfoQuery.data.user;
    reset({
      firstName,
      lastName,
      phoneNumber: phoneNumber || "",
      email,
      username,
    });
  }, [usersInfoQuery.data?.user, reset]);

  return (
    <form className="pb-2 mb-2 border-b border-border">
      <FieldGroup className="gap-4">
        <div className="grid gap-4 grid-cols-2">
          <Field
            className="gap-2"

            data-invalid={!!errors.firstName}
          >
            <FieldLabel htmlFor="firstName">{dic.firstName} *</FieldLabel>
            <InputGroup data-invalid={!!errors.firstName}>
              <InputGroupInput id="firstName" {...register("firstName")} />
            </InputGroup>
          </Field>
          <Field
            className="gap-2"

            data-invalid={!!errors.lastName}
          >
            <FieldLabel htmlFor="lastName">{dic.lastName} *</FieldLabel>
            <InputGroup data-invalid={!!errors.lastName}>
              <InputGroupInput id="lastName" {...register("lastName")} />
            </InputGroup>
          </Field>
        </div>
        <Field className="gap-2" data-invalid={!!errors.username}>
          <FieldLabel htmlFor="username">{dic.username} *</FieldLabel>
          <InputGroup data-invalid={!!errors.username}>
            <InputGroupInput id="username" {...register("username")} />
          </InputGroup>
        </Field>
        <Field
          className="gap-2"

          data-invalid={!!errors.email}
        >
          <FieldLabel htmlFor="email">
            {dic.email} *{" "}
            {usersInfoQuery.data?.user.emailVerified ? (
              <Badge>{dic.verified}</Badge>
            ) : (
              <Badge variant="destructive">{dic.notVerified}</Badge>
            )}
          </FieldLabel>
          <InputGroup data-invalid={!!errors.email}>
            <InputGroupInput id="email" {...register("email")} />
            <InputGroupAddon align="inline-end" className="-me-2">
              <Button
                variant="outline"
                size="sm"
                className="text-primary border-primary"
                disabled
              >
                {dic.verify} {dic.email}
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </Field>
        <Controller
          control={control}
          name="phoneNumber"
          render={({ field: { onChange, value, ...other } }) => (
            <Field
              className="gap-2"

              data-invalid={!!errors.phoneNumber}
            >
              <FieldLabel htmlFor="phoneNumber">
                {dic.phoneNumber}{" "}
                {usersInfoQuery.data?.user.phoneNumberVerified ? (
                  <Badge>{dic.verified}</Badge>
                ) : (
                  <Badge variant="destructive">{dic.notVerified}</Badge>
                )}
              </FieldLabel>
              <InputGroup data-invalid={!!errors.phoneNumber}>
                <NumericFormat
                  {...other}
                  value={value}
                  id="phoneNumber"
                  allowLeadingZeros
                  decimalScale={0}
                  customInput={InputGroupInput}
                  onValueChange={({ value }) => {
                    onChange(value);
                  }}
                />
                <InputGroupAddon align="inline-end" className="-me-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-primary border-primary"
                    disabled
                  >
                    {dic.verify} {dic.phoneNumber}
                  </Button>
                </InputGroupAddon>
              </InputGroup>
            </Field>
          )}
        />
        <div className="flex justify-end gap-2">
          <Button
            disabled={confirmUpdateUser.isPending || !isDirty}
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              handleSubmit((data) => {
                confirmUpdateUser.mutateAsync({
                  firstName: data.firstName,
                  lastName: data.lastName,
                  username: data.username,
                  email: data.email,
                  phoneNumber: data.phoneNumber || null,
                });
              })().then(() => toast.success(dic.changesSavedSuccessfully));
            }}
          >
            {confirmUpdateUser.isPending && <Spinner />}
            {dic.saveChanges}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}
