import { type AuthDictionary } from "@/internalization/app/dictionaries/auth/dictionary";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupInput,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { useFormContext } from "react-hook-form";
import { OrganizationInfoSchema } from "@/app/[lang]/(auth)/signup/schemas/signupSchemas";

export default function SignupOrganizationInfo({
  dic,
}: {
  dic: AuthDictionary;
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext<OrganizationInfoSchema>();
  return (
    <>
      <Field data-invalid={!!errors.name}>
        <FieldLabel htmlFor="name">
          {dic.signup.organizationInfo.name} *
        </FieldLabel>
        <InputGroup data-invalid={!!errors.name}>
          <InputGroupInput id="name" {...register("name")} />
        </InputGroup>
      </Field>
      <Field data-invalid={!!errors.description}>
        <FieldLabel htmlFor="description">
          {dic.signup.organizationInfo.description}
        </FieldLabel>
        <InputGroup data-invalid={!!errors.description}>
          <InputGroupTextarea
            rows={6}
            id="description"
            className="field-sizing-fixed"
            {...register("description")}
          />
        </InputGroup>
      </Field>
    </>
  );
}
