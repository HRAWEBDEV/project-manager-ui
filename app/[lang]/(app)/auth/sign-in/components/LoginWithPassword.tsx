import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldLabel,
  FieldContent,
  FieldError,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/ui/input-group";
import { useShareDictionary } from "../../../services/share-dictionary/shareDictionaryContext";
import { useMutation } from "@tanstack/react-query";
import { Spinner } from "@/components/ui/spinner";
import { useForm, Controller } from "react-hook-form";
import {
  type SignInSchema,
  createSignInSchema,
} from "../../schemas/signInSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "../../services/authApiActions";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useBaseConfig } from "@/services/base-config/baseConfigContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginWithPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const { locale } = useBaseConfig();
  const router = useRouter();
  const {
    authDictionary: { signIn: signInDic },
  } = useShareDictionary();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createSignInSchema(signInDic)),
    defaultValues: {
      password: "",
      username: "",
    },
  });

  const { mutate: confirmSignIn, isPending } = useMutation({
    mutationFn(data: SignInSchema) {
      return signIn(data);
    },
    onSuccess() {
      router.replace(`/${locale}`);
    },
    onError(
      err: AxiosError<{
        message: string;
      }>,
    ) {
      if (err.response?.data.message === "Invalid username or password") {
        toast.error(signInDic.withPassword.invalidCredentials);
      }
    },
  });

  return (
    <>
      <Controller
        control={control}
        name="username"
        render={({ field }) => (
          <Field data-invalid={!!errors.username}>
            <FieldLabel htmlFor="username">
              {signInDic.withPassword.username}
            </FieldLabel>
            <InputGroup className="h-10" data-invalid={!!errors.username}>
              <InputGroupInput id="username" required {...field} />
            </InputGroup>
            {!!errors.username && (
              <FieldContent>
                <FieldError>{errors.username.message}</FieldError>
              </FieldContent>
            )}
          </Field>
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field }) => (
          <Field data-invalid={!!errors.password}>
            <div className="flex items-center">
              <FieldLabel htmlFor="password">
                {signInDic.withPassword.password}
              </FieldLabel>
            </div>
            <InputGroup className="h-10" data-invalid={!!errors.password}>
              <InputGroupInput
                id="password"
                type={showPassword ? "text" : "password"}
                required
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
            {!!errors.password && (
              <FieldContent>
                <FieldError>{errors.password.message}</FieldError>
              </FieldContent>
            )}
          </Field>
        )}
      />
      <Field>
        <Button
          type="submit"
          size="lg"
          disabled={isPending}
          onClick={(e) => {
            e.preventDefault();
            if (isPending) return;
            handleSubmit((data) => {
              confirmSignIn(data);
            })();
          }}
        >
          {isPending && <Spinner />}
          {signInDic.withPassword.login}
        </Button>
        <a
          href="#"
          className="text-neutral-600 dark:text-neutral-400 ms-auto text-sm underline-offset-2 hover:underline"
        >
          {signInDic.withPassword.forgetPassword}
        </a>
      </Field>
    </>
  );
}
