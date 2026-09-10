"use client";
import { useState } from "react";
import { type AuthDictionary } from "@/internalization/app/dictionaries/auth/dictionary";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldContent,
} from "@/components/ui/field";
import {
  InputGroupInput,
  InputGroup,
  InputGroupAddon,
} from "@/components/ui/input-group";
import { FaEye, FaEyeSlash, FaLock, FaUser } from "react-icons/fa6";
import SignInOptions from "./SignInOptions";
import SingUpNow from "./SingUpNow";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useBaseConfig } from "@/services/base-config/baseConfigContext";

export default function SignInWithPassword({ dic }: { dic: AuthDictionary }) {
  const [showPassword, setShowPassword] = useState(false);
  const { locale } = useBaseConfig();
  const router = useRouter();

  return (
    <>
      <Field>
        <FieldLabel htmlFor="username">
          {dic.signIn.withPassword.username}
        </FieldLabel>
        <InputGroup className="h-10">
          <InputGroupAddon align="inline-start">
            <FaUser className="size-5 text-primary" />
          </InputGroupAddon>
          <InputGroupInput id="username" />
        </InputGroup>
      </Field>
      <Field>
        <FieldLabel htmlFor="password">
          {dic.signIn.withPassword.password}
        </FieldLabel>
        <InputGroup className="h-10">
          <InputGroupAddon align="inline-start">
            <FaLock className="size-5 text-primary" />
          </InputGroupAddon>
          <InputGroupInput
            type={showPassword ? "text" : "password"}
            id="password"
          />
          <InputGroupAddon align="inline-end">
            <Button
              variant="ghost"
              size="icon-lg"

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
          onClick={(e) => {
            e.preventDefault();
            router.push(`/${locale}`);
          }}
        >
          {dic.signIn.signIn}
        </Button>
      </Field>
      <SignInOptions dic={dic} />
      <SingUpNow dic={dic} />
    </>
  );
}
