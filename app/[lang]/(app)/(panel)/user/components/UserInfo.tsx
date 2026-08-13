"use client";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useShareDictionary } from "../../../services/share-dictionary/shareDictionaryContext";
import { usePanelInfo } from "../../services/panel-info/panelInfoContext";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/ui/input-group";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function UserInfo() {
  const [showPassword, setShowPassword] = useState(false);
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
      <form className="border border-border rounded-md p-4 mb-4 bg-neutral-100 dark:bg-neutral-900">
        <div className="grid grid-cols-2 gap-4">
          <Field className="gap-2 col-span-full">
            <FieldLabel htmlFor="username">{userInfoDic.username}</FieldLabel>
            <InputGroup className="bg-background">
              <InputGroupInput id="username" />
            </InputGroup>
          </Field>
          <Field className="gap-2">
            <FieldLabel htmlFor="firstName">{userInfoDic.firstName}</FieldLabel>
            <InputGroup className="bg-background">
              <InputGroupInput id="firstName" />
            </InputGroup>
          </Field>
          <Field className="gap-2">
            <FieldLabel htmlFor="lastName">{userInfoDic.lastName}</FieldLabel>
            <InputGroup className="bg-background">
              <InputGroupInput id="lastName" />
            </InputGroup>
          </Field>
          <Field className="gap-2">
            <FieldLabel htmlFor="email">{userInfoDic.email}</FieldLabel>
            <InputGroup className="bg-background">
              <InputGroupInput id="email" />
            </InputGroup>
          </Field>
          <Field className="gap-2">
            <FieldLabel htmlFor="phoneNumber">
              {userInfoDic.phoneNumber}
            </FieldLabel>
            <InputGroup className="bg-background">
              <InputGroupInput id="phoneNumber" />
            </InputGroup>
          </Field>
          <div className="flex justify-end col-span-full">
            <Button className="w-32">{userInfoDic.editInfo}</Button>
          </div>
        </div>
      </form>
      <form className="border border-destructive bg-destructive/5 rounded-md p-4">
        <div className="grid grid-cols-2 gap-4">
          <Field className="gap-2">
            <FieldLabel htmlFor="password">{userInfoDic.password}</FieldLabel>
            <InputGroup className="bg-background">
              <InputGroupInput
                id="password"
                type={showPassword ? "text" : "password"}
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
          </Field>
          <Field className="gap-2">
            <FieldLabel htmlFor="confirmPassword">
              {userInfoDic.confirmPassword}
            </FieldLabel>
            <InputGroup className="bg-background">
              <InputGroupInput id="confirmPassword" type="password" />
            </InputGroup>
          </Field>
          <div className="flex justify-end col-span-full">
            <Button variant="destructive" className="w-32">
              {userInfoDic.changePassword}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
