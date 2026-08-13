"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useShareDictionary } from "../../../services/share-dictionary/shareDictionaryContext";
import { usePanelInfo } from "../../services/panel-info/panelInfoContext";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupInput,
  InputGroupTextarea,
} from "@/components/ui/input-group";

export default function OrganizationInfo() {
  const { userInfo } = usePanelInfo();
  const {
    shareDictionary: {
      components: { organization: organizationDic },
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
            {organizationDic.removeImage}
          </Button>
          <Button
            variant="outline"
            className="w-32 border-primary text-primary"
          >
            {organizationDic.changeImage}
          </Button>
        </div>
      </div>
      <form className="border border-border rounded-md p-4 mb-4 bg-neutral-100 dark:bg-neutral-900">
        <div className="grid grid-cols-1 gap-4">
          <Field>
            <FieldLabel htmlFor="name">{organizationDic.name}</FieldLabel>
            <InputGroup className="bg-background">
              <InputGroupInput id="name" />
            </InputGroup>
          </Field>
          <Field>
            <FieldLabel htmlFor="description">
              {organizationDic.description}
            </FieldLabel>
            <InputGroup className="bg-background">
              <InputGroupTextarea id="description" />
            </InputGroup>
          </Field>
          <div className="flex justify-end col-span-full">
            <Button className="w-32">{organizationDic.editInfo}</Button>
          </div>
        </div>
      </form>
    </div>
  );
}
