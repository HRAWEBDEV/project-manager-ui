import { type AuthDictionary } from "@/internalization/app/dictionaries/auth/dictionary";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupInput,
  InputGroupTextarea,
} from "@/components/ui/input-group";

export default function SignupOrganizationInfo({
  dic,
}: {
  dic: AuthDictionary;
}) {
  return (
    <>
      <Field>
        <FieldLabel htmlFor="name">
          {dic.signup.organizationInfo.name} *
        </FieldLabel>
        <InputGroup>
          <InputGroupInput id="name" />
        </InputGroup>
      </Field>
      <Field>
        <FieldLabel htmlFor="description">
          {dic.signup.organizationInfo.description}
        </FieldLabel>
        <InputGroup>
          <InputGroupTextarea
            rows={6}
            id="description"
            className="field-sizing-fixed"
          />
        </InputGroup>
      </Field>
    </>
  );
}
