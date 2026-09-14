"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useShareDictionary } from "@/services/share-dictionary/shareDictionaryContext";
import { type Workspace } from "../services/workspacesApiActions";
import EditWorkspace from "./EditWorkspace";

export default function EditWorkspaceDialog({
  workspace,
  open,
  onOpenChange,
}: {
  workspace: Workspace | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const {
    shareDictionary: {
      components: { workspaceInfo: dic },
    },
  } = useShareDictionary();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{workspace ? workspace.name : dic.newWorkspace}</DialogTitle>
          <DialogDescription className="hidden">
            {workspace ? workspace.name : dic.newWorkspace}
          </DialogDescription>
        </DialogHeader>
        <EditWorkspace
          workspace={workspace}
          onSuccess={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
