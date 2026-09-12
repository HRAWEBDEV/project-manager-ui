"use client";
import { useState } from "react";
import { type AuthDictionary } from "@/internalization/app/dictionaries/auth/dictionary";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldContent,
  FieldError,
} from "@/components/ui/field";
import {
  InputGroupInput,
  InputGroup,
  InputGroupAddon,
} from "@/components/ui/input-group";
import { FaEye, FaEyeSlash, FaLock, FaUser } from "react-icons/fa6";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useBaseConfig } from "@/services/base-config/baseConfigContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type SignInWithPasswordProps,
  createSignInWithPasswordSchema,
} from "@/app/[lang]/(auth)/schemas/authSchemas";
import { useSignIn } from "@/app/[lang]/(auth)/hooks/useAuth";
import { Spinner } from "@/components/ui/spinner";

export default function SignInWithPassword({ dic }: { dic: AuthDictionary }) {
  const [showPassword, setShowPassword] = useState(false);
  const singInMut = useSignIn({ dic });
  const { locale } = useBaseConfig();
  const router = useRouter();
  const signInUseForm = useForm<SignInWithPasswordProps>({
    resolver: zodResolver(createSignInWithPasswordSchema({ dic })),
    defaultValues: {
      password: "",
      username: "",
    },
  });

  return (
    <>
      <Field data-invalid={!!signInUseForm.formState.errors.username}>
        <FieldLabel htmlFor="username">
          {dic.signIn.withPassword.username}
        </FieldLabel>
        <InputGroup
          className="h-10"
          data-invalid={!!signInUseForm.formState.errors.username}
        >
          <InputGroupAddon align="inline-start">
            <FaUser className="size-5 text-primary" />
          </InputGroupAddon>
          <InputGroupInput
            id="username"
            {...signInUseForm.register("username")}
          />
        </InputGroup>
        <FieldContent>
          {!!signInUseForm.formState.errors.username && (
            <FieldError>
              {signInUseForm.formState.errors.username?.message}
            </FieldError>
          )}
        </FieldContent>
      </Field>
      <Field data-invalid={!!signInUseForm.formState.errors.password}>
        <FieldLabel htmlFor="password">
          {dic.signIn.withPassword.password}
        </FieldLabel>
        <InputGroup
          className="h-10"
          data-invalid={!!signInUseForm.formState.errors.password}
        >
          <InputGroupAddon align="inline-start">
            <FaLock className="size-5 text-primary" />
          </InputGroupAddon>
          <InputGroupInput
            type={showPassword ? "text" : "password"}
            id="password"
            {...signInUseForm.register("password")}
          />
          <InputGroupAddon align="inline-end">
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
        <FieldContent>
          {!!signInUseForm.formState.errors.password && (
            <FieldError>
              {signInUseForm.formState.errors.password?.message}
            </FieldError>
          )}
          <FieldDescription>
            <Link href="#">{dic.signIn.withPassword.forgotPassword}</Link>
          </FieldDescription>
        </FieldContent>
      </Field>
      <Field>
        <Button
          type="submit"
          size="lg"
          className="min-h-11 text-md"
          disabled={singInMut.isPending}
          onClick={(e) => {
            e.preventDefault();
            signInUseForm.handleSubmit((data) => {
              singInMut.mutateAsync(data).then(() => {
                router.push(`/${locale}`);
              });
            })();
          }}
        >
          {singInMut.isPending && <Spinner />}
          {dic.signIn.signIn}
        </Button>
      </Field>
    </>
  );
}
