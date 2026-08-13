"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useShareDictionary } from "../../../services/share-dictionary/shareDictionaryContext";
import { usePanelInfo } from "../../services/panel-info/panelInfoContext";
import { Field, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";

export default function UserInfo() {
  const { userInfo } = usePanelInfo();
  const {
    shareDictionary: {
      components: { userInfo: userInfoDic },
    },
  } = useShareDictionary();

  if (!userInfo.isSuccess) return null;
  return (
    <div>
      <div className="flex flex-col items-center mb-8">
        <Avatar className="size-44 border border-border mb-2">
          <AvatarFallback className="bg-neutral-200 dark:bg-neutral-800"></AvatarFallback>
        </Avatar>
        <div className="flex flex-wrap gap-4">
          <Button
            variant="outline"
            className="w-32 text-destructive border-destructive"
          >
            {userInfoDic.removeImage}
          </Button>
          <Button
            variant="outline"
            className="w-32 border-primary text-primary"
          >
            {userInfoDic.changeImage}
          </Button>
        </div>
      </div>
      <form className="border border-border rounded-md p-4 mb-4">
        <div className="grid grid-cols-2 gap-4">
          <Field className="gap-2 col-span-full">
            <FieldLabel>username</FieldLabel>
            <InputGroup>
              <InputGroupInput />
            </InputGroup>
          </Field>
          <Field className="gap-2">
            <FieldLabel>firstname</FieldLabel>
            <InputGroup>
              <InputGroupInput />
            </InputGroup>
          </Field>
          <Field className="gap-2">
            <FieldLabel>lastname</FieldLabel>
            <InputGroup>
              <InputGroupInput />
            </InputGroup>
          </Field>
          <Field className="gap-2">
            <FieldLabel>email</FieldLabel>
            <InputGroup>
              <InputGroupInput />
            </InputGroup>
          </Field>
          <Field className="gap-2">
            <FieldLabel>phonenumber</FieldLabel>
            <InputGroup>
              <InputGroupInput />
            </InputGroup>
          </Field>
          <div className="flex justify-end col-span-full">
            <Button className="w-32"></Button>
          </div>
        </div>
      </form>
      <form className="border border-border rounded-md p-4">
        <div className="grid grid-cols-2 gap-4">
          <Field className="gap-2">
            <FieldLabel>password</FieldLabel>
            <InputGroup>
              <InputGroupInput />
            </InputGroup>
          </Field>
          <Field className="gap-2">
            <FieldLabel>confirmPassword</FieldLabel>
            <InputGroup>
              <InputGroupInput />
            </InputGroup>
          </Field>
          <div className="flex justify-end col-span-full">
            <Button className="w-32"></Button>
          </div>
        </div>
      </form>
    </div>
  );
}
