import { useState } from "react";
import { type AuthDictionary } from "@/internalization/app/dictionaries/auth/dictionary";
import {
  Field,
  FieldLabel,
  FieldContent,
  FieldError,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useFormContext, Controller } from "react-hook-form";
import { UserInfoSchema } from "@/app/[lang]/(auth)/signup/schemas/signupSchemas";
import { NumericFormat } from "react-number-format";
import { Button } from "@/components/ui/button";
import { FaEye, FaEyeSlash, FaCheck } from "react-icons/fa6";
import {
  useEmailAvailability,
  useUsernameAvailability,
} from "@/app/[lang]/(auth)/hooks/useAuth";
import { Spinner } from "@/components/ui/spinner";

export default function SignupUserInfo({
  dic,
  availableEmailQuery,
  availableUsernameQuery,
}: {
  dic: AuthDictionary;
  availableEmailQuery: ReturnType<typeof useEmailAvailability>;
  availableUsernameQuery: ReturnType<typeof useUsernameAvailability>;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext<UserInfoSchema>();
  return (
    <>
      <div className="grid gap-3 md:grid-cols-2">
        <Field data-invalid={!!errors.firstName}>
          <FieldLabel htmlFor="firstName">
            {dic.signup.userInfo.firstName} *
          </FieldLabel>
          <InputGroup data-invalid={!!errors.firstName}>
            <InputGroupInput id="firstName" {...register("firstName")} />
          </InputGroup>
        </Field>
        <Field data-invalid={!!errors.lastName}>
          <FieldLabel htmlFor="lastName">
            {dic.signup.userInfo.lastName} *
          </FieldLabel>
          <InputGroup data-invalid={!!errors.lastName}>
            <InputGroupInput id="lastName" {...register("lastName")} />
          </InputGroup>
        </Field>
      </div>
      <Field data-invalid={!!errors.username}>
        <FieldLabel htmlFor="username">
          {dic.signup.userInfo.username} *
        </FieldLabel>
        <InputGroup data-invalid={!!errors.username}>
          <InputGroupInput id="username" {...register("username")} />
          <InputGroupAddon align="inline-end">
            {availableUsernameQuery.isFetching ? (
              <Spinner />
            ) : availableUsernameQuery.isSuccess &&
              availableUsernameQuery.data.isAvailable ? (
              <FaCheck className="text-teal-700 dark:text-teal-400" />
            ) : null}
          </InputGroupAddon>
        </InputGroup>
        {availableUsernameQuery.isSuccess &&
          !availableUsernameQuery.data.isAvailable && (
            <FieldContent>
              <FieldError>{dic.signup.userInfo.duplicateUsername}</FieldError>
            </FieldContent>
          )}
      </Field>
      <div className="grid gap-3 md:grid-cols-2">
        <Field data-invalid={!!errors.email}>
          <FieldLabel htmlFor="email">{dic.signup.userInfo.email} *</FieldLabel>
          <InputGroup data-invalid={!!errors.email}>
            <InputGroupInput id="email" {...register("email")} />
            <InputGroupAddon align="inline-end">
              {availableEmailQuery.isFetching ? (
                <Spinner />
              ) : availableEmailQuery.isSuccess &&
                availableEmailQuery.data.isAvailable ? (
                <FaCheck className="text-teal-700 dark:text-teal-400" />
              ) : null}
            </InputGroupAddon>
          </InputGroup>
          {availableEmailQuery.isSuccess &&
            !availableEmailQuery.data.isAvailable && (
              <FieldContent>
                <FieldError>{dic.signup.userInfo.duplicateEmail}</FieldError>
              </FieldContent>
            )}
        </Field>
        <Controller
          control={control}
          name="phoneNumber"
          render={({ field: { onChange, value, ...other } }) => (
            <Field data-invalid={!!errors.phoneNumber}>
              <FieldLabel htmlFor="phoneNumber">
                {dic.signup.userInfo.phoneNumber}
              </FieldLabel>
              <InputGroup data-invalid={!!errors.phoneNumber}>
                <NumericFormat
                  id="phoneNumber"
                  customInput={InputGroupInput}
                  {...other}
                  value={value}
                  allowLeadingZeros
                  decimalScale={0}
                  onValueChange={({ value }) => {
                    onChange(value);
                  }}
                />
              </InputGroup>
            </Field>
          )}
        />
      </div>
      <div className="grid gap-3 md:grid-cols-2 p-2 bg-neutral-100 dark:bg-neutral-900 rounded-md">
        <Field data-invalid={!!errors.password}>
          <FieldLabel htmlFor="password">
            {dic.signup.userInfo.password} *
          </FieldLabel>
          <InputGroup data-invalid={!!errors.password}>
            <InputGroupInput
              id="password"

              type={showPassword ? "text" : "password"}
              {...register("password")}
            />
            <InputGroupAddon align="inline-end" className="-me-2">
              <Button
                variant="ghost"
                size="icon-lg"
                type="button"

                onClick={() => setShowPassword((pre) => !pre)}
              >
                {showPassword ? (
                  <FaEye className="size-5" />
                ) : (
                  <FaEyeSlash className="size-5" />
                )}
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </Field>
        <Field data-invalid={!!errors.confirmPassword}>
          <FieldLabel htmlFor="confirmPassword">
            {dic.signup.userInfo.confirmPassword} *
          </FieldLabel>
          <InputGroup data-invalid={!!errors.confirmPassword}>
            <InputGroupInput
              type="password"
              id="confirmPassword"
              {...register("confirmPassword")}
            />
          </InputGroup>
          <FieldContent>
            {!!errors.confirmPassword && (
              <FieldError>{errors.confirmPassword.message}</FieldError>
            )}
          </FieldContent>
        </Field>
      </div>
    </>
  );
}
