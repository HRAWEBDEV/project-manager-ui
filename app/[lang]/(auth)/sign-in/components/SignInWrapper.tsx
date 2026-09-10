import { type AuthDictionary } from "@/internalization/app/dictionaries/auth/dictionary";
import SignInWithPassword from "./SignInWithPassword";
import { FieldGroup } from "@/components/ui/field";
import LogoShape from "@/components/LogoShape";

export default function SignInWrapper({ dic }: { dic: AuthDictionary }) {
  return (
    <form className="p-6 md:p-8">
      <FieldGroup>
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex gap-2">
            <LogoShape className="size-8" />
            <h1 className="text-2xl font-bold">{dic.signIn.welcomeback}</h1>
          </div>
          <p className="text-balance text-muted-foreground">
            {dic.signIn.alinCloudHotelManagement}
          </p>
        </div>
        <SignInWithPassword dic={dic} />
      </FieldGroup>
    </form>
  );
}
