import { ChevronRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { MdOutlineBedroomParent } from "react-icons/md";

type FileTreeItem = { name: string } | { name: string; items: FileTreeItem[] };

export default function SidebarNav() {
  const fileTree: FileTreeItem[] = [
    {
      name: "اقامتگاه",
      items: [
        { name: "رزرو جدید" },
        { name: "پذیرش" },
        { name: "رک اتاق‌ها" },
        { name: "رزرو ورودی" },
      ],
    },
    {
      name: "خانه‌داری",
      items: [
        { name: "رزرو جدید" },
        { name: "پذیرش" },
        { name: "رک اتاق‌ها" },
        { name: "رزرو ورودی" },
      ],
    },
  ];

  const renderItem = (fileItem: FileTreeItem) => {
    if ("items" in fileItem) {
      return (
        <Collapsible key={fileItem.name}>
          <CollapsibleTrigger
            render={
              <Button
                variant="ghost"
                size="sm"
                className="group w-full justify-start transition-none hover:bg-accent hover:text-accent-foreground text-start gap-2 font-normal"
              >
                <MdOutlineBedroomParent className="size-7" />
                <div className="grow">{fileItem.name}</div>
                <ChevronRightIcon className="transition-transform group-data-[panel-open]:rotate-90 rtl:rotate-180" />
              </Button>
            }
          />
          <CollapsibleContent className="mt-1 ms-8 style-lyra:ms-8">
            <div className="flex flex-col gap-1">
              {fileItem.items.map((child) => renderItem(child))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      );
    }
    return (
      <Button
        key={fileItem.name}
        variant="link"
        size="sm"
        className="w-full justify-start gap-2 text-foreground font-normal"
      >
        <span>{fileItem.name}</span>
      </Button>
    );
  };

  return (
    <div className="w-full grow overflow-auto">
      <div className="flex flex-col gap-1">
        {fileTree.map((item) => renderItem(item))}
      </div>
    </div>
  );
}
