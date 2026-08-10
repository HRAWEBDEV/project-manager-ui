"use client";
import { ChevronsUpDown } from "lucide-react";
import { MdWorkspaces } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { ComponentProps } from "react";

export default function WorkspaceController(
  props: ComponentProps<typeof Button>,
) {
  return (
    <Button {...props}>
      <MdWorkspaces className="size-8" />
      <div className="grow">
        <span className="text-neutral-700 dark:text-neutral-400">
          میــزکار:{" "}
        </span>
        <span> فرانت اند</span>
      </div>
      <ChevronsUpDown />
    </Button>
  );
}
