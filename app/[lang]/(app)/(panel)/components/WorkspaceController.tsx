"use client";
import { ChevronsUpDown } from "lucide-react";
import { MdWorkspaces } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { ComponentProps } from "react";
import { useWorkspaceContext } from "../services/workspace/workspaceContext";
import { Spinner } from "@/components/ui/spinner";
import { useShareDictionary } from "../../services/share-dictionary/shareDictionaryContext";

export default function WorkspaceController(
  props: ComponentProps<typeof Button>,
) {
  const {
    shareDictionary: {
      components: { workspace: workspaceDic },
    },
  } = useShareDictionary();
  const { isFetching, toggleWorkspace, activeWorkspace } =
    useWorkspaceContext();
  return (
    <Button {...props} onClick={() => toggleWorkspace(true)}>
      <MdWorkspaces className="size-8" />
      <div className="grow flex items-center gap-1">
        <span className="text-neutral-700 dark:text-neutral-400">
          {workspaceDic.title}:
        </span>
        {isFetching && <Spinner />}
        <span>{activeWorkspace?.name || "---"}</span>
      </div>
      <ChevronsUpDown />
    </Button>
  );
}
