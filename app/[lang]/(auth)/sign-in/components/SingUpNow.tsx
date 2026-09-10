import { FieldDescription } from "@/components/ui/field";
import { type AuthDictionary } from "@/internalization/app/dictionaries/auth/dictionary";
import Link from "next/link";

export default function SingUpNow({ dic }: { dic: AuthDictionary }) {
  return (
    <FieldDescription className="text-center">
      {dic.signIn.doNotHaveAnAccount} <Link href="#">{dic.signIn.singUp}</Link>
    </FieldDescription>
  );
}
