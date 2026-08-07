import { useState } from "react";
import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldContent,
  FieldError,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { useFormContext, Controller } from "react-hook-form";
import { useShareDictionary } from "../../../services/share-dictionary/shareDictionaryContext";
import { type OrganizationSchema } from "../schemas/organizationSchema";
import { type SignUpStep } from "../utils/signUpSteps";
import { Button } from "@/components/ui/button";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function SignUpOrganizationInfo({
  onSubmitStep,
  changeSignUpStep,
}: {
  onSubmitStep: (step: SignUpStep) => unknown;
  changeSignUpStep: (step: SignUpStep) => unknown;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    formState: { errors },
  } = useFormContext<OrganizationSchema>();
  const {
    authDictionary: { signUp: signUpDic },
  } = useShareDictionary();

  return (
    <form>
      <FieldGroup>
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <Field data-invalid={!!errors.name}>
              <FieldLabel htmlFor="name">
                {signUpDic.organizationInfo.name}
              </FieldLabel>
              <InputGroup data-invalid={!!errors.name}>
                <InputGroupInput id="name" {...field} />
              </InputGroup>
            </Field>
          )}
        />
        <Controller
          control={control}
          name="description"
          render={({ field }) => (
            <Field data-invalid={!!errors.description}>
              <FieldLabel htmlFor="description">
                {signUpDic.organizationInfo.description}
              </FieldLabel>
              <InputGroup data-invalid={!!errors.description}>
                <InputGroupTextarea id="description" {...field} />
              </InputGroup>
            </Field>
          )}
        />
        <div className="p-2 bg-neutral-50 dark:bg-neutral-900 grid gap-5 border border-border rounded-md">
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <Field data-invalid={!!errors.password}>
                <FieldLabel htmlFor="password">
                  {signUpDic.organizationInfo.password}
                </FieldLabel>
                <InputGroup data-invalid={!!errors.password}>
                  <InputGroupInput
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...field}
                  />
                  <InputGroupAddon align="inline-end" className="-me-3">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-lg"
                      onClick={() => setShowPassword((pre) => !pre)}
                    >
                      {showPassword ? (
                        <FaEyeSlash className="size-5" />
                      ) : (
                        <FaEye className="size-5" />
                      )}
                    </Button>
                  </InputGroupAddon>
                </InputGroup>
              </Field>
            )}
          />
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field }) => (
              <Field data-invalid={!!errors.confirmPassword}>
                <FieldLabel htmlFor="confirmPassword">
                  {signUpDic.organizationInfo.confirmPassword}
                </FieldLabel>
                <InputGroup data-invalid={!!errors.confirmPassword}>
                  <InputGroupInput
                    type="password"
                    id="confirmPassword"
                    {...field}
                  />
                </InputGroup>
                {errors.confirmPassword && (
                  <FieldError>{errors.confirmPassword.message}</FieldError>
                )}
              </Field>
            )}
          />
        </div>
        <div className="flex gap-4 justify-between mt-4">
          <Button
            variant="outline"
            type="button"
            className="w-32"
            onClick={() => {
              changeSignUpStep("userInfo");
            }}
          >
            {signUpDic.previous}
          </Button>
          <Button
            type="submit"
            className="w-32"
            onClick={(e) => {
              e.preventDefault();
              onSubmitStep("organizationInfo");
            }}
          >
            {signUpDic.next}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}
