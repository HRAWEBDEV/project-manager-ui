"use client";
import { FieldDescription } from "@/components/ui/field";
import { type AuthDictionary } from "@/internalization/app/dictionaries/auth/dictionary";
import Link from "next/link";
import { useBaseConfig } from "@/services/base-config/baseConfigContext";

export default function SingUpNow({ dic }: { dic: AuthDictionary }) {
  const { locale } = useBaseConfig();
  return (
    <FieldDescription className="text-center">
      {dic.signIn.doNotHaveAnAccount}{" "}
      <Link href={`/${locale}/signup`}>{dic.signIn.singUp}</Link>
    </FieldDescription>
  );
}
