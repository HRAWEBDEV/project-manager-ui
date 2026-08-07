import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { useShareDictionary } from "../../../services/share-dictionary/shareDictionaryContext";
import { useFormContext, Controller } from "react-hook-form";
import { type UserInfoSchema } from "../schemas/userInfoSchema";
import { NumericFormat } from "react-number-format";
import { type SignUpStep } from "../utils/signUpSteps";
import Link from "next/link";

export default function SignUpUserInfo({
  onSubmitStep,
  onReturnToLogin,
}: {
  onSubmitStep: (step: SignUpStep) => unknown;
  onReturnToLogin: () => unknown;
}) {
  const {
    control,
    formState: { errors },
  } = useFormContext<UserInfoSchema>();
  const {
    authDictionary: { signUp: signUpDic },
  } = useShareDictionary();

  return (
    <form>
      <FieldGroup className="gap-4">
        <Controller
          control={control}
          name="username"
          render={({ field }) => (
            <Field data-invalid={!!errors.username}>
              <FieldLabel htmlFor="username">
                {signUpDic.userInfo.username}
              </FieldLabel>
              <InputGroup data-invalid={!!errors.username}>
                <InputGroupInput id="username" {...field} />
              </InputGroup>
            </Field>
          )}
        />
        <Controller
          control={control}
          name="firstName"
          render={({ field }) => (
            <Field data-invalid={!!errors.firstName}>
              <FieldLabel htmlFor="firstName">
                {signUpDic.userInfo.firstName}
              </FieldLabel>
              <InputGroup data-invalid={!!errors.firstName}>
                <InputGroupInput id="firstName" {...field} />
              </InputGroup>
            </Field>
          )}
        />
        <Controller
          control={control}
          name="lastName"
          render={({ field }) => (
            <Field data-invalid={!!errors.lastName}>
              <FieldLabel htmlFor="lastName">
                {signUpDic.userInfo.lastName}
              </FieldLabel>
              <InputGroup data-invalid={!!errors.lastName}>
                <InputGroupInput id="lastName" {...field} />
              </InputGroup>
            </Field>
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <Field data-invalid={!!errors.email}>
              <FieldLabel htmlFor="email">
                {signUpDic.userInfo.email}
              </FieldLabel>
              <InputGroup data-invalid={!!errors.email}>
                <InputGroupInput type="email" id="email" {...field} />
              </InputGroup>
            </Field>
          )}
        />
        <Controller
          control={control}
          name="phoneNumber"
          render={({ field: { onChange, ...other } }) => (
            <Field data-invalid={!!errors.phoneNumber}>
              <FieldLabel htmlFor="phoneNumber">
                {signUpDic.userInfo.phoneNumber}
              </FieldLabel>
              <InputGroup data-invalid={!!errors.phoneNumber}>
                <NumericFormat
                  id="phoneNumber"
                  {...other}
                  allowLeadingZeros
                  allowNegative={false}
                  decimalScale={0}
                  onValueChange={({ value }) => {
                    onChange(value);
                  }}
                  customInput={InputGroupInput}
                />
              </InputGroup>
            </Field>
          )}
        />
        <div className="flex gap-4 justify-between items-center mt-4">
          <FieldDescription>
            {signUpDic.userInfo.haveAccount}{" "}
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onReturnToLogin();
              }}
            >
              {signUpDic.userInfo.signIn}
            </Link>
          </FieldDescription>
          <Button
            type="submit"
            className="w-32"
            onClick={(e) => {
              e.preventDefault();
              onSubmitStep("userInfo");
            }}
          >
            {signUpDic.next}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}
