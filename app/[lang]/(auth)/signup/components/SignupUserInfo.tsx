import { type AuthDictionary } from "@/internalization/app/dictionaries/auth/dictionary";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

export default function SignupUserInfo({ dic }: { dic: AuthDictionary }) {
  return (
    <>
      <div className="grid gap-3 md:grid-cols-2">
        <Field>
          <FieldLabel htmlFor="firstName">
            {dic.signup.userInfo.firstName} *
          </FieldLabel>
          <InputGroup>
            <InputGroupInput id="firstName" />
          </InputGroup>
        </Field>
        <Field>
          <FieldLabel htmlFor="lastName">
            {dic.signup.userInfo.lastName} *
          </FieldLabel>
          <InputGroup>
            <InputGroupInput id="lastName" />
          </InputGroup>
        </Field>
      </div>
      <Field>
        <FieldLabel htmlFor="username">
          {dic.signup.userInfo.username} *
        </FieldLabel>
        <InputGroup>
          <InputGroupInput id="username" />
        </InputGroup>
      </Field>
      <div className="grid gap-3 md:grid-cols-2">
        <Field>
          <FieldLabel htmlFor="email">{dic.signup.userInfo.email} *</FieldLabel>
          <InputGroup>
            <InputGroupInput id="email" />
          </InputGroup>
        </Field>
        <Field>
          <FieldLabel htmlFor="phoneNumber">
            {dic.signup.userInfo.phoneNumber}
          </FieldLabel>
          <InputGroup>
            <InputGroupInput id="phoneNumber" />
          </InputGroup>
        </Field>
      </div>
      <div className="grid gap-3 md:grid-cols-2 p-2 bg-neutral-100 dark:bg-neutral-900 rounded-md">
        <Field>
          <FieldLabel htmlFor="password">
            {dic.signup.userInfo.password} *
          </FieldLabel>
          <InputGroup>
            <InputGroupInput id="password" />
          </InputGroup>
        </Field>
        <Field>
          <FieldLabel htmlFor="confirmPassword">
            {dic.signup.userInfo.confirmPassword} *
          </FieldLabel>
          <InputGroup>
            <InputGroupInput id="confirmPassword" />
          </InputGroup>
        </Field>
      </div>
    </>
  );
}
